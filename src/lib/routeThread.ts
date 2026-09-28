/**
 * Routes a skill thread between timeline tiles without crossing any text.
 *
 * The canvas is split into a grid of small cells. Tiles and other text are
 * blocked (with clearance), and each leg of the thread is an A* search from
 * any point around one tile's border to any point around the next. Each leg
 * picks its own points, so a tile in the middle of a thread can have two
 * nodes: one where the thread arrives and one where it leaves. The cost of a
 * route favours:
 * - few turns, weighted heavily, so lines never kink without a reason,
 * - leaving a tile on the right and arriving on the left, so the thread
 *   still reads forward in time,
 * - the middle of the gaps between rows, over hugging a tile's edge,
 * - fresh cells, so a thread doesn't run back over itself.
 */

export type Rect = { x: number; y: number; w: number; h: number; pad?: number };
export type Point = [number, number];

const CELL = 4;
const CLEAR = 6; // hard clearance around obstacles, in px
const NEAR = 12; // soft clearance: steps closer than this cost more
const BEND = 40; // a turn costs as much as 40 cells (160px) of line
const NEAR_COST = 1;
const REUSE_COST = 6;
const BACKWARD_SIDE = 30; // leaving on the left, or arriving on the right
const CORNER_MARGIN = 10; // keep nodes this far from a tile's corners
const PORT_REACH = 6; // cells to search outward for a free port

const DIRS: Point[] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
const OPPOSITE = [1, 0, 3, 2];
const RIGHT = 0;
const LEFT = 1;

class Heap {
  private f: number[] = [];
  private v: number[] = [];
  get size() {
    return this.v.length;
  }
  push(f: number, v: number) {
    let i = this.v.length;
    this.f.push(f);
    this.v.push(v);
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.f[p] <= this.f[i]) break;
      this.swap(i, p);
      i = p;
    }
  }
  pop(): number {
    const top = this.v[0];
    const lastF = this.f.pop()!;
    const lastV = this.v.pop()!;
    if (this.v.length > 0) {
      this.f[0] = lastF;
      this.v[0] = lastV;
      let i = 0;
      for (;;) {
        const l = 2 * i + 1;
        const r = l + 1;
        let m = i;
        if (l < this.f.length && this.f[l] < this.f[m]) m = l;
        if (r < this.f.length && this.f[r] < this.f[m]) m = r;
        if (m === i) break;
        this.swap(i, m);
        i = m;
      }
    }
    return top;
  }
  private swap(a: number, b: number) {
    [this.f[a], this.f[b]] = [this.f[b], this.f[a]];
    [this.v[a], this.v[b]] = [this.v[b], this.v[a]];
  }
}

export type Thread = { nodes: Point[]; legs: Point[][] };

/** A free cell just outside a tile's border, and where its node sits. */
type Port = { cell: number; out: number; node: Point };

/**
 * @param tiles the tiles to connect, in order. They should also be among
 *   the obstacles.
 */
export function routeThread(
  tiles: Rect[],
  obstacles: Rect[],
  width: number,
  height: number,
): Thread {
  const cols = Math.ceil(width / CELL);
  const rows = Math.ceil(height / CELL);
  const n = cols * rows;
  const blocked = new Uint8Array(n);
  const near = new Uint8Array(n);
  const used = new Uint8Array(n);
  const solid = new Uint8Array(n); // obstacles themselves, no clearance

  const mark = (grid: Uint8Array, r: Rect, pad: number) => {
    const c0 = Math.max(0, Math.floor((r.x - pad) / CELL));
    const c1 = Math.min(cols - 1, Math.floor((r.x + r.w + pad) / CELL));
    const r0 = Math.max(0, Math.floor((r.y - pad) / CELL));
    const r1 = Math.min(rows - 1, Math.floor((r.y + r.h + pad) / CELL));
    for (let rr = r0; rr <= r1; rr++)
      for (let cc = c0; cc <= c1; cc++) grid[rr * cols + cc] = 1;
  };
  for (const o of obstacles) {
    mark(blocked, o, o.pad ?? CLEAR);
    mark(near, o, NEAR);
    mark(solid, o, 0);
  }

  const center = (i: number): Point => [
    (i % cols) * CELL + CELL / 2,
    Math.floor(i / cols) * CELL + CELL / 2,
  ];

  /** For each side, walk outward from the border to the first free cell. */
  function ports(t: Rect): Port[] {
    const out: Port[] = [];
    const walk = (c: number, r: number, d: number, node: Point) => {
      for (let k = 0; k < PORT_REACH; k++) {
        if (c < 0 || r < 0 || c >= cols || r >= rows) return;
        const i = r * cols + c;
        if (solid[i]) return; // never run a stub into another tile
        if (!blocked[i]) {
          out.push({ cell: i, out: d, node });
          return;
        }
        c += DIRS[d][0];
        r += DIRS[d][1];
      }
    };
    const cMin = Math.ceil((t.x + CORNER_MARGIN) / CELL);
    const cMax = Math.floor((t.x + t.w - CORNER_MARGIN) / CELL) - 1;
    for (let c = cMin; c <= cMax; c++) {
      const x = c * CELL + CELL / 2;
      walk(c, Math.floor((t.y - CLEAR - 1) / CELL), 3, [x, t.y]);
      walk(c, Math.floor((t.y + t.h + CLEAR + 1) / CELL), 2, [x, t.y + t.h]);
    }
    const rMin = Math.ceil((t.y + CORNER_MARGIN) / CELL);
    const rMax = Math.floor((t.y + t.h - CORNER_MARGIN) / CELL) - 1;
    for (let r = rMin; r <= rMax; r++) {
      const y = r * CELL + CELL / 2;
      walk(Math.floor((t.x - CLEAR - 1) / CELL), r, LEFT, [t.x, y]);
      walk(Math.floor((t.x + t.w + CLEAR + 1) / CELL), r, RIGHT, [t.x + t.w, y]);
    }
    return out;
  }

  /** Cheapest route from any port of one tile to any port of another. */
  function search(from: Port[], to: Port[], target: Rect) {
    const S = n * 4;
    const g = new Float64Array(S).fill(Infinity);
    const prev = new Int32Array(S).fill(-1);
    const closed = new Uint8Array(S);
    const heap = new Heap();

    // Goal ports, by cell: the direction that points into the tile
    const goalIn = new Map<number, Port>();
    for (const p of to) goalIn.set(p.cell, p);

    // Distance to the target's blocked box, in cells (never overestimates)
    const bx0 = Math.floor((target.x - CLEAR) / CELL);
    const bx1 = Math.floor((target.x + target.w + CLEAR) / CELL);
    const by0 = Math.floor((target.y - CLEAR) / CELL);
    const by1 = Math.floor((target.y + target.h + CLEAR) / CELL);
    const h = (i: number) => {
      const c = i % cols;
      const r = Math.floor(i / cols);
      const dx = Math.max(0, bx0 - c, c - bx1);
      const dy = Math.max(0, by0 - r, r - by1);
      return Math.max(0, dx + dy - 1);
    };

    // Stepping into a goal port costs the final turn into the tile, if any
    const arrival = (p: Port, d: number) =>
      (d === OPPOSITE[p.out] ? 0 : BEND) + (p.out === RIGHT ? BACKWARD_SIDE : 0);

    // Tiles close together can share a port cell: a straight drop between
    // them needs no search at all, and is usually the simplest line there is
    let direct: { cost: number; start: Port; end: Port } | null = null;
    for (const p of from) {
      const goal = goalIn.get(p.cell);
      if (!goal) continue;
      const cost = (p.out === LEFT ? BACKWARD_SIDE : 0) + arrival(goal, p.out);
      if (!direct || cost < direct.cost) direct = { cost, start: p, end: goal };
    }

    const startPort = new Map<number, Port>();
    for (const p of from) {
      const s = p.cell * 4 + p.out;
      const cost = p.out === LEFT ? BACKWARD_SIDE : 0;
      if (cost < g[s]) {
        g[s] = cost;
        startPort.set(s, p);
        heap.push(cost + h(p.cell), s);
      }
    }

    while (heap.size > 0) {
      const s = heap.pop();
      if (closed[s]) continue;
      if (direct && g[s] >= direct.cost) break;
      closed[s] = 1;
      const cell = s >> 2;
      const d = s & 3;
      const goal = goalIn.get(cell);
      if (goal && prev[s] !== -1) {
        if (direct && direct.cost <= g[s]) break;
        const cells: number[] = [];
        let t = s;
        for (; prev[t] !== -1; t = prev[t]) cells.push(t >> 2);
        cells.push(t >> 2);
        return { cells: cells.reverse(), start: startPort.get(t)!, end: goal };
      }
      const c = cell % cols;
      const r = Math.floor(cell / cols);
      for (let nd = 0; nd < 4; nd++) {
        if (nd === OPPOSITE[d]) continue;
        const nc = c + DIRS[nd][0];
        const nr = r + DIRS[nd][1];
        if (nc < 0 || nr < 0 || nc >= cols || nr >= rows) continue;
        const ni = nr * cols + nc;
        if (blocked[ni]) continue;
        let cost = 1;
        if (near[ni]) cost += NEAR_COST;
        if (used[ni]) cost += REUSE_COST;
        if (nd !== d) cost += BEND;
        const gp = goalIn.get(ni);
        if (gp) cost += arrival(gp, nd);
        const ns = ni * 4 + nd;
        const ng = g[s] + cost;
        if (ng < g[ns]) {
          g[ns] = ng;
          prev[ns] = s;
          heap.push(ng + h(ni), ns);
        }
      }
    }
    return direct && { cells: [direct.start.cell], start: direct.start, end: direct.end };
  }

  // Keep only the corners of a run of points
  function corners(pts: Point[]): Point[] {
    return pts.filter((p, i) => {
      if (i === 0 || i === pts.length - 1) return true;
      const [a, b] = [pts[i - 1], pts[i + 1]];
      return !(
        (a[0] === p[0] && p[0] === b[0]) ||
        (a[1] === p[1] && p[1] === b[1])
      );
    });
  }

  const nodes: Point[] = [];
  const legs: Point[][] = [];
  const tilePorts = tiles.map(ports);
  for (let i = 1; i < tiles.length; i++) {
    const found = search(tilePorts[i - 1], tilePorts[i], tiles[i]);
    if (!found) {
      // No free route: fall back to a straight line between corners
      const a: Point = [tiles[i - 1].x, tiles[i - 1].y];
      const b: Point = [tiles[i].x, tiles[i].y];
      nodes.push(a, b);
      legs.push([a, b]);
      continue;
    }
    for (const cell of found.cells) used[cell] = 1;
    nodes.push(found.start.node, found.end.node);
    legs.push(
      corners([found.start.node, ...found.cells.map(center), found.end.node]),
    );
  }
  // A tile's in and out nodes can land on the same spot
  const unique = [...new Map(nodes.map((p) => [`${p[0]},${p[1]}`, p])).values()];
  return { nodes: unique, legs };
}

export function legPath(leg: Point[]): string {
  return leg.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
}

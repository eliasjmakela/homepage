import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { formatDate, formatSpan, type CvEntry, type Kind } from "../../lib/cv";
import { fitTile, type TileFit } from "../../lib/fitTile";
import { legPath, routeThread, type Rect } from "../../lib/routeThread";
import EntryTile from "./EntryTile";
import styles from "./Cv.module.css";

const UNIT = 190; // px per year
const TILE_MIN = 110; // below this a tile is too small to click
const LANE_PAD = 16; // above and below the rows of a lane
const ROW_GAP = 18; // between rows, room for a thread with clearance
const TILE_GAP = 10; // between tiles in the same row
const LABEL = 92;
const RULER = 34;
const FLAG_STRIP = 30; // below the lanes, for the Now label
const NODE = 12;

const LANES: { kind: Kind; label: string }[] = [
  { kind: "work", label: "Work" },
  { kind: "study", label: "Study" },
  { kind: "project", label: "Projects" },
];

type Placed = {
  entry: CvEntry;
  left: number;
  top: number; // within the lane
  fit: TileFit;
};
type Lane = {
  kind: Kind;
  label: string;
  top: number;
  height: number;
  placed: Placed[];
};

function layoutLanes(entries: CvEntry[], min: number, now: number) {
  const x = (t: number) => (t - min) * UNIT;
  let top = RULER;
  const lanes: Lane[] = LANES.map(({ kind, label }) => {
    const rowEnds: number[] = [];
    const rowHeights: number[] = [];
    const items = entries
      .filter((e) => e.kind === kind)
      .map((entry) => {
        const left = x(entry.start);
        const duration = x(entry.end ?? now) - left;
        const ongoing = !entry.planned && entry.end === null;
        const fit = fitTile(
          entry.title,
          formatSpan(entry),
          Math.max(duration, TILE_MIN),
          ongoing ? 2 : 0,
        );
        let row = rowEnds.findIndex((end) => end + TILE_GAP <= left);
        if (row < 0) {
          row = rowEnds.length;
          rowEnds.push(0);
          rowHeights.push(0);
        }
        rowEnds[row] = left + fit.width;
        rowHeights[row] = Math.max(rowHeights[row], fit.height);
        return { entry, left, row, fit };
      });
    const rowTops = rowHeights.map(
      (_, r) =>
        LANE_PAD +
        rowHeights.slice(0, r).reduce((a, b) => a + b, 0) +
        r * ROW_GAP,
    );
    const rowsHeight =
      rowHeights.reduce((a, b) => a + b, 0) +
      Math.max(rowHeights.length - 1, 0) * ROW_GAP;
    const height = Math.max(rowsHeight, 40) + 2 * LANE_PAD;
    const placed = items.map(({ entry, left, row, fit }) => ({
      entry,
      left,
      top: rowTops[row],
      fit,
    }));
    const lane = { kind, label, top, height, placed };
    top += height;
    return lane;
  });
  return { lanes, height: top + FLAG_STRIP };
}

/**
 * Where the now line cuts a drawn box, from its left edge, or null if it
 * doesn't. Goes by the box, not the dates: a box stretched to fit its text
 * or to TILE_MIN can reach past now even when the entry itself doesn't.
 */
function nowSplit(
  entry: CvEntry,
  left: number,
  width: number,
  nowX: number,
): number | null {
  if (entry.planned) return null; // already dashed all over
  return left < nowX && nowX < left + width ? nowX - left : null;
}

/** Re-measure once web fonts finish loading. */
function useFontsVersion(): number {
  const [version, setVersion] = useState(0);
  useEffect(() => {
    const bump = () => setVersion((v) => v + 1);
    document.fonts.ready.then(bump);
    document.fonts.addEventListener("loadingdone", bump);
    return () => document.fonts.removeEventListener("loadingdone", bump);
  }, []);
  return version;
}

export default function CvLanes({
  entries,
  now,
  today,
  skill,
  selectedId,
  onSelect,
}: {
  entries: CvEntry[];
  now: number;
  today: Date;
  skill: string | null;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const min = Math.floor(Math.min(...entries.map((e) => e.start))) - 0.25;
  const max = Math.max(now, ...entries.map((e) => e.end ?? e.start)) + 0.75;
  const width = (max - min) * UNIT;
  const x = useCallback((t: number) => (t - min) * UNIT, [min]);

  const fontsVersion = useFontsVersion();
  const { lanes, height } = useMemo(
    () => layoutLanes(entries, min, now),
    // fontsVersion: text widths change when fonts load
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [entries, min, now, fontsVersion],
  );

  const thread = useMemo(() => {
    if (!skill) return null;
    const tiles: Rect[] = lanes
      .flatMap((lane) =>
        lane.placed
          .filter((p) => p.entry.tech.includes(skill))
          .map((p) => ({
            start: p.entry.start,
            rect: {
              x: LABEL + p.left,
              y: lane.top + p.top,
              w: p.fit.width,
              h: p.fit.height,
            },
          })),
      )
      .sort((a, b) => a.start - b.start)
      .map((t) => t.rect);
    const obstacles: Rect[] = [
      // The pinned lane labels and the year ruler
      { x: 0, y: 0, w: LABEL, h: height, pad: 2 },
      { x: 0, y: 0, w: LABEL + width, h: RULER, pad: 0 },
      // The Now label
      { x: LABEL + x(now), y: height - FLAG_STRIP, w: 140, h: FLAG_STRIP },
      ...lanes.flatMap((lane) =>
        lane.placed.map((p) => ({
          x: LABEL + p.left,
          y: lane.top + p.top,
          w: p.fit.width,
          h: p.fit.height,
        })),
      ),
    ];
    return routeThread(tiles, obstacles, LABEL + width, height);
  }, [lanes, skill, height, width, x, now]);

  const years: number[] = [];
  for (let y = Math.ceil(min); y <= max; y++) years.push(y);

  // Scroll state drives the minimap window
  const scroller = useRef<HTMLDivElement>(null);
  const [view, setView] = useState({ left: 0, visible: 1 });
  const sync = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const track = el.scrollWidth - LABEL;
    setView({
      left: el.scrollLeft / track,
      visible: Math.min(1, (el.clientWidth - LABEL) / track),
    });
  }, []);

  // Open on the present
  useLayoutEffect(() => {
    const el = scroller.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth;
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [sync]);

  const reducedMotion = () =>
    matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scrollTo = (left: number) =>
    scroller.current?.scrollTo({
      left,
      behavior: reducedMotion() ? "auto" : "smooth",
    });

  const dragging = useRef(false);
  const jumpTo = (e: PointerEvent<HTMLDivElement>) => {
    const el = scroller.current;
    if (!el) return;
    const r = e.currentTarget.getBoundingClientRect();
    const p = (e.clientX - r.left) / r.width;
    el.scrollLeft = p * (el.scrollWidth - LABEL) - (el.clientWidth - LABEL) / 2;
  };
  const onMiniKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowLeft: -UNIT, ArrowRight: UNIT }[e.key];
    if (step === undefined) return;
    e.preventDefault();
    scroller.current?.scrollBy({
      left: step,
      behavior: reducedMotion() ? "auto" : "smooth",
    });
  };

  const pct = (t: number) => ((t - min) / (max - min)) * 100;
  const position = Math.round(
    Math.min(1, view.left / Math.max(0.001, 1 - view.visible)) * 100,
  );

  return (
    <div className={styles.surface}>
      <div className={styles.bar}>
        <p className={styles.hint}>
          Scroll sideways or drag the overview to move through time.
        </p>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.control}
            onClick={() => scrollTo(0)}
          >
            <ArrowLeftIcon weight="light" className="ph-light" />
            Start
          </button>
          <button
            type="button"
            className={styles.control}
            onClick={() => scrollTo(scroller.current?.scrollWidth ?? 0)}
          >
            Now
            <ArrowRightIcon weight="light" className="ph-light" />
          </button>
        </div>
      </div>

      <div
        className={styles.minimap}
        role="slider"
        tabIndex={0}
        aria-label="Timeline overview"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={position}
        onKeyDown={onMiniKey}
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          jumpTo(e);
        }}
        onPointerMove={(e) => dragging.current && jumpTo(e)}
        onPointerUp={() => (dragging.current = false)}
      >
        {lanes.map((lane, li) =>
          lane.placed.map(({ entry }) => {
            const barWidth = Math.max(
              pct(entry.end ?? now) - pct(entry.start),
              1.2,
            );
            const split = nowSplit(entry, pct(entry.start), barWidth, pct(now));
            const classes = [
              styles.miniBar,
              entry.planned && styles.planned,
              split !== null && styles.crossesNow,
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <div
                key={entry.id}
                className={classes}
                style={
                  {
                    left: `${pct(entry.start)}%`,
                    width: `${barWidth}%`,
                    top: 7 + li * 10,
                    // as a share of the bar's own width
                    "--split":
                      split === null
                        ? undefined
                        : `${(split / barWidth) * 100}%`,
                  } as CSSProperties
                }
              />
            );
          }),
        )}
        <div className={styles.miniNow} style={{ left: `${pct(now)}%` }} />
        <div
          className={styles.miniWindow}
          style={{
            left: `${view.left * 100}%`,
            width: `${view.visible * 100}%`,
          }}
        />
      </div>

      <div
        className={styles.scroller}
        ref={scroller}
        tabIndex={0}
        aria-label="Career timeline, scrolls sideways"
        onScroll={sync}
      >
        <div
          className={styles.canvas}
          style={
            {
              width: LABEL + width,
              height,
              "--label-width": `${LABEL}px`,
            } as CSSProperties
          }
        >
          <div className={styles.laneRow} style={{ height: RULER }}>
            <div
              className={`${styles.laneLabel} ${styles.rulerLabel}`}
              style={{ width: LABEL }}
            >
              Year
            </div>
            <div className={styles.track} style={{ width }}>
              {years.map((y) => (
                <div
                  key={y}
                  className={`${styles.tick} ${styles.rulerTick}`}
                  style={{ left: x(y) }}
                >
                  {y}
                </div>
              ))}
            </div>
          </div>

          {lanes.map((lane) => (
            <div
              key={lane.kind}
              className={styles.laneRow}
              style={{ height: lane.height }}
            >
              <div className={styles.laneLabel} style={{ width: LABEL }}>
                {lane.label}
              </div>
              <div className={styles.track} style={{ width }}>
                {years.map((y) => (
                  <div key={y} className={styles.tick} style={{ left: x(y) }} />
                ))}
                {lane.placed.map(({ entry, left, top, fit }) => {
                  const split = nowSplit(entry, left, fit.width, x(now));
                  return (
                    <EntryTile
                      key={entry.id}
                      entry={entry}
                      titleLines={fit.titleLines}
                      className={`${styles.laneEntry} ${split !== null ? styles.crossesNow : ""}`}
                      style={
                        {
                          // the now line's offset inside the tile
                          "--split": split === null ? undefined : `${split}px`,
                          left,
                          top,
                          width: fit.width,
                          height: fit.height,
                          "--fit": fit.scale,
                        } as CSSProperties
                      }
                      selected={entry.id === selectedId}
                      dimmed={skill !== null && !entry.tech.includes(skill)}
                      onSelect={onSelect}
                    />
                  );
                })}
              </div>
            </div>
          ))}

          <div className={styles.nowLine} style={{ left: LABEL + x(now) }} />
          <div className={styles.nowFlag} style={{ left: LABEL + x(now) + 6 }}>
            Now · {formatDate(today)}
          </div>

          {thread && thread.nodes.length > 0 && (
            <svg
              className={styles.thread}
              width={LABEL + width}
              height={height}
              aria-hidden="true"
            >
              {thread.legs.map((leg, i) => (
                <path
                  key={i}
                  d={legPath(leg)}
                  fill="none"
                  stroke="#010e24"
                  strokeWidth={2}
                  strokeLinejoin="miter"
                />
              ))}
              {thread.nodes.map(([px, py]) => (
                <rect
                  key={`${px},${py}`}
                  x={px - NODE / 2}
                  y={py - NODE / 2}
                  width={NODE}
                  height={NODE}
                  fill="#010e24"
                />
              ))}
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}

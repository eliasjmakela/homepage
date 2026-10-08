/**
 * Sizes a timeline tile so its text always fits. In order of preference:
 * 1. the tile's own width (its duration, or the minimum),
 * 2. the tile stretched a little (up to STRETCH),
 * 3. smaller text (down to MIN_SCALE),
 * 4. the title wrapped onto two balanced lines.
 */

const STRETCH = 1.1;
const MIN_SCALE = 0.8;
const WRAP_SCALE = 0.9;

// Must match .laneEntry and .card in Cv.module.css
const TITLE_PX = 16;
const SPAN_PX = 14.4;
const LINE = 1.3;
const PAD_X = 22 + 2; // padding + borders
const PAD_Y = 16 + 2;
const GAP = 2;
const SAFETY = 4;

export type TileFit = {
  width: number;
  height: number;
  scale: number;
  titleLines: string[];
};

let ctx: CanvasRenderingContext2D | null = null;

function family(): string {
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue("--font-family")
    .trim();
  return v || '"IBM Plex Sans", sans-serif';
}

function measure(text: string, font: string): number {
  ctx ??= document.createElement("canvas").getContext("2d");
  if (!ctx) return text.length * 9; // no canvas: a rough guess
  ctx.font = font;
  return ctx.measureText(text).width;
}

export function fitTile(
  title: string,
  span: string,
  baseWidth: number,
): TileFit {
  const f = family();
  const titleW = (s: number, t = title) =>
    measure(t, `700 ${TITLE_PX * s}px ${f}`);
  const spanW = (s: number) => measure(span, `italic 400 ${SPAN_PX * s}px ${f}`);
  const chrome = PAD_X + SAFETY;
  const need = (s: number, tw: number) =>
    Math.ceil(Math.max(tw, spanW(s)) + chrome);
  const height = (s: number, lines: number) =>
    Math.ceil(PAD_Y + lines * TITLE_PX * s * LINE + GAP + SPAN_PX * s * LINE);

  const room = baseWidth * STRETCH;

  const full = need(1, titleW(1));
  if (full <= room) {
    return {
      width: Math.max(baseWidth, full),
      height: height(1, 1),
      scale: 1,
      titleLines: [title],
    };
  }

  // Text width scales linearly with font size
  const scale = (room - chrome) / (full - chrome);
  if (scale >= MIN_SCALE) {
    return {
      width: Math.max(baseWidth, need(scale, titleW(scale))),
      height: height(scale, 1),
      scale,
      titleLines: [title],
    };
  }

  const words = title.split(" ");
  if (words.length < 2) {
    return {
      width: Math.max(baseWidth, need(MIN_SCALE, titleW(MIN_SCALE))),
      height: height(MIN_SCALE, 1),
      scale: MIN_SCALE,
      titleLines: [title],
    };
  }

  // Split where the longer of the two lines is shortest
  let best = { w: Infinity, lines: [title] };
  for (let i = 1; i < words.length; i++) {
    const lines = [words.slice(0, i).join(" "), words.slice(i).join(" ")];
    const w = Math.max(...lines.map((l) => titleW(WRAP_SCALE, l)));
    if (w < best.w) best = { w, lines };
  }
  return {
    width: Math.max(baseWidth, need(WRAP_SCALE, best.w)),
    height: height(WRAP_SCALE, 2),
    scale: WRAP_SCALE,
    titleLines: best.lines,
  };
}

import cv from "../content/cv.json";
import { projects } from "./projects";

export type Kind = "work" | "study" | "project";

export const KIND_LABEL: Record<Kind, string> = {
  work: "Work",
  study: "Study",
  project: "Project",
};

type RawEntry = {
  kind: Kind;
  project?: string;
  title?: string;
  org?: string;
  start?: string;
  end?: string | null;
  planned?: boolean;
  tech?: string[];
  desc?: string;
};

export type CvEntry = {
  id: string;
  kind: Kind;
  title: string;
  org: string;
  /** Fractional years, e.g. 2021.5 is July 2021. */
  start: number;
  /** Exclusive: the start of the month after the last one. null means ongoing. */
  end: number | null;
  planned: boolean;
  tech: string[];
  desc: string;
  link?: string;
  /** This entry's page under /projects */
  projectSlug?: string;
};

/** "2021-09" -> 2021.667 */
function toYear(s: string): number {
  const [y, m = "1"] = s.split("-");
  return Number(y) + (Number(m) - 1) / 12;
}

/** An end month counts in full: "2026-08" -> 2026.667, the start of September */
function toEnd(s: string): number {
  return toYear(s) + 1 / 12;
}

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}


function resolve(raw: RawEntry): CvEntry {
  if (raw.project) {
    const p = projects.find((p) => p.name === raw.project);
    if (!p) throw new Error(`cv.json: unknown project "${raw.project}"`);
    const end = raw.end === undefined ? p.end : raw.end;
    return {
      id: p.slug,
      kind: "project",
      title: raw.title ?? p.name,
      org: raw.org ?? "Personal project",
      start: toYear(raw.start ?? p.start),
      end: end === null ? null : toEnd(end),
      planned: raw.planned ?? false,
      tech: raw.tech ?? p.tech,
      desc: raw.desc ?? p.summary,
      link: p.repo,
      projectSlug: p.slug,
    };
  }
  if (!raw.title || !raw.start) {
    throw new Error("cv.json: entries need a title and a start");
  }
  return {
    id: slug(`${raw.title}-${raw.start}`),
    kind: raw.kind,
    title: raw.title,
    org: raw.org ?? "",
    start: toYear(raw.start),
    end: raw.end ? toEnd(raw.end) : null,
    planned: raw.planned ?? false,
    tech: raw.tech ?? [],
    desc: raw.desc ?? "",
  };
}

export const entries: CvEntry[] = (cv.entries as RawEntry[])
  .map(resolve)
  .sort((a, b) => a.start - b.start);

export const skills: string[] = [...new Set(entries.flatMap((e) => e.tech))];

/** Today as a fractional year. */
export function yearNow(d = new Date()): number {
  const y = d.getFullYear();
  const start = new Date(y, 0, 1).getTime();
  const end = new Date(y + 1, 0, 1).getTime();
  return y + (d.getTime() - start) / (end - start);
}

/** Finnish order, no leading zeros: 27.9.2026 */
export function formatDate(d: Date): string {
  return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
}

type Span = Pick<CvEntry, "start" | "end" | "planned">;

/** A project's span, from the "YYYY-MM" dates in its frontmatter */
export function projectSpan(p: { start: string; end: string | null }): Span {
  return {
    start: toYear(p.start),
    end: p.end === null ? null : toEnd(p.end),
    planned: false,
  };
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** Entries this short show their months, not just years */
const SHORT = 0.5;

/** A fractional year as whole months since year 0, immune to float drift */
function months(t: number): number {
  return Math.round(t * 12);
}

export function formatSpan(e: Span): string {
  const from = months(e.start);
  const firstYear = Math.floor(from / 12);
  if (e.planned) return `from ${firstYear}`;
  if (e.end === null) return `${firstYear}–`;
  const to = months(e.end) - 1; // the last month, end being exclusive
  const lastYear = Math.floor(to / 12);
  if (to - from + 1 > SHORT * 12) {
    return firstYear === lastYear ? `${firstYear}` : `${firstYear}–${lastYear}`;
  }
  const fromMonth = MONTHS[from % 12];
  const toMonth = MONTHS[to % 12];
  if (from === to) return `${fromMonth} ${firstYear}`;
  if (firstYear === lastYear) return `${fromMonth}–${toMonth} ${firstYear}`;
  return `${fromMonth} ${firstYear}–${toMonth} ${lastYear}`;
}

export function status(e: CvEntry): string | null {
  if (e.planned) return "Planned";
  if (e.end === null) return "Ongoing";
  return null;
}

import { lazy, type ComponentType } from "react";
import type { MDXComponents } from "mdx/types";

/** Frontmatter of a src/content/projects/*.mdx file */
interface ProjectFrontmatter {
  name: string;
  /** "YYYY-MM" */
  start: string;
  /** "YYYY-MM", or null while ongoing */
  end: string | null;
  /** Stopped before it was finished */
  paused?: boolean;
  /** Leads the landing page's project cards */
  featured?: boolean;
  /** Screenshot filename in src/assets/ */
  img?: string;
  img_alt?: string;
  repo?: string;
  tech: string[];
  summary: string;
}

type WriteUp = ComponentType<{ components?: MDXComponents }>;

export interface Project extends Omit<ProjectFrontmatter, "img"> {
  /** The file's name, used in /projects/:slug and as its CV entry's id */
  slug: string;
  /** Resolved screenshot URL */
  img?: string;
  status: "Ongoing" | "Set aside" | "Finished";
}

// "?frontmatter" loads only the YAML block (see vite.config.ts), so the
// write-ups stay out of the main bundle until their page opens
const frontmatters = import.meta.glob<ProjectFrontmatter>(
  "../content/projects/*.mdx",
  { eager: true, query: "?frontmatter", import: "default" },
);
const bodies = import.meta.glob<{ default: WriteUp }>(
  "../content/projects/*.mdx",
);
const images = import.meta.glob<string>("../assets/*.png", {
  eager: true,
  import: "default",
});

/** Every screenshot is 1920×1080; given up front, the page doesn't jump when
 *  one loads */
export const SHOT_WIDTH = 1920;
export const SHOT_HEIGHT = 1080;

function slugFromPath(path: string): string {
  return path
    .replace("../content/projects/", "")
    .replace(/\.mdx(\?frontmatter)?$/, "");
}

/** Newest first */
export const projects: Project[] = Object.entries(frontmatters)
  .map(([path, fm]) => ({
    ...fm,
    slug: slugFromPath(path),
    img: fm.img ? images[`../assets/${fm.img}`] : undefined,
    status:
      fm.end === null
        ? ("Ongoing" as const)
        : fm.paused
          ? ("Set aside" as const)
          : ("Finished" as const),
  }))
  .sort((a, b) => (a.start < b.start ? 1 : -1));

// Built once at module scope so each write-up keeps a stable identity
export const writeUps: Record<string, WriteUp> = Object.fromEntries(
  Object.entries(bodies).map(([path, load]) => [
    slugFromPath(path),
    lazy(load),
  ]),
);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

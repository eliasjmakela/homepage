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

const frontmatters = import.meta.glob<ProjectFrontmatter>(
  "../content/projects/*.mdx",
  { eager: true, import: "frontmatter" },
);
const bodies = import.meta.glob<{ default: WriteUp }>(
  "../content/projects/*.mdx",
);
const images = import.meta.glob<string>("../assets/*.png", {
  eager: true,
  import: "default",
});

function slugFromPath(path: string): string {
  return path.replace("../content/projects/", "").replace(/\.mdx$/, "");
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

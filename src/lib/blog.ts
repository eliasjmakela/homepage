import { lazy, type ComponentType } from "react";
import type { MDXComponents } from "mdx/types";
import type { Frontmatter } from "./frontmatter";

interface BlogModule {
  default: ComponentType<{ components?: MDXComponents }>;
}

const postGlob = import.meta.glob<BlogModule>("../content/blog/*.mdx");
// Only the YAML block, so the posts load with their own page (see vite.config.ts)
const frontmatterGlob = import.meta.glob<Frontmatter>("../content/blog/*.mdx", {
  eager: true,
  query: "?frontmatter",
  import: "default",
});

function slugFromPath(path: string): string {
  return path
    .replace("../content/blog/", "")
    .replace(/\.mdx(\?frontmatter)?$/, "");
}

export interface PostSummary extends Frontmatter {
  slug: string;
}

export const postSummaries: PostSummary[] = Object.entries(frontmatterGlob)
  .map(([path, fm]) => ({ slug: slugFromPath(path), ...fm }))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPostSummary(slug: string): PostSummary | undefined {
  return postSummaries.find((post) => post.slug === slug);
}

// Built once at module scope, so each post's lazy component keeps a stable
// identity across renders instead of being re-created per navigation.
export const lazyPosts: Record<
  string,
  ComponentType<{ components?: MDXComponents }>
> = Object.fromEntries(
  Object.entries(postGlob).map(([path, importPost]) => [
    slugFromPath(path),
    lazy(() => importPost()),
  ]),
);

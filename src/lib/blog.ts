import { lazy, type ComponentType } from "react";
import type { MDXComponents } from "mdx/types";
import type { Frontmatter } from "./frontmatter";

interface BlogModule {
  default: ComponentType<{ components?: MDXComponents }>;
  frontmatter: Frontmatter;
}

const postGlob = import.meta.glob<BlogModule>("../content/blog/*.mdx");
const postGlobEager = import.meta.glob<BlogModule>("../content/blog/*.mdx", {
  eager: true,
});

function slugFromPath(path: string): string {
  return path.replace("../content/blog/", "").replace(/\.mdx$/, "");
}

export interface PostSummary extends Frontmatter {
  slug: string;
}

export const postSummaries: PostSummary[] = Object.entries(postGlobEager)
  .map(([path, mod]) => ({ slug: slugFromPath(path), ...mod.frontmatter }))
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

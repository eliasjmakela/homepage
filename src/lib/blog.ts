import type { ComponentType } from "react";
import type { MDXComponents } from "mdx/types";
import type { Frontmatter } from "./frontmatter";

interface BlogModule {
  default: ComponentType<{ components?: MDXComponents }>;
}

// Posts are bundled eagerly: each is a few kB, far less than the round trip a
// separate chunk costs when a post opens
const postGlob = import.meta.glob<BlogModule>("../content/blog/*.mdx", {
  eager: true,
});
// The YAML block plus a reading time worked out at build time (see vite.config.ts)
const frontmatterGlob = import.meta.glob<Frontmatter & { readingMinutes: number }>("../content/blog/*.mdx", {
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
  /** Worked out from the word count at build time */
  readingMinutes: number;
  /** The post's place in the archive, oldest first: the first post is No. 1 */
  number: number;
}

export const postSummaries: PostSummary[] = Object.entries(frontmatterGlob)
  .map(([path, fm]) => ({ slug: slugFromPath(path), ...fm }))
  .sort((a, b) => (a.date < b.date ? 1 : -1))
  .map((post, i, all) => ({ ...post, number: all.length - i }));

export function getPostSummary(slug: string): PostSummary | undefined {
  return postSummaries.find((post) => post.slug === slug);
}

export const posts: Record<
  string,
  ComponentType<{ components?: MDXComponents }>
> = Object.fromEntries(
  Object.entries(postGlob).map(([path, mod]) => [slugFromPath(path), mod.default]),
);

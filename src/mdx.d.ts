declare module "*.mdx" {
  import type { MDXComponents } from "mdx/types";
  import type { ComponentType } from "react";
  import type { Frontmatter } from "./lib/frontmatter";

  export const frontmatter: Frontmatter;

  const MDXComponent: ComponentType<{ components?: MDXComponents }>;
  export default MDXComponent;
}

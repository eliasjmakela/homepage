import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  a: (props) => <a className="hover-accent" {...props} />,
};

import type { ReactNode } from "react";
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  a: (props) => <a className="hover-accent" {...props} />,
  // A pull quote: a line from the post repeated on a tile beside the text.
  // Screen readers have already read it in the text, so it's hidden from them
  Pull: ({ children }: { children?: ReactNode }) => (
    <aside className="pull-quote" aria-hidden="true">
      {children}
    </aside>
  ),
};

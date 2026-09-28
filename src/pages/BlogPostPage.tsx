import { Suspense } from "react";
import { Navigate, NavLink, useParams } from "react-router";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import Footer from "../components/Footer";
import Tag from "../components/Tag";
import { mdxComponents } from "../components/mdxComponents";
import { getPostSummary, lazyPosts } from "../lib/blog";
import { formatIsoDate } from "../lib/date";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const summary = slug ? getPostSummary(slug) : undefined;
  const Post = slug ? lazyPosts[slug] : undefined;

  if (!slug || !summary || !Post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="column" id="blog-post-main-container">
      <nav>
        <NavLink className="block-main hover-accent" to="/blog">
          <ArrowLeftIcon weight="light" className="ph-light" />
          Back
        </NavLink>
      </nav>
      <article className="block-main column" id="blog-post">
        <header className="column" id="blog-post-header">
          <h1>{summary.title}</h1>
          <div className="row" id="blog-post-meta">
            <i>
              <time dateTime={summary.date}>
                {formatIsoDate(summary.date)}
              </time>
            </i>
            {summary.tags && summary.tags.length > 0 && (
              <ul className="row blog-tags">
                {summary.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </ul>
            )}
          </div>
        </header>
        <div className="blog-content">
          <Suspense fallback={<p>Loading…</p>}>
            <Post components={mdxComponents} />
          </Suspense>
        </div>
      </article>
      <Footer />
    </div>
  );
}

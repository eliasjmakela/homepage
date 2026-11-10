import { Navigate, NavLink, useParams } from "react-router";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import Footer from "../components/Footer";
import Tag from "../components/Tag";
import { mdxComponents } from "../components/mdxComponents";
import { getPostSummary, posts } from "../lib/blog";
import { formatIsoDate, formatLongIsoDate } from "../lib/date";
import { usePageTitle } from "../lib/usePageTitle";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const summary = slug ? getPostSummary(slug) : undefined;
  const Post = slug ? posts[slug] : undefined;
  usePageTitle(summary?.title);

  if (!slug || !summary || !Post) {
    return <Navigate to="/blog" replace />;
  }

  const tags = summary.tags ?? [];

  return (
    <div className="column" id="blog-post-main-container">
      <nav>
        <NavLink className="block-main hover-accent" to="/blog">
          <ArrowLeftIcon weight="light" className="ph-light" />
          Back
        </NavLink>
      </nav>
      <main className="column" id="blog-post">
        <article className="column">
          {/* The folio: a newspaper's running line, as its own thin tile.
              The first tag is the section, like a kicker */}
          <div className="block-main blog-folio">
            <span className="blog-folio-section">
              <NavLink className="hover-accent" to="/blog">
                Blog
              </NavLink>
              {tags[0] && (
                <>
                  <span aria-hidden="true">›</span>
                  <span>{tags[0]}</span>
                </>
              )}
            </span>
            <span>No. {summary.number}</span>
            <time dateTime={summary.date}>
              <span className="blog-folio-long">
                {formatLongIsoDate(summary.date)}
              </span>
              <span className="blog-folio-short">
                {formatIsoDate(summary.date)}
              </span>
            </time>
            <span>{summary.readingMinutes} min read</span>
          </div>
          <div className="block-main column" id="blog-post-sheet">
            <header className="column" id="blog-post-header">
              <h1>{summary.title}</h1>
              {summary.description && (
                <p className="blog-standfirst">{summary.description}</p>
              )}
            </header>
            <div className="blog-body">
              {tags.length > 0 && (
                <aside className="blog-rail" aria-label="Tags">
                  <span className="blog-rail-label">Under</span>
                  <ul className="blog-tags">
                    {tags.map((tag) => (
                      <Tag key={tag} label={tag} />
                    ))}
                  </ul>
                </aside>
              )}
              <div className="blog-content">
                <Post components={mdxComponents} />
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

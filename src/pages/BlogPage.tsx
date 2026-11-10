import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { NavLink } from "react-router";
import Footer from "../components/Footer";
import { postSummaries } from "../lib/blog";
import { formatIsoDate, formatLongIsoDate } from "../lib/date";
import { usePageTitle } from "../lib/usePageTitle";

export default function BlogPage() {
  usePageTitle("Blog");
  // Newest first: the latest post leads the front page, the rest follow
  const [lead, ...earlier] = postSummaries;

  return (
    <div className="column" id="blog-page-main-container">
      <header className="row">
        <nav>
          <NavLink
            className="block-main hover-accent"
            id="blog-page-backbutton"
            to="/"
          >
            <ArrowLeftIcon weight="light" className="ph-light" />
            Back
          </NavLink>
        </nav>
        <div className="block-main" id="blog-hero">
          <h1 id="blog-page-header">Blog</h1>
        </div>
      </header>

      <main id="blog-index">
        {lead && (
          <div className="block-main column" id="blog-index-sheet">
            <NavLink className="hover-accent blog-lead" to={`/blog/${lead.slug}`}>
              <span className="blog-index-meta">
                No. {lead.number} ·{" "}
                <time dateTime={lead.date}>
                  <span className="blog-folio-long">
                    {formatLongIsoDate(lead.date)}
                  </span>
                  <span className="blog-folio-short">
                    {formatIsoDate(lead.date)}
                  </span>
                </time>{" "}
                · {lead.readingMinutes} min read
              </span>
              <h2 className="blog-lead-title">
                {lead.title}
                <ArrowRightIcon weight="light" className="ph-light" />
              </h2>
              {lead.description && (
                <span className="blog-lead-standfirst">{lead.description}</span>
              )}
            </NavLink>

            {earlier.length > 0 && (
              <section className="blog-earlier" aria-labelledby="blog-earlier-label">
                <h2 id="blog-earlier-label" className="blog-index-label">
                  Earlier
                </h2>
                <ol>
                  {earlier.map((post) => (
                    <li key={post.slug}>
                      <NavLink
                        className="hover-accent blog-row"
                        to={`/blog/${post.slug}`}
                      >
                        <span className="blog-index-meta">No. {post.number}</span>
                        <span className="blog-row-text">
                          <h3 className="blog-row-title">{post.title}</h3>
                          {post.description && (
                            <span className="blog-row-standfirst">
                              {post.description}
                            </span>
                          )}
                        </span>
                        <span className="blog-index-meta">
                          <time dateTime={post.date}>{formatIsoDate(post.date)}</time>{" "}
                          · {post.readingMinutes} min
                        </span>
                      </NavLink>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

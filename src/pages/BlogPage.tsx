import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { NavLink } from "react-router";
import Footer from "../components/Footer";
import Tag from "../components/Tag";
import { postSummaries } from "../lib/blog";
import { formatIsoDate } from "../lib/date";

export default function BlogPage() {
  return (
    <div className="column" id="blog-page-main-container">
      <div className="row">
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
      </div>

      <ol id="blog-list" className="column">
        {postSummaries.map((post) => (
          <li key={post.slug}>
            <NavLink
              className="block-main hover-accent column blog-list-item"
              to={`/blog/${post.slug}`}
            >
              <div className="row title-and-year">
                <h2 className="project-title">{post.title}</h2>
                <i>
                  <time dateTime={post.date}>{formatIsoDate(post.date)}</time>
                </i>
              </div>
              <p className="project-description">{post.description}</p>
              {post.tags && post.tags.length > 0 && (
                <ul className="row blog-tags">
                  {post.tags.map((tag) => (
                    <Tag key={tag} label={tag} />
                  ))}
                </ul>
              )}
              <span className="row blog-read-more">
                Read
                <ArrowRightIcon weight="light" className="ph-light" />
              </span>
            </NavLink>
          </li>
        ))}
      </ol>
      <Footer />
    </div>
  );
}

import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { Suspense } from "react";
import { Navigate, NavLink, useParams } from "react-router";

import Footer from "../components/Footer";
import Tag from "../components/Tag";
import { mdxComponents } from "../components/mdxComponents";
import styles from "../components/projects/Projects.module.css";
import { formatSpan, projectSpan } from "../lib/cv";
import { getProject, writeUps } from "../lib/projects";
import { TECH } from "../lib/tech";

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : undefined;
  const WriteUp = slug ? writeUps[slug] : undefined;

  if (!project || !WriteUp) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="column" id="project-page-main-container">
      <div className="row">
        <nav>
          <NavLink
            className="block-main hover-accent"
            to="/projects"
          >
            <ArrowLeftIcon weight="light" className="ph-light" />
            Projects
          </NavLink>
        </nav>
        <div className="block-main">
          <h1>{project.name}</h1>
        </div>
      </div>

      <div className={`row ${styles.top}`}>
        {project.img && (
          <div className={`block-main ${styles.shot}`}>
            <img src={project.img} alt={project.img_alt ?? ""} />
          </div>
        )}
        <section
          className={[
            "block-main",
            styles.facts,
            project.status === "Ongoing" && styles.ongoing,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <p>{project.summary}</p>
          <div className={styles.meta}>
            <i>{formatSpan(projectSpan(project))}</i>
            <span className="tag">{project.status}</span>
          </div>
          <ul className="row">
            {project.tech.map((key) => (
              <Tag
                key={key}
                label={TECH[key]?.label ?? key}
                icon={TECH[key]?.icon}
              />
            ))}
          </ul>
          <div className={styles.links}>
            {project.repo && (
              <a className="hover-accent" href={project.repo}>
                GitHub
                <ArrowRightIcon weight="light" className="ph-light" />
              </a>
            )}
            <NavLink className="hover-accent" to={`/cv#${project.slug}`}>
              On the CV
              <ArrowRightIcon weight="light" className="ph-light" />
            </NavLink>
          </div>
        </section>
      </div>

      <article className={`block-main blog-content ${styles.writeUp}`}>
        <Suspense fallback={<p>Loading…</p>}>
          <WriteUp components={mdxComponents} />
        </Suspense>
      </article>
      <Footer />
    </div>
  );
}

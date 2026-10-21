import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { Suspense } from "react";
import { Navigate, NavLink, useParams } from "react-router";

import Footer from "../components/Footer";
import ProjectWhen from "../components/ProjectWhen";
import Tag from "../components/Tag";
import { mdxComponents } from "../components/mdxComponents";
import styles from "../components/projects/Projects.module.css";
import { getProject, SHOT_HEIGHT, SHOT_WIDTH, writeUps } from "../lib/projects";
import { TECH } from "../lib/tech";
import { usePageTitle } from "../lib/usePageTitle";

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : undefined;
  const WriteUp = slug ? writeUps[slug] : undefined;
  usePageTitle(project?.name);

  if (!project || !WriteUp) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="column" id="project-page-main-container">
      <div className="row">
        <nav>
          <NavLink
            className={`block-main hover-accent ${styles.back}`}
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

      <main className="column">
        <div className={`row ${styles.top}`}>
          {project.img && (
            <div className={`block-main ${styles.shot}`}>
              <img
                src={project.img}
                alt={project.img_alt ?? ""}
                width={SHOT_WIDTH}
                height={SHOT_HEIGHT}
              />
            </div>
          )}
          <section className={`block-main ${styles.facts}`}>
            <p>{project.summary}</p>
            <p className={styles.meta}>
              <ProjectWhen project={project} />
            </p>
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
      </main>
      <Footer />
    </div>
  );
}

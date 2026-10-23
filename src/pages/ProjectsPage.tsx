import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { NavLink } from "react-router";

import Footer from "../components/Footer";
import ProjectWhen from "../components/ProjectWhen";
import styles from "../components/projects/Projects.module.css";
import { projects, SHOT_HEIGHT, SHOT_WIDTH } from "../lib/projects";
import { usePageTitle } from "../lib/usePageTitle";

export default function ProjectsPage() {
  usePageTitle("Projects");
  return (
    <div className="column" id="project-page-main-container">
      <div className="row">
        <nav>
          <NavLink className={`block-main hover-accent ${styles.back}`} to="/">
            <ArrowLeftIcon weight="light" className="ph-light" />
            Back
          </NavLink>
        </nav>
        <div className="block-main">
          <h1>Projects</h1>
        </div>
      </div>

      <main className={styles.grid}>
        {projects.map((p, i) => (
          <NavLink
            key={p.slug}
            to={`/projects/${p.slug}`}
            className={`block-main hover-accent ${styles.tile}`}
          >
            {p.img ? (
              <img
                src={p.img}
                alt={p.img_alt ?? ""}
                width={SHOT_WIDTH}
                height={SHOT_HEIGHT}
                // the first is on screen straight away, even on a phone
                loading={i === 0 ? undefined : "lazy"}
              />
            ) : (
              <span className={styles.noShot} aria-hidden="true" />
            )}
            <span className={styles.tileName}>
              {p.name}
              <ArrowRightIcon weight="light" className="ph-light" />
            </span>
            <span className={styles.tileSummary}>{p.summary}</span>
            <span className={styles.meta}>
              <ProjectWhen project={p} />
            </span>
          </NavLink>
        ))}
      </main>
      <Footer />
    </div>
  );
}

import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { NavLink } from "react-router";

import Footer from "../components/Footer";
import styles from "../components/projects/Projects.module.css";
import { formatSpan, projectSpan } from "../lib/cv";
import { projects } from "../lib/projects";

export default function ProjectsPage() {
  return (
    <div className="column" id="project-page-main-container">
      <div className="row">
        <nav>
          <NavLink
            className="block-main hover-accent"
            to="/"
          >
            <ArrowLeftIcon weight="light" className="ph-light" />
            Back
          </NavLink>
        </nav>
        <div className="block-main">
          <h1>Projects</h1>
        </div>
      </div>

      <div className={styles.grid}>
        {projects.map((p) => (
          <NavLink
            key={p.slug}
            to={`/projects/${p.slug}`}
            className={[
              "block-main hover-accent",
              styles.tile,
              !p.img && styles.noImage,
              p.status === "Ongoing" && styles.ongoing,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {p.img && <img src={p.img} alt={p.img_alt ?? ""} />}
            <span className={styles.tileName}>
              {p.name}
              <ArrowRightIcon weight="light" className="ph-light" />
            </span>
            <span className={styles.tileSummary}>{p.summary}</span>
            <span className={styles.meta}>
              <i>{formatSpan(projectSpan(p))}</i>
              {p.status !== "Finished" && <span>· {p.status}</span>}
            </span>
          </NavLink>
        ))}
      </div>
      <Footer />
    </div>
  );
}

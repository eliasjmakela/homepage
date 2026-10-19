import { ArrowRightIcon, AsteriskIcon } from "@phosphor-icons/react";
import lechat from "../assets/lechat.png";
import { NavLink } from "react-router";
import Footer from "../components/Footer";
import styles from "../components/landing/Landing.module.css";
import now from "../content/now.json";
import { formatSpan, projectSpan } from "../lib/cv";
import { formatIsoDate } from "../lib/date";
import { projects, type Project } from "../lib/projects";
import { techLabel } from "../lib/tech";

/** The featured project leads with its screenshot; the rest, newest first, are text rows */
const lead =
  projects.find((p) => p.featured && p.img) ?? projects.find((p) => p.img);
const others = projects.filter((p) => p !== lead);

/** One plain line: the tech, when it ran and, unless it's finished, where it's at */
function ProjectMeta({ project }: { project: Project }) {
  const finished = project.status === "Finished";
  // "2026–" already means ongoing; with the status beside it, drop the dash
  const span = formatSpan(projectSpan(project)).replace(/–$/, "");
  return (
    <span className={styles.cardMeta}>
      {project.tech.map(techLabel).join(", ")} · <i>{span}</i>
      {!finished && ` · ${project.status}`}
    </span>
  );
}

export default function LandingPage() {
  return (
    <div id="main-container-desktop" className="main-container">
      <header>
        <div className="block-main" id="hero">
          <h1>
            Elias <br />
            Mäkelä
          </h1>
        </div>
        <nav>
          <NavLink className="block-main hover-accent" to="/projects">
            Projects
            <ArrowRightIcon weight="light" className="ph-light" />
          </NavLink>
          <NavLink className="block-main hover-accent" to="/blog">
            Blog
            <ArrowRightIcon weight="light" className="ph-light" />
          </NavLink>
          <NavLink className="block-main hover-accent" to="/cv">
            CV
            <ArrowRightIcon weight="light" className="ph-light" />
          </NavLink>
        </nav>
      </header>
      <main className="column">
        <div id="headline-row" className="row">
          <section id="headline" className="block-main">
            <h2>Developer and student.</h2>
          </section>
          <div className="block-main" id="cat-greeter">
            <img
              alt="A cat wearing a beret with a baguette in its paw"
              src={lechat}
            />
          </div>
        </div>
        <div id="body-row" className="row">
          <div className="column">
            <section id="intro" className="block-main">
              <p>
                Hi there! I'm Elias. I've always been fascinated by how
                computers work under the hood, and the best way I know to find
                out is to build one. I wrote my first emulator at 15, and I've
                been taking things apart to see how they tick ever since.
              </p>
            </section>

            {now.items.length > 0 && (
              <section id="now-block" className="block-main column">
                <h2 className="tile-label">Right now</h2>
                <ul id="now-list">
                  {now.items.map((item) => (
                    <li key={item} className="now-item">
                      <AsteriskIcon weight="light" className="ph-light" />
                      {item}
                    </li>
                  ))}
                </ul>
                <i>Last updated: {formatIsoDate(now.updatedAt)}</i>
              </section>
            )}
          </div>

          <section id="projects" className="block-main column">
            <h2 className="tile-label">Projects</h2>
            {lead && (
              <NavLink
                className={`hover-accent ${styles.card} ${styles.lead}`}
                to={`/projects/${lead.slug}`}
              >
                <img alt={lead.img_alt ?? ""} src={lead.img} />
                <span className={styles.cardText}>
                  <span className={styles.cardName}>
                    {lead.name}
                    <ArrowRightIcon weight="light" className="ph-light" />
                  </span>
                  <span className={styles.cardSummary}>{lead.summary}</span>
                  <ProjectMeta project={lead} />
                </span>
              </NavLink>
            )}
            <ol className={styles.rows}>
              {others.map((p) => (
                <li key={p.slug}>
                  <NavLink
                    className={[
                      "hover-accent",
                      styles.card,
                      styles.row,
                      p.status === "Ongoing" && styles.ongoing,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    to={`/projects/${p.slug}`}
                  >
                    <span className={styles.cardName}>
                      {p.name}
                      <ArrowRightIcon weight="light" className="ph-light" />
                    </span>
                    <span className={styles.cardSummary}>{p.summary}</span>
                    <ProjectMeta project={p} />
                  </NavLink>
                </li>
              ))}
            </ol>
            <NavLink className="hover-accent" id="all-projects" to="/projects">
              To the projects page
              <ArrowRightIcon weight="light" className="ph-light" />
            </NavLink>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

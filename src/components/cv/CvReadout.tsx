import { ArrowRightIcon, AsteriskIcon } from "@phosphor-icons/react";
import { NavLink } from "react-router";
import Tag from "../Tag";
import now from "../../content/now.json";
import {
  formatSpan,
  KIND_LABEL,
  status,
  type CvEntry,
} from "../../lib/cv";
import { formatIsoDate } from "../../lib/date";
import { TECH } from "../../lib/tech";
import styles from "./Cv.module.css";

/** Details for the selected entry, or the "Right now" list for the Now square. */
export default function CvReadout({
  entry,
}: {
  entry: CvEntry | "now" | null;
}) {
  if (entry === null) {
    return (
      <section className={`block-main ${styles.readout}`} aria-live="polite">
        <p>
          <i>Pick an entry on the timeline to see its details here.</i>
        </p>
      </section>
    );
  }

  if (entry === "now") {
    return (
      <section className={`block-main ${styles.readout}`} aria-live="polite">
        <h2>Right now</h2>
        <ul>
          {now.items.map((item) => (
            <li key={item} className="now-item">
              <AsteriskIcon weight="light" className="ph-light" />
              {item}
            </li>
          ))}
        </ul>
        <i>Last updated: {formatIsoDate(now.updatedAt)}</i>
      </section>
    );
  }

  const state = status(entry);
  return (
    <section className={`block-main ${styles.readout}`} aria-live="polite">
      <h2>{entry.title}</h2>
      <div className={styles.readoutMeta}>
        {entry.org && <span>{entry.org}</span>}
        <i>{formatSpan(entry)}</i>
        <span className="tag">
          {KIND_LABEL[entry.kind]}
          {state && ` · ${state}`}
        </span>
      </div>
      {entry.desc && <p>{entry.desc}</p>}
      {entry.tech.length > 0 && (
        <ul className={`row ${styles.readoutTags}`}>
          {entry.tech.map((key) => (
            <Tag
              key={key}
              label={TECH[key]?.label ?? key}
              icon={TECH[key]?.icon}
            />
          ))}
        </ul>
      )}
      {(entry.link || entry.projectSlug) && (
        <div className={styles.readoutLinks}>
          {entry.projectSlug && (
            <NavLink
              className={`hover-accent ${styles.readoutLink}`}
              to={`/projects/${entry.projectSlug}`}
            >
              Project page
              <ArrowRightIcon weight="light" className="ph-light" />
            </NavLink>
          )}
          {entry.link && (
            <a
              className={`hover-accent ${styles.readoutLink}`}
              href={entry.link}
            >
              GitHub
              <ArrowRightIcon weight="light" className="ph-light" />
            </a>
          )}
        </div>
      )}
    </section>
  );
}

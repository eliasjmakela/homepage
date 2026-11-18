import { Fragment } from "react";
import lechat from "../../assets/lechat.png";
import { formatDate, type CvEntry } from "../../lib/cv";
import EntryTile from "./EntryTile";
import styles from "./Cv.module.css";

export const NOW_ID = "now";

/** Phone layout: the career as one track, oldest first, ending on "Now". */
export default function CvPath({
  entries,
  today,
  skill,
  selectedId,
  onSelect,
}: {
  entries: CvEntry[];
  today: Date;
  skill: string | null;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const past = entries.filter((e) => !e.planned);
  const planned = entries.filter((e) => e.planned);
  const nowSelected = selectedId === NOW_ID;

  const tile = (entry: CvEntry) => (
    <EntryTile
      entry={entry}
      showKind
      selected={entry.id === selectedId}
      dimmed={skill !== null && !entry.tech.includes(skill)}
      onSelect={onSelect}
    />
  );

  return (
    <div className={styles.surface}>
      <p className={styles.hint}>Tap a square to move the pawn there.</p>
      <ol className={styles.path}>
        {past.map((entry, i) => (
          <Fragment key={entry.id}>
            {i > 0 && <li aria-hidden="true" className={styles.connector} />}
            <li className="column">{tile(entry)}</li>
          </Fragment>
        ))}
        <li aria-hidden="true" className={styles.connector} />
        <li className="column">
          <button
            type="button"
            className={`${styles.entry} ${styles.nowSquare} ${nowSelected ? styles.selected : ""}`}
            aria-pressed={nowSelected}
            onClick={() => onSelect(NOW_ID)}
          >
            <img
              alt="A cat wearing a beret with a baguette in its paw"
              src={lechat}
            />
            <span className="column">
              <span className={styles.entryTitle}>You are here</span>
              <span className={styles.entrySpan}>{formatDate(today)}</span>
            </span>
          </button>
        </li>
        {planned.map((entry) => (
          <Fragment key={entry.id}>
            <li
              aria-hidden="true"
              className={`${styles.connector} ${styles.future}`}
            />
            <li className="column">{tile(entry)}</li>
          </Fragment>
        ))}
      </ol>
    </div>
  );
}

import { Fragment, type CSSProperties } from "react";
import { formatSpan, KIND_LABEL, type CvEntry } from "../../lib/cv";
import styles from "./Cv.module.css";

/** An entry's true length in px: how much has passed and how much is to come */
export type Rail = {
  past: number;
  future: number;
  /** Ongoing: the future part is an open-ended stub */
  open: boolean;
};

export default function EntryTile({
  entry,
  selected,
  dimmed,
  showKind = false,
  titleLines = [entry.title],
  rail,
  className = "",
  style,
  onSelect,
}: {
  entry: CvEntry;
  selected: boolean;
  dimmed: boolean;
  showKind?: boolean;
  /** Pre-broken title lines, from fitTile */
  titleLines?: string[];
  /** Draw the text in a card above a rail, which then carries the time states */
  rail?: Rail;
  className?: string;
  style?: CSSProperties;
  onSelect: (id: string) => void;
}) {
  const classes = [
    styles.entry,
    !rail && entry.planned && styles.planned,
    !rail && !entry.planned && entry.end === null && styles.ongoing,
    selected && styles.selected,
    dimmed && styles.dim,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const text = (
    <>
      <span className={styles.entryTitle}>
        {titleLines.map((line, i) => (
          <Fragment key={i}>
            {i > 0 && <br />}
            {line}
          </Fragment>
        ))}
      </span>
      <span className={styles.entrySpan}>{formatSpan(entry)}</span>
      {showKind && (
        <span className={styles.kindTag}>{KIND_LABEL[entry.kind]}</span>
      )}
    </>
  );

  return (
    <button
      type="button"
      className={classes}
      style={style}
      aria-pressed={selected}
      data-entry={entry.id}
      onClick={() => onSelect(entry.id)}
    >
      {rail ? (
        <>
          <span className={styles.card}>{text}</span>
          <span className={styles.rail} aria-hidden="true">
            {rail.past > 0 && (
              <span className={styles.railPast} style={{ width: rail.past }} />
            )}
            {rail.future > 0 && (
              <span
                className={`${styles.railFuture} ${rail.open ? styles.railOpen : ""}`}
                style={{ width: rail.future }}
              />
            )}
          </span>
        </>
      ) : (
        text
      )}
    </button>
  );
}

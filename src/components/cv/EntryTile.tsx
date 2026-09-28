import { Fragment, type CSSProperties } from "react";
import { formatSpan, KIND_LABEL, type CvEntry } from "../../lib/cv";
import styles from "./Cv.module.css";

export default function EntryTile({
  entry,
  selected,
  dimmed,
  showKind = false,
  titleLines = [entry.title],
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
  className?: string;
  style?: CSSProperties;
  onSelect: (id: string) => void;
}) {
  const classes = [
    styles.entry,
    entry.planned && styles.planned,
    !entry.planned && entry.end === null && styles.ongoing,
    selected && styles.selected,
    dimmed && styles.dim,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={classes}
      style={style}
      aria-pressed={selected}
      data-entry={entry.id}
      onClick={() => onSelect(entry.id)}
    >
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
    </button>
  );
}

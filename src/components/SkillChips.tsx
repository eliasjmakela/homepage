import { techLabel } from "../lib/tech";
import styles from "./SkillChips.module.css";

/** Pick one skill, or All (null). Pressing the picked skill again clears it. */
export default function SkillChips({
  skills,
  value,
  onChange,
  label,
}: {
  skills: string[];
  value: string | null;
  onChange: (skill: string | null) => void;
  label: string;
}) {
  return (
    <div className={styles.skills} role="group" aria-label={label}>
      <p>Skills</p>
      <button
        type="button"
        className={styles.chip}
        aria-pressed={value === null}
        onClick={() => onChange(null)}
      >
        All
      </button>
      {skills.map((s) => (
        <button
          key={s}
          type="button"
          className={styles.chip}
          aria-pressed={value === s}
          onClick={() => onChange(value === s ? null : s)}
        >
          {techLabel(s)}
        </button>
      ))}
    </div>
  );
}

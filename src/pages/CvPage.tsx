import { ArrowLeftIcon } from "@phosphor-icons/react";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { NavLink, useLocation } from "react-router";
import Footer from "../components/Footer";
import SkillChips from "../components/SkillChips";
import CvLanes from "../components/cv/CvLanes";
import CvPath, { NOW_ID } from "../components/cv/CvPath";
import CvReadout from "../components/cv/CvReadout";
import { entries, skills, yearNow } from "../lib/cv";

const PHONE = "(max-width: 700px)";

function useIsPhone(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = matchMedia(PHONE);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => matchMedia(PHONE).matches,
    () => false,
  );
}

/** The latest entry that has started: what the page opens on. */
function latestId(): string | null {
  const started = entries.filter((e) => !e.planned);
  return started.at(-1)?.id ?? null;
}

export default function CvPage() {
  const isPhone = useIsPhone();
  const today = useMemo(() => new Date(), []);
  const now = yearNow(today);

  // /cv#chip26 opens with that entry selected
  const { hash } = useLocation();
  const linked = entries.find(
    (e) => e.id === decodeURIComponent(hash.slice(1)),
  );

  const [skill, setSkill] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(
    () => linked?.id ?? latestId(),
  );

  // Runs after the lanes have scrolled to the present, so this wins
  useEffect(() => {
    if (!linked) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.querySelector(`[data-entry="${linked.id}"]`)?.scrollIntoView({
      block: "center",
      inline: "center",
      behavior: reduce ? "auto" : "smooth",
    });
  }, [linked]);

  const selected =
    selectedId === NOW_ID
      ? "now"
      : entries.find((e) => e.id === selectedId) ?? null;

  // An entry is never faded and selected at once. Picking a skill the
  // selected entry doesn't use deselects it...
  const chooseSkill = (next: string | null) => {
    const entry = entries.find((e) => e.id === selectedId);
    if (next && entry && !entry.tech.includes(next)) setSelectedId(null);
    setSkill(next);
  };

  // ...and picking an entry the current skill faded out drops back to all skills
  const select = (id: string) => {
    const entry = entries.find((e) => e.id === id);
    if (skill && entry && !entry.tech.includes(skill)) setSkill(null);
    setSelectedId(id);
  };

  return (
    <div className="column" id="cv-page-main-container">
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
          <h1>CV</h1>
        </div>
      </div>

      <section className="block-main">
        <p className="project-description">
          Where I've worked, studied and built things, from the start up to
          today. Pick a skill to trace everywhere I've used it.
        </p>
        <SkillChips
          skills={skills}
          value={skill}
          onChange={chooseSkill}
          label="Trace a skill"
        />
      </section>

      {isPhone ? (
        <CvPath
          entries={entries}
          today={today}
          skill={skill}
          selectedId={selectedId}
          onSelect={select}
        />
      ) : (
        <CvLanes
          entries={entries}
          now={now}
          today={today}
          skill={skill}
          selectedId={selectedId}
          onSelect={select}
        />
      )}

      <CvReadout entry={selected} />
      <Footer />
    </div>
  );
}

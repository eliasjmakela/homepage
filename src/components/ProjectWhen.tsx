import { formatSpan, projectSpan } from "../lib/cv";
import type { Project } from "../lib/projects";

/** When it ran and, unless it's finished, where it's at: "2026 · Ongoing" */
export default function ProjectWhen({ project }: { project: Project }) {
  // "2026–" already means ongoing; with the status beside it, drop the dash
  const span = formatSpan(projectSpan(project)).replace(/–$/, "");
  return (
    <>
      <i>{span}</i>
      {project.status !== "Finished" && ` · ${project.status}`}
    </>
  );
}

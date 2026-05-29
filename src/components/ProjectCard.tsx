import { ArrowRightIcon, type Icon } from "@phosphor-icons/react";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({
  icons,
  img,
  img_alt,
  name,
  desc,
  timerange,
  project_link,
  variant = "default",
}: {
  icons: Icon[];
  img: string;
  img_alt: string;
  name: string;
  desc: string;
  timerange: string;
  project_link: string;
  variant?: "default" | "large";
}) {
  return (
    <div className={`block-main ${styles[variant]}`}>
      <img alt={img_alt} className="project-image" src={img} />

      <div className="column project-block">
        <div className="row title-and-year">
          <h2 className="project-title">{name}</h2>
          <i>{timerange}</i>
        </div>
        <p>{desc}</p>

        <div className="row project-info">
          {icons.map((Icon, i) => (
            <Icon key={i} weight="light" className="ph-light" />
          ))}
        </div>
        <a className="gh-link hover-accent" href={project_link}>
          GitHub
          <ArrowRightIcon weight="light" className="ph-light" />
        </a>
      </div>
    </div>
  );
}

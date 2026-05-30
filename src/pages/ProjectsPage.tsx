import {
  ArrowLeftIcon,
  ArrowRightIcon,
  FileCSharpIcon,
  AtomIcon,
  FileTsxIcon,
  FileRsIcon,
} from "@phosphor-icons/react";

import chat26 from "../assets/chat26.png";
import intel26 from "../assets/intel26.png";
import chip26 from "../assets/chip26.png";
import Footer from "../components/Footer";
import { NavLink } from "react-router";
import ProjectCard from "../components/ProjectCard";

export default function ProjectsPage() {
  return (
    <>
      <div className="column" id="project-page-main-container">
        <div className="row">
          <nav>
            <NavLink
              className="block-main hover-accent"
              id="projects-page-backbutton"
              to="/"
            >
              <ArrowLeftIcon weight="light" className="ph-light" />
              Takaisin
            </NavLink>
          </nav>
          <div className="block-main" id="projects-hero">
            <h1 id="project-page-header">Projektit</h1>
          </div>
        </div>

        <ProjectCard
          icons={[FileCSharpIcon]}
          name="Chip26"
          timerange="2021"
          img={chip26}
          variant="large"
          img_alt="Kuva Chip26-emulaattorista"
          project_link="https://github.com/eliasjmakela/chip26"
          desc="Emulaattori CHIP-8:lle, joka on 1970-luvulla julkaistu virtuaalinen tietokone.
        Toteutettu C#:lla ja MonoGamella. Lukee CHIP-8:lle käännettyä ohjelmakoodia ja
        toteuttaa sen reaaliajassa, mahdollistaen vanhojen CHIP-8:lle käännettyjen ohjelmien
        suorittamisen. "
        />

        <div className="row" id="small-project-row">
          <ProjectCard
            icons={[FileCSharpIcon]}
            name="Intel26"
            timerange="2021"
            img={intel26}
            variant="default"
            img_alt="Kuva Intel 8080 -mikroprosessorista"
            project_link="https://github.com/eliasjmakela/intel26"
            desc="Vuonna 2021 aloitettu, tosin sittemmin töiden takia sivummalle
            jäänyt emulaattori Intel 8080 -mikroprosessorille. Toteutettu C#:lla
            ja .NETilla. Tulevaisuuden tavoite on toteuttaa prosessori ja kaikki
            tarvittavat oheiskomponentit alkuperäisen Space Invaders-kabinetin
            pyörittämiseen."
          />
          {/*         <div className="column block-main project-block small">
          <img
            alt="Kuva Intel 8080 -mikroprosessorista"
            className="project-image"
            src={intel26}
          />

          <div className="row title-and-year">
            <h2 className="project-title">Intel26</h2>
            <i>2021</i>
          </div>

          <p className="project-description">
            Vuonna 2021 aloitettu, tosin sittemmin töiden takia sivummalle
            jäänyt emulaattori Intel 8080 -mikroprosessorille. Toteutettu C#:lla
            ja .NETilla. Tulevaisuuden tavoite on toteuttaa prosessori ja kaikki
            tarvittavat oheiskomponentit alkuperäisen Space Invaders-kabinetin
            pyörittämiseen.
          </p>

          <div className="row project-info">
            <FileCSharpIcon weight="light" className="ph-light" />
          </div>
          <a
            href="https://github.com/eliasjmakela/intel26"
            className="gh-link hover-accent"
          >
            GitHub
            <ArrowRightIcon weight="light" className="ph-light" />
          </a>
        </div> */}
          <div className="column block-main project-block small">
            <img
              alt="Kuva Chat26-sovelluksesta"
              className="project-image"
              src={chat26}
            />
            <div className="row  title-and-year">
              <h2 className="project-title">Chat26</h2>

              <i>2024</i>
            </div>
            <p className="project-description">
              Yksinkertainen chat-sovellus, teknologioina frontissa Next ja
              TypeScript sekä backendin puolella Rust ja WebSocket.
            </p>

            <div className="row project-info">
              <AtomIcon weight="light" className="ph-light" />
              <FileTsxIcon weight="light" className="ph-light" />
              <FileRsIcon weight="light" className="ph-light" />
            </div>
            <a
              className="gh-link hover-accent"
              href="https://github.com/eliasjmakela/chat26"
            >
              GitHub
              <ArrowRightIcon weight="light" className="ph-light" />
            </a>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

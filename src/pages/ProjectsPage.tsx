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
              Back
            </NavLink>
          </nav>
          <div className="block-main" id="projects-hero">
            <h1 id="project-page-header">Projects</h1>
          </div>
        </div>

        <ProjectCard
          icons={[FileCSharpIcon]}
          name="Chip26"
          timerange="2021"
          img={chip26}
          variant="large"
          img_alt="Image of the Chip26 emulator"
          project_link="https://github.com/eliasjmakela/chip26"
          desc="An emulator for CHIP-8, a virtual computer released in the 1970s.
        Built with C# and MonoGame. Reads program code compiled for CHIP-8 and
        executes it in real time, making it possible to run old programs
        compiled for CHIP-8. "
        />

        <div className="row" id="small-project-row">
          <ProjectCard
            icons={[FileCSharpIcon]}
            name="Intel26"
            timerange="2021"
            img={intel26}
            variant="default"
            img_alt="Image of the Intel 8080 microprocessor"
            project_link="https://github.com/eliasjmakela/intel26"
            desc="An emulator for the Intel 8080 microprocessor, started in
            2021 but since set aside due to work. Built with C# and .NET. The
            future goal is to implement the processor and all the peripheral
            components needed to run an original Space Invaders cabinet."
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
              alt="Image of the Chat26 application"
              className="project-image"
              src={chat26}
            />
            <div className="row  title-and-year">
              <h2 className="project-title">Chat26</h2>

              <i>2024</i>
            </div>
            <p className="project-description">
              A simple chat app, built with Next and TypeScript on the
              frontend and Rust and WebSocket on the backend.
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

import { ArrowRightIcon, AsteriskIcon } from "@phosphor-icons/react";
import chat26 from "../assets/chat26.png";
import intel26 from "../assets/intel26.png";
import chip26 from "../assets/chip26.png";
import lechat from "../assets/lechat.png";
import { NavLink } from "react-router";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <>
      <div id="main-container-desktop" className="main-container">
        <header>
          <div className="block-main" id="hero">
            <h1>
              Elias <br /> Mäkelä
            </h1>
          </div>
          <nav>
            <NavLink className="block-main hover-accent" to="/projects">
              Projects
              <ArrowRightIcon weight="light" className="ph-light" />
            </NavLink>
            <NavLink className="block-main hover-accent" to="/blog">
              Blog
              <ArrowRightIcon weight="light" className="ph-light" />
            </NavLink>
            <NavLink className="block-main hover-accent" to="/cv">
              CV
              <ArrowRightIcon weight="light" className="ph-light" />
            </NavLink>
          </nav>
        </header>
        <div className="column">
          <div id="headline-row" className="row">
            <section id="headline" className="block-main">
              <h2>Student and software developer</h2>
            </section>
            <div className="block-main" id="cat-container-mobile">
              <img
                id="catimg-mobile"
                alt="A cat wearing a beret with a baguette in its paw"
                src={lechat}
              />
            </div>
          </div>
          <div className="row">
            <div className="column">
              <section id="loremipsum" className="block-main">
                <p>
                  Hi there! I'm a student at Aalto University and a
                  professional developer since my high school years. This
                  page has info about who I am, what I know, and what I'm up
                  to right now.
                </p>
              </section>

              <section id="now" className="column">
                <div className="block-main">
                  <h2>Right now</h2>
                </div>
                <div id="now-block" className="block-main column">
                  <ul id="now-list">
                    <li className="now-item">
                      <AsteriskIcon weight="light" className="ph-light" />
                      Preparing for Ignite's Demo Day
                    </li>
                    <li className="now-item">
                      <AsteriskIcon weight="light" className="ph-light" />
                      Building a personal assistant bot for Telegram
                    </li>
                    <li className="now-item">
                      <AsteriskIcon weight="light" className="ph-light" />
                      Studying linear algebra
                    </li>
                  </ul>
                  <i>Last updated: 12.8.2026</i>
                </div>
              </section>
            </div>

            <section id="projects">
              <div id="projects-title-block" className="row">
                <div className="block-main" id="cat-container-desktop">
                  <img
                    id="catimg-desktop"
                    alt="A cat wearing a beret with a baguette in its paw"
                    src={lechat}
                  />
                </div>
                <div className="block-main column">
                  <h2> Projects</h2>
                </div>
              </div>
              <div id="projects-content-block" className="block-main">
                <ol id="projects-list">
                  <li>
                    <article>
                      <img
                        alt="Image of the Chip26 emulator"
                        className="project-preview"
                        src={chip26}
                      />

                      <NavLink
                        className="project-button hover-accent light-gradient"
                        to="projects/chip"
                      >
                        Chip26
                        <ArrowRightIcon weight="light" className="ph-light" />
                      </NavLink>
                    </article>
                  </li>
                  <li>
                    <article>
                      <img
                        alt="Image of the Chat26 application"
                        className="project-preview"
                        src={chat26}
                      />
                      <NavLink
                        className="project-button hover-accent"
                        to="projects/chat"
                      >
                        Chat26
                        <ArrowRightIcon weight="light" className="ph-light" />
                      </NavLink>
                    </article>
                  </li>
                  <li>
                    <article>
                      <img
                        alt="Image of the Intel 8080 microprocessor"
                        className="project-preview"
                        src={intel26}
                      />
                      <NavLink
                        className="project-button hover-accent project-preview"
                        to="projects/intel"
                      >
                        Intel26
                        <ArrowRightIcon weight="light" className="ph-light" />
                      </NavLink>
                    </article>
                  </li>
                </ol>
                <NavLink
                  className="hover-accent"
                  id="all-projects"
                  to="/projects"
                >
                  To the projects page
                  <ArrowRightIcon weight="light" className="ph-light" />
                </NavLink>
              </div>
            </section>
            <div></div>
            <div className="column"></div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

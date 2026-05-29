import { ArrowRightIcon, AsteriskIcon } from "@phosphor-icons/react";
import chat26 from "../assets/chat26.png";
import intel26 from "../assets/intel26.png";
import chip26 from "../assets/chip26.png";
import lechat from "../assets/lechat.png";
import { NavLink } from "react-router";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div id="main-container-desktop" className="main-container">
      <header>
        <div className="block-main" id="hero">
          <h1>
            Elias <br /> Mäkelä
          </h1>
        </div>
        <nav>
          <NavLink className="block-main hover-accent" to="/projects">
            Projektit
            <ArrowRightIcon weight="light" className="ph-light" />
          </NavLink>
          <NavLink className="block-main hover-accent" to="/blog">
            Blogi
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
            <h2>Opiskelija ja ohjelmistokehittäjä</h2>
          </section>
          <div className="block-main" id="cat-container-mobile">
            <img
              id="catimg-mobile"
              alt="Kissa, jolla on baretti päässä ja patonki tassussa"
              src={lechat}
            />
          </div>
        </div>
        <div className="row">
          <div className="column">
            <section id="loremipsum" className="block-main">
              <p>
                PREVIEW ENV!! Hei vain! Olen Aalto-yliopiston opiskelija ja
                ammattidevaaja jo lukiovuosilta lähtien. Tältä sivulta löytyy
                tietoa siitä kuka olen, mitä osaan ja mitä puuhailen tällä
                hetkellä.
              </p>
            </section>

            <section id="now" className="column">
              <div className="block-main">
                <h2>Juuri nyt</h2>
              </div>
              <div id="now-block" className="block-main column">
                <ul id="now-list">
                  <li className="now-item">
                    <AsteriskIcon weight="light" className="ph-light" />
                    Valmistaudun Ignite-sprinttiin
                  </li>
                  <li className="now-item">
                    <AsteriskIcon weight="light" className="ph-light" />
                    Luen Aku Ankkaa paljon
                  </li>
                  <li className="now-item">
                    <AsteriskIcon weight="light" className="ph-light" /> Teen
                    tätä tehtävää neljältä aamuyöllä
                  </li>
                </ul>
                <i>Viimeksi päivitetty: 26.5.2026</i>
              </div>
            </section>
          </div>

          <section id="projects">
            <div id="projects-title-block" className="row">
              <div className="block-main" id="cat-container-desktop">
                <img
                  id="catimg-desktop"
                  alt="Kissa, jolla on baretti päässä ja patonki tassussa"
                  src={lechat}
                />
              </div>
              <div className="block-main column">
                <h2> Projektit</h2>
              </div>
            </div>
            <div id="projects-content-block" className="block-main">
              <ol id="projects-list">
                <li>
                  <article>
                    <img
                      alt="Kuva Chip26-emulaattorista"
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
                      alt="Kuva Chat26-sovelluksesta"
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
                      alt="Kuva Intel 8080 -mikroprosessorista"
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
                Projektisivulle
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
  );
}

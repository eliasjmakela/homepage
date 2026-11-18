import { ArrowLeftIcon } from "@phosphor-icons/react";
import { isRouteErrorResponse, NavLink, useRouteError } from "react-router";
import Footer from "../components/Footer";
import { usePageTitle } from "../lib/usePageTitle";

/** Unknown addresses, and anything that breaks while a page renders */
export default function ErrorPage() {
  const error = useRouteError();
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  usePageTitle(notFound ? "Page not found" : "Something broke");

  return (
    <div className="column" id="error-page-main-container">
      <header className="row">
        <nav>
          <NavLink className="block-main hover-accent" to="/">
            <ArrowLeftIcon weight="light" className="ph-light" />
            Home
          </NavLink>
        </nav>
        <div className="block-main">
          <h1>{notFound ? "Oops, page not found!" : "Something broke"}</h1>
        </div>
      </header>
      <main className="block-main">
        <p>
          {notFound
            ? "The pages are still a bit of a work in progress!"
            : "This page hit an error. Reloading might fix it; if not, the home page still works."}
        </p>
      </main>
      <Footer />
    </div>
  );
}

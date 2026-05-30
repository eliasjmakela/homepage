import { createBrowserRouter, Outlet, ScrollRestoration } from "react-router";
import LandingPage from "./pages/LandingPage";
import ProjectsPage from "./pages/ProjectsPage";

export function Root() {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
}

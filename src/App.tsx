import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import { Root } from "./Root";
import LandingPage from "./pages/LandingPage";
import ProjectsPage from "./pages/ProjectsPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: ErrorPage(),
    children: [
      {
        index: true,
        Component: LandingPage,
      },
      {
        path: "projects",
        Component: ProjectsPage,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

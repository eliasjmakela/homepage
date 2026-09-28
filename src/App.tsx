import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import { Root } from "./Root";
import LandingPage from "./pages/LandingPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectPage from "./pages/ProjectPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import CvPage from "./pages/CvPage";
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
      {
        path: "projects/:slug",
        Component: ProjectPage,
      },
      {
        path: "blog",
        Component: BlogPage,
      },
      {
        path: "blog/:slug",
        Component: BlogPostPage,
      },
      {
        path: "cv",
        Component: CvPage,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

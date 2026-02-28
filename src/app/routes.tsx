import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import ServicePage from "./pages/ServicePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/services/:slug",
    Component: ServicePage,
  },
]);

import { createBrowserRouter } from "react-router";
import PublicLayout from "../Layouts/PublicLayout";
import Home from "../Pages/Public/Home";
import Search from "../Pages/Public/Search";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PublicLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/search",
        Component: Search,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        index: true,
        Component: Login,
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },
]);

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import all components
import Home from "./componets/Home";
import About from "./componets/About";
import Login from "./componets/Login";
import Contact from "./componets/Contact";
import Recovery from "./componets/Recovery";
import Reset from "./componets/Reset";
import Register from "./componets/Register";
import Profile from "./componets/Profile";
import OurServices from "./componets/OurService";
import PageNotFound from "./componets/PageNotFound";

import { AuthorizeUser } from "./middleware/auth";

// root routers
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/about",
    element: <About></About>,
  },
  {
    path: "/services",
    element: <OurServices></OurServices>,
  },
  {
    path: "/contact",
    element: <Contact></Contact>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/password-recovery",
    element: (
      <AuthorizeUser>
        <Recovery />
      </AuthorizeUser>
    ),
  },
  {
    path: "/password-reset",
    element: (
      <AuthorizeUser>
        {" "}
        <Reset />{" "}
      </AuthorizeUser>
    ),
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/profile",
    element: (
      <AuthorizeUser>
        {" "}
        <Profile />{" "}
      </AuthorizeUser>
    ),
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);

export default function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

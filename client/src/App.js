import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Routes,
} from "react-router-dom";

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
import Doctor from "./componets/dashboards/doctor/Doctor";
import RegisterUser from "./componets/dashboards/administrator/layouts/RegisterUsers";
import OverviewAdmin from "./componets/dashboards/administrator/layouts/OverviewAdmin";
import ManageUsers from "./componets/dashboards/administrator/layouts/ManageUsers";
import UpdateUser from "./componets/dashboards/administrator/layouts/UpdateUser";

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
    element: <Recovery />,
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
    path: "/admin",
    element: <RegisterUser></RegisterUser>,
  },
  {
    path: "/admin-overview",
    element: <OverviewAdmin></OverviewAdmin>,
  },
  {
    path: "/admin-manage-users",
    element: <ManageUsers></ManageUsers>,
  },
  {
    path: "/admin-update-user/:id",
    element: <UpdateUser></UpdateUser>,
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);

export default function App() {
  // const container = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route>
  //       <Route index element={<Home />} />
  //       <Route path="/about" element={<About />} />
  //       <Route path="/services" element={<OurServices />} />
  //       <Route path="/contact" element={<Contact />} />
  //       <Route path="/login" element={<Login />} />
  //       <Route path="/password-recovery" element={<Recovery />} />
  //       <Route path="/password-reset" element={<Reset />} />
  //       {/* <Route path="/register" element={<Register />} /> */}
  //       <Route path="/profile" element={<Profile />} />
  //       <Route path="/admin" element={<RegisterUser />} />
  //       <Route path="/admin/report" element={<Report />} />
  //       <Route path="/admin/overview" element={<Overview />} />
  //       <Route path="*" element={<PageNotFound />} />
  //     </Route>
  //   )
  // );

  return (
    // <main>
    //   <RouterProvider router={container} />
    // </main>
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

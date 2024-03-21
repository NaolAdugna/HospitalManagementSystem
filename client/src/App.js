import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

// import all components
import Home from "./componets/Home";
import About from "./componets/About";
import Login from "./componets/Login";
import Contact from "./componets/Contact";
import Recovery from "./componets/Recovery";
import UserNameRecovery from "./componets/UserNameRecovery";
import Reset from "./componets/Reset";
import Register from "./componets/Register";
import Profile from "./componets/Profile";
import OurServices from "./componets/OurService";
import PageNotFound from "./componets/PageNotFound";

import {
  AuthorizeUser,
  AdminAuthorize,
  DoctorAuthorize,
  PharmacyAuthorize,
  ReceptionAuthorize,
  LabAuthorize,
} from "./middleware/auth";
import RegisterUser from "./componets/dashboards/administrator/layouts/RegisterUsers";
import OverviewAdmin from "./componets/dashboards/administrator/layouts/OverviewAdmin";
import ManageUsers from "./componets/dashboards/administrator/layouts/ManageUsers";
import UpdateUser from "./componets/dashboards/administrator/layouts/UpdateUser";
import LoginPatient from "./componets/dashboards/LoginPatient";
import LoginUser from "./componets/dashboards/LoginUser";

// dashboards
import LabOverView from "./componets/dashboards/labTechnician/layout/LabOverView";
import PatientOverView from "./componets/dashboards/patient/layout/PatientOverView";
import PharmacyOverView from "./componets/dashboards/pharmacist/layout/PharmacyOverView";
import ReceptionOverView from "./componets/dashboards/reception/layout/ReceptionOverView";
import DoctorOverView from "./componets/dashboards/doctor/Doctor";

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
    path: "/login-user",
    element: <LoginUser></LoginUser>,
  },
  {
    path: "/login-patient",
    element: <LoginPatient></LoginPatient>,
  },
  {
    path: "/password-username",
    element: <UserNameRecovery />,
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
    element: (
      <AuthorizeUser>
        {" "}
        <Register />
      </AuthorizeUser>
    ),
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
    element: (
      <AdminAuthorize>
        {" "}
        <RegisterUser />{" "}
      </AdminAuthorize>
    ),
  },
  {
    path: "/admin-overview",
    element: (
      <AdminAuthorize>
        {" "}
        <OverviewAdmin />
      </AdminAuthorize>
    ),
  },
  {
    path: "/admin-manage-users",
    element: (
      <AdminAuthorize>
        {" "}
        <ManageUsers />
      </AdminAuthorize>
    ),
  },
  {
    path: "/admin-update-user/:id",
    element: (
      <AdminAuthorize>
        {" "}
        <UpdateUser />
      </AdminAuthorize>
    ),
  },
  {
    path: "/doctor",
    element: (
      <DoctorAuthorize>
        {" "}
        <DoctorOverView />
      </DoctorAuthorize>
    ),
  },
  {
    path: "/reception",
    element: (
      <ReceptionAuthorize>
        {" "}
        <ReceptionOverView />
      </ReceptionAuthorize>
    ),
  },
  {
    path: "/patient",
    element: (
      <AuthorizeUser>
        {" "}
        <PatientOverView />
      </AuthorizeUser>
    ),
  },
  {
    path: "/pharmacy",
    element: (
      <PharmacyAuthorize>
        {" "}
        <PharmacyOverView />
      </PharmacyAuthorize>
    ),
  },
  {
    path: "/labratory",
    element: (
      <LabAuthorize>
        {" "}
        <LabOverView />
      </LabAuthorize>
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

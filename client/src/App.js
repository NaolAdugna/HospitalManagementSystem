import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

// import all components
import Home from "./componets/Home";
import About from "./componets/About";
import Login from "./componets/Login";
import Contact from "./componets/Contact";
import Recovery from "./componets/Recovery";
import PatientRecovery from "./componets/PatientRecovery";
import UserNameRecovery from "./componets/UserNameRecovery";
import PatientNameRecovery from "./componets/PatientNameRecovery";
import Reset from "./componets/Reset";
import PatientPasswordReset from "./componets/PatientPasswordReset";
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
  PatientAuthorize,
} from "./middleware/auth";
import RegisterUser from "./componets/dashboards/administrator/layouts/RegisterUsers";
import OverviewAdmin from "./componets/dashboards/administrator/layouts/OverviewAdmin";
import ManageUsers from "./componets/dashboards/administrator/layouts/ManageUsers";
import UpdateUser from "./componets/dashboards/administrator/layouts/UpdateUser";
import DeleteUser from "./componets/dashboards/administrator/layouts/DeleteUser";
import ViewDeletedUsers from "./componets/dashboards/administrator/layouts/ViewDeletedUsers";
import ViewMessages from "./componets/dashboards/administrator/layouts/ViewMessages";
import AdminChat from "./componets/dashboards/administrator/layouts/AdminChat";
import LoginPatient from "./componets/dashboards/LoginPatient";
import LoginUser from "./componets/dashboards/LoginUser";

// dashboards
import LabOverView from "./componets/dashboards/labTechnician/layout/LabOverView";
import LabChat from "./componets/dashboards/labTechnician/layout/LabChat";
import PatientOverView from "./componets/dashboards/patient/layout/PatientOverView";
import PharmacyOverView from "./componets/dashboards/pharmacist/layout/PharmacyOverView";
import PharmacyChat from "./componets/dashboards/pharmacist/layout/PharmacyChat";
import ReceptionViewPatient from "./componets/dashboards/reception/layout/ReceptionViewPatient";
import ReceptionPrepareFile from "./componets/dashboards/reception/layout/ReceptionPrepareFile";
import ReceptionChat from "./componets/dashboards/reception/layout/ReceptionChat";
import DoctorOverView from "./componets/dashboards/doctor/rootLayouts/DoctorOverView";
import DoctorChat from "./componets/dashboards/doctor/rootLayouts/DoctorChat";
import DoctorViewPatient from "./componets/dashboards/doctor/rootLayouts/DoctorViewPatient";

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
    path: "/password-patient-name",
    element: <PatientNameRecovery />,
  },
  {
    path: "/password-recovery",
    element: <Recovery />,
  },
  {
    path: "/password-patient-recovery",
    element: <PatientRecovery />,
  },
  {
    path: "/password-reset",
    element: <Reset />,
  },
  {
    path: "/password-patient-reset",
    element: <PatientPasswordReset />,
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
        <OverviewAdmin />
      </AdminAuthorize>
    ),
  },
  {
    path: "/admin-overview",
    element: (
      <AdminAuthorize>
        {" "}
        <RegisterUser />{" "}
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
    path: "/admin-delete-user/:id",
    element: (
      <AdminAuthorize>
        {" "}
        <DeleteUser />
      </AdminAuthorize>
    ),
  },
  {
    path: "/admin-view-deleted-users",
    element: (
      <AdminAuthorize>
        {" "}
        <ViewDeletedUsers />
      </AdminAuthorize>
    ),
  },
  {
    path: "/admin-view-messages",
    element: (
      <AdminAuthorize>
        {" "}
        <ViewMessages />
      </AdminAuthorize>
    ),
  },
  {
    path: "/admin-chat",
    element: (
      <AdminAuthorize>
        {" "}
        <AdminChat />
      </AdminAuthorize>
    ),
  },
  {
    path: "/doctor",
    element: (
      <DoctorAuthorize>
        {" "}
        <DoctorViewPatient />
      </DoctorAuthorize>
    ),
  },
  {
    path: "/doctor-chat",
    element: (
      <DoctorAuthorize>
        {" "}
        <DoctorChat />
      </DoctorAuthorize>
    ),
  },
  {
    path: "/doctor-ai",
    element: (
      <DoctorAuthorize>
        {" "}
        <DoctorOverView />
      </DoctorAuthorize>
    ),
  },

  {
    path: "/reception-view-patient",
    element: (
      <ReceptionAuthorize>
        {" "}
        <ReceptionViewPatient />
      </ReceptionAuthorize>
    ),
  },
  {
    path: "/reception-prepare-file",
    element: (
      <ReceptionAuthorize>
        {" "}
        <ReceptionPrepareFile />
      </ReceptionAuthorize>
    ),
  },
  {
    path: "/reception-chat",
    element: (
      <ReceptionAuthorize>
        {" "}
        <ReceptionChat />
      </ReceptionAuthorize>
    ),
  },
  {
    path: "/patient",
    element: (
      <PatientAuthorize>
        {" "}
        <PatientOverView />
      </PatientAuthorize>
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
    path: "/pharmacy-chat",
    element: (
      <PharmacyAuthorize>
        {" "}
        <PharmacyChat />
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
    path: "/labratory-chat",
    element: (
      <LabAuthorize>
        {" "}
        <LabChat />
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

import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/store";

export const AuthorizeUser = ({ children }) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to={"/login"} replace={true}></Navigate>;
  }

  return children;
};

export const AdminAuthorize = ({ children }) => {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");
  if (!token || role !== "administrator") {
    return <Navigate to={"/login"} replace={true}></Navigate>;
  }
  return children;
};

export const DoctorAuthorize = ({ children }) => {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  if (!token || role !== "doctor") {
    return <Navigate to={"/login"} replace={true}></Navigate>;
  }
  return children;
};

export const PharmacyAuthorize = ({ children }) => {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  if (!token || role !== "pharmacist") {
    return <Navigate to={"/login"} replace={true}></Navigate>;
  }
  return children;
};

export const ReceptionAuthorize = ({ children }) => {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  if (!token || role !== "receptionist") {
    return <Navigate to={"/login"} replace={true}></Navigate>;
  }

  return children;
};

export const LabAuthorize = ({ children }) => {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");
  if (!token || role !== "labTechnician") {
    return <Navigate to={"/login"} replace={true}></Navigate>;
  }
  return children;
};

export const ProtectRoute = ({ children }) => {
  const username = useAuthStore.getState().auth.username;
  if (!username) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }
  return children;
};

import React from "react";
import "../styles/Login.css";
// Fontawesome family

import { NavLink } from "react-router-dom";
export default function Login() {
  return (
    <div className="bodyLoginContainer">
      <div>
        <button className="buttonForLogin loginStaff">
          <NavLink
            to="/login-user"
            style={{ color: "white", textDecoration: "none" }}
          >
            Login For Staff{" "}
          </NavLink>
        </button>
        <button className="buttonForLogin">
          <NavLink
            to="/login-patient"
            style={{ color: "white", textDecoration: "none" }}
          >
            Login For Patient{" "}
          </NavLink>
        </button>
      </div>
    </div>
  );
}

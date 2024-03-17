import React from "react";
import "../styles/Login.css";
// Fontawesome family

export default function Login() {
  return (
    <div className="bodyLoginContainer">
      <div>
        <button
          className="buttonForLogin loginStaff"
          onClick={() => {
            window.location.pathname = "/login-user";
          }}
        >
          Login For Staff{" "}
        </button>
        <button
          className="buttonForLogin"
          onClick={() => {
            window.location.pathname = "/login-patient";
          }}
        >
          Login For Patient{" "}
        </button>
      </div>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import "../styles/Login.css";

// Fontawesome family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faUser,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { TextField } from "@mui/material";
import { NavLink } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
export default function Login() {
  const recaptcha = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisisbility = () => {
    setIsOpen(!isOpen);
    setIsPasswordVisible(!isPasswordVisible);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const captchaValue = recaptcha.current.getValue();
    if (!captchaValue) {
      alert("please verify the recapthca!");
    } else {
      alert("form submission success");
    }
  }

  return (
    <div className="bodyContainer">
      <div className="loginContainer">
        <div className="loginTitle">
          <h2>WELCOME </h2>{" "}
          <h2>
            {" "}
            <br />{" "}
            <span style={{ color: "#14ac5f", textDecoration: "underline" }}>
              {" "}
              AGAIN
            </span>
          </h2>
        </div>
        <form className="formContainer">
          <div className="loginName">
            <FontAwesomeIcon icon={faUser} className="loginNameIcon" />
            <TextField
              name="username"
              label="Enter Username"
              variant="standard"
              id="standard-basic"
              placeholder="Enter username"
              className="loginInputs"
            />
          </div>
          <div className="loginPassword loginName">
            <FontAwesomeIcon icon={faLock} className="loginNameIcon" />
            <div className="passwordContainer">
              <TextField
                name="password"
                label="Enter Password"
                variant="standard"
                id="standard-password-basic"
                autoComplete="current-password"
                type={isOpen ? "text" : "password"}
                className="loginInputs"
              />
              {isPasswordVisible ? (
                <FontAwesomeIcon
                  icon={faEye}
                  className="showPassword"
                  onClick={togglePasswordVisisbility}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  className="showPassword"
                  onClick={togglePasswordVisisbility}
                />
              )}
            </div>
          </div>
          <div className="loginForgotPassword">
            <NavLink to="/" className="forgotPassword">
              Forgot Password?
            </NavLink>
          </div>
          <div className="loginButtonContainer">
            <button className="loginPageButton" type="submit">
              Login
            </button>
          </div>
          <div className="recaptchaContainer">
            <ReCAPTCHA
              className="recaptchaContent"
              sitekey="6Lc7vnEpAAAAAMTZG8RdEv78XquSIMvEa3EABIle"
            />
          </div>
        </form>
        <div className="loginCopyRightContainer">
          <p>
            CopyRight &copy; 2024 Gebretsadik Shawo General Hospital. All Rights
            Reserverd.
          </p>
        </div>
      </div>
    </div>
  );
}

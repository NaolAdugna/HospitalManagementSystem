import React, { useState } from "react";
import "./LoginPatient.css";
// Fontawesome family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faUser,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { TextField } from "@mui/material";
import { useNavigate, NavLink } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";

import { verifyPassword } from "../../functions/checker";

export default function LoginUser() {
  // const recaptcha = useRef(null);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // const [recaptchaToken, setRecaptchaToken] = useState("");

  const togglePasswordVisisbility = () => {
    setIsOpen(!isOpen);
    setIsPasswordVisible(!isPasswordVisible);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    // validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const username = values.username;
      const password = values.password;
      let loginPromise = verifyPassword({
        username: username,
        password: password,
      });
      toast.promise(loginPromise, {
        loading: "Checking...",
        success: <b>Login Successfully...!</b>,
        error: <b>Password Not Match!</b>,
      });

      loginPromise
        .then(async (res) => {
          let { token, roles, id, username } = res.data;

          // const storageKey = `user_${id}`;
          // sessionStorage.setItem(
          //   storageKey,
          //   JSON.stringify({
          //     token: token,
          //     id: id,
          //     roles: roles,
          //     username: username,
          //   })
          // );
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("id", id);
          sessionStorage.setItem("role", roles);
          sessionStorage.setItem("username", username);
          if (roles === "doctor") {
            navigate("/doctor");
          } else if (roles === "pharmacist") {
            navigate("/pharmacy");
          } else if (roles === "receptionist") {
            navigate("/reception");
          } else if (roles === "administrator") {
            navigate("/");
          } else if (roles === "labratorytechnician") {
            navigate("/labratory");
          }
        })
        .catch((error) => {
          console.error("error during login: ", error);
        });
    },
  });

  // const handleRecaptchaChange = (value) => {
  //   setRecaptchaToken(value);
  // };

  return (
    <div className="bodyContainer">
      <Toaster position="top-center"></Toaster>
      <div className="loginContainer">
        <div className="loginTitle">
          <h2>STAFF </h2>{" "}
          <h2>
            {" "}
            <br />{" "}
            <span style={{ color: "#14ac5f", textDecoration: "underline" }}>
              {" "}
              USER LOGIN
            </span>
          </h2>
        </div>
        <form className="formContainer" onSubmit={formik.handleSubmit}>
          <div className="loginName">
            <FontAwesomeIcon icon={faUser} className="loginNameIcon" />
            <TextField
              name="username"
              label="Enter Username"
              variant="standard"
              id="standard-basic"
              placeholder="Enter username"
              className="loginInputs"
              {...formik.getFieldProps("username")}
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
                {...formik.getFieldProps("password")}
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
            <NavLink to="/password-recovery" className="forgotPassword">
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
              size="normal"
              badge="bottomright"
              className="recaptchaContent"
              sitekey="6Lc7vnEpAAAAAMTZG8RdEv78XquSIMvEa3EABIle"
              // onChange={handleRecaptchaChange}
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

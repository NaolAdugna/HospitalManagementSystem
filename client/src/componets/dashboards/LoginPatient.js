import React, { useState, useRef } from "react";
import "./LoginPatient.css";
import axios from "axios";
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

import { patientNameValidate } from "../../functions/validate";

import { useAuthStore } from "../../store/store";
import useFetch from "../../hooks/fetch";
import { verifyPatientPassword } from "../../functions/checker";

export default function LoginPatient() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisisbility = () => {
    setIsOpen(!isOpen);
    setIsPasswordVisible(!isPasswordVisible);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validate: patientNameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const name = values.name;
      const password = values.password;
      let loginPromise = verifyPatientPassword({
        name: name,
        password: password,
      });
      toast.promise(loginPromise, {
        loading: "Checking...",
        success: <b>Login Successfully...!</b>,
        error: <b>Password Not Match!</b>,
      });

      loginPromise
        .then(async (res) => {
          let { token, id, name } = res.data;
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("id", id);
          sessionStorage.setItem("name", name);
          navigate("/patient");
        })
        .catch((error) => {
          console.error("error during login: ", error);
        });
    },
  });
  return (
    <div className="bodyContainer">
      <Toaster position="top-center"></Toaster>
      <div className="loginContainer">
        <div className="loginTitle">
          <h2>PATIENT </h2>{" "}
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
              name="name"
              label="Enter name"
              variant="standard"
              id="standard-basic"
              placeholder="Enter name"
              className="loginInputs"
              {...formik.getFieldProps("name")}
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
            <NavLink to="/password-patient-name" className="forgotPassword">
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

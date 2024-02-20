import React, { useState } from "react";
import "../styles/Register.css";

// Fontawesome family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faUser,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { TextField } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";

import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";

import { registerdValidate } from "../functions/validate";
import { convertToBase64 } from "../functions/validate";

import Avatar from "../assets/images/profile.webp";

import { registerUser } from "../functions/checker";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validate: registerdValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = Object.assign(values, { profile: file || "" });
      let registerPromise = registerUser(values);
      toast.promise(registerPromise, {
        loading: "creating...",
        success: "register successfully...",
        error: "could not register",
      });

      registerPromise.then(function () {
        navigate("/");
      });
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  const togglePasswordVisisbility = () => {
    setIsOpen(!isOpen);
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <div className="bodyContainer">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="loginContainer">
        <div className="loginTitle">
          <h2>REGISTER </h2>{" "}
          <h2>
            {" "}
            <br />{" "}
            <span style={{ color: "#14ac5f", textDecoration: "underline" }}>
              {" "}
              HERE
            </span>
          </h2>
        </div>
        <form className="formContainer" onSubmit={formik.handleSubmit}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <label htmlFor="profile">
              <img
                src={file || Avatar}
                alt="avatar profile"
                style={{
                  border: "4px solid #f7fafc",
                  width: "130px",
                  borderRadius: "50%",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06),",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundSize: "contain",
                }}
              />
            </label>
            <input
              type="file"
              id="profile"
              name="profile"
              className="registerProfileFile"
              onChange={onUpload}
            />
          </div>
          <div className="loginName">
            <FontAwesomeIcon icon={faUser} className="loginNameIcon" />
            <TextField
              name="email"
              label="Enter email address"
              variant="standard"
              id="standard-basic idOfEmail"
              placeholder="Enter email address"
              className="loginInputs"
              {...formik.getFieldProps("email")}
            />
          </div>
          <div className="loginName">
            <FontAwesomeIcon icon={faUser} className="loginNameIcon" />
            <TextField
              name="username"
              label="Enter Username"
              variant="standard"
              id="standard-basic idOfName"
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

          <div className="loginButtonContainer">
            <button className="loginPageButton" type="submit">
              Register
            </button>
          </div>
          <div className="recaptchaContainer">
            <ReCAPTCHA
              size="normal"
              badge="bottomright"
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

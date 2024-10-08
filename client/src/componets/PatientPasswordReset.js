import React, { useState } from "react";
import "../styles/Login.css";

// Fontawesome family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { TextField } from "@mui/material";

import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";

import { resetPasswordValidate } from "../functions/validate";
import { useNavigate } from "react-router-dom";
import { usePatientAuthStore } from "../store/store";
import { resetPatientPassword } from "../functions/checker";

export default function PatientPasswordReset() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const { name } = usePatientAuthStore((state) => state.auth);

  const togglePasswordVisisbility = () => {
    setIsOpen(!isOpen);
    setIsPasswordVisible(!isPasswordVisible);
  };
  const toggleNewPasswordVisisbility = () => {
    setIsNewOpen(!isNewOpen);
    setIsNewPasswordVisible(!isNewPasswordVisible);
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: resetPasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values.password, values.confirmPassword);
      let resetPromise = resetPatientPassword({
        name,
        password: values.password,
      });

      toast.promise(resetPromise, {
        loading: "Updating...",
        success: <b>Reset Successfully...!</b>,
        error: <b>Could not Reset!</b>,
      });

      resetPromise.then(function () {
        navigate("/login-patient");
      });
    },
  });
  return (
    <div className="bodyContainer">
      <Toaster position="top-center"></Toaster>
      <div
        className="loginContainer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="loginTitle">
          <h2>PASSWORD </h2>{" "}
          <h2>
            {" "}
            <br />{" "}
            <span style={{ color: "#14ac5f", textDecoration: "underline" }}>
              {" "}
              RESET
            </span>
          </h2>
        </div>
        <div style={{ paddingBottom: "22px" }}>
          <p style={{ textAlign: "center" }}>Enter new password</p>
        </div>
        <form className="formContainer" onSubmit={formik.handleSubmit}>
          <div className="loginPassword loginName">
            <FontAwesomeIcon icon={faLock} className="loginNameIcon" />
            <div className="passwordContainer">
              <TextField
                name="newPassword"
                label="Enter new password"
                variant="standard"
                id="standard-password-basic idOfNewPass"
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
          <div className="loginPassword loginName">
            <FontAwesomeIcon icon={faLock} className="loginNameIcon" />
            <div className="passwordContainer">
              <TextField
                name="confirmPassword"
                label="Repeat new password"
                variant="standard"
                id="standard-password-basic idOfOldPass"
                autoComplete="current-password"
                type={isNewOpen ? "text" : "password"}
                className="loginInputs"
                {...formik.getFieldProps("confirmPassword")}
              />
              {isNewPasswordVisible ? (
                <FontAwesomeIcon
                  icon={faEye}
                  className="showPassword"
                  onClick={toggleNewPasswordVisisbility}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  className="showPassword"
                  onClick={toggleNewPasswordVisisbility}
                />
              )}
            </div>
          </div>

          <div className="loginButtonContainer">
            <button className="loginPageButton" type="submit">
              Reset
            </button>
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

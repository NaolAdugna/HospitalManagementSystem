import React, { useState } from "react";
import "../styles/Login.css";

// Fontawesome family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { TextField } from "@mui/material";

import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";

import { resetPasswordValidate } from "../functions/validate";
import Fetch from "../hooks/fetch";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/store";
import { resetPassword } from "../functions/checker";

export default function Reset() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);

  const { username } = useAuthStore((state) => state.auth);
  const [{ isLoading, apiData, status, serverError }] =
    Fetch("createResetSession");

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: resetPasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let resetPromise = resetPassword({
        username,
        password: values.password,
      });

      toast.promise(resetPromise, {
        loading: "Updating...",
        success: <b>Reset Successfully...!</b>,
        error: <b>Could not Reset!</b>,
      });

      resetPromise.then(function () {
        navigate("/contact");
      });
    },
  });
  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;
  if (status && status !== 201)
    return <Navigate to={"/contact"} replace={true}></Navigate>;

  const togglePasswordVisisbility = () => {
    setIsOpen(!isOpen);
    setIsPasswordVisible(!isPasswordVisible);
  };
  const toggleNewPasswordVisisbility = () => {
    setIsNewOpen(!isNewOpen);
    setIsNewPasswordVisible(!isNewPasswordVisible);
  };

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
                name="password"
                label="Enter new password"
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
          <div className="loginPassword loginName">
            <FontAwesomeIcon icon={faLock} className="loginNameIcon" />
            <div className="passwordContainer">
              <TextField
                name="password"
                label="Repeat new password"
                variant="standard"
                id="standard-password-basic"
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

/* <script src="https://www.recaptcha.net/recaptcha/api.js" async defer></script>; */

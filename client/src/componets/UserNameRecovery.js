import React, { useEffect, useState } from "react";
import "../styles/Login.css";

// Fontawesome family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { TextField } from "@mui/material";

import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/store";
import { useFormik } from "formik";
import { userNameRecoveryValidate } from "../functions/validate";
import { userExistanceChecker } from "../functions/checker";

export default function UserNameRecovery() {
  const navigate = useNavigate();
  const setUsername = useAuthStore((state) => state.setUsername);

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validate: userNameRecoveryValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let UserNameRecovery = userExistanceChecker(values.username);
      toast.promise(UserNameRecovery, {
        loading: "Checking...",
        success: <b>UserName Sent Successfully...!</b>,
        error: <b>User does not Exists!</b>,
      });

      UserNameRecovery.then(async (res) => {
        if (res && res.error) {
          toast.error("user DO NOT EXISTS");
        } else {
          const usernameValue = setUsername(values.username);
          navigate("/password-recovery");
        }
      }).catch((error) => {
        console.error("Error occured in username recovery ", error);
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
          <h2> RECOVERY </h2>{" "}
          <h2>
            {" "}
            <br />{" "}
            <span style={{ color: "#14ac5f", textDecoration: "underline" }}>
              {" "}
              PROCESS
            </span>
          </h2>
        </div>
        <div style={{ paddingBottom: "22px" }}>
          {/* <p style={{ textAlign: "center" }}>
            Enter 6 digit OTP sent to your email address
          </p> */}
        </div>
        <form className="formContainer" onSubmit={formik.handleSubmit}>
          <div className="loginPassword loginName">
            <FontAwesomeIcon icon={faUser} className="loginNameIcon" />
            <div className="passwordContainer">
              <TextField
                name="username"
                label="Enter Your Username"
                variant="standard"
                id="standard-password-basic"
                autoComplete="current-password"
                type="text"
                className="loginInputs"
                {...formik.getFieldProps("username")}
              />
            </div>
          </div>
          <div className="loginForgotPassword"></div>
          <div className="loginButtonContainer">
            <button className="loginPageButton" type="submit">
              Send
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

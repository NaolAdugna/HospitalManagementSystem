import React from "react";
import "../styles/Login.css";

// Fontawesome family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { TextField } from "@mui/material";

import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { PatientRecoveryValidate } from "../functions/validate";
import { PatientExistanceChecker } from "../functions/checker";
import { usePatientAuthStore } from "../store/store";
export default function PatientNameRecovery() {
  const navigate = useNavigate();
  const setName = usePatientAuthStore((state) => state.setName);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validate: PatientRecoveryValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let UserNameRecovery = PatientExistanceChecker(values.name);
      toast.promise(UserNameRecovery, {
        loading: "Checking...",
        success: <b>Name Sent Successfully...!</b>,
        error: <b>User does not Exists!</b>,
      });

      UserNameRecovery.then(async (res) => {
        if (res && res.error) {
          toast.error("user DO NOT EXISTS");
        } else {
          setName(values.name);
          navigate("/password-patient-recovery");
        }
      }).catch((error) => {
        console.error("Error occured in patient name recovery ", error);
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
        <div style={{ paddingBottom: "22px" }}></div>
        <form className="formContainer" onSubmit={formik.handleSubmit}>
          <div className="loginPassword loginName">
            <FontAwesomeIcon icon={faUser} className="loginNameIcon" />
            <div className="passwordContainer">
              <TextField
                name="name"
                label="Enter Your name"
                variant="standard"
                id="standard-password-basic"
                autoComplete="current-password"
                type="text"
                className="loginInputs"
                {...formik.getFieldProps("name")}
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

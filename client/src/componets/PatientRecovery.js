import React, { useEffect, useState } from "react";
import "../styles/Login.css";

// Fontawesome family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { TextField } from "@mui/material";

import toast, { Toaster } from "react-hot-toast";
import { useNavigate, NavLink } from "react-router-dom";

import { generateOTPPatient, verifyPatientOTP } from "../functions/checker";
import { usePatientAuthStore } from "../store/store";
export default function PatientRecovery() {
  const { name } = usePatientAuthStore((state) => state.auth);
  const [OTP, setOTP] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    generateOTPPatient(name)
      .then((OTP) => {
        if (OTP) return toast.success("OTP has been send to your email!");
        return toast.error("Problem while generating OTP!");
      })
      .catch((error) => {
        console.error("error generating otp: ", error);
      });
  }, [name]);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      let { status } = await verifyPatientOTP(name, OTP);
      if (status === 201) {
        toast.success("Verified Successfully!");
        return navigate("/password-patient-reset");
      }
    } catch (error) {
      return toast.error("Wrong OTP! Check email again!");
    }
  }

  // handler of resend OTP
  function resendOTP() {
    let sentPromise = generateOTPPatient(name);

    toast.promise(sentPromise, {
      loading: "Sending...",
      success: <b>OTP has been send to your email!</b>,
      error: <b>Could not Send it!</b>,
    });
  }
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
              RECOVERY
            </span>
          </h2>
        </div>
        <div style={{ paddingBottom: "22px" }}>
          <p style={{ textAlign: "center" }}>
            Enter 6 digit OTP sent to your email address
          </p>
        </div>
        <form className="formContainer" onSubmit={onSubmit}>
          <div className="loginPassword loginName">
            <FontAwesomeIcon icon={faLock} className="loginNameIcon" />
            <div className="passwordContainer">
              <TextField
                name="name"
                label="Enter OTP code"
                variant="standard"
                id="standard-password-basic"
                autoComplete="current-password"
                type="text"
                className="loginInputs"
                onChange={(e) => setOTP(e.target.value)}
              />
            </div>
          </div>
          <div className="loginForgotPassword">
            <NavLink
              className="forgotPassword"
              style={{ textDecoration: "underline" }}
              onClick={resendOTP}
            >
              Resend Code
            </NavLink>
          </div>
          <div className="loginButtonContainer">
            <button className="loginPageButton" type="submit">
              Recover
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

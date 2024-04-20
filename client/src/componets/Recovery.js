import React, { useEffect, useState } from "react";
import "../styles/Login.css";

// Fontawesome family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { TextField } from "@mui/material";

import toast, { Toaster } from "react-hot-toast";
import { useNavigate, NavLink } from "react-router-dom";

import { generateOTP, verifyOTP } from "../functions/checker";
import { useAuthStore } from "../store/store";

export default function Recovery() {
  const [OTP, setOTP] = useState("");
  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth);

  useEffect(() => {
    generateOTP(username)
      .then((OTP) => {
        if (OTP) return toast.success("OTP has been send to your email!");
        return toast.error("Problem while generating OTP!");
      })
      .catch((error) => {
        console.error("error generating otp: ", error);
      });
  }, [username]);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      let { status } = await verifyOTP(username, OTP);
      if (status === 201) {
        toast.success("Verified Successfully!");
        return navigate("/password-reset");
      }
    } catch (error) {
      return toast.error("Wrong OTP! Check email again!");
    }
  }

  // handler of resend OTP
  function resendOTP() {
    let sentPromise = generateOTP(username);

    toast.promise(sentPromise, {
      loading: "Sending...",
      success: <b>OTP has been send to your email!</b>,
      error: <b>Could not Send it!</b>,
    });

    // sentPromise.then((OTP) => {
    //   console.log(OTP);
    // });
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
                name="username"
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
          {/* <div className="recaptchaContainer">
            <ReCAPTCHA
              size="normal"
              badge="bottomright"
              className="recaptchaContent"
              sitekey="6Lc7vnEpAAAAAMTZG8RdEv78XquSIMvEa3EABIle"
            />
          </div> */}
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

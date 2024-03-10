import React, { useState, useEffect } from "react";
import "../styles/Register.css";
import SideBarData from "./Data";

// Fontawesome family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faUser,
  faEyeSlash,
  faEye,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { TextField } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";

import { registerdValidate } from "../../../../functions/validate";
import { convertToBase64 } from "../../../../functions/validate";

import Avatar from "../../../../assets/images/profile.webp";
import { registerUser } from "../../../../functions/checker";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(300); // Initial width

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    setSidebarWidth(showSidebar ? 0 : 300); // Toggle width
  };

  const styles = {
    side: {
      width: sidebarWidth,
    },
    "@media (max-width: 320px)": {
      side: {
        width: showSidebar ? "0" : "100%",
      },
    },
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 320) {
        setShowSidebar(false);
        setSidebarWidth(0);
      } else if (window.innerWidth <= 640) {
        setShowSidebar(true);
        setSidebarWidth(300);
      } else if (window.innerWidth <= 1024) {
        setShowSidebar(true);
        setSidebarWidth(300);
      } else {
        setShowSidebar(true);
        setSidebarWidth(300);
      }
    };

    // Call handleResize initially and add event listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div className="reportContainer">
      <div
        style={styles.side}
        className={showSidebar ? `side show` : `side`}
        // style={{ width: sidebarWidth }}
      >
        <div className="layoutContainer">
          <div className="sideBarContainer">
            <div className="sideBarContent">
              <div className="profileContainer">
                <img
                  src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                  alt="profile "
                  className="profileImage"
                />
                <div className="sideBarFooterContainer">
                  <div>
                    <h4>Naol Adugna</h4>
                    <span>Doctor</span>
                  </div>
                  <div>
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="navBarHamburger"
                      onClick={toggleSidebar}
                    />
                  </div>
                </div>
              </div>
              <div className="sideBarLinkContainer">
                <ul className="sidebarList">
                  {SideBarData.map((item, key) => {
                    return (
                      <li
                        id={window.location === item.link ? "active" : ""}
                        className="sidebarLink"
                        key={key}
                        onClick={() => {
                          window.location.pathname = item.link;
                        }}
                      >
                        {" "}
                        <div id="icon">
                          <FontAwesomeIcon icon={item.icon} />
                        </div>{" "}
                        <div id="title">{item.title}</div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main
        className="main"
        style={{
          gridColumn: showSidebar ? "1 / 4" : "1 / 3",
          marginLeft: sidebarWidth,
        }}
      >
        <div className="card">
          <div className="navBarContainer">
            <div>
              <FontAwesomeIcon
                icon={faBars}
                className="navBarHamburger"
                onClick={toggleSidebar}
              />
            </div>
            <div className=" navBarLogoutContainer">
              <h4>Welcome Naol Adugna</h4>
              <button>Logout</button>
            </div>
          </div>
        </div>
        <div className="card mainContainer">
          <div>
            <div className="bodyContainer">
              <Toaster position="top-center" reverseOrder={false}></Toaster>
              <div className="loginContainer">
                <div className="loginTitle">
                  <h2>REGISTER </h2>{" "}
                  <h2>
                    {" "}
                    <br />{" "}
                    <span
                      style={{ color: "#14ac5f", textDecoration: "underline" }}
                    >
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
                    CopyRight &copy; 2024 Gebretsadik Shawo General Hospital.
                    All Rights Reserverd.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

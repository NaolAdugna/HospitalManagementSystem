import React, { useState } from "react";
import "../styles/RegisterUser.css";
// import SideBarData from "./Data";

// Fontawesome family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faUser,
  faEyeSlash,
  faEye,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { TextField } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";

import { registerdValidate } from "../../../../functions/validate";

import { registerUser } from "../../../../functions/checker";
import { NavLink, useNavigate } from "react-router-dom";

import {
  faEnvelope,
  faChartSimple,
  faRepublican,
  faUserShield,
  faListCheck,
  faAddressBook,
  faDashboard,
} from "@fortawesome/free-solid-svg-icons";

export default function RegisterUsers() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(300); // Initial width
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      role: "",
      email: "",
    },
    validate: registerdValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let registerPromise = registerUser(values);
      toast.promise(registerPromise, {
        loading: "creating...",
        success: "register successfully...",
        error: "could not register",
      });

      registerPromise.then(function () {
        navigate("/admin-manage-users");
      });
    },
  });

  const togglePasswordVisisbility = () => {
    setIsOpen(!isOpen);
    setIsPasswordVisible(!isPasswordVisible);
  };

  const storedUsername = sessionStorage.getItem("username");
  const storedRole = sessionStorage.getItem("role");

  const userNameFirstLetter = storedUsername.charAt(0);
  function handleLogout() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("token");
    navigate("/");
  }
  return (
    <div className="reportContainer">
      <div
        style={styles.side}
        className={showSidebar ? `side show` : `side`}
        // style={{ width: sidebarWidth }}
      >
        <div className="layoutContainer">
          <div className="sideBarContainer">
            <div className="sideBarIdentityContainer">
              <div className="sideBarProfile">
                {/* <img
                  src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                  alt="profile "
                  className="profileImage"
                /> */}
                <h1 className="RegisterProfileImage">
                  {" "}
                  {userNameFirstLetter}{" "}
                </h1>
                <div className="sideBarContainerFooter">
                  <div>
                    <h4>{storedUsername}</h4>
                    <span>{storedRole}</span>
                  </div>
                </div>
              </div>
              <div className="sideBarLinksContainer">
                <ul className="RegistersideBarUnorderList">
                  <NavLink to="/admin" className="RegistersideBarLinks">
                    <div id="icons">
                      <FontAwesomeIcon icon={faDashboard} />
                    </div>
                    <div>Dashboard</div>
                  </NavLink>
                  <NavLink
                    to="/admin-manage-users"
                    className="RegistersideBarLinks"
                  >
                    <div id="icons">
                      <FontAwesomeIcon icon={faListCheck} />
                    </div>
                    <div>Manage Users</div>
                  </NavLink>
                  <NavLink
                    to="/admin-overview"
                    className="RegistersideBarLinks"
                  >
                    <div id="icons">
                      <FontAwesomeIcon icon={faAddressBook} />
                    </div>
                    <div>Register Users</div>
                  </NavLink>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main
        className="mainRegisterContainer"
        style={{
          gridColumn: showSidebar ? "1 / 4" : "1 / 3",
          marginLeft: sidebarWidth,
        }}
      >
        <div className="card RegisterNavBarCardContainer">
          <div className="registerNavBarContainer">
            <div className="registerNavBarHambugerContainer">
              <FontAwesomeIcon
                icon={faBars}
                className="navBarHamburger"
                onClick={toggleSidebar}
              />
            </div>
            <div className=" navBarLogoutContainer">
              <h3 style={{ textDecoration: "underline" }}>
                Welcome {storedUsername}
              </h3>
              <h3>🤗🤗🤗 </h3>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
        <div className="card mainCardContainer">
          <Toaster position="top-center" reverseOrder={false}></Toaster>
          <div>
            <div className="bodyRegisterContainer">
              <div className="RegisterContainer">
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

                  <div className="loginName">
                    <FontAwesomeIcon
                      icon={faUserShield}
                      className="loginNameIcon"
                    />
                    <select
                      id="selectOption"
                      className="loginInputs"
                      {...formik.getFieldProps("role")}
                      name="role"
                    >
                      <option value="">Choose Role</option>
                      <option value="doctor">Doctor</option>
                      <option value="pharmacist">Pharmacist</option>
                      <option value="receptionist">Receptionist</option>
                      <option value="administrator">Administrator</option>
                      <option value="labTechnician">
                        Labratory Technician
                      </option>
                    </select>
                  </div>
                  <div className="loginName">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="loginNameIcon"
                    />
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

import React, { useState, useEffect } from "react";
import "../styles/UpdateUser.css";
// import SideBarData from "./Data";

// Fontawesome family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { TextField } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";

import { useParams, useNavigate } from "react-router-dom";

import {
  faEnvelope,
  faChartSimple,
  faRepublican,
  faUserShield,
  faLock,
  faUser,
  faEyeSlash,
  faEye,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function UpdateUser() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(300); // Initial width
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { id } = useParams();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();

  useEffect(() => {
    axios.get(`/api/users/${id}`).then((res) => {
      setUsername(res.data[0].username);
      setEmail(res.data[0].email);
      setPassword(res.data[0].password);
      setRole(res.data[0].role);
    });
  }, []);

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
      username: username,
      password: password,
      role: role,
      email: email,
    },
    // validate: registerdValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      // let registerPromise = updateUserChecker(id, values);
      let registerPromise = axios.put(`/api/update-user/` + id, {
        username,
        password,
        role,
        email,
      });
      toast.promise(registerPromise, {
        loading: "Updating...",
        success: "Updated successfully...",
        error: "could not Update",
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

  // const userNameFirstLetter = storedUsername.charAt(0);

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
                {/* <h1 className="updateProfileImage"> {userNameFirstLetter} </h1> */}
                <div className="sideBarContainerFooter">
                  <div>
                    <h4> {storedUsername} </h4>
                    <span> {storedRole} </span>
                  </div>
                </div>
              </div>
              <div className="sideBarLinksContainer">
                <ul className="sideBarUnorderList">
                  <li
                    className="sideBarLinks"
                    onClick={() => {
                      window.location.pathname = "/admin";
                    }}
                  >
                    <div id="icons">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <div>Dashboard</div>
                  </li>
                  <li
                    className="sideBarLinks"
                    onClick={() => {
                      window.location.pathname = "/admin-manage-users";
                    }}
                  >
                    <div id="icons">
                      <FontAwesomeIcon icon={faChartSimple} />
                    </div>
                    <div>Manage Users</div>
                  </li>
                  <li
                    className="sideBarLinks"
                    onClick={() => {
                      window.location.pathname = "/admin-overview";
                    }}
                  >
                    <div id="icons">
                      <FontAwesomeIcon icon={faRepublican} />
                    </div>
                    <div>Overview</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main
        className="mainUpdateContainer"
        style={{
          gridColumn: showSidebar ? "1 / 4" : "1 / 3",
          marginLeft: sidebarWidth,
        }}
      >
        <div className="card UpdateCardNavBarContainer">
          <div className="UpdatenavBarContainer">
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
        <div className="card mainCardContainer">
          <Toaster position="top-center" reverseOrder={false}></Toaster>
          <div>
            <div className="bodyUpdateContainer">
              <div className="UpdateContainer">
                <div className="loginTitle">
                  <h2>UPDATE </h2>{" "}
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
                      variant="standard"
                      id="standard-basic idOfName"
                      className="loginInputs"
                      {...formik.getFieldProps("username")}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="loginPassword loginName">
                    <FontAwesomeIcon icon={faLock} className="loginNameIcon" />
                    <div className="passwordContainer">
                      <TextField
                        name="password"
                        variant="standard"
                        id="standard-password-basic"
                        autoComplete="current-password"
                        type={isOpen ? "text" : "password"}
                        className="loginInputs"
                        {...formik.getFieldProps("password")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="">Choose Role</option>
                      <option value="doctor">Doctor</option>
                      <option value="pharmacist">Pharmacist</option>
                      <option value="receptionist">Receptionist</option>
                      <option value="administrator">Administrator</option>
                      <option value="labratorytechnician">
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
                      variant="standard"
                      id="standard-basic idOfEmail"
                      className="loginInputs"
                      {...formik.getFieldProps("email")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="loginButtonContainer">
                    <button className="loginPageButton" type="submit">
                      Update
                    </button>
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

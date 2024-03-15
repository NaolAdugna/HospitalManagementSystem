import React, { useState, useEffect } from "react";
import "../styles/ManageUsers.css";

// Fontawesome family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { TextField } from "@mui/material";
import toast from "react-hot-toast";
import { useFormik } from "formik";

import { registerdValidate } from "../../../../functions/validate";

import { registerUser } from "../../../../functions/checker";
import { useNavigate } from "react-router-dom";

import {
  faEnvelope,
  faChartSimple,
  faRepublican,
  faMagnifyingGlass,
  faAdd,
} from "@fortawesome/free-solid-svg-icons";

import TableUser from "./TableUser";
export default function ManageUsers() {
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

  return (
    <div className="reportContainer">
      <div style={styles.side} className={showSidebar ? `side show` : `side`}>
        <div className="layoutContainer">
          <div className="sideBarContainer">
            <div className="sideBarIdentityContainer">
              <div className="sideBarProfile">
                <img
                  src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                  alt="profile "
                  className="profileImage"
                />
                <div className="sideBarContainerFooter">
                  <div>
                    <h4>Naol Adugna</h4>
                    <span>Doctor</span>
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
          <div className="SearchandAddContainer">
            <div className="searchContentContainer">
              {/* <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="searchIconManageUser"
              />
              <TextField
                name="username"
                label="Search Here"
                variant="standard"
                id="standard-basic idOfName"
                placeholder="Search Here"
                className="searchInputManageUser"
                {...formik.getFieldProps("username")}
              /> */}
            </div>
            <div className="addUserContainer">
              <button
                onClick={() => {
                  window.location.pathname = "/admin";
                }}
              >
                Add User{" "}
                <span>
                  <FontAwesomeIcon icon={faAdd} />
                </span>{" "}
              </button>
            </div>
          </div>
          <div className="tableContainer">
            <TableUser />
          </div>
        </div>
      </main>
    </div>
  );
}

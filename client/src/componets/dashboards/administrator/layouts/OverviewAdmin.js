import React, { useState, useEffect } from "react";
import "../styles/OverviewAdmin.css";
// import SideBarData from "./Data";

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
import { NavLink, useNavigate } from "react-router-dom";

import {
  faEnvelope,
  faChartSimple,
  faHouse,
  faRepublican,
} from "@fortawesome/free-solid-svg-icons";

export default function OverviewAdmin() {
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
                  <li className="sideBarLinks">
                    <div id="icons">
                      <FontAwesomeIcon icon={faChartSimple} />
                    </div>
                    <div>Report</div>
                  </li>
                  <li className="sideBarLinks">
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
          <div></div>
        </div>
      </main>
    </div>
  );
}

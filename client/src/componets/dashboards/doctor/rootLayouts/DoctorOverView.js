import React, { useId, useState } from "react";
import "../styles/Overview.css";

// Fontawesome family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faEnvelope,
  faBars,
  faDashboard,
} from "@fortawesome/free-solid-svg-icons";

import { NavLink, useNavigate } from "react-router-dom";

export default function DoctorOverView() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(300);

  const navigate = useNavigate();
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    setSidebarWidth(showSidebar ? 0 : 300);
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

  const userId = sessionStorage.getItem("id");
  const userName = sessionStorage.getItem("username");
  const userRole = sessionStorage.getItem("role");

  const userNameFirstLetter = userName.charAt(0);

  function handleLogout() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="reportContainer">
      <div style={styles.side} className={showSidebar ? `side show` : `side`}>
        <div className="layoutContainer">
          <div className="sideBarContainer">
            <div className="sideBarIdentityContainer">
              <div className="sideBarProfile">
                {/* <img
                  src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                  alt="profile "
                  className="profileImage"
                /> */}
                <h1 className="receptionProfileImage">
                  {" "}
                  {userNameFirstLetter}
                </h1>
                <div className="sideBarContainerFooter">
                  <div>
                    <h4 title="UserName"> {userName} </h4>
                    <span title="Role">{userRole}</span>
                  </div>
                </div>
              </div>
              <div className="sideBarLinksContainer">
                <ul className="DoctorsideBarUnorderList">
                  <NavLink to="/doctor" className="DoctorsideBarLinks">
                    <div id="icons">
                      <FontAwesomeIcon icon={faDashboard} />
                    </div>
                    <div>Dashboard</div>
                  </NavLink>
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
        <div className="card ReceptionCardNavBarContainer">
          <div className="ReceptionnavBarContainer">
            <div>
              <FontAwesomeIcon
                icon={faBars}
                className="navBarHamburger"
                onClick={toggleSidebar}
              />
            </div>
            <div className=" navBarLogoutContainer">
              <h3 style={{ textDecoration: "underline" }}>
                Welcome {userName}
              </h3>
              <h3>🤗🤗🤗 </h3>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
        <div className="card mainReceptionContainer">
          <div>
            <h2>DoctorsideBarUnorderList</h2>
          </div>
        </div>
      </main>
    </div>
  );
}

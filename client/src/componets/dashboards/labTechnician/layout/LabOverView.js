import React, { useState } from "react";
import "../style/LabOverView.css";

// Fontawesome family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faDashboard, faBars } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";

export default function LabOverView() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(300); // Initial width
  const navigate = useNavigate();
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
                <h1 className="LabProfileImage"> {userNameFirstLetter} </h1>
                <div className="sideBarContainerFooter">
                  <div>
                    <h4> {userName} </h4>
                    <span> {userRole} </span>
                  </div>
                </div>
              </div>
              <div className="sideBarLinksContainer">
                <ul className="LabsideBarUnorderList">
                  <NavLink to="/labratory" className="LabsideBarLinks">
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
        <div className="card LabCardNavBarContainer">
          <div className="LabnavBarContainer">
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
            <h2>LabCardNavBarContainer</h2>
          </div>
        </div>
      </main>
    </div>
  );
}

import React, { useState } from "react";
import "../styles/Sidebar.css";
import SideBarData from "./Data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const showSideBar = () => setExpanded(!expanded);

  return (
    <div className="layoutContainer">
      <div className="navBarContainer">
        <div>
          <FontAwesomeIcon
            icon={faBars}
            className="navBarHamburger"
            onClick={showSideBar}
          />
        </div>
        <div className="navBarLogoutContainer">
          <h4>Welcome Naol Adugna</h4>
          <button>Logout</button>
        </div>
      </div>
      <div className="sideBarContainer">
        <div className={expanded ? "sideBarContent show" : "sideBarContent"}>
          <div className="profileContainer">
            <img
              src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
              alt="profile "
              className="profileImage"
            />
            <div
              className="sideBarFooterContainer"
              style={{
                width: expanded ? "13rem" : "0px",
                marginLeft: expanded ? "0.75rem" : "0px",
              }}
            >
              <div>
                <h4 style={{ fontWeight: "500" }}>Naol Adugna</h4>
                <span style={{ fontSize: "0.75rem" }}>Doctor</span>
              </div>
              <div>
                <FontAwesomeIcon
                  icon={faXmark}
                  className="navBarHamburger"
                  onClick={showSideBar}
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
                      <FontAwesomeIcon onClick={showSideBar} icon={item.icon} />
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
  );
}

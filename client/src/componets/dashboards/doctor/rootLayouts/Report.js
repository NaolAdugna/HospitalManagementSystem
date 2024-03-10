import React, { useState, useEffect } from "react";
import "../styles/Report.css";
import SideBarData from "./Data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Report() {
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
            <div className="navBarLogoutContainer">
              <h4>Welcome Naol Adugna</h4>
              <button>Logout</button>
            </div>
          </div>
        </div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card calendarContainer">
          <div className="calendarContent">
            <Calendar />
          </div>
        </div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
      </main>
    </div>
  );
}

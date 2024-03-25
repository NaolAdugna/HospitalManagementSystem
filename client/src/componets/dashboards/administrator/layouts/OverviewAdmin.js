import React, { useState, useEffect } from "react";
import "../styles/OverviewAdmin.css";
// import SideBarData from "./Data";

// Fontawesome family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faEnvelope,
  faChartSimple,
  faRepublican,
  faBars,
  faAdd,
  faListCheck,
  faAddressBook,
  faDashboard,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";

// import { CreateList } from "../../../../functions/checker";
import { CreateListChecker } from "../../../../functions/checker";
// Chart Resources
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { faker } from "@faker-js/faker";

import { TextField } from "@mui/material";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function OverviewAdmin() {
  const options = {
    responsive: true,
    Plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const labels = [
    "ADMINISTRATOR",
    "RECEPTIONIST ",
    "DOCTOR",
    "PHARMCACIST",
    "LAB TECHNICIAN",
    "PATIENT",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "rgba(20, 172, 95,0.8)",
      },
    ],
  };
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

  const formik = useFormik({
    initialValues: {
      listtitle: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const id = sessionStorage.getItem("id");
        const listTitle = values.listtitle;

        const createListPromise = CreateListChecker({ id, listTitle });

        // Show toast based on the result of CreateListChecker
        await toast.promise(createListPromise, {
          loading: "Adding...",
          success: "Added successfully...",
          error: "Could not add",
        });

        // Reload the page after adding the list
        window.location.reload();
      } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error occurred:", error);
        toast.error("An error occurred. Please try again later.");
      }
    },
  });

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
                <h1 className="overViewProfileImage">{userNameFirstLetter}</h1>
                <div className="sideBarContainerFooter">
                  <div>
                    <h4>{storedUsername}</h4>
                    <span>{storedRole}</span>
                  </div>
                </div>
              </div>
              <div className="sideBarLinksContainer">
                <ul className="OverViewsideBarUnorderList">
                  <NavLink to="/admin" className="OverViewsideBarLinks">
                    <div id="icons">
                      <FontAwesomeIcon icon={faDashboard} />
                    </div>
                    <div>Dashboard</div>
                  </NavLink>
                  <NavLink
                    to="/admin-manage-users"
                    className="OverViewsideBarLinks"
                  >
                    <div id="icons">
                      <FontAwesomeIcon icon={faListCheck} />
                    </div>
                    <div>Manage Users</div>
                  </NavLink>
                  <NavLink
                    to="/admin-overview"
                    className="OverViewsideBarLinks"
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
        className="mainOverViewContainer"
        style={{
          gridColumn: showSidebar ? "1 / 4" : "1 / 3",
          marginLeft: sidebarWidth,
        }}
      >
        <div className="card OverViewCardContainer">
          <div className="OverViewnavBarContainer">
            <div>
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
        <div className="card"> </div>
        <div className="card"> </div>
        <div
          className="card"
          style={{
            width: "100%",
            padding: "0px",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              lineHeight: "0.6rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Calendar className="overViewCalendar" />
          </div>
        </div>
        <div className="card ">
          <div className="overViewBarChart">
            <Bar
              options={options}
              data={data}
              style={{ paddingBottom: "8px" }}
            />
          </div>
        </div>
        <div className="card">
          <div>
            <div>
              <h2 style={{ textAlign: "center" }}>TO DO LIST</h2>
            </div>
            <div>
              <form onSubmit={formik.handleSubmit}>
                <div className="OverViewAddListContainer">
                  <TextField
                    id="outlined-basic"
                    label="Add List Here"
                    variant="outlined"
                    name="listtitle"
                    className="OverviewAddListInput"
                    {...formik.getFieldProps("listtitle")}
                  />
                  <button className="OverViewAddListButton" type="submit">
                    Add{" "}
                    <span>
                      <FontAwesomeIcon icon={faAdd} />
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

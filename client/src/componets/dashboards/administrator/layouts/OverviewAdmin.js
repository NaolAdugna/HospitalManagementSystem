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

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import AppRegistrationRoundedIcon from "@mui/icons-material/AppRegistrationRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import PreviewRoundedIcon from "@mui/icons-material/PreviewRounded";

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
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const userName = sessionStorage.getItem("username");
  const userNameFirstLetter = userName.charAt(0);

  function handleLogout() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("token");
    navigate("/");
  }
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const DrawerList = (
    <Box
      sx={{
        width: 250,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        background: "#f0f8ff",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "100vh",
          width: "100%",
        }}
      >
        {[
          {
            text: "Dashboard",
            link: "/admin",
            icon: <DashboardCustomizeRoundedIcon />,
          },
          {
            text: "Manage Users",
            link: "/admin-manage-users",
            icon: <ManageAccountsRoundedIcon />,
          },
          {
            text: "Register Users",
            link: "/admin-overview",
            icon: <AppRegistrationRoundedIcon />,
          },
          {
            text: "Deleted Users",
            link: "/admin-view-deleted-users",
            icon: <DeleteForeverRoundedIcon />,
          },
          {
            text: "View Messages",
            link: "/admin-view-messages",
            icon: <PreviewRoundedIcon />,
          },
        ].map(({ text, link, icon }, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton href={link}>
              <ListItemIcon style={{ color: "#14ac5f" }}>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <button onClick={handleLogout} className="adminOverviewLogOutButton">
            Log Out
          </button>
        </div>
      </List>
    </Box>
  );

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
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <main className="adminOverviewDashboard ">
        <div className="adminOverviewDashboardFirstCard">
          <div className="adminOverviewDashboardNavBarContainer">
            <div>
              <FontAwesomeIcon
                icon={faBars}
                className="navBarHamburger"
                onClick={toggleDrawer(true)}
              />
            </div>
            <div className="adminOverviewDashboardLogOutContainer">
              <h4 style={{ textDecoration: "underline" }}>
                Welcome {userName}
              </h4>
              <h1 className="adminOverviewDashboardNavImage">
                {" "}
                {userNameFirstLetter}
              </h1>
            </div>
          </div>
        </div>
        <div className="adminOverviewDashboardSecondCard">
          {/* <div className="adminOverviewDashboardSecondFirstCard"> </div> */}
          <div className="adminOverviewDashboardSecondFirstCard"> </div>
          <div
            className="adminOverviewDashboardSecondSecondCard"
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
              <Calendar className="adminOverviewCalendar" />
            </div>
          </div>
          <div className="adminOverviewDashboardSecondThirdCard">
            <div className="adminOverviewBarChart">
              <Bar
                options={options}
                data={data}
                style={{ paddingBottom: "8px" }}
              />
            </div>
          </div>
          <div className="adminOverviewDashboardSecondFourthCard ">
            <div>
              <div>
                <h2 style={{ textAlign: "center" }}>TO DO LIST</h2>
              </div>
              <div>
                <form onSubmit={formik.handleSubmit}>
                  <div className="adminOverviewAddListContainer">
                    <TextField
                      id="outlined-basic"
                      label="Add List Here"
                      variant="outlined"
                      name="listtitle"
                      className="adminOverviewAddListInput"
                      {...formik.getFieldProps("listtitle")}
                    />
                    <button
                      className="adminOverViewAddListButton"
                      type="submit"
                    >
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
        </div>
      </main>
    </div>
  );
}

import React, { useState } from "react";
import "../styles/PharmacyOverView.css";

// Fontawesome family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faEnvelope,
  faDashboard,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

export default function PharmacyOverView() {
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
          justifyContent: "space-between",
          height: "100vh",
          width: "100%",
        }}
      >
        {["Dashboard"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon style={{ color: "#14ac5f" }}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        {/* <Divider /> */}
        <div
          style={{
            display: "flex",
            // alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button onClick={handleLogout} className="pharmacyLogOutButton">
            Log Out
          </button>
        </div>
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <main className="pharmacyDashboard ">
        <div className="pharmacyDashboardFirstCard">
          <div className="pharmacyDashboardNavBarContainer">
            <div>
              <FontAwesomeIcon
                icon={faBars}
                className="navBarHamburger"
                onClick={toggleDrawer(true)}
              />
            </div>
            <div className="pharmacyDashboardLogOutContainer">
              <h4 style={{ textDecoration: "underline" }}>
                Welcome {userName}
              </h4>
              <h1 className="pharmacyDashboardNavImage">
                {" "}
                {userNameFirstLetter}
              </h1>
            </div>
          </div>
        </div>
        <div className="pharmacyDashboardSecondCard">
          <div>
            <p>pharmacyDashboard</p>
          </div>
        </div>
      </main>
    </div>
  );
}

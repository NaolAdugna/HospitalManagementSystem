import React, { useState } from "react";
import "../styles/ViewMessages.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
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
import MessageTable from "./MessageTable";

export default function ViewMessages() {
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
          <button
            onClick={handleLogout}
            className="adminViewMessagesLogOutButton"
          >
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
      <main className="adminViewMessagesDashboard ">
        <div className="adminViewMessagesDashboardFirstCard">
          <div className="adminViewMessagesDashboardNavBarContainer">
            <div>
              <FontAwesomeIcon
                icon={faBars}
                className="navBarHamburger"
                onClick={toggleDrawer(true)}
              />
            </div>
            <div className="adminViewMessagesDashboardLogOutContainer">
              <h4 style={{ textDecoration: "underline" }}>
                Welcome {userName}
              </h4>
              <h1 className="adminViewMessagesDashboardNavImage">
                {" "}
                {userNameFirstLetter}
              </h1>
            </div>
          </div>
        </div>
        <div className="adminViewMessagesDashboardSecondCard">
          <div className="adminViewMessagesTableContainer">
            <MessageTable />
          </div>
        </div>
      </main>
    </div>
  );
}

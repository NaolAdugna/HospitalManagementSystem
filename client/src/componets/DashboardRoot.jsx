import React, { useState } from "react";
import "./DashboardRoot.css";
// Fontawesome family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import GridViewIcon from "@mui/icons-material/GridView";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import MedicationIcon from "@mui/icons-material/Medication";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { Toaster } from "react-hot-toast";
import RemoveFromQueueIcon from "@mui/icons-material/RemoveFromQueue";
import MicrowaveIcon from "@mui/icons-material/Microwave";

export default function DashboardRoot({ props }) {
  const [openProfileRecord, setOpenProfileRecord] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClickOpenProfileRecord = () => {
    setOpenProfileRecord(true);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const openProfile = Boolean(anchorEl);
  const [open, setOpen] = useState(false);
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
        background: "orange",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List
        className="doctor-RootDrawerContainer"
        style={{
          background: "#282c34",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "100vh",
          width: "100%",
          borderRight: "0.5px solid white",
        }}
      >
        {[
          {
            text: "Dashboard",
            link: "/doctor",
            icon: <DashboardCustomizeRoundedIcon />,
          },
          {
            text: "Prepare Prescription",
            link: "/doctor-prescription",
            icon: <MedicationIcon />,
          },
          {
            text: "Prepare Lab Request",
            link: "/doctor-lab-request",
            icon: <BookmarkBorderIcon />,
          },
          {
            text: "Appointment",
            link: "/doctor-appointment",
            icon: <MicrowaveIcon />,
          },
          {
            text: "Deleted Appointment",
            link: "/doctor-deleted-appointment",
            icon: <RemoveFromQueueIcon />,
          },
          {
            text: "Chat Staff",
            link: "/doctor-chat",
            icon: <ChatOutlinedIcon />,
          },
          {
            text: "Gemini AI",
            link: "/doctor-ai",
            icon: <GridViewIcon />,
          },
        ].map(({ text, link, icon }, index) => (
          <ListItem key={text} disablePadding>
            <NavLink
              to={link}
              style={{
                color: "white",
                textDecoration: "none",
                width: "100%",
              }}
            >
              <ListItemButton>
                <ListItemIcon style={{ color: "#fff" }}>{icon}</ListItemIcon>
                <ListItemText
                  primary={text}
                  className="doctor-RootDrawerContainer"
                  style={{ background: "transparent" }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        ></div>
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        className="doctor-RootDrawerContainer"
      >
        {DrawerList}
      </Drawer>
      <main className="doctor-RootDashboard ">
        <div className="doctor-RootDashboardFirstCard">
          <div className="doctor-RootDashboardNavBarContainer">
            <div>
              <FontAwesomeIcon
                icon={faBars}
                className="navBarHamburger"
                onClick={toggleDrawer(true)}
              />
            </div>
            <div className="doctor-RootDashboardLogOutContainer">
              <h4 style={{ textDecoration: "underline" }}>Welcome Naol</h4>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openProfile}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={handleClickOpenProfileRecord}
                  style={{
                    margin: "0px 4px 11px 4px",
                  }}
                >
                  Profile
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
        <div className="dashboardRootMainContainer">
          <div className="dashboardFirstGrid">gd</div>
          <div className="dashboardSecondGrid">gsf</div>
          <div className="dashboardThirdGrid">daf</div>
          <div className="dashboardFourthGrid">dsd</div>
        </div>
      </main>
    </div>
  );
}

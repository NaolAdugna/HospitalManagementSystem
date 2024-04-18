import React, { useState } from "react";
import "../styles/DoctorRoot.css";

// Fontawesome family
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
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import GridViewIcon from "@mui/icons-material/GridView";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { TextField } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DarkMode from "./DarkMode.js";

import { ReactComponent as Sun } from "../../../../assets/icon/Sun.svg";
import { ReactComponent as Moon } from "../../../../assets/icon/Moon.svg";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
export default function DoctorRoot({ component }) {
  const [theme, setTheme] = useState(
    localStorage.getItem("selectedTheme") || "light"
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const openProfile = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  ////
  const [openEditProfile, setOpenEditProfile] = React.useState(false);
  const [openProfileRecord, setOpenProfileRecord] = React.useState(false);

  const [userName, setUserName] = React.useState(
    sessionStorage.getItem("username")
  );
  const [emailSession, setEmailSession] = React.useState(
    sessionStorage.getItem("email")
  );

  const [Name, setName] = React.useState(userName);
  const [Email, setEmailUpdateProfile] = React.useState(emailSession);

  const idProfile = sessionStorage.getItem("id");
  const secret = sessionStorage.getItem("secret");
  const roleSession = sessionStorage.getItem("role");
  const dateofregistrationSession =
    sessionStorage.getItem("dateofregistration");
  React.useEffect(() => {
    setUserName(sessionStorage.getItem("username"));
    setEmailSession(sessionStorage.getItem("email"));
  }, []);
  const handleUpdateProfile = (newUserName, newEmail) => {
    sessionStorage.setItem("username", newUserName);
    sessionStorage.setItem("email", newEmail);
    setUserName(newUserName);
    setEmailSession(newEmail);
  };
  const handleOpenEditProfile = () => {
    setOpenProfileRecord(false);
    setOpenEditProfile(true);
  };
  const handleCloseEditProfile = () => {
    setOpenEditProfile(false);
  };
  const handleClickOpenProfileRecord = () => {
    setOpenProfileRecord(true);
    setAnchorEl(null);
  };
  const handleCloseProfileRecord = () => {
    setOpenProfileRecord(false);
  };
  ////
  const userNameFirstLetter = userName.charAt(0);

  function handleLogout() {
    sessionStorage.clear();
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
        // background: "orange",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List
        className="doctorRootDrawerContainer"
        style={{
          // background: "pink",
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
            link: "/doctor",
            icon: <DashboardCustomizeRoundedIcon />,
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
            <ListItemButton href={link}>
              <ListItemIcon style={{ color: "#14ac5f" }}>{icon}</ListItemIcon>
              <ListItemText
                primary={text}
                className="doctorRootDrawerContainer"
              />
            </ListItemButton>
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

  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
  };
  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("selectedTheme", "light");
  };
  const selectedTheme = localStorage.getItem("selectedTheme");
  if (selectedTheme === "dark") {
    setDarkMode();
  }

  const toggleTheme = (e) => {
    if (e.target.checked) setDarkMode();
    else setLightMode();
  };

  return (
    <div>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        className="doctorRootDrawerContainer"
      >
        {DrawerList}
      </Drawer>
      <main className="doctorRootDashboard ">
        <div className="doctorRootDashboardFirstCard">
          <div className="doctorRootDashboardNavBarContainer">
            <div>
              <FontAwesomeIcon
                icon={faBars}
                className="navBarHamburger"
                onClick={toggleDrawer(true)}
              />
            </div>
            <div className="doctorRootDashboardLogOutContainer">
              <h4 style={{ textDecoration: "underline" }}>
                Welcome {userName}
              </h4>
              <Button
                id="basic-button"
                aria-controls={openProfile ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openProfile ? "true" : undefined}
                onClick={handleClick}
              >
                <Avatar sx={{ bgcolor: "#5c6bc0" }}>
                  {userNameFirstLetter}
                </Avatar>
              </Button>

              <div className="dark_mode">
                <input
                  className="dark_mode_input"
                  type="checkbox"
                  id="darkmode-toggle"
                  onChange={toggleTheme}
                  defaultChecked={selectedTheme === "dark"}
                />
                <label className="dark_mode_label" htmlFor="darkmode-toggle">
                  <Sun />
                  <Moon />
                </label>
              </div>
              {/* <DarkMode /> */}

              {/* <FormControlLabel
                control={<MaterialUISwitch sx={{ m: 1 }} />}
                // label="MUI switch"
              /> */}
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
                <MenuItem
                  onClick={handleLogout}
                  style={{
                    backgroundColor: " rgba(255, 0, 0, 0.8)",
                    margin: "11px 4px 4px 4px",
                    color: "#fff",
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
              <div>
                <Dialog
                  fullWidth
                  open={openProfileRecord}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleCloseProfileRecord}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle>
                    {"Your Profile "} {userName}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      <b> ID: </b> {idProfile}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-slide-description">
                      <b> Name: </b> {userName}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-slide-description">
                      <b> Email: </b> {emailSession}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-slide-description">
                      <b>Role: </b> {roleSession}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-slide-description">
                      <b> Date of Registration: </b> {dateofregistrationSession}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseProfileRecord}>Close</Button>
                    <Button onClick={handleOpenEditProfile}>Edit</Button>
                  </DialogActions>
                </Dialog>
              </div>
              <Dialog
                open={openEditProfile}
                onClose={handleCloseEditProfile}
                PaperProps={{
                  component: "form",
                  onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    let registerPromise = axios.put(
                      `/api/update-user-profile/`,
                      {
                        id: formJson.id,
                        Name: formJson.name,
                        Email: formJson.email,
                      }
                    );
                    registerPromise
                      .then(() => {
                        handleUpdateProfile(formJson.name, formJson.email);
                        toast.success("Profile updated successfully");
                      })
                      .catch((error) => {
                        console.error("Could not update profile:", error);
                        toast.error("Failed to update profile");
                      });
                    handleCloseEditProfile();
                  },
                }}
              >
                <DialogTitle>Update Your Profile</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Fill the form to update you profile
                  </DialogContentText>
                  <input type="hidden" name="id" value={idProfile} />
                  <label>FULL NAME</label>
                  <TextField
                    required
                    margin="dense"
                    id="name"
                    name="name"
                    // label={userName}
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                  <label>EMAIL</label>
                  <TextField
                    required
                    margin="dense"
                    id="email"
                    name="email"
                    value={Email}
                    onChange={(e) => setEmailUpdateProfile(e.target.value)}
                    type="email"
                    fullWidth
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseEditProfile}>Cancel</Button>
                  <Button type="submit">Update</Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
        <div className="doctorRootDashboardSecondCard">
          <Toaster position="top-center" reverseOrder={false}></Toaster>
          {/* {props.component} */}
          {React.cloneElement(component, { theme })}
        </div>
      </main>
    </div>
  );
}

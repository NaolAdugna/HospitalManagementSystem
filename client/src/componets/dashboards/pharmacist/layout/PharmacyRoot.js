import React, { useState, useEffect } from "react";
import "../styles/PharmacyRoot.css";

// Fontawesome family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, NavLink } from "react-router-dom";

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

import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { TextField } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Slide from "@mui/material/Slide";

// modules for attendance
import CoPresentRoundedIcon from "@mui/icons-material/CoPresentRounded";
import moment from "moment";
import CountdownTimer from "../../reception/layout/CountdownTimer";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
export default function PharmacyRoot(props) {
  const idProfile = sessionStorage.getItem("id");
  const [currentTime, setCurrentTime] = useState(moment());
  const [endTimes, setEndTimes] = useState("");

  useEffect(() => {
    setEndTimes(calculateAttendanceTime());
  }, []);

  const calculateAttendanceTime = () => {
    const startTime = moment().set({ hour: 10, minute: 0, second: 0 });
    const endTime = moment().set({ hour: 16, minute: 38, second: 0 });
    return endTime;
  };
  const isAttendanceTime = () => {
    const startTime = moment().set({ hour: 10, minute: 0, second: 0 });
    return currentTime.isBetween(startTime, endTimes);
  };

  const [openAttendance, setOpenAttendance] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const status = "present";
  useEffect(() => {
    axios
      .get(`/api/user-marked-attendance`, {
        params: {
          id: idProfile,
        },
      })
      .then((response) => {
        setAttendanceMarked(response.data);
      })
      .catch((error) => {
        console.error("Error fetching attendance status:", error);
      });
  }, []);

  const handleCloseAttendance = () => {
    setOpenAttendance(false);
  };
  const handleOpenAttendance = () => {
    setOpenAttendance(true);
  };

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
            link: "/pharmacy",
            icon: <DashboardCustomizeRoundedIcon />,
          },
          {
            text: "Chat Staff",
            link: "/pharmacy-chat",
            icon: <ChatOutlinedIcon />,
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
                  className="doctorRootDrawerContainer"
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
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <main className="pharmacyRootDashboard ">
        <div className="pharmacyRootDashboardFirstCard">
          <div className="pharmacyRootDashboardNavBarContainer">
            <div>
              <FontAwesomeIcon
                icon={faBars}
                className="navBarHamburger"
                onClick={toggleDrawer(true)}
              />
            </div>
            <div className="pharmacyRootDashboardLogOutContainer">
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
              {/* Attendance start */}
              {isAttendanceTime() && attendanceMarked ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <CountdownTimer endTime={endTimes} />
                  <Button
                    variant="outlined"
                    onClick={handleOpenAttendance}
                    endIcon={<CoPresentRoundedIcon />}
                    style={{
                      background: "#14ac5f",
                      border: "none",
                      color: "white",
                      marginRight: "11px",
                    }}
                  >
                    Attendance
                  </Button>
                </div>
              ) : (
                <div></div>
              )}
              <Dialog
                open={openAttendance}
                onClose={handleCloseAttendance}
                PaperProps={{
                  component: "form",
                  onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    let AttendancePromise = axios.post(`/api/user-attendance`, {
                      id: formJson.id,
                      UserName: formJson.username,
                      Status: formJson.status,
                    });
                    AttendancePromise.then(() => {
                      toast.success("Attendance Marked Present successfully");
                      window.location.reload();
                    }).catch((error) => {
                      console.error("Could not mark present profile:", error);
                      toast.error("Failed to mark present");
                    });
                    handleCloseAttendance();
                  },
                }}
              >
                <DialogTitle> Today Attendance</DialogTitle>
                <DialogContent>
                  <DialogContentText style={{ color: "black" }}>
                    Please mark your attendance to ensure accurate records of
                    your presence.!
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <input type="hidden" name="id" value={idProfile} />
                  <input type="hidden" name="username" value={userName} />
                  <input type="hidden" name="status" value={status} />
                  <Button
                    onClick={handleCloseAttendance}
                    style={{ color: "white", background: "gray" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    style={{ color: "white", background: "#14ac5f" }}
                  >
                    Present
                  </Button>
                </DialogActions>
              </Dialog>
              {/* Attendance End */}
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
        <div className="pharmacyRootDashboardSecondCard">
          <Toaster position="top-center" reverseOrder={false}></Toaster>
          {props.component}
        </div>
      </main>
    </div>
  );
}

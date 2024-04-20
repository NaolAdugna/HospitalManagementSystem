import React, { useState, useEffect } from "react";
import "../styles/DoctorRoot.css";

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
import GridViewIcon from "@mui/icons-material/GridView";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import MedicationIcon from "@mui/icons-material/Medication";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { TextField } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Slide from "@mui/material/Slide";
// modules for attendance
import CoPresentRoundedIcon from "@mui/icons-material/CoPresentRounded";
import moment from "moment";
import momentTimezone from "moment-timezone";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const getLocalTime = () => {
  return moment().tz("Africa/Addis_Ababa"); // Return a moment object representing the current local time
};

export default function DoctorRoot(props) {
  const [currentTime, setCurrentTime] = useState(getLocalTime());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getLocalTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // momentTimezone.tz.setDefault("Africa/Addis_Ababa");

  const isAttendanceTime = () => {
    const startTime = moment()
      .set({ hour: 4, minute: 0, second: 0 })
      .tz("Africa/Addis_Ababa");
    const endTime = moment()
      .set({ hour: 5, minute: 30, second: 0 })
      .tz("Africa/Addis_Ababa");

    // console.log("ct", currentTime);
    // console.log("st", startTime);
    // console.log("et", endTime);

    // Check if the current time is between the start and end times
    return currentTime.isBetween(startTime, endTime);
    // const startTime = moment().set({ hour: 4, minute: 0, second: 0 });
    // const endTime = moment().set({ hour: 5, minute: 30, second: 0 });

    // // Format the current time with the desired format
    // const formattedCurrentTime = currentTime.format(
    //   "h:mm A dddd, MMMM D, YYYY (GMTZ)"
    // );

    // // Format the start and end times with the same format
    // const formattedStartTime = startTime.format(
    //   "h:mm A dddd, MMMM D, YYYY (GMTZ)"
    // );
    // const formattedEndTime = endTime.format("h:mm A dddd, MMMM D, YYYY (GMTZ)");
    // console.log("st", formattedStartTime);
    // console.log("et", formattedEndTime);
    // console.log("ct", formattedCurrentTime);

    // // Check if the formatted current time is between the formatted start and end times
    // const result = moment(
    //   formattedCurrentTime,
    //   "h:mm A dddd, MMMM D, YYYY (GMTZ)"
    // ).isBetween(formattedStartTime, formattedEndTime);

    // console.log("mome", result);
    // return result;
  };

  const [openAttendance, setOpenAttendance] = useState(false);
  const status = "present";

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
        background: "orange",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List
        className="doctorRootDrawerContainer"
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
            text: "Chat Staff",
            link: "/doctor-chat",
            icon: <ChatOutlinedIcon />,
          },
          {
            text: "Gemini AI",
            link: "/doctor-ai",
            icon: <GridViewIcon />,
          },
          {
            text: "Prepare Prescription",
            link: "/doctor-prescription",
            icon: <MedicationIcon />,
          },
          {
            text: "Prepare Lab Reques",
            link: "/doctor-lab-request",
            icon: <BookmarkBorderIcon />,
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
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        className="doctorRootDrawerContainer"
        style={{ borderRight: "1px solid white" }}
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
              {isAttendanceTime() ? (
                <div>
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
                <div>
                  <h3>no</h3>
                </div>
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

              {/* {isAttendanceTime() && (
                <div>
                  <Button
                    variant="outlined"
                    endIcon={<CoPresentRoundedIcon />}
                    // onClick={() => setOpenPopupFile(true)}
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
              )} */}

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
          {props.component}
        </div>
      </main>
    </div>
  );
}

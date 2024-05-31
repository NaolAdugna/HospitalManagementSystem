import React, { useState, useEffect } from "react";
import "../style/LabRoot.css";

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
import SummarizeIcon from "@mui/icons-material/Summarize";

// modules for attendance
import CoPresentRoundedIcon from "@mui/icons-material/CoPresentRounded";
import moment from "moment";
import CountdownTimer from "../../reception/layout/CountdownTimer";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
export default function LabRoot(props) {
  const idProfile = sessionStorage.getItem("id");
  const [currentTime, setCurrentTime] = useState(moment());
  const [endTimes, setEndTimes] = useState("");

  const [endTimesAfternoon, setEndTimesAfternoon] = useState("");

  useEffect(() => {
    setEndTimesAfternoon(calculateAttendanceTimeAfternoon());
  }, []);

  const calculateAttendanceTimeAfternoon = () => {
    const endTime = moment().set({ hour: 17, minute: 30, second: 0 });
    return endTime;
  };
  const isAttendanceTimeAfternoon = () => {
    const startTime = moment().set({ hour: 17, minute: 0, second: 0 });
    return currentTime.isBetween(startTime, endTimesAfternoon);
  };
  useEffect(() => {
    setEndTimes(calculateAttendanceTime());
  }, []);

  const calculateAttendanceTime = () => {
    const endTime = moment().set({ hour: 8, minute: 30, second: 0 });
    return endTime;
  };
  const isAttendanceTime = () => {
    const startTime = moment().set({ hour: 8, minute: 0, second: 0 });
    return currentTime.isBetween(startTime, endTimes);
  };

  const [openAttendance, setOpenAttendance] = useState(false);
  const [openAfternoonAttendance, setOpenAfternoonAttendance] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [afternoonAttendanceMarked, setAfternoonAttendanceMarked] =
    useState(false);
  const morning_status = "present";
  const afternon_status = "absent";
  const morning_status2 = "present";
  const afternon_status2 = "present";
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

  useEffect(() => {
    axios
      .get(`/api/user-marked-afternoon-attendance/${idProfile}`)
      .then((response) => {
        setAfternoonAttendanceMarked(response.data);
      })
      .catch((error) => {
        console.error("Error fetching attendance status:", error);
      });
  }, [afternoonAttendanceMarked]);

  const handleCloseAttendance = () => {
    setOpenAttendance(false);
  };
  const handleOpenAttendance = () => {
    setOpenAttendance(true);
  };

  const handleCloseAfternoonAttendance = () => {
    setOpenAfternoonAttendance(false);
  };
  const handleOpenAfternoonAttendance = () => {
    setOpenAfternoonAttendance(true);
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
            link: "/labratory",
            icon: <DashboardCustomizeRoundedIcon />,
          },
          {
            text: "Gemini AI",
            link: "/labratory-report",
            icon: <SummarizeIcon />,
          },
          {
            text: "Chat Staff",
            link: "/labratory-chat",
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
      <main className="labRootDashboard ">
        <div className="labRootDashboardFirstCard">
          <div className="labRootDashboardNavBarContainer">
            <div>
              <FontAwesomeIcon
                icon={faBars}
                className="navBarHamburger"
                onClick={toggleDrawer(true)}
              />
            </div>
            <div className="labRootDashboardLogOutContainer">
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
              {isAttendanceTimeAfternoon() && afternoonAttendanceMarked ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <CountdownTimer endTime={endTimesAfternoon} />
                  <Button
                    variant="outlined"
                    onClick={handleOpenAfternoonAttendance}
                    endIcon={<CoPresentRoundedIcon />}
                    style={{
                      background: "#14ac5f",
                      border: "none",
                      color: "white",
                      marginRight: "11px",
                    }}
                  >
                    Afternon Attendance
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
                      Morning_Status: formJson.morning_status,
                      Afternoon_Status: formJson.afternoon_status,
                    });
                    AttendancePromise.then(() => {
                      toast.success(
                        "Morning Attendance Marked Present successfully"
                      );
                      window.location.reload();
                    }).catch((error) => {
                      console.error("Could not mark present profile:", error);
                      toast.error("Failed to mark present");
                    });
                    handleCloseAttendance();
                  },
                }}
              >
                <DialogTitle> Today Morning Attendance</DialogTitle>
                <DialogContent>
                  <DialogContentText style={{ color: "black" }}>
                    Please mark your attendance to ensure accurate records of
                    your presence.!
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <input type="hidden" name="id" value={idProfile} />
                  <input type="hidden" name="username" value={userName} />
                  <input
                    type="hidden"
                    name="morning_status"
                    value={morning_status}
                  />
                  <input
                    type="hidden"
                    name="afternoon_status"
                    value={afternon_status}
                  />
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

              {/* AFTERNOON ATTANDANCE STARTS */}
              <Dialog
                open={openAfternoonAttendance}
                onClose={handleCloseAfternoonAttendance}
                PaperProps={{
                  component: "form",
                  onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    let AttendancePromise = axios.put(
                      `/api/user-afternoon-attendance`,
                      {
                        id: formJson.id,

                        Afternoon_Status2: formJson.afternoon_status2,
                      }
                    );
                    AttendancePromise.then(() => {
                      toast.success("Attendance Marked Present successfully");
                      window.location.reload();
                    }).catch((error) => {
                      console.error("Could not mark present profile:", error);
                      toast.error("Failed to mark present");
                    });
                    handleCloseAfternoonAttendance();
                  },
                }}
              >
                <DialogTitle> Today Afternon Attendance</DialogTitle>
                <DialogContent>
                  <DialogContentText style={{ color: "black" }}>
                    Please mark your attendance to ensure accurate records of
                    your presence.!
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <input type="hidden" name="id" value={idProfile} />
                  <input type="hidden" name="username" value={userName} />
                  <input
                    type="hidden"
                    name="morning_status2"
                    value={morning_status2}
                  />
                  <input
                    type="hidden"
                    name="afternoon_status2"
                    value={afternon_status2}
                  />
                  <Button
                    onClick={handleCloseAfternoonAttendance}
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
              {/* AFTERNOON ATTANDANCE Ends */}
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
        <div className="labRootDashboardSecondCard">
          <Toaster position="top-center" reverseOrder={false}></Toaster>
          {props.component}
        </div>
      </main>
    </div>
  );
}

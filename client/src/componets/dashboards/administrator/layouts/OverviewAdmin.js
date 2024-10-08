import * as React from "react";
import "../styles/OverviewAdmin.css";
// import SideBarData from "./Data";

// Fontawesome family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBars, faAdd } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, NavLink } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Calendar from "react-calendar";

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
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import AppRegistrationRoundedIcon from "@mui/icons-material/AppRegistrationRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import PreviewRoundedIcon from "@mui/icons-material/PreviewRounded";
import "react-calendar/dist/Calendar.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import axios from "axios";
import Slide from "@mui/material/Slide";
import toast from "react-hot-toast";
import { useFormik } from "formik";

// modules for attendance
import CoPresentRoundedIcon from "@mui/icons-material/CoPresentRounded";
import moment from "moment";
import CountdownTimer from "../../reception/layout/CountdownTimer";

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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function OverviewAdmin() {
  const [numberofAdmin, setNumberofAdmin] = React.useState();
  const [numberofReception, setNumberofReception] = React.useState();
  const [numberofDoctor, setNumberofDoctor] = React.useState();
  const [numberofLab, setNumberofLab] = React.useState();
  const [numberofPharmacy, setNumberofPharmacy] = React.useState();
  const [numberofPatient, setNumberofPatient] = React.useState();
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
  React.useEffect(() => {
    const adminNumber = axios.get(`/api/number-of-admin/administrator`);

    adminNumber.then((response) => {
      setNumberofAdmin(response.data);
    });
    adminNumber.catch((error) => {
      console.error("Error fetching admin status:", error);
    });

    const ReceptionNumber = axios.get(`/api/number-of-admin/receptionist`);

    ReceptionNumber.then((response) => {
      setNumberofReception(response.data);
    });
    ReceptionNumber.catch((error) => {
      console.error("Error fetching reception status:", error);
    });

    const DoctorNumber = axios.get(`/api/number-of-admin/doctor`);

    DoctorNumber.then((response) => {
      setNumberofDoctor(response.data);
    });
    DoctorNumber.catch((error) => {
      console.error("Error fetching doctor status:", error);
    });

    const LabNumber = axios.get(`/api/number-of-admin/labTechnician`);

    LabNumber.then((response) => {
      setNumberofLab(response.data);
    });
    LabNumber.catch((error) => {
      console.error("Error fetching lab status:", error);
    });

    const PharmacyNumber = axios.get(`/api/number-of-admin/pharmacist`);

    PharmacyNumber.then((response) => {
      setNumberofPharmacy(response.data);
    });
    PharmacyNumber.catch((error) => {
      console.error("Error fetching pharmacist status:", error);
    });

    const PatientNumber = axios.get(`/api/number-of-patient/`);

    PatientNumber.then((response) => {
      setNumberofPatient(response.data);
    });
    PatientNumber.catch((error) => {
      console.error("Error fetching number-of-patient status:", error);
    });
  }, [
    numberofAdmin,
    numberofDoctor,
    numberofReception,
    numberofLab,
    numberofPharmacy,
    numberofPatient,
  ]);

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
        data: [
          numberofAdmin || 0,
          numberofReception || 0,
          numberofDoctor || 0,
          numberofPharmacy || 0,
          numberofLab || 0,
          numberofPatient || 0,
        ],
        backgroundColor: "rgba(20, 172, 95,0.8)",
      },
    ],
  };
  const idProfile = sessionStorage.getItem("id");
  const [currentTime, setCurrentTime] = React.useState(moment());
  const [endTimes, setEndTimes] = React.useState("");
  const [endTimesAfternoon, setEndTimesAfternoon] = React.useState("");

  const [openAfternoonAttendance, setOpenAfternoonAttendance] =
    React.useState(false);
  const [afternoonAttendanceMarked, setAfternoonAttendanceMarked] =
    React.useState(false);
  React.useEffect(() => {
    setEndTimes(calculateAttendanceTime());
  }, []);
  React.useEffect(() => {
    setEndTimesAfternoon(calculateAttendanceTimeAfternoon());
  }, []);

  const calculateAttendanceTime = () => {
    const endTime = moment().set({ hour: 8, minute: 30, second: 0 });
    return endTime;
  };
  const isAttendanceTime = () => {
    const startTime = moment().set({ hour: 8, minute: 0, second: 0 });
    return currentTime.isBetween(startTime, endTimes);
  };

  const calculateAttendanceTimeAfternoon = () => {
    const endTime = moment().set({ hour: 4, minute: 30, second: 0 });
    return endTime;
  };
  const isAttendanceTimeAfternoon = () => {
    const startTime = moment().set({ hour: 3, minute: 0, second: 0 });
    return currentTime.isBetween(startTime, endTimesAfternoon);
  };

  const [openAttendance, setOpenAttendance] = React.useState(false);
  const [attendanceMarked, setAttendanceMarked] = React.useState(false);
  const morning_status = "present";
  const afternon_status = "absent";
  const morning_status2 = "present";
  const afternon_status2 = "present";
  const handleCloseAfternoonAttendance = () => {
    setOpenAfternoonAttendance(false);
  };
  const handleOpenAfternoonAttendance = () => {
    setOpenAfternoonAttendance(true);
  };

  const status = "present";
  React.useEffect(() => {
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

  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openProfile = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
  const [Email, setEmail] = React.useState(emailSession);

  const id = sessionStorage.getItem("id");
  const ChatPassword = sessionStorage.getItem("secret");
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
          {
            text: "View Attendance",
            link: "/admin-view-attendance",
            icon: <TextSnippetIcon />,
          },
          {
            text: "Chat Staff",
            link: "/admin-chat",
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
              {isAttendanceTimeAfternoon() || afternoonAttendanceMarked ? (
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
                    <b> ID: </b> {id}
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
                        chatpassword: formJson.chatpassword,
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
                  <input type="hidden" name="id" value={id} />
                  <input
                    type="hidden"
                    name="chatpassword"
                    value={ChatPassword}
                  />
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
                    onChange={(e) => setEmail(e.target.value)}
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
        <div className="adminOverviewDashboardSecondCard">
          {/* <div className="adminOverviewDashboardSecondFirstCard"> </div> */}
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
          {/* <div className="adminOverviewDashboardSecondFourthCard ">
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
          </div> */}
        </div>
      </main>
    </div>
  );
}

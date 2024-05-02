import React, { useState, useRef, useEffect } from "react";
import "../styles/PatientOverView.css";

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

import Avatar from "@mui/material/Avatar";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { TextField } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Slide from "@mui/material/Slide";

import ReactPrint from "react-to-print";
import QRCode from "react-qr-code";
import { Close } from "@mui/icons-material";
import ReactWaterMark from "react-watermark-component";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";
import AddIcon from "@mui/icons-material/Add";
import generatePDF, { Resolution, Margin } from "react-to-pdf";

// chat bot
import ChatBot from "react-chatbotify";
import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "../../../config";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
export default function PatientOverView() {
  const [Dates, setDates] = useState("");
  const [Day, setDay] = useState("");
  let newDate = new Date();
  let date = newDate.getDate();
  useEffect(() => {
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() +
      1}/${current.getFullYear()}`;
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = `${current.getDay()}`;
    const dayOfWeekName = daysOfWeek[day];
    setDates(date);
    setDay(dayOfWeekName);
  }, []);

  const ref = useRef();

  const [userName, setUserName] = React.useState(
    sessionStorage.getItem("name")
  );
  const [emailSession, setEmailSession] = React.useState(
    sessionStorage.getItem("email")
  );
  React.useEffect(() => {
    setUserName(sessionStorage.getItem("username"));
    setEmailSession(sessionStorage.getItem("email"));
  }, []);
  const text = "GebreTsadik ";
  const optionWaterMark = {
    chunkWidth: 200,
    chunkHeight: 80,
    textAlign: "center",
    textBaseline: "bottom",
    globalAlpha: 0.3,
    font: "bold 19px Arial",
    rotateAngle: -26,
    fillStyle: "rgba(0, 0, 0, 0.6)",
  };
  const options = {
    filename: `On ${userName} Medical Files on from GebreTsadik Shawo General Shawo Hospital on ${Dates}.pdf`,
    method: "save",

    resolution: Resolution.EXTREME,
    page: {
      margin: Margin.SMALL,
      format: "letter",
      orientation: "landscape",
    },
    canvas: {
      mimeType: "image/jpeg",
      qualityRatio: 1,
    },
    overrides: {
      pdf: {
        compress: true,
      },
      canvas: {
        useCORS: true,
      },
    },
  };
  const getTargetElement = () =>
    document.getElementById("patientMedicalRecordContent");

  const downloadPdf = () => generatePDF(getTargetElement, options);
  const [rows, setRows] = useState("");

  useEffect(() => {
    fetchPatientData();
  }, [userName]);

  const fetchPatientData = async () => {
    try {
      const response = await axios.get(
        `/api/patient-medical-history/${userName}`
      );
      setRows(response.data);
    } catch (error) {
      console.error("error fetching fetch PATIENT Data User Data", error);
    }
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

  const [ageSession, setAgeSession] = React.useState(
    sessionStorage.getItem("age")
  );

  const [Name, setName] = React.useState(userName);
  const [Email, setEmailUpdateProfile] = React.useState(emailSession);
  const [Age, setAgeUpdateProfile] = React.useState(ageSession);

  const idProfile = sessionStorage.getItem("id");
  const genderSession = sessionStorage.getItem("gender");
  const dateofregistrationSession = sessionStorage.getItem(
    "dateofregistration"
  );
  React.useEffect(() => {
    setUserName(sessionStorage.getItem("name"));
    setEmailSession(sessionStorage.getItem("email"));
    setAgeSession(sessionStorage.getItem("age"));
  }, []);
  const handleUpdateProfile = (newUserName, newEmail, newAge) => {
    sessionStorage.setItem("username", newUserName);
    sessionStorage.setItem("email", newEmail);
    sessionStorage.setItem("age", newAge);
    setUserName(newUserName);
    setEmailSession(newEmail);
    setAgeSession(newAge);
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
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("id");
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
            link: "/patient",
            icon: <DashboardCustomizeRoundedIcon />,
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
                  style={{ background: "transparent" }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const [openAppointment, setopenAppointment] = React.useState(false);

  const handleClickopenAppointment = () => {
    setopenAppointment(true);
  };

  const handleCloseAppointment = () => {
    setopenAppointment(false);
  };
  const [appointmentDoctor, setAppointmentDoctor] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  useEffect(() => {
    fetchAppointmentData();
  }, [userName]);

  const fetchAppointmentData = async () => {
    try {
      const response = await axios.get(`/api/patient-appointment/${userName}`);
      setAppointmentDoctor(response.data.DoctorName);
      setAppointmentTime(response.data.DateOfAppointment);
    } catch (error) {
      console.error("error fetching fetch PATIENT Data User Data", error);
    }
  };
  const optionsChatbotify = {
    theme: {
      primaryColor: "#14ac5f",
      secondaryColor: "#143D59",
    },
    voice: { disabled: false },
    chatHistory: { storageKey: "playground" },
    botBubble: { simStream: true },
  };
  const genAI = new GoogleGenerativeAI(config.API_KEY);
  async function run(prompt, streamMessage) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContentStream(prompt);
    let text = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      text += chunkText;
      streamMessage(text);
    }
    return text;
  }

  const flow = {
    start: {
      message: "Hello, I am GebreTsadik Medical Assistant now, How can I help!",
      path: "model_loop",
    },
    model_loop: {
      message: async (params) => {
        return await run(params.userInput, params.streamMessage);
      },
      path: "model_loop",
    },
  };
  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <main className="patientOverviewDashboard ">
        <div className="patientOverviewDashboardFirstCard">
          <div className="patientOverviewDashboardNavBarContainer">
            <div>
              <FontAwesomeIcon
                icon={faBars}
                className="navBarHamburger"
                onClick={toggleDrawer(true)}
              />
            </div>
            <div className="patientOverviewDashboardLogOutContainer">
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
              <Button
                variant="outlined"
                onClick={handleClickopenAppointment}
                style={{
                  background: "#14ac5f",
                  border: "none",
                  color: "white",
                  marginRight: "8px",
                }}
              >
                View Appointment
              </Button>

              {/* View Appointment Dialog Starts  */}
              <Dialog
                open={openAppointment}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseAppointment}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>
                  {"You Can View Your Appointment Here If You Have Any."}
                </DialogTitle>
                {appointmentDoctor && appointmentTime ? (
                  // If appointmentDoctor and appointmentTime are truthy, render appointment details
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      Your Doctor Name - {appointmentDoctor}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-slide-description">
                      Your Appointment Date and Time - {appointmentTime}
                    </DialogContentText>
                  </DialogContent>
                ) : (
                  // If appointmentDoctor or appointmentTime is falsy, render a message indicating no appointment
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      You don't have any appointment scheduled.
                    </DialogContentText>
                  </DialogContent>
                )}
                {/* <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                     Your Doctor Name - 
                    {appointmentDoctor} 
                  </DialogContentText>
                  <DialogContentText id="alert-dialog-slide-description">
                    Your Appointment Date and Time - {appointmentTime}
                  </DialogContentText>
                </DialogContent> */}
                <DialogActions>
                  <Button
                    onClick={handleCloseAppointment}
                    style={{ background: "gray", color: "#fff" }}
                  >
                    Close
                  </Button>
                </DialogActions>
              </Dialog>

              {/* View Appointment Dialog Ends  */}

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
                  {"Your Profile "} {userName} is
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    <b> ID: </b> {idProfile}
                  </DialogContentText>
                  <DialogContentText id="alert-dialog-slide-description">
                    <b> Name: </b> {userName}
                  </DialogContentText>
                  <DialogContentText id="alert-dialog-slide-description">
                    <b> Age: </b> {ageSession}
                  </DialogContentText>
                  <DialogContentText id="alert-dialog-slide-description">
                    <b> Gender: </b> {genderSession}
                  </DialogContentText>
                  <DialogContentText id="alert-dialog-slide-description">
                    <b> Email: </b> {emailSession}
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
                      `/api/update-patient-profile/`,
                      {
                        id: formJson.id,
                        Name: formJson.name,
                        Email: formJson.email,
                        Age: formJson.age,
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
                  <label>AGE</label>
                  <TextField
                    required
                    margin="dense"
                    id="age"
                    name="age"
                    // label={userName}
                    value={Age}
                    onChange={(e) => setAgeUpdateProfile(e.target.value)}
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
        <div className="patientOverviewDashboardSecondCard">
          <Toaster position="top-center" reverseOrder={false}></Toaster>
          <div>
            <h1
              style={{
                textAlign: "center",
                marginBottom: "12px",
                marginTop: "12px",
              }}
            >
              Your Medical Record from GebreTsadik Shawo General Hospital{" "}
            </h1>

            <div
              className="patientMedicalRecordContent"
              id="patientMedicalRecordContent"
              ref={ref}
            >
              <ReactWaterMark waterMarkText={text} options={optionWaterMark}>
                <div className="col-md-12">
                  <div className="patientMedicalRecordHeader">
                    <div className="col-md-4 brcode">
                      <QRCode
                        size={256}
                        style={{
                          height: "auto",
                          maxWidth: "120px",
                          width: "100%",
                        }}
                        value={`${userName} Medical Record from GebreTsadik Shawo General Hospital.`}
                        viewBox={`0 0 256 256`}
                      />
                    </div>
                    <div className="col-md-8 text-right bbc">
                      <h2 style={{ color: "#325aa8" }}>
                        <strong>Gebre Tsadik Shawo General Hospital</strong>
                      </h2>
                      <p>Email: gebretsadikshawogeneralhospital@gmail.com</p>
                      <p>Tel: +251 912345678</p>
                    </div>
                  </div>
                  <br />

                  <br />
                  <div>
                    <div>
                      <h2>Patient Name - {userName}</h2>
                    </div>
                  </div>
                  <br />
                  <div>
                    <h3>Your Medical Record</h3>
                    <p>{rows}</p>
                  </div>

                  <div>
                    <br />
                    <div className="col-md-12">
                      <p>
                        <b>Date :</b> {Dates}{" "}
                      </p>
                      <p>
                        <b>Name: </b>
                        {userName}
                      </p>
                      <p>
                        <b>Contact: </b>
                        {emailSession}
                      </p>
                    </div>
                  </div>
                </div>
              </ReactWaterMark>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "11px",
              }}
            >
              <Button
                variant="outlined"
                startIcon={<GetAppOutlinedIcon />}
                style={{
                  background: "#14ac5f",
                  border: "none",
                  color: "white",
                  marginRight: "8px",
                }}
                onClick={downloadPdf}
              >
                Download File
              </Button>
              <ReactPrint
                trigger={() => (
                  <Button
                    variant="outlined"
                    startIcon={<PrintOutlinedIcon />}
                    style={{
                      background: "#4bad95",
                      border: "none",
                      color: "white",
                      marginRight: "8px",
                    }}
                  >
                    Print
                  </Button>
                )}
                content={() => ref.current}
                documentTitle={`On ${Day} Patient Files on ${Dates}`}
              />
            </div>

            <ChatBot options={optionsChatbotify} flow={flow} />
          </div>
        </div>
      </main>
    </div>
  );
}

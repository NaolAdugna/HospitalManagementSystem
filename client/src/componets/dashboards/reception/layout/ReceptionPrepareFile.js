import React, { useRef, useState, useEffect } from "react";
import "../styles/ReceptionPrepareFile.css";

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
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
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
// import ReactWaterMark from "react-watermark-component";
import ReactWaterMark from "react-watermark-component";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";
import AddIcon from "@mui/icons-material/Add";
import generatePDF, { Resolution, Margin, Options } from "react-to-pdf";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function ReceptionPrepareFile() {
  const ref = useRef();
  const [Dates, setDates] = useState("");
  let newDate = new Date();
  let date = newDate.getDate();
  useEffect(() => {
    const current = new Date();
    const date = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}`;
    //  console.log(`Date is ${date}`);
    setDates(date);
  }, []);
  const [openPopupFile, setOpenPopupFile] = useState(false);
  const [ListPatient, setListPatient] = useState([]);
  const [patientFile, setPatientFile] = useState("");
  const addDataFile = () => {
    ListPatient.push({
      patientname: patientFile,
    });
    setPatientFile("");
    setOpenPopupFile(false);
  };
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const openProfile = Boolean(anchorEl);
  const [open, setOpen] = useState(false);
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

  function handleLogout() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("token");
    navigate("/");
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const userNameFirstLetter = userName.charAt(0);

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
            link: "/reception-view-patient",
            icon: <DashboardCustomizeRoundedIcon />,
          },
          {
            text: "Prepare File",
            link: "/reception-prepare-file",
            icon: <ManageAccountsRoundedIcon />,
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
        ></div>
      </List>
    </Box>
  );
  const text = "GebreTsadik ";
  const optionWaterMark = {
    chunkWidth: 200, // Increase chunk width for better readability
    chunkHeight: 80, // Increase chunk height for better readability
    textAlign: "center",
    textBaseline: "bottom",
    globalAlpha: 0.3, // Adjust transparency for better visibility
    font: "bold 19px Arial", // Increase font size and change font family for better readability
    rotateAngle: -26,
    fillStyle: "rgba(0, 0, 0, 0.6)", // Change text color to a more subtle gray
  };
  const options = {
    filename: `${Dates} Morning Patient Files.pdf`,
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
    document.getElementById("receptionPrepareFileContent");

  const downloadPdf = () => generatePDF(getTargetElement, options);
  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <main className="receptionPrepareFileDashboard ">
        <div className="receptionPrepareFileDashboardFirstCard">
          <div className="receptionPrepareFileDashboardNavBarContainer">
            <div>
              <FontAwesomeIcon
                icon={faBars}
                className="navBarHamburger"
                onClick={toggleDrawer(true)}
              />
            </div>
            <div className="receptionPrepareFileDashboardLogOutContainer">
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
        <div className="receptionPrepareFileDashboardSecondCard">
          <Toaster position="top-center" reverseOrder={false}></Toaster>
          <div className="receptionPrepareFileContainer">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "11px",
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
                documentTitle={`Patient File on ${Dates}`}
              />
            </div>
            <div
              className="receptionPrepareFileContent"
              id="receptionPrepareFileContent"
              ref={ref}
            >
              <ReactWaterMark
                waterMarkText={text}
                //   openSecurityDefense
                options={optionWaterMark}
              >
                <div className="col-md-12">
                  <div className="receptionPrepareFileHeader">
                    <div className="col-md-4 brcode">
                      <QRCode
                        size={256}
                        style={{
                          height: "auto",
                          maxWidth: "120px",
                          width: "100%",
                        }}
                        value={Dates}
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
                      <h2>Patient Name</h2>
                    </div>
                    <div style={{ marginLeft: "16px", marginTop: "5px" }}>
                      {ListPatient.length ? (
                        <ol>
                          {ListPatient.map((items, index) => {
                            return <li key={index}>{items.patientname}</li>;
                          })}
                        </ol>
                      ) : null}
                    </div>
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

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                endIcon={<AddIcon />}
                onClick={() => setOpenPopupFile(true)}
                style={{
                  background: "#14ac5f",
                  border: "none",
                  color: "white",
                }}
              >
                Add File
              </Button>
            </div>
          </div>
          <Dialog open={openPopupFile}>
            <DialogTitle>
              <div
                className="title"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div className="hed">New File</div>
                <div
                  className="icon-cross"
                  onClick={() => setOpenPopupFile(false)}
                >
                  <Close className="addNewFileButton" />
                </div>
              </div>
            </DialogTitle>
            <DialogContent>
              <div className="container">
                <div className="forms">
                  <TextField
                    autoFocus
                    type="text"
                    value={patientFile}
                    onChange={(e) => setPatientFile(e.target.value)}
                    placeholder="Patient Names"
                  />
                </div>
                <div className="buttons" style={{ float: "right" }}>
                  <Button
                    onClick={addDataFile}
                    style={{
                      background: "#14ac5f",
                      color: "#fff",
                      marginTop: "11px",
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
}

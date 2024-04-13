import React, { useState } from "react";
import "../styles/ReceptionRegister.css";
// Fontawesome family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faUser,
  faEyeSlash,
  faEye,
  faBars,
  faEnvelope,
  faUserShield,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { TextField } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
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
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";

import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import { registerPatientValidate } from "../../../../functions/validate";
import { registerPatient } from "../../../../functions/checker";

export default function ReceptionOverView() {
  const [anchorEl, setAnchorEl] = useState(null);
  const openProfile = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
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
  const togglePasswordVisisbility = () => {
    setIsOpen(!isOpen);
    setIsPasswordVisible(!isPasswordVisible);
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
            link: "/reception",
            icon: <DashboardCustomizeRoundedIcon />,
          },
          {
            text: "View Patients",
            link: "/reception-view-patient",
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
        >
          <button
            onClick={handleLogout}
            className="receptionRegisterLogOutButton"
          >
            Log Out
          </button>
        </div>
      </List>
    </Box>
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      age: "",
      gender: "",
      email: "",
      medicalhistory: "",
    },
    validate: registerPatientValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let registerPromise = registerPatient(values);
      toast.promise(registerPromise, {
        loading: "creating...",
        success: "register successfully...",
        error: "could not register",
      });

      registerPromise.then(function () {
        navigate("/reception-view-patient");
      });
    },
  });

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <main className="receptionRegisterDashboard ">
        <div className="receptionRegisterDashboardFirstCard">
          <div className="receptionRegisterDashboardNavBarContainer">
            <div>
              <FontAwesomeIcon
                icon={faBars}
                className="navBarHamburger"
                onClick={toggleDrawer(true)}
              />
            </div>
            <div className="receptionRegisterDashboardLogOutContainer">
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
        <div className="receptionRegisterDashboardSecondCard">
          <Toaster position="top-center" reverseOrder={false}></Toaster>
          <div>
            <div className="receptionRegisterBodyRegisterContainer">
              <div className="receptionRegisterContainer">
                <div className="receptionRegisterLoginTitle">
                  <h2>REGISTER PATIENT </h2>{" "}
                  <h2>
                    {" "}
                    <br />{" "}
                    <span
                      style={{
                        color: "#14ac5f",
                        textDecoration: "underline",
                      }}
                    >
                      {" "}
                      HERE
                    </span>
                  </h2>
                </div>
                <form
                  className="receptionRegisterFormContainer"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="receptionRegisterLoginName">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="receptionRegisterLoginNameIcon"
                    />
                    <TextField
                      name="name"
                      label="Enter name"
                      variant="standard"
                      id="standard-basic idOfName"
                      placeholder="Enter name"
                      className="receptionRegisterLoginInputs"
                      {...formik.getFieldProps("name")}
                    />
                  </div>
                  <div className="receptionRegisterLoginPassword receptionRegisterLoginName">
                    <FontAwesomeIcon
                      icon={faLock}
                      className="receptionRegisterLoginNameIcon"
                    />
                    <div className="receptionRegisterPasswordContainer">
                      <TextField
                        name="password"
                        label="Enter Password"
                        variant="standard"
                        id="standard-password-basic"
                        autoComplete="current-password"
                        type={isOpen ? "text" : "password"}
                        className="receptionRegisterLoginInputs"
                        {...formik.getFieldProps("password")}
                      />
                      {isPasswordVisible ? (
                        <FontAwesomeIcon
                          icon={faEye}
                          className="receptionRegisterShowPassword"
                          onClick={togglePasswordVisisbility}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faEyeSlash}
                          className="receptionRegisterShowPassword"
                          onClick={togglePasswordVisisbility}
                        />
                      )}
                    </div>
                  </div>
                  <div className="receptionRegisterLoginName">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="receptionRegisterLoginNameIcon"
                    />
                    <TextField
                      name="age"
                      label="Enter age"
                      variant="standard"
                      id="standard-basic idOfName"
                      placeholder="Enter age"
                      className="receptionRegisterLoginInputs"
                      {...formik.getFieldProps("age")}
                    />
                  </div>

                  <div className="receptionRegisterLoginName">
                    <FontAwesomeIcon
                      icon={faUserShield}
                      className="receptionRegisterLoginNameIcon"
                    />
                    <select
                      id="receptionRegisterSelectOption"
                      className="receptionRegisterLoginInputs"
                      {...formik.getFieldProps("gender")}
                      name="gender"
                    >
                      <option value="">Choose Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="receptionRegisterLoginName">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="receptionRegisterLoginNameIcon"
                    />
                    <TextField
                      name="email"
                      label="Enter email address"
                      variant="standard"
                      id="standard-basic idOfEmail"
                      placeholder="Enter email address"
                      className="receptionRegisterLoginInputs"
                      {...formik.getFieldProps("email")}
                    />
                  </div>
                  <div className="receptionRegisterLoginName">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="receptionRegisterLoginNameIcon"
                    />
                    <textarea
                      name="text"
                      rows={6}
                      style={{
                        resize: "none",
                        textAlign: "justify",
                        padding: "4px 8px",
                        fontSize: "16px",
                      }}
                      onResize={false}
                      variant="standard"
                      id="standard-basic idOfEmail"
                      className="receptionRegisterLoginInputs"
                      {...formik.getFieldProps("medicalhistory")}
                      // value={reason}
                      // onChange={(e) => setReason(e.target.value)}
                      placeholder="Medical History"
                      disabled
                    />
                  </div>

                  <div className="loginButtonContainer">
                    <button
                      className="receptionRegisterLoginPageButton"
                      type="submit"
                    >
                      Register
                    </button>
                  </div>
                  <div className="receptionRegisterRecaptchaContainer">
                    <ReCAPTCHA
                      size="normal"
                      badge="bottomright"
                      className="recaptchaContent"
                      sitekey="6Lc7vnEpAAAAAMTZG8RdEv78XquSIMvEa3EABIle"
                    />
                  </div>
                </form>
                <div className="receptionRegisterLoginCopyRightContainer">
                  <p>
                    CopyRight &copy; 2024 Gebretsadik Shawo General Hospital.
                    All Rights Reserverd.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

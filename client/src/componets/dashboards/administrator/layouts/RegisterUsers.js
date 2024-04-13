import React, { useState } from "react";
import "../styles/RegisterUser.css";
// import SideBarData from "./Data";

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
} from "@fortawesome/free-solid-svg-icons";
import { TextField } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";

import { registerdValidate } from "../../../../functions/validate";

import { registerUser } from "../../../../functions/checker";
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
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import AppRegistrationRoundedIcon from "@mui/icons-material/AppRegistrationRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import PreviewRoundedIcon from "@mui/icons-material/PreviewRounded";
export default function RegisterUsers() {
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
          <button onClick={handleLogout} className="adminRegisterLogOutButton">
            Log Out
          </button>
        </div>
      </List>
    </Box>
  );

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      role: "",
      email: "",
    },
    validate: registerdValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let registerPromise = registerUser(values);
      toast.promise(registerPromise, {
        loading: "creating...",
        success: "register successfully...",
        error: "could not register",
      });

      registerPromise.then(function () {
        navigate("/admin-manage-users");
      });
    },
  });
  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <main className="adminRegisterDashboard ">
        <div className="adminRegisterDashboardFirstCard">
          <div className="adminRegisterDashboardNavBarContainer">
            <div>
              <FontAwesomeIcon
                icon={faBars}
                className="navBarHamburger"
                onClick={toggleDrawer(true)}
              />
            </div>
            <div className="adminRegisterDashboardLogOutContainer">
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
        <div className="adminRegisterDashboardSecondCard">
          {/* <div className="card mainCardContainer"> */}
          <Toaster position="top-center" reverseOrder={false}></Toaster>
          <div>
            <div className="adminRegisterBodyRegisterContainer">
              <div className="adminRegisterContainer">
                <div className="adminRegisterLoginTitle">
                  <h2>REGISTER </h2>{" "}
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
                  className="adminRegisterFormContainer"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="adminRegisterLoginName">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="adminRegisterLoginNameIcon"
                    />
                    <TextField
                      name="username"
                      label="Enter Username"
                      variant="standard"
                      id="standard-basic idOfName"
                      placeholder="Enter username"
                      className="adminRegisterLoginInputs"
                      {...formik.getFieldProps("username")}
                    />
                  </div>
                  <div className="adminRegisterLoginPassword adminRegisterLoginName">
                    <FontAwesomeIcon
                      icon={faLock}
                      className="adminRegisterLoginNameIcon"
                    />
                    <div className="adminRegisterPasswordContainer">
                      <TextField
                        name="password"
                        label="Enter Password"
                        variant="standard"
                        id="standard-password-basic"
                        autoComplete="current-password"
                        type={isOpen ? "text" : "password"}
                        className="adminRegisterLoginInputs"
                        {...formik.getFieldProps("password")}
                      />
                      {isPasswordVisible ? (
                        <FontAwesomeIcon
                          icon={faEye}
                          className="adminRegisterShowPassword"
                          onClick={togglePasswordVisisbility}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faEyeSlash}
                          className="adminRegisterShowPassword"
                          onClick={togglePasswordVisisbility}
                        />
                      )}
                    </div>
                  </div>

                  <div className="adminRegisterLoginName">
                    <FontAwesomeIcon
                      icon={faUserShield}
                      className="adminRegisterLoginNameIcon"
                    />
                    <select
                      id="adminRegisterSelectOption"
                      className="adminRegisterLoginInputs"
                      {...formik.getFieldProps("role")}
                      name="role"
                    >
                      <option value="">Choose Role</option>
                      <option value="doctor">Doctor</option>
                      <option value="pharmacist">Pharmacist</option>
                      <option value="receptionist">Receptionist</option>
                      <option value="administrator">Administrator</option>
                      <option value="labTechnician">
                        Labratory Technician
                      </option>
                    </select>
                  </div>
                  <div className="adminRegisterLoginName">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="adminRegisterLoginNameIcon"
                    />
                    <TextField
                      name="email"
                      label="Enter email address"
                      variant="standard"
                      id="standard-basic idOfEmail"
                      placeholder="Enter email address"
                      className="adminRegisterLoginInputs"
                      {...formik.getFieldProps("email")}
                    />
                  </div>

                  <div className="loginButtonContainer">
                    <button
                      className="adminRegisterLoginPageButton"
                      type="submit"
                    >
                      Register
                    </button>
                  </div>
                  <div className="adminRegisterRecaptchaContainer">
                    <ReCAPTCHA
                      size="normal"
                      badge="bottomright"
                      className="recaptchaContent"
                      sitekey="6Lc7vnEpAAAAAMTZG8RdEv78XquSIMvEa3EABIle"
                    />
                  </div>
                </form>
                <div className="adminRegisterLoginCopyRightContainer">
                  <p>
                    CopyRight &copy; 2024 Gebretsadik Shawo General Hospital.
                    All Rights Reserverd.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </main>
    </div>
  );
}

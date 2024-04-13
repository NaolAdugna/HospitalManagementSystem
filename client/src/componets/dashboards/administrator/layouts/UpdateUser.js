import React, { useState, useEffect } from "react";
import "../styles/UpdateUser.css";
// import SideBarData from "./Data";

// Fontawesome family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { TextField } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";

import { useParams, useNavigate } from "react-router-dom";

import {
  faEnvelope,
  faLock,
  faUser,
  faEyeSlash,
  faEye,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import AppRegistrationRoundedIcon from "@mui/icons-material/AppRegistrationRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import PreviewRoundedIcon from "@mui/icons-material/PreviewRounded";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
export default function UpdateUser() {
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
  const { id } = useParams();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();

  useEffect(() => {
    axios.get(`/api/users/${id}`).then((res) => {
      setUsername(res.data[0].username);
      setEmail(res.data[0].email);
      setPassword(res.data[0].password);
      setRole(res.data[0].role);
    });
  }, [id]);

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
          <button onClick={handleLogout} className="adminUpdateLogOutButton">
            Log Out
          </button>
        </div>
      </List>
    </Box>
  );

  const formik = useFormik({
    initialValues: {
      username: username,
      password: password,
      role: role,
      email: email,
    },
    // validate: registerdValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      // let registerPromise = updateUserChecker(id, values);
      let registerPromise = axios.put(`/api/update-user/` + id, {
        username,
        password,
        role,
        email,
      });
      toast.promise(registerPromise, {
        loading: "Updating...",
        success: "Updated successfully...",
        error: "could not Update",
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
      <main className="adminUpdateDashboard ">
        <div className="adminUpdateDashboardFirstCard">
          <div className="adminUpdateDashboardNavBarContainer">
            <div>
              <FontAwesomeIcon
                icon={faBars}
                className="navBarHamburger"
                onClick={toggleDrawer(true)}
              />
            </div>
            <div className="adminUpdateDashboardLogOutContainer">
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
        <div className="adminUpdateDashboardSecondCard">
          {/* <div className="card mainCardContainer"> */}
          <Toaster position="top-center" reverseOrder={false}></Toaster>
          <div>
            <div className="adminUpdateBodyUpdateContainer">
              <div className="adminUpdateContainer">
                <div className="adminUpdateLoginTitle">
                  <h2>UPDATE </h2>{" "}
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
                  className="adminUpdateFormContainer"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="adminUpdateLoginName">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="adminUpdateLoginNameIcon"
                    />
                    <TextField
                      name="username"
                      variant="standard"
                      id="standard-basic idOfName"
                      className="adminUpdateLoginInputs"
                      {...formik.getFieldProps("username")}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="adminUpdateLoginPassword adminUpdateLoginName">
                    <FontAwesomeIcon
                      icon={faLock}
                      className="adminUpdateLoginNameIcon"
                    />
                    <div className="adminUpdatePasswordContainer">
                      <TextField
                        name="password"
                        variant="standard"
                        id="standard-password-basic"
                        autoComplete="current-password"
                        type={isOpen ? "text" : "password"}
                        className="adminUpdateLoginInputs"
                        {...formik.getFieldProps("password")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {isPasswordVisible ? (
                        <FontAwesomeIcon
                          icon={faEye}
                          className="adminUpdateShowPassword"
                          onClick={togglePasswordVisisbility}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faEyeSlash}
                          className="adminUpdateShowPassword"
                          onClick={togglePasswordVisisbility}
                        />
                      )}
                    </div>
                  </div>

                  {/* <div className="adminUpdateLoginName">
                    <FontAwesomeIcon
                      icon={faUserShield}
                      className="adminUpdateLoginNameIcon"
                    />
                    <select
                      id="adminUpdateSelectOption"
                      className="adminUpdateLoginInputs"
                      {...formik.getFieldProps("role")}
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="">Choose Role</option>
                      <option value="doctor">Doctor</option>
                      <option value="pharmacist">Pharmacist</option>
                      <option value="receptionist">Receptionist</option>
                      <option value="administrator">Administrator</option>
                      <option value="labratorytechnician">
                        Labratory Technician
                      </option>
                    </select>
                  </div> */}
                  <div className="adminUpdateLoginName">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="adminUpdateLoginNameIcon"
                    />
                    <TextField
                      name="email"
                      variant="standard"
                      id="standard-basic idOfEmail"
                      className="adminUpdateLoginInputs"
                      {...formik.getFieldProps("email")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="loginButtonContainer">
                    <button
                      className="adminUpdateLoginPageButton"
                      type="submit"
                    >
                      Update
                    </button>
                  </div>
                </form>
                <div className="adminUpdateLoginCopyRightContainer">
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

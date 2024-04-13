import React, { useEffect, useState } from "react";
import "../styles/DeleteUser.css";

// Fontawesome family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { TextField } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";

import { useParams, useNavigate } from "react-router-dom";

import {
  faEnvelope,
  faUserShield,
  faUser,
  faBars,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import AppRegistrationRoundedIcon from "@mui/icons-material/AppRegistrationRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import PreviewRoundedIcon from "@mui/icons-material/PreviewRounded";
export default function DeleteUser() {
  const [anchorEl, setAnchorEl] = useState(null);
  const openProfile = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { id } = useParams();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  const [reason, setReason] = useState();
  const [deletedby, setDeletedBy] = useState();

  const userName = sessionStorage.getItem("username");
  const userNameFirstLetter = userName.charAt(0);

  useEffect(() => {
    axios.get(`/api/users/${id}`).then((res) => {
      setUsername(res.data[0].username);
      setEmail(res.data[0].email);
      setPassword(res.data[0].password);
      setRole(res.data[0].role);
      setDeletedBy(userName);
    });
  }, [id]);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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
          <button onClick={handleLogout} className="adminDeleteLogOutButton">
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
      reason: reason,
      deletedby: userName,
    },
    // validate: registerdValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      // let registerPromise = updateUserChecker(id, values);
      let registerPromise = axios.delete(`/api/delete-user/` + id, {
        username,
        password,
        role,
        email,
      });
      toast.promise(registerPromise, {
        loading: "Deleting...",
        success: "Deleted successfully...",
        error: "could not Delete",
      });

      registerPromise.then(function () {
        axios.post(`/api/delete-user-register/` + id, {
          username,
          role,
          email,
          reason,
          deletedby,
        });
        navigate("/admin-manage-users");
      });
    },
  });
  return (
    <div>
      <div>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
        <main className="adminDeleteDashboard ">
          <div className="adminDeleteDashboardFirstCard">
            <div className="adminDeleteDashboardNavBarContainer">
              <div>
                <FontAwesomeIcon
                  icon={faBars}
                  className="navBarHamburger"
                  onClick={toggleDrawer(true)}
                />
              </div>
              <div className="adminDeleteDashboardLogOutContainer">
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
          <div className="adminDeleteDashboardSecondCard">
            {/* <div className="card mainCardContainer"> */}
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <div>
              <div className="adminDeleteBodyUpdateContainer">
                <div className="adminDeleteContainer">
                  <div className="adminDeleteLoginTitle">
                    <h2>DELETE </h2>{" "}
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
                    className="adminDeleteFormContainer"
                    onSubmit={formik.handleSubmit}
                  >
                    <div className="adminDeleteLoginName">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="adminDeleteLoginNameIcon"
                      />
                      <TextField
                        name="username"
                        variant="standard"
                        id="standard-basic idOfName"
                        className="adminDeleteLoginInputs"
                        {...formik.getFieldProps("username")}
                        // onChange={(e) => setUsername(e.target.value)}
                        value={username}
                      />
                    </div>
                    {/* <div className="adminDeleteLoginPassword adminDeleteLoginName">
                      <FontAwesomeIcon
                        icon={faLock}
                        className="adminDeleteLoginNameIcon"
                      />
                      <div className="adminDeletePasswordContainer">
                        <TextField
                          name="password"
                          variant="standard"
                          id="standard-password-basic"
                          autoComplete="current-password"
                          type={isOpen ? "text" : "password"}
                          className="adminDeleteLoginInputs"
                          {...formik.getFieldProps("password")}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {isPasswordVisible ? (
                          <FontAwesomeIcon
                            icon={faEye}
                            className="adminDeleteShowPassword"
                            onClick={togglePasswordVisisbility}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faEyeSlash}
                            className="adminDeleteShowPassword"
                            onClick={togglePasswordVisisbility}
                          />
                        )}
                      </div>
                    </div> */}

                    <div className="adminDeleteLoginName">
                      <FontAwesomeIcon
                        icon={faUserShield}
                        className="adminDeleteLoginNameIcon"
                      />
                      <select
                        id="adminDeleteSelectOption"
                        className="adminDeleteLoginInputs"
                        {...formik.getFieldProps("role")}
                        name="role"
                        value={role}
                        // onChange={(e) => setRole(e.target.value)}
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
                    </div>
                    <div className="adminDeleteLoginName">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="adminDeleteLoginNameIcon"
                      />
                      <TextField
                        name="email"
                        variant="standard"
                        id="standard-basic idOfEmail"
                        className="adminDeleteLoginInputs"
                        {...formik.getFieldProps("email")}
                        // onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </div>
                    <div className="adminDeleteLoginName">
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="adminDeleteLoginNameIcon"
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
                        className="adminDeleteLoginInputs"
                        {...formik.getFieldProps("reason")}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Enter reason for account deletion."
                        required
                      />
                    </div>
                    <div className="adminDeleteLoginName">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="adminDeleteLoginNameIcon"
                      />
                      <TextField
                        name="username"
                        variant="standard"
                        id="standard-basic idOfName"
                        className="adminDeleteLoginInputs"
                        {...formik.getFieldProps("deletedby")}
                        value={deletedby}
                        // onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>

                    <div className="loginButtonContainer">
                      <button
                        className="adminDeleteLoginPageButton"
                        type="submit"
                      >
                        Delete
                      </button>
                    </div>
                  </form>
                  <div className="adminDeleteLoginCopyRightContainer">
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
    </div>
  );
}

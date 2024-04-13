import React, { useRef, useState } from "react";
import "../styles/DoctorOverview.css";

// Fontawesome family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBars } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import GeminiProfile from "../../../../assets/images/google-gemini-icon.webp";
// import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
export default function DoctorOverView() {
  const [anchorEl, setAnchorEl] = useState(null);
  const openProfile = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [prompt, setPrompt] = useState("");
  const inputRef = useRef(null);
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
          justifyContent: "space-between",
          height: "100vh",
          width: "100%",
        }}
      >
        {["Dashboard"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon style={{ color: "#14ac5f" }}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        {/* <Divider /> */}
        <div
          style={{
            display: "flex",
            // alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button onClick={handleLogout} className="doctorLogOutButton">
            Log Out
          </button>
        </div>
      </List>
    </Box>
  );

  const makeRequestAPI = async (prompt) => {
    const res = await axios.post("http://localhost:8080/api/gemini", {
      prompt,
    });
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: makeRequestAPI,
    mutationKey: ["gemini-ai-request"],
  });
  //!submit handler
  const submitHandler = (e) => {
    if (e) {
      e.preventDefault();
    }
    mutation.mutate(prompt);
    setPrompt("");
    inputRef.current.blur();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents the default behavior of the Enter key (typically form submission)
      submitHandler(); // Calls the function to handle form submission or any desired action
    }
  };

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <main className="doctorDashboard ">
        <div className="doctorDashboardFirstCard">
          <div className="doctorDashboardNavBarContainer">
            <div>
              <FontAwesomeIcon
                icon={faBars}
                className="navBarHamburger"
                onClick={toggleDrawer(true)}
              />
            </div>
            <div className="doctorDashboardLogOutContainer">
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
        <div className="doctorDashboardSecondCard">
          {/* <div className="card mainDoctorContainer"> */}
          <div className="promptResult">
            <span className="promtResultAIProfile">
              <img
                src={GeminiProfile}
                className="promtResultImage"
                alt="gemini"
              />
            </span>
            <section>
              {mutation.isPending && (
                <p className="geminiSkeleton">
                  {
                    <Box sx={{ width: "100%" }}>
                      <Skeleton animation="pulse" />
                      <Skeleton animation="pulse" />
                      <Skeleton animation="pulse" />
                      <Skeleton animation="pulse" />
                      <Skeleton animation="pulse" />
                      <Skeleton animation="pulse" />
                      <Skeleton animation="pulse" />
                    </Box>
                  }
                </p>
              )}
              {mutation.isError && <p>{mutation.error.message}</p>}
              {mutation.isSuccess && <p>{mutation.data}</p>}
            </section>
          </div>
          <div className="geminiContainer">
            <form onSubmit={submitHandler}>
              <div className="promptContainer">
                <textarea
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Enter Prompt Here..."
                  className="promptInput"
                  ref={inputRef}
                  // cols={5}
                  rows={3}
                />
                <span onClick={submitHandler}>
                  <SendIcon className="formIcon" sx={{ fontSize: "40px" }} />
                </span>
                {/* <FontAwesomeIcon
                  icon={faPaperPlane}
                  className="formIcon"
                  onClick={submitHandler}
                /> */}
                {/* <button type="submit">Generate Content</button> */}
              </div>
            </form>
          </div>
          {/* </div> */}
        </div>
      </main>
    </div>
  );
}

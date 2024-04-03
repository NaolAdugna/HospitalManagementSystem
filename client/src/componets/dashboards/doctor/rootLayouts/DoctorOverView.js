import React, { useRef, useState } from "react";
import "../styles/DoctorOverview.css";

// Fontawesome family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBars,
  faDashboard,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import ScaleLoader from "react-spinners/ScaleLoader";
import GeminiProfile from "../../../../assets/images/google-gemini-icon.webp";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
export default function DoctorOverView() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(300);
  const [prompt, setPrompt] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    setSidebarWidth(showSidebar ? 0 : 300);
  };

  const styles = {
    side: {
      width: sidebarWidth,
    },
    "@media (max-width: 320px)": {
      side: {
        width: showSidebar ? "0" : "100%",
      },
    },
  };

  const userId = sessionStorage.getItem("id");
  const userName = sessionStorage.getItem("username");
  const userRole = sessionStorage.getItem("role");

  const userNameFirstLetter = userName.charAt(0);

  function handleLogout() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("token");
    navigate("/");
  }

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
    <div className="reportContainer">
      <div style={styles.side} className={showSidebar ? `side show` : `side`}>
        <div className="layoutContainer">
          <div className="sideBarContainer">
            <div className="sideBarIdentityContainer">
              <div className="sideBarProfile">
                {/* <img
                  src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                  alt="profile "
                  className="profileImage"
                /> */}
                <h1 className="receptionProfileImage">
                  {" "}
                  {userNameFirstLetter}
                </h1>
                <div className="sideBarContainerFooter">
                  <div>
                    <h4 title="UserName"> {userName} </h4>
                    <span title="Role">{userRole}</span>
                  </div>
                </div>
              </div>
              <div className="sideBarLinksContainer">
                <ul className="DoctorsideBarUnorderList">
                  <NavLink to="/doctor" className="DoctorsideBarLinks">
                    <div id="icons">
                      <FontAwesomeIcon icon={faDashboard} />
                    </div>
                    <div>Dashboard</div>
                  </NavLink>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main
        className="main"
        style={{
          gridColumn: showSidebar ? "1 / 4" : "1 / 3",
          marginLeft: sidebarWidth,
        }}
      >
        <div className="card ReceptionCardNavBarContainer">
          <div className="ReceptionnavBarContainer">
            <div>
              <FontAwesomeIcon
                icon={faBars}
                className="navBarHamburger"
                onClick={toggleSidebar}
              />
            </div>
            <div className=" navBarLogoutContainer">
              <h3 style={{ textDecoration: "underline" }}>
                Welcome {userName}
              </h3>
              <h3>🤗🤗🤗 </h3>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
        <div className="card mainDoctorContainer">
          <div className="promptResult">
            <span className="promtResultAIProfile">
              <img src={GeminiProfile} className="promtResultImage" />
            </span>
            <section>
              {mutation.isPending && (
                <p>
                  {
                    // <ScaleLoader
                    //   color="#14ac5f"
                    //   size="11"
                    //   speedMultiplier="1"
                    //   margin="4"
                    //   style={{ float: "right" }}
                    // />
                    <Box sx={{ width: 1150 }}>
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
                <FontAwesomeIcon icon={faPaperPlane} />
                {/* <button type="submit">Generate Content</button> */}
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import GeminiProfile from "../../../../assets/images/google-gemini-icon.webp";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import PharmacyRoot from "./PharmacyRoot";

export default function PharmacyOverView() {
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [userName, setUserName] = React.useState(
    sessionStorage.getItem("username")
  );
  const inputRef = useRef(null);

  const makeRequestAPI = async (prompt) => {
    const res = await axios.post("http://localhost:8080/api/gemini", {
      prompt,
    });
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: makeRequestAPI,
    mutationKey: ["gemini-ai-request"],
    onSuccess: (data) => {
      setChatHistory([
        ...chatHistory,
        { prompt: prompt, response: data }, // Add both prompt and response to chat history
      ]);
      setPrompt(""); // Clear prompt after adding to chat history
    },
  });

  const submitHandler = (e) => {
    if (e) {
      e.preventDefault();
    }
    mutation.mutate(prompt);
    inputRef.current.blur();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitHandler();
    }
  };

  useEffect(() => {
    setUserName(sessionStorage.getItem("username"));
    setChatHistory([]);
  }, []);
  const userNameFirstLetter = userName.charAt(0).toUpperCase();

  return (
    <div>
      <PharmacyRoot
        component={
          <main className="doctorOverViewMainContainer">
            <div className="promptResult">
              <span className="promtResultAIProfile"></span>
              <section>
                {/* <p style={{ display: "flex", alignItems: "center" }}>
                  <Avatar sx={{ bgcolor: "#5c6bc0", marginRight: "15px" }}>
                    {userNameFirstLetter}
                  </Avatar>
                  <b>{prompt}</b>
                </p> */}
                {chatHistory.map((chat, index) => (
                  <div key={index}>
                    <p style={{ display: "flex", alignItems: "center" }}>
                      <Avatar sx={{ bgcolor: "#5c6bc0", marginRight: "21px" }}>
                        {userNameFirstLetter}
                      </Avatar>
                      <b>{chat.prompt}</b>
                    </p>
                    <br />
                    <p style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={GeminiProfile}
                        className="promtResultImage"
                        alt="gemini"
                      />
                      {chat.response}
                    </p>
                  </div>
                ))}
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
                {mutation.isError && (
                  <p>
                    <b>Refresh the page an error occured.</b>
                  </p>
                )}
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
                    rows={3}
                  />
                  <span onClick={submitHandler}>
                    <Button
                      variant="contained"
                      sx={{ background: "#14ac5f" }}
                      endIcon={<SendIcon />}
                    >
                      Send
                    </Button>
                  </span>
                </div>
              </form>
            </div>
          </main>
        }
      />
    </div>
  );
}

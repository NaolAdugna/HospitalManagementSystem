import React from "react";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import "../styles/OurService.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import ServiceImage from "../assets/images/about.webp";

import Data from "../assets/data/Data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMedal,
  faMoneyBill1Wave,
  faUserTie,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Config from "../componets/config.js";
import ChatBot from "react-chatbotify";
import { motion } from "framer-motion";
// import dotenv from "dotenv";
// dotenv.config();
export default function OurService() {
  const optionsChatbotify = {
    theme: {
      primaryColor: "#14ac5f",
      secondaryColor: "#143D59",
    },
    voice: { disabled: false },
    chatHistory: { storageKey: "playground" },
    botBubble: { simStream: true },
  };
  const genAI = new GoogleGenerativeAI(Config.API_KEY);
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

  const serviceVariant = {
    hidden: {
      y: "-400vh",
    },
    visible: {
      y: 0,
      transition: { delay: 0.7, type: "spring", stiffness: 20, restDelta: 2 },
    },
  };

  const whyusVariant = {
    hidden: {
      x: "-100vw",
    },
    visible: {
      x: 0,
      transition: { delay: 1.7, type: "spring", stiffness: 20, restDelta: 2 },
    },
  };

  const whyusSecondVariant = {
    hidden: {
      x: "-100vw",
    },
    visible: {
      x: 0,
      transition: { delay: 0.7, type: "spring", stiffness: 20, restDelta: 2 },
    },
  };

  return (
    <div className="homeContainer">
      <Header />
      <div className="ourServicePageContainer">
        <div className="ourServiceHeroContainer">
          <h1>OUR SERVICE</h1>
        </div>
        <div className="ourServiceOverlay"></div>
        <main className="ourServiceServicesContainer">
          <h1 style={{ textAlign: "center" }}>OUR SERVICES</h1>
          <motion.div
            variants={serviceVariant}
            initial="hidden"
            animate="visible"
            className="ourServiceContainer"
          >
            {Data.OurServiceServicesData.map((item) => {
              return (
                <Card
                  sx={{ maxWidth: 380 }}
                  key={item.id}
                  className="ourServiceCardContainer"
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="170"
                      image={item.url}
                      alt="service"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.Title}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })}
          </motion.div>

          <section className="ourServiceWhyUsContainer">
            <div className="ourServiceWhyUsHeader">
              <h1>WHY US?</h1>
              <p>Your Path to Exceptional Health Experiences</p>
            </div>
            <motion.div
              variants={whyusVariant}
              initial="hidden"
              animate="visible"
              className="ourServiceWhyUsFirst "
              id="ourServiceWhyUsFirstId"
            >
              <div className="ourServiceWhyUsFirstContent">
                {" "}
                <FontAwesomeIcon
                  icon={faMedal}
                  className="ourServiceWhyUsIcon"
                />
                <div className="ourServiceWhyUsFirstHeader">
                  <h2>High Quality</h2>
                  <p>
                    {" "}
                    Receive top-notch care with our High Quality services,
                    utilizing the latest medical advancements and best
                    practices.
                  </p>
                </div>
              </div>
              <div className="ourServiceWhyUsFirstContent">
                <FontAwesomeIcon
                  icon={faMoneyBill1Wave}
                  className="ourServiceWhyUsIcon"
                />
                <div className="ourServiceWhyUsFirstHeader">
                  <h2>Cost Efficiency</h2>
                  <p>
                    {" "}
                    Enjoy affordable healthcare with our Cost Efficiency
                    solutions, offering exceptional value without compromising
                    quality.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={whyusSecondVariant}
              initial="hidden"
              animate="visible"
              className="ourServiceWhyUsFirst"
            >
              <div className="ourServiceWhyUsFirstContent">
                {" "}
                <FontAwesomeIcon
                  icon={faUserTie}
                  className="ourServiceWhyUsIcon"
                />
                <div className="ourServiceWhyUsFirstHeader">
                  <h2>Expert Support</h2>
                  <p>
                    {" "}
                    Benefit from our Expert Support, providing knowledgeable and
                    compassionate guidance for all your health needs.
                  </p>
                </div>
              </div>
              <div className="ourServiceWhyUsFirstContent">
                <FontAwesomeIcon
                  icon={faClock}
                  className="ourServiceWhyUsIcon"
                />
                <div
                  className="ourServiceWhyUsFirstHeader"
                  id="serviceWhyUsLastContent"
                >
                  <h2>On-Time Delivery</h2>
                  <p>
                    {" "}
                    Save time with our Time Efficiency services, delivering
                    prompt and effective care to fit your busy schedule.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>
          <ChatBot options={optionsChatbotify} flow={flow} />
        </main>
      </div>
      <Footer />
    </div>
  );
}

import React, { useState } from "react";
import "../styles/Home.css";

import AboutImage from "../assets/images/hospital image2.webp";

// swiper family
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Data from "../assets/data/Data";
// Material ui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
// style family
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMedal,
  faMoneyBill1Wave,
  faUserTie,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";

import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatBot from "react-chatbotify";
import { motion } from "framer-motion";
import Config from "../componets/config.js";
// import dotenv from "dotenv";
// dotenv.config();
export default function Home() {
  const [counterOn, setCounterOn] = useState(false);
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

  const titleVariant = {
    hidden: {
      x: "-100vw",
    },
    visible: {
      x: 0,
      transition: { delay: 1, type: "Inertia" },
    },
  };
  const imageVariant = {
    hidden: {
      x: "-100vw",
    },
    visible: {
      x: 0,
      transition: { delay: 0.7, type: "Inertia" },
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
    <div className="homeBodyContainer">
      <Header />
      <div className="homeContainer">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          loop={true}
          grabCursor={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          slidesPerView={1}
        >
          {Data.HomeData.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <div className="homeImageContainer">
                  <img src={item.url} alt="hms bg home" className="homeImage" />
                  <div className="overlay"></div>
                </div>
                <div className="homeContent">
                  <h1>{item.Title}</h1>
                  <h1>{item.subtitle}</h1>
                  <p>{item.description}</p>
                  <br />
                  <a href="/contact">
                    <button>{item.button}</button>
                  </a>
                  <br />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <main>
          {/* About Us Start */}
          <div className="aboutContainer">
            <motion.div
              className="aboutImageContainer"
              variants={imageVariant}
              initial="hidden"
              animate="visible"
            >
              <img src={AboutImage} alt="about bg" className="aboutImage" />
            </motion.div>
            <div className="aboutTextContainer">
              <motion.h2
                variants={titleVariant}
                initial="hidden"
                animate="visible"
              >
                ABOUT <span>US</span>
              </motion.h2>
              <p>
                Gebre Tsadik Shawo General Hospital is one of General Hospitals
                in South West Ethiopia regional state. It’s located in the south
                western part of Ethiopia, particularly in Bonga, which is the
                capital city of South West Ethiopia regional state. Currently,
                the general hospital is serving more than 2 million peoples from
                the region and the neighboring zones, including Sheka, Dawuro,
                Konta, Bench-Sheko, Westomo and some parts of Jimma zones. The
                hospital provides both curative and preventive services and also
                serves as the only referral hospital for 3 primary hospitals and
                44 health centers.
              </p>
              <a href="/about">about us</a>
            </div>
          </div>
          {/* About Us Ends */}

          {/* Mission Starts */}
          <div className="homeMissionVisiionSection">
            <div className="homeMissionVisionContainer">
              <div className="homeMissionContent">
                <h2>
                  OUR <span style={{ color: "#14ac5f" }}>MISSION</span>
                </h2>
                <p>
                  Gebre Tsadik Shawo General Hospital improves healthcare
                  quality and outcomes through partnerships and mentoring
                </p>
              </div>
              <div className="homeVisionContent">
                <h2>
                  OUR <span style={{ color: "#14ac5f" }}>VISION</span>
                </h2>
                <p>
                  The vision of Gebre Tsadik Shawo General Hospital is to
                  provide healthcare services to the population they serve,
                  improve health outcomes, and address healthcare challenges in
                  Bonga
                </p>
              </div>
            </div>
          </div>
          {/* Mission Ends */}

          {/* Our Service Starts */}
          <h2 className="ourServicesTitle">
            OUR <span>SERVICES</span>
          </h2>
          <div className="homeServiceParentContainer">
            <div className="homeServiceContainer">
              {Data.HomeServiceData.map((item) => {
                return (
                  <motion.Card
                    sx={{ maxWidth: 380, border: "1px solid #000" }}
                    key={item.id}
                    className="homeServiceCardContainer"
                    variants={serviceVariant}
                    initial="hidden"
                    animate="visible"
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
                  </motion.Card>
                );
              })}
            </div>
            <div className="homeServiceButtonContainer">
              <NavLink to="/services" className="homeServicesButton">
                View More Services
              </NavLink>
            </div>
          </div>
          {/* Our Services Ends */}
        </main>
        <section className="homeWhyUsContainer">
          <div className="homeWhyUsHeader">
            <h1>
              WHY <span style={{ color: "#14ac5f" }}> US? </span>
            </h1>
            <p style={{ textAlign: "center" }}>
              Your Path to Exceptional Health Experiences
            </p>
          </div>
          <motion.div
            variants={whyusVariant}
            initial="hidden"
            animate="visible"
            id="homeWhyUsFirstId"
          >
            <div className="homeWhyUsFirstContent">
              {" "}
              <FontAwesomeIcon icon={faMedal} className="homeWhyUsIcon" />
              <div className="homeWhyUsFirstHeader">
                <h2>High Quality</h2>
                <p>
                  {" "}
                  Receive top-notch care with our High Quality services,
                  utilizing the latest medical advancements and best practices.
                </p>
              </div>
            </div>
            <div className="homeWhyUsFirstContent">
              <FontAwesomeIcon
                icon={faMoneyBill1Wave}
                className="homeWhyUsIcon"
              />
              <div className="homeWhyUsFirstHeader">
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
            className="homeWhyUsFirst"
          >
            <div className="homeWhyUsFirstContent">
              {" "}
              <FontAwesomeIcon icon={faUserTie} className="homeWhyUsIcon" />
              <div className="homeWhyUsFirstHeader">
                <h2>Expert Support</h2>
                <p>
                  {" "}
                  Benefit from our Expert Support, providing knowledgeable and
                  compassionate guidance for all your health needs.
                </p>
              </div>
            </div>
            <div className="homeWhyUsFirstContent" id="homeWhyUsLastContent">
              <FontAwesomeIcon icon={faClock} className="homeWhyUsIcon" />
              <div className="homeWhyUsFirstHeader">
                <h2>Time Efficiency</h2>
                <p>
                  {" "}
                  Save time with our Time Efficiency services, delivering prompt
                  and effective care to fit your busy schedule.
                </p>
              </div>
            </div>
          </motion.div>
        </section>
        <section className="homeCounterParentContainerSection">
          <div className="homeCounterParentContainer">
            <div style={{ textAlign: "center" }}>
              <h1 className="homeCountTitle">
                Some Count{" "}
                <span style={{ color: "#14ac5f" }}>that Matters</span>{" "}
              </h1>
              <p>
                We brings the best mind and talent to successfully drive service
                innovations and transform your experience.
              </p>
            </div>
            <div className="homeCountContainer">
              {/* <div className="workPlaceCountContainer"> */}
              {Data.HomeCountData.map((item) => {
                return (
                  <div className="homeCountContent" key={item.id}>
                    <span>
                      <ScrollTrigger
                        onEnter={() => setCounterOn(true)}
                        onExit={() => setCounterOn(false)}
                      >
                        {counterOn && (
                          <CountUp
                            suffix={item.suffix}
                            start={0}
                            end={item.dataValue}
                            delay={0}
                            className="homeCounterNumber"
                          >
                            <h1 className="homeCounterNumber">
                              {" "}
                              {item.value}{" "}
                            </h1>
                          </CountUp>
                        )}{" "}
                      </ScrollTrigger>
                    </span>
                    <h4> {item.title} </h4>
                  </div>
                );
              })}
              {/* </div> */}
            </div>
            <ChatBot options={optionsChatbotify} flow={flow} />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

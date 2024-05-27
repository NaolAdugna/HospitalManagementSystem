import React from "react";
import "../styles/About.css";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import AboutUsImage from "../assets/images/HMBG 1.webp";
import AboutCTAImage from "../assets/images/doctor__21.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUnlink,
  faBookmark,
  faSmile,
  faMoneyBill1Wave,
} from "@fortawesome/free-solid-svg-icons";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "./config.js";
import ChatBot from "react-chatbotify";

import service1 from "../assets/images/service 1.webp";
import service2 from "../assets/images/service 2.webp";
import service3 from "../assets/images/service 3.webp";
import service4 from "../assets/images/service 4.webp";
import service5 from "../assets/images/service 5.webp";
import service7 from "../assets/images/dental.webp";
import service6 from "../assets/images/ultrasound.jpg";
// import dotenv from "dotenv";

// dotenv.config();
export default function About() {
  const optionsChatbotify = {
    theme: {
      primaryColor: "#14ac5f",
      secondaryColor: "#143D59",
    },
    voice: { disabled: false },
    chatHistory: { storageKey: "playground" },
    botBubble: { simStream: true },
  };
  const genAI = new GoogleGenerativeAI(config.API_KEY);
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
  return (
    <div className="AboutbodyContainers">
      <Header />
      <div className="aboutPageContainer">
        <div className="aboutHeroContainer">
          {/* <img src={AboutUsImage} alt="About-Us" className="aboutUsHeroImage" /> */}
          <h1>ABOUT US</h1>
        </div>
        <div className="aboutOverlay"></div>
        <section className="aboutHeroContentContainer">
          <div className="aboutHeroContent">
            <div>
              <FontAwesomeIcon
                icon={faBookmark}
                className="aboutHeroContentIcon"
              />
            </div>
            <div>
              <h2>Quality Service</h2>
              <p style={{ textAlign: "justify", paddingRight: "12px" }}>
                At Gebretsadik Shawo General Hospital, we pride ourselves on
                providing exceptional healthcare services.
              </p>
            </div>
          </div>
          <div className="aboutHeroContent">
            <div>
              <FontAwesomeIcon
                icon={faMoneyBill1Wave}
                className="aboutHeroContentIcon"
              />
            </div>
            <div>
              {" "}
              <h2>Affordable Care</h2>
              <p style={{ textAlign: "justify", paddingRight: "12px" }}>
                We understand the financial challenges that many of our patients
                face. That's why Gebretsadik Shawo General Hospital offers
                healthcare services at an affordable cost.
              </p>
            </div>
          </div>
          <div className="aboutHeroContent">
            <div>
              <FontAwesomeIcon
                icon={faUnlink}
                className="aboutHeroContentIcon"
              />
            </div>
            <div>
              {" "}
              <h2>Community Focus</h2>
              <p style={{ textAlign: "justify", paddingRight: "12px" }}>
                Gebretsadik Shawo General Hospital is deeply embedded in the
                community it serves. From its humble beginnings as Bonga Clinic
                in 1966 E.C.
              </p>
            </div>
          </div>
        </section>
        <div className="aboutTextSectionContianer">
          <div className="aboutTextContentContainer">
            <h1>
              ABOUT <span style={{ color: "#14ac5f" }}>US</span>
            </h1>
            <p>
              <span
                style={{
                  fontSize: "48px",
                  color: "#14ac5f",
                  fontWeight: "bolder",
                }}
              >
                G
              </span>{" "}
              ebretsadik Shawo General Hospital is one of General Hospitals in
              Southern Nation, Nationalities and People's Regional State
              (SNNPR). It's located in the southwestern part of Ethiopia,
              particularly in Bonga, which is the capital of Kafa zone. It is
              placed 467 kilometers away from Addis Ababa, the capital city of
              Ethiopia and 742 kilometers away from Hawassa, the capital of
              SNNPR. Currently, the general hospital is serving more than 2
              million people from Kafa zone and the neighboring zones, including
              Sheka, Dawuro, Konta, Bench-Sheko, West Omo, and some parts of
              Jimma zones. <br /> The hospital provides both curative and
              preventive services and also serves as the only referral hospital
              for 3 primary hospitals and 44 health centers. Going back to the
              hospital's historical background, before it has gotten its current
              name and title, it was founded as Bonga Clinic in 1966 E.C and
              later became a health center in 1976 E.C delivering limited health
              services to the community. <br /> As the medical care demand of
              the community increased, the health center was upgraded to
              district hospital level in 1993 E.C with a few numbers of
              physicians, health officers, and nurses providing basic medical
              services and emergency obstetrics and surgical care for people in
              need. Then the hospital was named "Gebretsadik Shawo District
              Hospital" in 2001 E.C. as a memorial hospital to the hero.
            </p>
          </div>
          <div className="aboutTextImageContainer">
            <img
              src={AboutUsImage}
              alt="about image"
              style={{
                display: "flex",
                justifyContent: "end",
                alignItems: "end",
                width: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
        {/* Mission Starts */}
        <div className="homeMissionVisiionSection">
          <div className="homeMissionVisionContainer">
            <div className="homeMissionContent">
              <h2>
                OUR <span style={{ color: "#14ac5f" }}>MISSION</span>
              </h2>
              <p>
                Gebre Tsadik Shawo General Hospital improves healthcare quality
                and outcomes through partnerships and mentoring
              </p>
            </div>
            <div className="homeVisionContent">
              <h2>
                OUR <span style={{ color: "#14ac5f" }}>VISION</span>
              </h2>
              <p>
                The vision of Gebre Tsadik Shawo General Hospital is to provide
                healthcare services to the population they serve, improve health
                outcomes, and address healthcare challenges in Bonga
              </p>
            </div>
          </div>
        </div>
        {/* Mission Ends */}
        <h1
          style={{ textAlign: "center", marginTop: "30px" }}
          className="FAQTitle"
        >
          Gallery
        </h1>
        <section className="aboutGallerySectionContainer">
          <Swiper
            // effect={"coverflow"}
            grabCursor={true}
            // centeredSlides={false}
            slidesPerView={3}
            autoHeight={true}
            spaceBetween={5}
            autoplay={{
              delay: 1500,
              disableOnInteraction: true,
            }}
            loop={true}
            navigation={true}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 0,
                centeredSlides: "true",
              },
              641: {
                slidesPerView: 2,
                spaceBetween: 5,
                centeredSlides: "true",
              },
              720: {
                slidesPerView: 3,
                spaceBetween: 10,
              },

              1024: {
                slidesPerView: 3,
                spaceBetween: 15,
                // centeredSlides: "true",
              },
            }}
            pagination={true}
            modules={[Navigation, Pagination, Autoplay]}
          >
            <SwiperSlide>
              <img src={service1} height={250} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={service2} height={250} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={service7} height={250} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={service3} height={250} />{" "}
            </SwiperSlide>
            <SwiperSlide>
              <img src={service4} height={250} />{" "}
            </SwiperSlide>
            <SwiperSlide>
              <img src={service5} height={250} />{" "}
            </SwiperSlide>
            <SwiperSlide>
              <img src={service6} height={250} />
            </SwiperSlide>
          </Swiper>
        </section>
        <h1
          style={{ textAlign: "center", textDecoration: "underline" }}
          className="FAQTitle"
        >
          {" "}
          FAQ
        </h1>
        <h3 style={{ textAlign: "center" }}>Frequently Asked Questions</h3>
        <main className="aboutFAQContainer">
          <div>
            <Accordion
              defaultExpanded
              style={{
                border: "0.6px solid aliceblue",
                marginBottom: "11px",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    style={{ color: "#14ac5f", fontWeight: "bolder" }}
                  />
                }
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>
                  <b> What is Gebretsadik Shawo General Hospital?</b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Gebretsadik Shawo General Hospital is a general hospital
                  located in Bonga, the capital of the Kafa zone in the Southern
                  Nations, Nationalities, and People's Regional State (SNNPR) of
                  Ethiopia.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              style={{
                border: "0.6px solid aliceblue",
                marginBottom: "11px",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    style={{ color: "#14ac5f", fontWeight: "bolder" }}
                  />
                }
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>
                  <b>Where is the hospital located? </b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  The hospital is situated in Bonga, which is 467 kilometers
                  from Addis Ababa, the capital city of Ethiopia, and 742
                  kilometers from Hawassa, the capital of SNNPR.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              style={{
                border: "0.6px solid aliceblue",
                marginBottom: "11px",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    style={{ color: "#14ac5f", fontWeight: "bolder" }}
                  />
                }
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>
                  <b>
                    {" "}
                    What services does Gebretsadik Shawo General Hospital
                    provide?
                  </b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  The hospital provides both curative and preventive services.
                  It serves as the only referral hospital for three primary
                  hospitals and 44 health centers in the region. Services
                  include basic medical care, emergency obstetrics, and surgical
                  care.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              style={{
                border: "0.6px solid aliceblue",
                marginBottom: "11px",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    style={{ color: "#14ac5f", fontWeight: "bolder" }}
                  />
                }
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>
                  <b>
                    {" "}
                    Can patients from outside the immediate region access
                    services at Gebretsadik Shawo General Hospital?
                  </b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Yes, patients from neighboring zones and parts of Jimma zones
                  also access services at the hospital.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </main>

        <div className="AboutCTA">
          <div className="aboutCTAContainer">
            <div className="aboutCTAImageContainer">
              <img
                src={AboutCTAImage}
                alt="CTA doctor"
                className="aboutCTAImage"
              />
            </div>
            <div className="aboutCTATextContainer">
              <div className="aboutCTATextContent">
                <h2>Gebretsadik Shawo General Hospital</h2>
                <p>
                  Gebre Tsadik Shawo General Hospital is one of General
                  Hospitals in South West Ethiopia regional state. It’s located
                  in the south western part of Ethiopia, particularly in Bonga,
                  which is the capital city of South West Ethiopia regional
                  state.
                </p>
              </div>
              <a href="/contact">Contact Us</a>
            </div>
          </div>
          <ChatBot options={optionsChatbotify} flow={flow} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

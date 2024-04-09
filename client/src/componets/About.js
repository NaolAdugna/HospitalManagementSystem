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
export default function About() {
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
              <h2>Heading 1...</h2>
              <p style={{ textAlign: "justify", paddingRight: "12px" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
          <div className="aboutHeroContent">
            <div>
              <FontAwesomeIcon
                icon={faSmile}
                className="aboutHeroContentIcon"
              />
            </div>
            <div>
              {" "}
              <h2>Heading 2...</h2>
              <p style={{ textAlign: "justify", paddingRight: "12px" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
              <h2>Heading 3...</h2>
              <p style={{ textAlign: "justify", paddingRight: "12px" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
                L
              </span>{" "}
              orem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Adipiscing at in tellus integer feugiat scelerisque varius morbi.
              Dolor sit amet consectetur adipiscing elit pellentesque habitant.
              Augue interdum velit euismod in. Velit ut tortor pretium viverra.
              Commodo ullamcorper a lacus vestibulum sed. Egestas tellus rutrum
              tellus pellentesque eu tincidunt tortor aliquam nulla. Scelerisque
              varius morbi enim nunc faucibus a pellentesque sit amet. Id
              volutpat lacus laoreet non curabitur gravida arcu ac tortor.
              Accumsan sit amet nulla facilisi morbi. Et tortor consequat id
              porta nibh. Dui ut ornare lectus sit amet est placerat in egestas.
              Dolor sit amet consectetur adipiscing elit pellentesque habitant.
              Augue interdum velit euismod in. Velit ut tortor pretium viverra.
              Commodo ullamcorper a lacus vestibulum sed. Egestas tellus rutrum
              tellus pellentesque eu tincidunt tortor aliquam nulla. Scelerisque
              varius morbi enim nunc faucibus a pellentesque sit amet. Id
              volutpat lacus laoreet non curabitur gravida arcu ac tortor.
              Accumsan sit amet nulla facilisi morbi. Et tortor consequat id
              porta nibh. Dui ut ornare lectus sit amet est placerat in egestas.
              porta nibh. Dui ut ornare lectus sit amet est placerat in egestas.
              Dolor sit amet consectetur adipiscing elit pellentesque habitant.
              Augue interdum velit euismod in. Velit ut tortor pretium viverra.
              Commodo ullamcorper a lacus vestibulum sed. Egestas tellus rutrum
              tellus pellentesque eu tincidunt tortor aliquam nulla. Scelerisque
              varius morbi enim nunc faucibus a pellentesque sit amet. Id
              volutpat lacus laoreet non curabitur gravida arcu ac tortor.
              Accumsan sit amet nulla facilisi morbi. Et tortor consequat id
              porta nibh. Dui ut ornare lectus sit amet est placerat in egestas.
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
              <img
                src="https://swiperjs.com/demos/images/nature-1.jpg"
                height={250}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://swiperjs.com/demos/images/nature-2.jpg"
                height={250}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://swiperjs.com/demos/images/nature-3.jpg"
                height={250}
              />{" "}
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://swiperjs.com/demos/images/nature-4.jpg"
                height={250}
              />{" "}
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://swiperjs.com/demos/images/nature-5.jpg"
                height={250}
              />{" "}
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://swiperjs.com/demos/images/nature-6.jpg"
                height={250}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://swiperjs.com/demos/images/nature-7.jpg"
                height={250}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://swiperjs.com/demos/images/nature-8.jpg"
                height={250}
              />
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
                <Typography>Question 1</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
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
                <Typography>Question 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
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
                <Typography>Question 3</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
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
                <Typography>Question 4</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </p>
              </div>
              <a href="/contact">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

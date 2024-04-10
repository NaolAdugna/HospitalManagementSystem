import React, { useState } from "react";
import "../styles/Home.css";

import AboutImage from "../assets/images/about.webp";

// swiper family
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Data from "../assets/data/Data";
// Material ui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
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

export default function Home() {
  const [counterOn, setCounterOn] = useState(false);
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
            <div className="aboutImageContainer">
              <img src={AboutImage} alt="about bg" className="aboutImage" />
            </div>
            <div className="aboutTextContainer">
              <h2>
                ABOUT <span>US</span>
              </h2>
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

          {/* Our Service Starts */}
          <h2 className="ourServicesTitle">
            OUR <span>SERVICES</span>
          </h2>
          <div className="homeServiceParentContainer">
            <div className="homeServiceContainer">
              {Data.HomeServiceData.map((item) => {
                return (
                  <Card
                    sx={{ maxWidth: 380 }}
                    key={item.id}
                    className="homeServiceCardContainer"
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="170"
                        image={AboutImage}
                        alt="service"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
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
          <div className="homeWhyUsFirst " id="homeWhyUsFirstId">
            <div className="homeWhyUsFirstContent">
              {" "}
              <FontAwesomeIcon icon={faMedal} className="homeWhyUsIcon" />
              <div className="homeWhyUsFirstHeader">
                <h2>High Quality</h2>
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  at scelerisque eros, id bibendum dui. Vestibulum aliquet
                  cursus massa
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  at scelerisque eros, id bibendum dui. Vestibulum aliquet
                  cursus massa
                </p>
              </div>
            </div>
          </div>
          <div className="homeWhyUsFirst">
            <div className="homeWhyUsFirstContent">
              {" "}
              <FontAwesomeIcon icon={faUserTie} className="homeWhyUsIcon" />
              <div className="homeWhyUsFirstHeader">
                <h2>Expert Support</h2>
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  at scelerisque eros, id bibendum dui. Vestibulum aliquet
                  cursus massa
                </p>
              </div>
            </div>
            <div className="homeWhyUsFirstContent">
              <FontAwesomeIcon icon={faClock} className="homeWhyUsIcon" />
              <div className="homeWhyUsFirstHeader">
                <h2>On-Time Delivery</h2>
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  at scelerisque eros, id bibendum dui. Vestibulum aliquet
                  cursus massa
                </p>
              </div>
            </div>
          </div>
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
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

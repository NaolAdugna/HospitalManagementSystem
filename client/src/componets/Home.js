import React, { useEffect, useState } from "react";
import "../styles/Home.css";

import { Link, NavLink } from "react-router-dom";
import NavBarImage from "../assets/icon/logo2.webp";
import AboutImage from "../assets/images/about.webp";

// font awesome family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
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

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  let handleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    const navBarLinks = document.querySelector("#navBarLinks");
    if (navBarLinks) {
      if (isOpen) {
        navBarLinks.classList.add("active");
      } else {
        navBarLinks.classList.remove("active");
      }
    }
  }, [isOpen]);
  return (
    <div className="homeContainer">
      <header>
        <NavLink to="/">
          <img src={NavBarImage} alt="hms logo" id="navBarLogo" />
        </NavLink>
        <div className="navBarLinksAndButtonContainer" id="navBarLinks">
          <nav>
            {Data.NavBarData.map((item) => {
              return (
                <NavLink to={item.url} key={item.id}>
                  {" "}
                  {item.title}
                </NavLink>
              );
            })}
          </nav>
          <Link to="/login" className="loginButton">
            Login
          </Link>
        </div>
        <FontAwesomeIcon
          icon={isOpen ? faXmark : faBars}
          className="navBarHamburgerIcon"
          onClick={handleOpen}
          style={{ color: "#14ac5f" }}
        />
      </header>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at
              scelerisque eros, id bibendum dui. Vestibulum aliquet cursus
              massa, interdum porttitor erat sagittis nec. Pellentesque porta
              est nulla, eget luctus mi porttitor sit amet. In et nunc quis
              lorem varius vestibulum a non sapien. Vivamus nec volutpat.Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Nulla at
              scelerisque eros, id bibendum dui. Vestibulum aliquet cursus
              massa, interdum porttitor erat sagittis nec. Pellentesque porta
              est nulla, eget luctus mi porttitor sit amet.
            </p>
            <a href="/about">about us</a>
          </div>
        </div>
        {/* About Us Ends */}

        {/* Our Service Starts */}
        <h2 className="ourServicesTitle">
          OUR <span>SERVICES</span>
        </h2>
        <div className="ourServiceParentContainer">
          <div className="ourServiceContainer">
            {Data.HomeServiceData.map((item) => {
              return (
                <Card
                  sx={{ maxWidth: 380 }}
                  key={item.id}
                  className="cardContainer"
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
                  <CardActions>
                    <Button size="small" color="primary" to={item.url}>
                      Learn more
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
          </div>
        </div>
        {/* Our Services Ends */}
      </main>
    </div>
  );
}

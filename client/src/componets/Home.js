import React from "react";
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

export default function Home() {
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
      <Footer />
    </div>
  );
}

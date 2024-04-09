import React from "react";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import "../styles/OurService.css";

export default function OurService() {
  return (
    <div className="homeContainer">
      <Header />
      <div className="ourServicePageContainer">
        <div className="ourServiceHeroContainer">
          <h1>OUR SERVICE</h1>
        </div>
        <div className="ourServiceOverlay"></div>
      </div>
      <Footer />
    </div>
  );
}

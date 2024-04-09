import React from "react";
import "../../styles/Footer.css";
import {
  faFacebook,
  faXTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faLocationDot,
  faEnvelope,
  faPhone,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NavBarImage from "../../assets/icon/logo2.webp";
import { NavLink } from "react-router-dom";
export default function Footer() {
  return (
    <div className="footerContainer">
      <div className="footerLogoContainer">
        <img src={NavBarImage} alt="footerlogo" className="footerLogo" />
        <p>
          Gebre Tsadik Shawo General Hospital is one of General Hospitals in
          South West Ethiopia regional state. It’s located in the south western
          part of Ethiopia, particularly in Bonga, which is the capital city of
          South West Ethiopia regional state.
        </p>
        <span className="footerIconContainer">
          <FontAwesomeIcon icon={faFacebook} className="icon" />
          <FontAwesomeIcon icon={faXTwitter} className="icon" />
          <FontAwesomeIcon icon={faInstagram} className="icon" />
          <FontAwesomeIcon icon={faLinkedin} className="icon" />
        </span>
      </div>
      <div className="footerLinksContainer">
        <h2 style={{ textDecoration: "underline", marginBottom: "12px" }}>
          QUICK LINKS
        </h2>
        <main className="footerLinks">
          <NavLink to="/">
            {" "}
            <span>
              <FontAwesomeIcon
                icon={faCheck}
                style={{ color: "#14ac5f", marginRight: "3px" }}
              />
            </span>{" "}
            HOME{" "}
          </NavLink>
          <NavLink to="/about">
            {" "}
            <span>
              <FontAwesomeIcon
                icon={faCheck}
                style={{ color: "#14ac5f", marginRight: "3px" }}
              />
            </span>{" "}
            ABOUT US
          </NavLink>
          <NavLink to="/services">
            {" "}
            <span>
              <FontAwesomeIcon
                icon={faCheck}
                style={{ color: "#14ac5f", marginRight: "3px" }}
              />
            </span>{" "}
            OUR SERVICE
          </NavLink>
          <NavLink to="/contact">
            {" "}
            <span>
              <FontAwesomeIcon
                icon={faCheck}
                style={{ color: "#14ac5f", marginRight: "3px" }}
              />
            </span>{" "}
            CONTACT US
          </NavLink>
          <NavLink to="/login">
            {" "}
            <span>
              <FontAwesomeIcon
                icon={faCheck}
                style={{ color: "#14ac5f", marginRight: "3px" }}
              />
            </span>{" "}
            LOGIN
          </NavLink>
        </main>
      </div>
      <div className="footerAddressContainer">
        <h2 style={{ textDecoration: "underline", marginBottom: "12px" }}>
          OUR ADDRESS
        </h2>
        <div className="footerAddressContent">
          <FontAwesomeIcon
            icon={faLocationDot}
            className="iconAddress iconaddress1"
          />
          <h4 style={{ fontWeight: "500" }}>Bonga, Ethiopia</h4>
        </div>
        <div className="footerPhoneContent">
          <FontAwesomeIcon icon={faPhone} className="iconAddress" />
          <h4 style={{ fontWeight: "500" }}>
            +251 912 356789 <br /> +251 912 356789
          </h4>
        </div>
        <div className="footerEmailContent">
          <FontAwesomeIcon
            icon={faEnvelope}
            className="iconAddress iconaddress3"
          />
          <h4 style={{ fontWeight: "500" }}>
            gebretsadikshawogeneralhosp
            <br />
            contact@gebretsadikshawog{" "}
          </h4>
        </div>
      </div>
    </div>
  );
}
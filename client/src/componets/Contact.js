import React, { useEffect, useState } from "react";
import "../styles/Contact.css";
import Data from "../assets/data/Data";
import NavBarImage from "../assets/icon/logo2.webp";
// React family
import { Link, NavLink } from "react-router-dom";
// Font Awesome Family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Contact() {
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
      <h3>Contact </h3>
    </div>
  );
}

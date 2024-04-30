import React, { useEffect, useState } from "react";
import "../../styles/Header.css";
import Data from "../../assets/data/Data";
import NavBarImage from "../../assets/icon/logo2.webp";
// React family
import { Link, NavLink } from "react-router-dom";
// Font Awesome Family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const openDropDown = Boolean(anchorEl);
  const handleClickOpenDropDown = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseDropDown = () => {
    setAnchorEl(null);
  };

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
    <div className="headerContainer">
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
          <Button
            id="fade-button"
            aria-controls={openDropDown ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openDropDown ? "true" : undefined}
            onClick={handleClickOpenDropDown}
            style={{ fontWeight: "500", color: "#fff", background: "#14ac5f" }}
          >
            Login
          </Button>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={openDropDown}
            onClose={handleCloseDropDown}
            TransitionComponent={Fade}
            style={{ marginRight: "12px" }}
          >
            <MenuItem onClick={handleCloseDropDown}>
              {" "}
              <NavLink
                to="/login-user"
                style={{ color: "#000", textDecoration: "none" }}
              >
                For Staff User{" "}
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleCloseDropDown}>
              <NavLink
                to="/login-patient"
                style={{ color: "#000", textDecoration: "none" }}
              >
                For Patient User{" "}
              </NavLink>
            </MenuItem>
          </Menu>

          {/* <Link to="/login" className="loginButton">
            Login
          </Link> */}
        </div>
        <FontAwesomeIcon
          icon={isOpen ? faXmark : faBars}
          className="navBarHamburgerIcon"
          onClick={handleOpen}
          style={{ color: "#14ac5f" }}
        />
      </header>
    </div>
  );
}

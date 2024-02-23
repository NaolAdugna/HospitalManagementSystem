import React from "react";
import ProfileImage from "../../../../assets/icon/logo2.webp";
import "../styles/Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sideBarContainer">
      <div className="sideBarContent">
        <div className="sideBarHeader">
          <img
            src={ProfileImage}
            alt="profile "
            className="sideBarProfilePicture"
          />
          <h4>Gebre Tsadik Shawo General Hospital</h4>
        </div>
      </div>
    </div>
  );
}

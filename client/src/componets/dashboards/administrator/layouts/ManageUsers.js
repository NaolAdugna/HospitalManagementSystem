import React from "react";
// import "../styles/ManageUsers.css";

// Fontawesome family
import TableUser from "./TableUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

import AdminRoot from "./AdminRoot";

export default function ManageUsers() {
  return (
    <div>
      <AdminRoot
        component={
          <div>
            <div
              className="SearchandAddContainer"
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <h2 style={{ color: "#14ac5f", fontWeight: "bold" }}>
                USER EXISTS IN THE SYSTEM
              </h2>
              <div className="addUserContainer" style={{ padding: "24px" }}>
                <NavLink
                  to="/admin-overview"
                  className="adminManageAddUserButton"
                  style={{
                    padding: "8px 20px",
                    border: "none",
                    background: "#14ac5f",
                    color: "#fff",
                    fontSize: "16px",
                  }}
                >
                  Add User{" "}
                  <span>
                    <FontAwesomeIcon icon={faAdd} />
                  </span>{" "}
                </NavLink>
              </div>
            </div>
            <div
              style={{
                padding: "25px",
                width: "80%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto",
              }}
            >
              <TableUser />
            </div>
          </div>
        }
      />
    </div>
  );
}

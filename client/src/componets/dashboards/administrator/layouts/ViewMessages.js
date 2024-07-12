import React, { useState } from "react";
// import "../styles/ViewMessages.css";

import MessageTable from "./MessageTable";

import AdminRoot from "./AdminRoot";

export default function ViewMessages() {
  return (
    <div>
      <AdminRoot
        component={
          <div
            style={{
              padding: "25px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "auto",
              flexDirection: "column",
            }}
          >
            <h2 style={{ color: "#14ac5f", fontWeight: "bold" }}>
              MESSAGES FROM CONTACT US PAGE
            </h2>
            <MessageTable />
          </div>
        }
      />
    </div>
  );
}

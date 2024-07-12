import React, { useState } from "react";
// import "../styles/ViewDeletedUsers.css";

import DeletedUsersTable from "./DeletedUsersTable";

import AdminRoot from "./AdminRoot";

export default function ViewDeletedUsers() {
  return (
    <div>
      <AdminRoot
        component={
          <div
            style={{
              padding: "25px",
              width: "85%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            <h2 style={{ color: "#14ac5f", fontWeight: "bold" }}>
              DELETED USERS FROM THE SYSTEM
            </h2>
            <DeletedUsersTable />
          </div>
        }
      />
    </div>
  );
}

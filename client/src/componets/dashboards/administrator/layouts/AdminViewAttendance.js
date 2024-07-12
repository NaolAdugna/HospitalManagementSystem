import React from "react";

import AttendanceTable from "./AttendanceTable";
import AdminRoot from "./AdminRoot";

export default function AdminViewAttendance() {
  return (
    <div>
      <AdminRoot
        component={
          <div
            style={{
              padding: "25px",
              width: "90%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            <h2 style={{ color: "#14ac5f", fontWeight: "bold" }}>
              USER ATTENDANCE
            </h2>
            <AttendanceTable />
          </div>
        }
      />
    </div>
  );
}

import React from "react";
// import "../styles/DoctorViewPatient.css";

import DoctorRoot from "./DoctorRoot";

import DoctorViewTable from "./DoctorViewTable";

export default function DoctorViewPatient() {
  return (
    <div>
      <DoctorRoot
        component={
          <div
            style={{
              padding: "25px",
              width: "90%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            <DoctorViewTable />
          </div>
        }
      />
    </div>
  );
}

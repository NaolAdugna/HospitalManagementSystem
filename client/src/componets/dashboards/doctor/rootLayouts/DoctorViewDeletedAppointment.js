import React, { useState, useEffect } from "react";

import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import DoctorRoot from "./DoctorRoot";

export default function DoctorViewDeletedAppointment() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const doctorName = sessionStorage.getItem("username");
      const response = await axios.get("/api/view-deleted-appointment", {
        params: { doctorName },
      });
      setRows(response.data);
    } catch (error) {
      console.error("error fetching Patient User Data", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100, key: "id" },
    {
      field: "patient_id",
      headerName: "Patient ID",
      width: 100,
      key: "patient_id",
    },
    {
      field: "patient_name",
      headerName: "Patient Name",
      width: 180,
      key: "patient_name",
    },
    {
      field: "doctor_name",
      headerName: "Doctor Name",
      width: 140,
      key: "doctor_name",
    },
    {
      field: "date_of_appointment",
      headerName: "Date of Appointment",
      width: 270,
      key: "date_of_appointment",
    },
    {
      field: "reason_of_deletion",
      headerName: "Reason of Deletion",
      width: 270,
      key: "reason_of_deletion",
    },

    {
      field: "date_of_appointment_deletion",
      headerName: "Date of Appointment Deleted",
      width: 270,
      key: "date_of_appointment_deletion",
    },
  ];
  return (
    <DoctorRoot
      component={
        <div>
          <h2
            style={{
              textAlign: "center",
              marginBottom: "12px",
              marginTop: "12px",
              color: "#14ac5f",
              fontWeight: "bolder",
            }}
          >
            Deleted Appointments
          </h2>
          <div style={{ height: 550, width: "80%", margin: "auto" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              checkboxSelection
              disableSelectionOnClick
              //   className="rowss"
            />
          </div>
        </div>
      }
    />
  );
}

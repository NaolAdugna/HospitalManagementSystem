import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import ReceptionRoot from "./ReceptionRoot";
export default function ReceptionViewAppointment() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    fetchUserData();
  }, []);
  const fetchUserData = async () => {
    try {
      // const doctorName = sessionStorage.getItem("username");
      const response = await axios.get("/api/reception-view-all-appointment");
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
      field: "date_of_appointment_given",
      headerName: "Date of Appointment Given",
      width: 270,
      key: "date_of_appointment_given",
    },
  ];
  return (
    <div>
      {" "}
      <ReceptionRoot
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
              View All Appointments
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
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import "../styles/DoctorViewPatient.css";

import DoctorRoot from "./DoctorRoot";

import DoctorViewTable from "./DoctorViewTable";
import { useThemeMode } from "../../../../store/store";

export default function DoctorViewPatient() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
    setIsLoading(false);
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/api/view-patient");
      setRows(response.data);
    } catch (error) {
      console.error("error fetching Patient User Data", error);
    }
  };
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "age", headerName: "Age", width: 70 },
    { field: "gender", headerName: "Gender", width: 70 },
    { field: "email", headerName: "Email", width: 260 },
    {
      field: "medicalhistory",
      headerName: "Medical History",
      width: 680,
    },
    {
      field: "dateofregistration",
      headerName: "Date of Registration",
      width: 230,
    },
  ];
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
            className="doctorViewPatientTable"
          >
            <div style={{ height: 550, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
                className="rowss"
              />
            </div>
          </div>
        }
      />
    </div>
  );
}

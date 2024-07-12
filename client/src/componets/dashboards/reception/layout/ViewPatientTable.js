import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
export default function ViewPatientTable() {
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
      setIsLoading(false);
    } catch (error) {
      console.error("error fetching Patient User Data", error);
      setIsLoading(false);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "name", headerName: "Name", width: 170 },
    { field: "age", headerName: "Age", width: 30 },
    { field: "gender", headerName: "Gender", width: 70 },
    { field: "email", headerName: "Email", width: 220 },
    {
      field: "dateofregistration",
      headerName: "Date of Registration",
      width: 280,
    },
  ];
  return (
    <>
      <div style={{ height: 550, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </>
  );
}

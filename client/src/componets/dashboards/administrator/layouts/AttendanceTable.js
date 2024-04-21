import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

export default function AttendanceTable() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAttendanceData();
    setIsLoading(false);
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get("/api/fetch-attendance");
      setRows(response.data);
    } catch (error) {
      console.error("error fetching fetch Attendance Data User Data", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "user_id", headerName: "User Id", width: 130 },
    { field: "user_name", headerName: "Name", width: 230 },
    { field: "status", headerName: "Status", width: 200 },
    {
      field: "present_time",
      headerName: "Present Time",
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

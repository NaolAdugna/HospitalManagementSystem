import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

export default function MessageTable() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
    setIsLoading(false);
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/api/contact-us-message");
      setRows(response.data);
    } catch (error) {
      console.error("error fetching Deleted User Data", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "message", headerName: "Message", width: 600 },
    {
      field: "dateofmessagesent",
      headerName: "Date of Message Sent",
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

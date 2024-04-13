import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

export default function DeletedUsersTable() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
    setIsLoading(false);
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/api/deletedusers");
      setRows(response.data);
    } catch (error) {
      console.error("error fetching Deleted User Data", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "username", headerName: "Name", width: 130 },
    { field: "role", headerName: "Role", width: 230 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "reason", headerName: "Reason of Deletion", width: 200 },
    { field: "deletedby", headerName: "Deleted By", width: 200 },
    {
      field: "dateofdeletion",
      headerName: "Date of Deletion",
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

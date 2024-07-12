import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import "../styles/TableUser.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

export default function TableUser() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
    setIsLoading(false);
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/api/users");
      setRows(response.data);
    } catch (error) {
      console.error("error fetching User Data", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/users/` + id);

      toast.success("Row Deleted Successfully");
      window.location.reload();
    } catch (error) {
      console.error("error deleting row:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "username", headerName: "Name", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "role", headerName: "Role", width: 150 },
    {
      field: "dateofregistration",
      headerName: "Date of Registration",
      width: 280,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 210,
      sortable: false,
      renderCell: (params) => (
        <div>
          <button
            className="editButton"
            onClick={() => {
              window.location.pathname = `/admin-update-user/${params.row.id}`;
            }}
          >
            Edit{" "}
            <span>
              <FontAwesomeIcon icon={faEdit} />
            </span>
          </button>
          <button
            className="deleteButton"
            // onClick={() => handleDelete(params.row.id)}
            onClick={() => {
              window.location.pathname = `/admin-delete-user/${params.row.id}`;
            }}
          >
            Delete{" "}
            <span>
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </button>
        </div>
      ),
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

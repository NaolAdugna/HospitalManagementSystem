import React, { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import DoctorRoot from "./DoctorRoot";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
// dialog
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-hot-toast";
// date time picker

import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import {
  registerAppointment,
  DeleteAppointment,
} from "../../../../functions/checker";
import axios from "axios";
export default function DoctorAppointment() {
  const [dateTime, setDateTimeOnChange] = useState(new Date());
  const [dateTimeUpdate, setDateTimeOnChangeUpdate] = useState(new Date());
  const [doctor_name, setDoctorName] = useState();

  useEffect(() => {
    const doctorName = sessionStorage.getItem("username");
    setDoctorName(doctorName);
  }, []);

  const [openAppointment, setOpenAppointment] = useState(false);

  const handleClickOpenAppointment = () => {
    setOpenAppointment(true);
    console.log("un ", doctor_name);
  };

  const handleCloseAppointment = () => {
    setOpenAppointment(false);
    console.log("close un ", doctor_name);
  };
  const [rowsID, setRowsID] = useState();
  const [editRowId, setEditRowId] = useState();
  // Edit appointment
  const [openEditAppointment, setOpenEditAppointment] = useState(false);
  const handleOpenEditAppointment = (editId) => {
    setOpenEditAppointment(true);
    setEditRowId(editId);
  };
  const handleCloseEditAppointment = () => {
    setOpenEditAppointment(false);
  };

  const [openDeleteAppointment, setOpenDeleteAppointment] = useState(false);
  const [appointmentDeleteId, setAppointmentDeleteId] = useState();
  const [appointmentDeleteName, setAppointmentDeleteName] = useState();
  const [appointmentDeleteDoctorName, setAppointmentDeleteDoctorName] =
    useState();
  const [appointmentDeleteDateofApp, setAppointmentDeleteDateofApp] =
    useState();
  const [appointmentDeleteReason, setAppointmentDeleteReason] = useState("");
  const handleClickOpenDeleteAppointment = (rowId) => {
    if (rows && rows.length > 0) {
      axios
        .get(`/api//get-appointment/${rowId}`)
        .then((res) => {
          const { patient_id, patient_name, doctor_name, date_of_appointment } =
            res.data[0];

          setAppointmentDeleteId(patient_id);
          setAppointmentDeleteName(patient_name);
          setAppointmentDeleteDoctorName(doctor_name);
          setAppointmentDeleteDateofApp(date_of_appointment);
          setRowsID(rowId);
        })
        .catch((error) => {
          console.error("Error fetching patient data:", error);
        });
    }
    setOpenDeleteAppointment(true);
  };

  const handleCloseDeleteAppointment = () => {
    setOpenDeleteAppointment(false);
  };
  const [rows, setRows] = useState([]);
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const doctorName = sessionStorage.getItem("username");
      const response = await axios.get("/api/view-appointment", {
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
      field: "date_of_appointment_given",
      headerName: "Date of Appointment Given",
      width: 270,
      key: "date_of_appointment_given",
    },
    {
      headerName: "Action",
      width: 300,
      sortable: false,
      renderCell: (params) => (
        <div>
          <button
            className="doctorEditButton"
            onClick={() => handleOpenEditAppointment(params.row.id)}
            //   onClick={() => handleClickOpenUpdateRecord(params.row.id)}
          >
            Edit{" "}
            <span>
              <FontAwesomeIcon icon={faEdit} />
            </span>
          </button>
          <button
            className="doctorLabButton"
            onClick={() => handleClickOpenDeleteAppointment(params.row.id)}
          >
            {" "}
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
            Manage Appointments
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              marginBottom: "12px",
            }}
          >
            <Button
              onClick={handleClickOpenAppointment}
              variant="contained"
              style={{
                background: "#14ac5f",
              }}
              endIcon={<AddIcon />}
            >
              Add
            </Button>
          </div>
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
          <Dialog
            open={openAppointment}
            onClose={handleCloseAppointment}
            PaperProps={{
              component: "form",
              onSubmit: (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                let registerPromise = registerAppointment(formJson);
                toast.promise(registerPromise, {
                  loading: "Creating Appointment...",
                  success: "Appointmentted Created successfully...",
                  error: "could not create appointment",
                });

                handleCloseAppointment();
                // window.location.reload();
              },
            }}
          >
            <DialogTitle>Create New Appointment</DialogTitle>
            <DialogContent style={{ height: "400px" }}>
              <DialogContentText sx={{ marginBottom: "11px" }}>
                Please select a date and time to create an appointment. Fill in
                any necessary details and confirm to proceed.
              </DialogContentText>
              <input type="hidden" value={doctor_name} name="doctor_name" />

              <label>Patient ID</label>
              <TextField
                autoFocus
                required
                margin="dense"
                id="patientId"
                name="patient_id"
                label="Patient Id"
                type="text"
                fullWidth
                variant="standard"
              />
              <label>Patient Name</label>
              <TextField
                required
                margin="dense"
                id="patientName"
                name="patient_name"
                label="Patient Name"
                type="text"
                fullWidth
                variant="standard"
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <label>Choose Date and Time</label>
                <DateTimePicker
                  name="date_of_appointment"
                  onChange={setDateTimeOnChange}
                  value={dateTime}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseAppointment}
                style={{ background: "gray", color: "white" }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                style={{ background: "#14ac5f", color: "white" }}
              >
                Create Appointment
              </Button>
            </DialogActions>
          </Dialog>

          {/* EDIT APPOINTMENT START */}

          <Dialog
            open={openEditAppointment}
            onClose={handleCloseEditAppointment}
            PaperProps={{
              component: "form",
              onSubmit: async (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());

                try {
                  const response = await axios.put(
                    "/api/update-appointment/" + editRowId,
                    formJson // Corrected: Passing formJson directly as data
                  );

                  toast.success("Appointment Updated successfully");
                  window.location.reload();
                } catch (error) {
                  toast.error("Could not update appointment");
                }

                handleCloseEditAppointment();
              },
            }}
          >
            <DialogTitle>Edit Appointment</DialogTitle>
            <DialogContent style={{ height: "400px" }}>
              <DialogContentText sx={{ marginBottom: "11px" }}>
                Update appointment details by clicking on 'Edit'. Make necessary
                changes and confirm to proceed.
              </DialogContentText>
              <input type="hidden" value={doctor_name} name="doctor_name" />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginTop: "8px",
                  marginBottom: "11px",
                }}
              >
                <label>Choose Date and Time</label>
                <DateTimePicker
                  name="date_of_appointment_updated"
                  onChange={setDateTimeOnChangeUpdate}
                  value={dateTimeUpdate}
                  // value={appointmentDeleteDateofApp}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseEditAppointment}
                style={{ background: "gray", color: "white" }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                style={{ background: "#14ac5f", color: "white" }}
              >
                Edit Appointment
              </Button>
            </DialogActions>
          </Dialog>
          {/* EDIT APPOINTMENT END */}

          {/* DELETE APPOINTMENT START */}

          <Dialog
            open={openDeleteAppointment}
            onClose={handleCloseDeleteAppointment}
            PaperProps={{
              component: "form",
              onSubmit: async (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                const { reason_of_deletion, ...formJsonForDelete } = formJson;

                try {
                  // Make the delete request without 'reason_of_deletion'
                  const response = await axios.delete(
                    "/api/delete-appointment/" + rowsID,
                    {
                      data: formJsonForDelete,
                    }
                  );

                  // Execute post request to register the appointment deletion
                  const postData = { ...formJsonForDelete, reason_of_deletion };
                  await axios.post(
                    `/api/delete-appointment-register/` + rowsID,
                    postData
                  );

                  toast.success("Appointment Deleted successfully");
                  window.location.reload();
                } catch (error) {
                  toast.error("Could not delete appointment");
                }

                handleCloseDeleteAppointment();
                window.location.reload();
              },
            }}
          >
            <DialogTitle>Delete Appointment</DialogTitle>
            <DialogContent style={{ height: "500px" }}>
              <DialogContentText sx={{ marginBottom: "11px" }}>
                Are you sure you want to delete this appointment? This action
                cannot be undone.
              </DialogContentText>
              <input type="hidden" value={doctor_name} name="doctor_name" />

              <label>Patient ID</label>
              <TextField
                autoFocus
                required
                margin="dense"
                id="patientId"
                name="patient_id"
                label="Patient Id"
                type="text"
                fullWidth
                variant="standard"
                value={appointmentDeleteId}
              />
              <label>Patient Name</label>
              <TextField
                required
                margin="dense"
                id="patientName"
                name="patient_name"
                label="Patient Name"
                type="text"
                fullWidth
                variant="standard"
                value={appointmentDeleteName}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginTop: "8px",
                  marginBottom: "11px",
                }}
              >
                <label>Choosed Date and Time</label>
                <DateTimePicker
                  name="date_of_appointment"
                  onChange={setDateTimeOnChange}
                  //   value={dateTime}
                  value={appointmentDeleteDateofApp}
                />
              </div>
              <label>Reason for Deletion</label>
              <TextField
                id="standard-multiline-static"
                // label="Multiline"
                multiline
                rows={4}
                variant="standard"
                value={appointmentDeleteReason}
                onChange={(e) => setAppointmentDeleteReason(e.target.value)}
                placeholder="Enter reason for Appointment deletion."
                required
                style={{
                  resize: "none",
                  padding: "4px 8px",
                  fontSize: "16px",
                  outline: "none",
                }}
                fullWidth
                name="reason_of_deletion"
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseDeleteAppointment}
                style={{ background: "gray", color: "white" }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                style={{ background: "red", color: "white" }}
              >
                Delete Appointment
              </Button>
            </DialogActions>
          </Dialog>
          {/* DELETE APPOINTMENT END */}
        </div>
      }
    />
  );
}

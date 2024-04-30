import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import "../styles/DoctorViewPatient.css";

import DoctorRoot from "./DoctorRoot";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faFlaskVial,
  faPrescriptionBottleMedical,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

// for updating patient medical record
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { NavLink } from "react-router-dom";
import {
  usePatientDataId,
  usePatientDataName,
  usePatientDataAge,
  usePatientDataGender,
  usePatientDataMedicalHistory,
  usePatientDataFormId,
  usePatientDataFormName,
  usePatientDataFormAge,
  usePatientDataFormGender,
  usePatientDataFormMedicalHistory,
} from "../../../../store/store";
export default function DoctorViewPatient() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [MedicalHistoryUpdate, setMedicalHistoryUpdate] = useState("");
  const { id, setId } = usePatientDataId();
  const { name, setName } = usePatientDataName();
  const { age, setAge } = usePatientDataAge();
  const { gender, setGender } = usePatientDataGender();
  const { medicalhistory, setMedicalHistory } = usePatientDataMedicalHistory();
  const { idForm, setIdForm } = usePatientDataFormId();
  const { nameForm, setNameForm } = usePatientDataFormName();
  const { ageForm, setAgeForm } = usePatientDataFormAge();
  const { genderForm, setGenderForm } = usePatientDataFormGender();
  const { medicalhistoryForm, setMedicalhistoryForm } =
    usePatientDataFormMedicalHistory();
  // const [id, setId] = useState();
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

  const [openUpdateRecord, setOpenUpdateRecord] = React.useState(false);

  const handleClickOpenUpdateRecord = (rowId) => {
    setOpenUpdateRecord(true);
    setId(rowId);
    if (rows && rows.length > 0) {
      axios.get(`/api/view-patient/${rowId}`).then((res) => {
        setMedicalHistoryUpdate(res.data[0].medicalhistory);
      });
    }
  };
  const handlePrescription = (rowId) => {
    if (rows && rows.length > 0) {
      axios
        .get(`/api/get-patient/${rowId}`)
        .then((res) => {
          const { id, name, age, gender, medicalhistory } = res.data[0];

          setId(id);
          setName(name);
          setAge(age);
          setGender(gender);
          setMedicalHistory(medicalhistory);
        })
        .catch((error) => {
          console.error("Error fetching patient data:", error);
        });
    }
  };
  const handleLabForm = (rowId) => {
    if (rows && rows.length > 0) {
      axios
        .get(`/api/get-patient/${rowId}`)
        .then((res) => {
          const { id, name, age, gender, medicalhistory } = res.data[0];

          setIdForm(id);
          setNameForm(name);
          setAgeForm(age);
          setGenderForm(gender);
          setMedicalhistoryForm(medicalhistory);
        })
        .catch((error) => {
          console.error("Error fetching patient data:", error);
        });
    }
  };

  const handleCloseUpdateRecord = () => {
    setOpenUpdateRecord(false);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 70, key: "id" },
    { field: "name", headerName: "Name", width: 130, key: "name" },
    { field: "age", headerName: "Age", width: 70, key: "age" },
    { field: "gender", headerName: "Gender", width: 70, key: "gender" },
    { field: "email", headerName: "Email", width: 260, key: "email" },
    {
      field: "medicalhistory",
      headerName: "Medical History",
      width: 450,
    },
    {
      field: "dateofregistration",
      headerName: "Date of Registration",
      width: 230,
    },
    {
      headerName: "Action",
      width: 300,
      sortable: false,
      renderCell: (params) => (
        <div>
          <button
            className="doctorEditButton"
            onClick={() => handleClickOpenUpdateRecord(params.row.id)}
          >
            Edit{" "}
            <span>
              <FontAwesomeIcon icon={faEdit} />
            </span>
          </button>
          <NavLink
            to="/doctor-prescription"
            className="doctorPrescriptionButton"
            onClick={() => handlePrescription(params.row.id)}
          >
            Prescription{" "}
            <span>
              <FontAwesomeIcon icon={faPrescriptionBottleMedical} />
            </span>
          </NavLink>
          <NavLink
            to="/doctor-lab-request"
            className="doctorLabButton"
            onClick={() => handleLabForm(params.row.id)}
          >
            Labratory{" "}
            <span>
              <FontAwesomeIcon icon={faFlaskVial} />
            </span>
          </NavLink>
        </div>
      ),
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
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "auto",
            }}
            className="doctorViewPatientTable"
          >
            <h2
              style={{
                color: "#14ac5f",
                fontWeight: "800",
                marginBottom: "11px",
              }}
            >
              PATIENTS WITH MEDICAL RECORD
            </h2>
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
            <Dialog
              open={openUpdateRecord}
              onClose={handleCloseUpdateRecord}
              PaperProps={{
                component: "form",
                onSubmit: (event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  const formJson = Object.fromEntries(formData.entries());
                  let UpdatePatient = axios.put(`/api/update-patient/` + id, {
                    id: formJson.id,
                    medicalhistory: formJson.medicalhistory,
                  });
                  UpdatePatient.then(() => {
                    toast.success("Medical History Updated successfully");
                    window.location.reload();
                  }).catch((error) => {
                    console.error("Could not update medical history:", error);
                    toast.error("Failed to Update medical History");
                  });
                  handleCloseUpdateRecord();
                },
              }}
            >
              <DialogTitle>
                <b>Medical Record</b>
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please review and update the patient's medical record with any
                  relevant information. Accurate and up-to-date records are
                  essential for providing the best possible care.
                </DialogContentText>
                <input type="hidden" value={id} name="id" />
                <TextField
                  sx={{ marginTop: "11px" }}
                  id="outlined-multiline-static"
                  label="Medical Record"
                  name="medicalhistory"
                  fullWidth
                  multiline
                  rows={4}
                  defaultValue={MedicalHistoryUpdate}
                  onChange={(e) => setMedicalHistoryUpdate(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleCloseUpdateRecord}
                  style={{ color: "white", background: "gray" }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  style={{ color: "white", background: "#14ac5f" }}
                >
                  Update
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        }
      />
    </div>
  );
}

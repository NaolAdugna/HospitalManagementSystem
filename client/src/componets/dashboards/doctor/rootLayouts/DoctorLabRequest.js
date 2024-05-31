import React, { useRef, useState, useEffect } from "react";
import "../styles/DoctorLabRequest.css";

import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { TextField } from "@mui/material";

import ReactPrint from "react-to-print";
import QRCode from "react-qr-code";
import { Close } from "@mui/icons-material";
import ReactWaterMark from "react-watermark-component";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";
import AddIcon from "@mui/icons-material/Add";
import generatePDF, { Resolution, Margin } from "react-to-pdf";

import NativeSelect from "@mui/material/NativeSelect";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  usePatientDataFormId,
  usePatientDataFormName,
  usePatientDataFormAge,
  usePatientDataFormGender,
  usePatientDataFormMedicalHistory,
} from "../../../../store/store";
import DoctorRoot from "./DoctorRoot";
export default function DoctorLabRequest() {
  const [editorValue, setEditorValue] = useState();
  const { idForm, setIdForm } = usePatientDataFormId();
  const { nameForm, setNameForm } = usePatientDataFormName();
  const { ageForm, setAgeForm } = usePatientDataFormAge();
  const { genderForm, setGenderForm } = usePatientDataFormGender();
  const { medicalhistoryForm, setMedicalhistoryForm } =
    usePatientDataFormMedicalHistory();
  const [userName, setUserName] = React.useState(
    sessionStorage.getItem("username")
  );
  const [emailSession, setEmailSession] = React.useState(
    sessionStorage.getItem("email")
  );
  const [openPopupFile, setOpenPopupFile] = useState(false);
  const [openPrescriptionPopUp, setopenPrescriptionPopUp] = useState(false);
  const [ListPatient, setListPatient] = useState([]);
  const [ListDrugProperty, setListDrugProperty] = useState([]);
  const [patientFile, setPatientFile] = useState("");
  const [LabFile, setLabFile] = useState(nameForm);
  const [LabPatientSex, setLabPatientSex] = useState(genderForm);
  const [LabPatientAge, setLabPatientAge] = useState(ageForm);
  const [drugName, setDrugName] = useState("");
  const [dosageForm, setDosageForm] = useState("");
  const [drugDuration, setDrugDuration] = useState("");

  React.useEffect(() => {
    setUserName(sessionStorage.getItem("username"));
    setEmailSession(sessionStorage.getItem("email"));
  }, []);
  React.useEffect(() => {
    const combinedValue = `<p> <b> ID Number </b> - ${idForm} <br/> <b>Name - </b> ${nameForm} <br/> <b>Age - </b> ${ageForm} <br/> <b>Gender - </b> ${genderForm} <br/> <b>Medical History - </b> ${medicalhistoryForm} </p>`;
    setEditorValue(combinedValue);
    localStorage.setItem("nameForm", nameForm);

    localStorage.setItem("ageForm", ageForm);
    localStorage.setItem("genderForm", genderForm);
  }, [idForm]);
  React.useEffect(() => {
    setLabFile(nameForm);
    setLabPatientSex(genderForm);
    setLabPatientAge(ageForm);
  }, [idForm]);

  React.useEffect(() => {
    const storedValue = localStorage.getItem("editorValueLab");
    if (storedValue) {
      setEditorValue(storedValue);
    }
    const valueName = localStorage.getItem("nameForm");
    const valueAge = localStorage.getItem("ageForm");
    const valueGender = localStorage.getItem("genderForm");
    if (valueName || valueAge || valueGender) {
      setLabFile(valueName);
      setLabPatientSex(valueGender);
      setLabPatientAge(valueAge);
    }
  }, []);
  const handleEditorChange = (value) => {
    localStorage.setItem("editorValueLab", value);
  };

  const ref = useRef();
  const [Dates, setDates] = useState("");
  let newDate = new Date();
  let date = newDate.getDate();
  useEffect(() => {
    const current = new Date();
    const date = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}`;
    setDates(date);
  }, []);

  const addDataFile = () => {
    setOpenPopupFile(false);
  };
  const addDrugFile = () => {
    ListDrugProperty.push({
      drugname: drugName,
      dosageform: dosageForm,
      drugduration: drugDuration,
    });
    setDrugName("");
    setDosageForm("");
    setDrugDuration("");
    setopenPrescriptionPopUp(false);
  };

  const text = "GebreTsadik ";
  const optionWaterMark = {
    chunkWidth: 200,
    chunkHeight: 80,
    textAlign: "center",
    textBaseline: "bottom",
    globalAlpha: 0.3,
    font: "bold 19px Arial",
    rotateAngle: -26,
    fillStyle: "rgba(0, 0, 0, 0.6)",
  };
  const options = {
    filename: `${LabFile} Labratory Reques on ${Dates}.pdf`,
    method: "save",

    resolution: Resolution.EXTREME,
    page: {
      margin: Margin.SMALL,
      format: "letter",
      orientation: "landscape",
    },
    canvas: {
      mimeType: "image/jpeg",
      qualityRatio: 1,
    },
    overrides: {
      pdf: {
        compress: true,
      },
      canvas: {
        useCORS: true,
      },
    },
  };
  const getTargetElement = () =>
    document.getElementById("doctorLabRequestContent");

  const downloadPdf = () => generatePDF(getTargetElement, options);

  return (
    <div>
      <DoctorRoot
        component={
          <div className="doctorLabRequestDashboardSecondCard">
            <section className="doctorLabRequestMainContainerSection">
              <div className="doctorLabRequestContainer">
                <h1
                  style={{
                    textAlign: "center",
                    marginBottom: "12px",
                    marginTop: "12px",
                  }}
                >
                  Labratory Request Manager{" "}
                </h1>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: "11px",
                  }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<GetAppOutlinedIcon />}
                    style={{
                      background: "#14ac5f",
                      border: "none",
                      color: "white",
                      marginRight: "8px",
                    }}
                    onClick={downloadPdf}
                  >
                    Download File
                  </Button>
                  <ReactPrint
                    trigger={() => (
                      <Button
                        variant="outlined"
                        startIcon={<PrintOutlinedIcon />}
                        style={{
                          background: "#4bad95",
                          border: "none",
                          color: "white",
                          marginRight: "8px",
                        }}
                      >
                        Print
                      </Button>
                    )}
                    content={() => ref.current}
                    documentTitle={`Patient File on ${Dates}`}
                  />
                </div>
                <div
                  className="doctorLabRequestContent"
                  id="doctorLabRequestContent"
                  ref={ref}
                >
                  <ReactWaterMark
                    waterMarkText={text}
                    options={optionWaterMark}
                  >
                    <div className="col-md-12">
                      <div className="doctorLabRequestHeader">
                        <div className="col-md-4 brcode">
                          <QRCode
                            size={256}
                            style={{
                              height: "auto",
                              maxWidth: "120px",
                              width: "100%",
                            }}
                            value={`${LabFile} Labratory Request`}
                            viewBox={`0 0 256 256`}
                          />
                        </div>
                        <div className="col-md-8 text-right bbc">
                          <h2 style={{ color: "#325aa8" }}>
                            <strong>Gebre Tsadik Shawo General Hospital</strong>
                          </h2>
                          <p>
                            Email: gebretsadikshawogeneralhospital@gmail.com
                          </p>
                          <p>Tel: +251 912345678</p>
                        </div>
                      </div>
                      <br />

                      <br />
                      <h2 style={{ textAlign: "center", marginBottom: "11px" }}>
                        Labratory Request Form
                      </h2>
                      <div className="doctorLabRequestFile">
                        <div>
                          <h3>Patient Name</h3>
                          <div style={{ marginLeft: "16px", marginTop: "5px" }}>
                            <li>{LabFile}</li>
                          </div>
                        </div>
                        <div>
                          <h3>Patient Sex</h3>
                          <div style={{ marginLeft: "16px", marginTop: "5px" }}>
                            <li>{LabPatientSex}</li>
                          </div>
                        </div>
                        <div>
                          <h3>Patient Age</h3>
                          <div style={{ marginLeft: "16px", marginTop: "5px" }}>
                            <li>{LabPatientAge}</li>
                          </div>
                        </div>
                      </div>
                      <div className="doctorLabRequestFile">
                        <div>
                          <h3>Parasitology</h3>
                          <div style={{ marginLeft: "16px", marginTop: "5px" }}>
                            {ListDrugProperty.length ? (
                              <ol>
                                {ListDrugProperty.map((items, index) => {
                                  return <li key={index}>{items.drugname}</li>;
                                })}
                              </ol>
                            ) : null}
                          </div>
                        </div>
                        <div>
                          <h3>Urinalysis</h3>
                          <div style={{ marginLeft: "16px", marginTop: "5px" }}>
                            {ListDrugProperty.length ? (
                              <ol>
                                {ListDrugProperty.map((items, index) => {
                                  return (
                                    <li key={index}>{items.dosageform}</li>
                                  );
                                })}
                              </ol>
                            ) : null}
                          </div>
                        </div>
                        <div>
                          <h3>Hematology </h3>
                          <div style={{ marginLeft: "16px", marginTop: "5px" }}>
                            {ListDrugProperty.length ? (
                              <ol>
                                {ListDrugProperty.map((items, index) => {
                                  return (
                                    <li key={index}>{items.drugduration}</li>
                                  );
                                })}
                              </ol>
                            ) : null}
                          </div>
                        </div>
                      </div>

                      <div>
                        <br />
                        <div className="col-md-12">
                          <p>
                            <b>Date :</b> {Dates}{" "}
                          </p>
                          <p>
                            <b>Name: </b>
                            {userName}
                          </p>
                          <p>
                            <b>Contact: </b>
                            {emailSession}
                          </p>
                        </div>
                      </div>
                    </div>
                  </ReactWaterMark>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "11px",
                  }}
                >
                  <Button
                    variant="outlined"
                    endIcon={<AddIcon />}
                    onClick={() => setOpenPopupFile(true)}
                    style={{
                      background: "#14ac5f",
                      border: "none",
                      color: "white",
                      marginRight: "11px",
                    }}
                  >
                    Add File
                  </Button>
                  <Button
                    variant="outlined"
                    endIcon={<AddIcon />}
                    onClick={() => setopenPrescriptionPopUp(true)}
                    style={{
                      background: "#14ac5f",
                      border: "none",
                      color: "white",
                      //   marginRight: "11px",
                    }}
                  >
                    Add Request
                  </Button>
                </div>
              </div>
              <section>
                <ReactQuill
                  theme="snow"
                  value={editorValue}
                  className="doctorLabRequestEditor"
                  onChange={handleEditorChange}
                  readOnly={true}
                />
                ;
              </section>
            </section>

            <Dialog open={openPopupFile}>
              <DialogTitle>
                <div
                  className="title"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="hed">New File</div>
                  <div
                    className="icon-cross"
                    onClick={() => setOpenPopupFile(false)}
                  >
                    <Close className="addNewFileButton" />
                  </div>
                </div>
              </DialogTitle>
              <DialogContent>
                <div className="container">
                  <div className="forms" style={{ marginBottom: "10px" }}>
                    <label>Patient Name</label>
                    <TextField
                      autoFocus
                      fullWidth
                      type="text"
                      value={LabFile}
                      onChange={(e) => setLabFile(e.target.value)}
                      // onChange={handleDataChange}
                      placeholder="Patient Names"
                    />
                  </div>
                  <div className="forms" style={{ marginBottom: "10px" }}>
                    <label>Choose Gender</label>
                    <Select
                      fullWidth
                      required
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={LabPatientSex}
                      onChange={(e) => setLabPatientSex(e.target.value)}
                      // onChange={handleDataChange}
                      label="Choose Gender"
                      placeholder="Choose Gender"
                    >
                      <MenuItem value="">Choose Gender</MenuItem>
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                    </Select>
                  </div>
                  <div className="forms" style={{ marginBottom: "10px" }}>
                    <label>Patient Age</label>
                    <TextField
                      type="text"
                      fullWidth
                      value={LabPatientAge}
                      onChange={(e) => setLabPatientAge(e.target.value)}
                      // onChange={handleDataChange}
                      placeholder="Patient Age"
                    />
                  </div>
                  <div className="buttons" style={{ float: "right" }}>
                    <Button
                      onClick={addDataFile}
                      style={{
                        background: "#14ac5f",
                        color: "#fff",
                        marginTop: "11px",
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={openPrescriptionPopUp}>
              <DialogTitle>
                <div
                  className="title"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="hed">New Labratory Request Order</div>
                  <div
                    className="icon-cross"
                    onClick={() => setopenPrescriptionPopUp(false)}
                  >
                    <Close className="addNewFileButton" />
                  </div>
                </div>
              </DialogTitle>
              <DialogContent>
                <div className="container">
                  <div className="forms" style={{ marginBottom: "10px" }}>
                    <label>Parasitology</label>
                    <TextField
                      autoFocus
                      fullWidth
                      required
                      type="text"
                      value={drugName}
                      onChange={(e) => setDrugName(e.target.value)}
                      placeholder="Parasitology"
                    />
                  </div>
                  <div className="forms" style={{ marginBottom: "10px" }}>
                    <label>Urinalysis</label>
                    <TextField
                      type="text"
                      fullWidth
                      required
                      value={dosageForm}
                      onChange={(e) => setDosageForm(e.target.value)}
                      placeholder="Urinalysis"
                    />
                  </div>
                  <div className="forms" style={{ marginBottom: "10px" }}>
                    <label>Hematology </label>
                    <TextField
                      type="text"
                      fullWidth
                      required
                      value={drugDuration}
                      onChange={(e) => setDrugDuration(e.target.value)}
                      placeholder="Hematology"
                    />
                  </div>
                  <div className="buttons" style={{ float: "right" }}>
                    <Button
                      onClick={addDrugFile}
                      style={{
                        background: "#14ac5f",
                        color: "#fff",
                        marginTop: "11px",
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        }
      />
    </div>
  );
}

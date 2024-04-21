import React, { useRef, useState, useEffect } from "react";
import "../styles/DoctorPrescription.css";
import DoctorRoot from "./DoctorRoot";

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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import NativeSelect from "@mui/material/NativeSelect";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export default function DoctorPrescription() {
  const [userName, setUserName] = React.useState(
    sessionStorage.getItem("username")
  );
  const [emailSession, setEmailSession] = React.useState(
    sessionStorage.getItem("email")
  );
  React.useEffect(() => {
    setUserName(sessionStorage.getItem("username"));
    setEmailSession(sessionStorage.getItem("email"));
  }, []);
  const [editorValue, setEditorValue] = useState([]);
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

  const [openPopupFile, setOpenPopupFile] = useState(false);
  const [openPrescriptionPopUp, setopenPrescriptionPopUp] = useState(false);
  const [ListPrescription, setListPrescription] = useState([]);
  const [ListDrugProperty, setListDrugProperty] = useState([]);
  const [PrescriptionFile, setPrescriptionFile] = useState("");
  const [PrescriptionSex, setPrescriptionSex] = useState("");
  const [PrescriptionAge, setPrescriptionAge] = useState("");
  const [drugName, setDrugName] = useState("");
  const [dosageForm, setDosageForm] = useState("");
  const [drugDuration, setDrugDuration] = useState("");
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
    filename: ` ${PrescriptionFile} Prescription Form on ${Dates} .pdf`,
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
    document.getElementById("doctorPrescriptionContent");

  const downloadPdf = () => generatePDF(getTargetElement, options);
  return (
    <div>
      <DoctorRoot
        component={
          <div className="doctorPrescriptionDashboardSecondCard">
            <section className="doctorPrescriptionMainContainerSection">
              <div className="doctorPrescriptionContainer">
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
                  className="doctorPrescriptionContent"
                  id="doctorPrescriptionContent"
                  ref={ref}
                >
                  <ReactWaterMark
                    waterMarkText={text}
                    options={optionWaterMark}
                  >
                    <div className="col-md-12">
                      <div className="doctorPrescriptionHeader">
                        <div className="col-md-4 brcode">
                          <QRCode
                            size={256}
                            style={{
                              height: "auto",
                              maxWidth: "120px",
                              width: "100%",
                            }}
                            value={PrescriptionFile}
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
                        Prescription Form
                      </h2>

                      <div className="doctorPrescriptionPatientFile">
                        <div>
                          <h3>Patient Name</h3>
                          <div style={{ marginLeft: "16px", marginTop: "5px" }}>
                            <li>{PrescriptionFile}</li>
                          </div>
                        </div>
                        <div>
                          <h3>Patient Sex</h3>
                          <div style={{ marginLeft: "16px", marginTop: "5px" }}>
                            <li>{PrescriptionSex}</li>
                          </div>
                        </div>
                        <div>
                          <h3>Patient Age</h3>
                          <div style={{ marginLeft: "16px", marginTop: "5px" }}>
                            <li>{PrescriptionAge}</li>
                          </div>
                        </div>
                      </div>
                      <div className="doctorPrescriptionPatientFile">
                        <div>
                          <h3>Drug Name</h3>
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
                          <h3>Dosage Form</h3>
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
                          <h3>Drug Duration</h3>
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
                    Add Patient
                  </Button>
                  <Button
                    variant="outlined"
                    endIcon={<AddIcon />}
                    onClick={() => setopenPrescriptionPopUp(true)}
                    style={{
                      background: "#14ac5f",
                      border: "none",
                      color: "white",
                    }}
                  >
                    Add Prescription
                  </Button>
                </div>
              </div>
              <section>
                <ReactQuill
                  theme="snow"
                  value={editorValue}
                  onChange={setEditorValue}
                  className="doctorPrescriptionEditor"
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
                  <div className="hed">New Prescription</div>
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
                      value={PrescriptionFile}
                      onChange={(e) => setPrescriptionFile(e.target.value)}
                      placeholder="Patient Names"
                    />
                  </div>
                  <div className="forms" style={{ marginBottom: "10px" }}>
                    <label>Choose Gender</label>
                    <Select
                      required
                      fullWidth
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={PrescriptionSex}
                      onChange={(e) => setPrescriptionSex(e.target.value)}
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
                      value={PrescriptionAge}
                      onChange={(e) => setPrescriptionAge(e.target.value)}
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
                  <div className="hed">New Prescription</div>
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
                    <label>Drug Name</label>
                    <TextField
                      autoFocus
                      fullWidth
                      type="text"
                      value={drugName}
                      onChange={(e) => setDrugName(e.target.value)}
                      placeholder="Drug Names"
                    />
                  </div>
                  <div className="forms" style={{ marginBottom: "10px" }}>
                    <label>Dosage Form</label>
                    <TextField
                      type="text"
                      fullWidth
                      value={dosageForm}
                      onChange={(e) => setDosageForm(e.target.value)}
                      placeholder="Dosage Form"
                    />
                  </div>
                  <div className="forms" style={{ marginBottom: "10px" }}>
                    <label>Drug Duration</label>
                    <TextField
                      type="text"
                      fullWidth
                      value={drugDuration}
                      onChange={(e) => setDrugDuration(e.target.value)}
                      placeholder="Drug Duration"
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

import React, { useRef, useState, useEffect } from "react";
import "../style/LabOverView.css";

import LabRoot from "./LabRoot";

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
export default function LabOverView() {
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
  const [openPopupReport, setOpenPopupReport] = useState(false);
  const [ListPatient, setListPatient] = useState([]);
  const [patientFile, setPatientFile] = useState("");
  const [report, setReport] = useState("");
  const [reportName, setReportName] = useState("");
  const [reportGender, setReportGender] = useState("");
  const [reportAge, setReportAge] = useState("");
  const addDataFile = () => {
    setOpenPopupFile(false);
  };
  const addReportFile = () => {
    setOpenPopupReport(false);
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
    filename: `${reportName} Labratory Result Report on ${Dates}.pdf`,
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
  const getTargetElement = () => document.getElementById("labDashboardContent");

  const downloadPdf = () => generatePDF(getTargetElement, options);
  return (
    <div>
      <LabRoot
        component={
          <div>
            <div className="labDashboardContainer">
              <h1
                style={{
                  textAlign: "center",
                  marginBottom: "12px",
                  marginTop: "12px",
                }}
              >
                Labratory Result Report Manager{" "}
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
                className="labDashboardContent"
                id="labDashboardContent"
                ref={ref}
              >
                <ReactWaterMark waterMarkText={text} options={optionWaterMark}>
                  <div className="col-md-12">
                    <div className="labDashboardHeader">
                      <div className="col-md-4 brcode">
                        <QRCode
                          size={256}
                          style={{
                            height: "auto",
                            maxWidth: "120px",
                            width: "100%",
                          }}
                          value={`${reportName} Labratory Result Report`}
                          viewBox={`0 0 256 256`}
                        />
                      </div>
                      <div className="col-md-8 text-right bbc">
                        <h2 style={{ color: "#325aa8" }}>
                          <strong>Gebre Tsadik Shawo General Hospital</strong>
                        </h2>
                        <p>Email: gebretsadikshawogeneralhospital@gmail.com</p>
                        <p>Tel: +251 912345678</p>
                      </div>
                    </div>
                    <br />

                    <br />
                    <div>
                      <h1 style={{ textAlign: "center", marginBottom: "11px" }}>
                        {" "}
                        Result Report
                      </h1>

                      <div className="doctorPrescriptionPatientFile">
                        <div>
                          <h3>Patient Name</h3>
                          <div style={{ marginLeft: "16px", marginTop: "5px" }}>
                            <li>{reportName}</li>
                          </div>
                        </div>
                        <div>
                          <h3>Patient Sex</h3>
                          <div style={{ marginLeft: "16px", marginTop: "5px" }}>
                            <li>{reportGender}</li>
                          </div>
                        </div>
                        <div>
                          <h3>Patient Age</h3>
                          <div style={{ marginLeft: "16px", marginTop: "5px" }}>
                            <li>{reportAge}</li>
                          </div>
                        </div>
                      </div>
                      <main>
                        <h3>Result</h3>
                        <div>
                          <p>{report}</p>
                        </div>
                      </main>
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
                  Add Name
                </Button>
                <Button
                  variant="outlined"
                  endIcon={<AddIcon />}
                  onClick={() => setOpenPopupReport(true)}
                  style={{
                    background: "#14ac5f",
                    border: "none",
                    color: "white",
                  }}
                >
                  Add Report
                </Button>
              </div>
            </div>
            {/* add patient dialog start */}
            <Dialog open={openPopupFile}>
              <DialogTitle>
                <div
                  className="title"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="hed">New Patient</div>
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
                      value={reportName}
                      onChange={(e) => setReportName(e.target.value)}
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
                      value={reportGender}
                      onChange={(e) => setReportGender(e.target.value)}
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
                      value={reportAge}
                      onChange={(e) => setReportAge(e.target.value)}
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
            {/* add patient dialog end */}

            {/* add report dialog start */}
            <Dialog open={openPopupReport}>
              <DialogTitle>
                <div
                  className="title"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="hed">New Report</div>
                  <div
                    className="icon-cross"
                    onClick={() => setOpenPopupReport(false)}
                  >
                    <Close className="addNewFileButton" />
                  </div>
                </div>
              </DialogTitle>
              <DialogContent>
                <div className="container">
                  <div className="forms" style={{ marginBottom: "10px" }}>
                    <label>Result Report</label>
                    <TextField
                      autoFocus
                      sx={{ marginTop: "11px" }}
                      id="outlined-multiline-static"
                      label="Result Report"
                      name="result_report"
                      fullWidth
                      multiline
                      rows={6}
                      value={report}
                      onChange={(e) => setReport(e.target.value)}
                      placeholder="Report"
                    />
                  </div>

                  <div className="buttons" style={{ float: "right" }}>
                    <Button
                      onClick={addReportFile}
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
            {/* add report dialog end */}
          </div>
        }
      />
    </div>
  );
}

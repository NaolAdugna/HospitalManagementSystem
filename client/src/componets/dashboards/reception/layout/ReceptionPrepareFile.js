import React, { useRef, useState, useEffect } from "react";
import "../styles/ReceptionPrepareFile.css";

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

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReceptionRoot from "./ReceptionRoot";

export default function ReceptionPrepareFile() {
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
  const [ListPatient, setListPatient] = useState([]);
  const [patientFile, setPatientFile] = useState("");
  const addDataFile = () => {
    ListPatient.push({
      patientname: patientFile,
    });
    setPatientFile("");
    setOpenPopupFile(false);
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
    filename: `${Dates} Morning Patient Files.pdf`,
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
    document.getElementById("receptionPrepareFileContent");

  const downloadPdf = () => generatePDF(getTargetElement, options);
  return (
    <div>
      <ReceptionRoot
        component={
          <div className="receptionPrepareFileDashboardSecondCard">
            <section className="receptionPrepareFileMainContainerSection">
              <div className="receptionPrepareFileContainer">
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
                  className="receptionPrepareFileContent"
                  id="receptionPrepareFileContent"
                  ref={ref}
                >
                  <ReactWaterMark
                    waterMarkText={text}
                    options={optionWaterMark}
                  >
                    <div className="col-md-12">
                      <div className="receptionPrepareFileHeader">
                        <div className="col-md-4 brcode">
                          <QRCode
                            size={256}
                            style={{
                              height: "auto",
                              maxWidth: "120px",
                              width: "100%",
                            }}
                            value={Dates}
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
                      <div>
                        <div>
                          <h2>Patient Name</h2>
                        </div>
                        <div style={{ marginLeft: "16px", marginTop: "5px" }}>
                          {ListPatient.length ? (
                            <ol>
                              {ListPatient.map((items, index) => {
                                return <li key={index}>{items.patientname}</li>;
                              })}
                            </ol>
                          ) : null}
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

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="outlined"
                    endIcon={<AddIcon />}
                    onClick={() => setOpenPopupFile(true)}
                    style={{
                      background: "#14ac5f",
                      border: "none",
                      color: "white",
                    }}
                  >
                    Add File
                  </Button>
                </div>
              </div>
              <section>
                <ReactQuill
                  theme="snow"
                  value={editorValue}
                  onChange={setEditorValue}
                  className="receptionPrepareFileEditor"
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
                  <div className="forms">
                    <TextField
                      autoFocus
                      type="text"
                      value={patientFile}
                      onChange={(e) => setPatientFile(e.target.value)}
                      placeholder="Patient Names"
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
          </div>
        }
      />
    </div>
  );
}

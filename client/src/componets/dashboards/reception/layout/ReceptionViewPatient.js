import * as React from "react";
import "../styles/ReceptionViewPatient.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import IconButton from "@mui/material/IconButton";

import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import NativeSelect from "@mui/material/NativeSelect";
import Input from "@mui/material/Input";

import ReceptionRoot from "./ReceptionRoot";
import ViewPatientTable from "./ViewPatientTable";
import { registerPatient } from "../../../../functions/checker";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function ReceptionViewPatient() {
  const [editorValue, setEditorValue] = React.useState([]);

  const [showPassword, setShowPassword] = React.useState(false);
  const [openRegistration, setOpenRegistration] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickOpenRegistration = () => {
    setOpenRegistration(true);
  };

  const handleCloseRegistration = () => {
    setOpenRegistration(false);
  };

  return (
    <div>
      <ReceptionRoot
        component={
          <div>
            <div className="SearchandAddContainer">
              <div>
                <Button
                  sx={{
                    padding: "8px 20px",
                    border: "none",
                    backgroundColor: "#14ac5f",
                    color: "#000",
                  }}
                  className="receptionViewPatientAddUserButton"
                >
                  <NavLink
                    to="/reception-prepare-file"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Prepare Files
                  </NavLink>
                </Button>
              </div>
              <div className="addUserContainer">
                <Button
                  sx={{
                    padding: "8px 20px",
                    border: "none",
                    backgroundColor: "#14ac5f",
                    color: "#000",
                  }}
                  className="receptionViewPatientAddUserButton"
                  onClick={handleClickOpenRegistration}
                >
                  Add Patient{" "}
                  <span>
                    <FontAwesomeIcon icon={faAdd} />
                  </span>{" "}
                </Button>
                <Dialog
                  open={openRegistration}
                  onClose={handleCloseRegistration}
                  PaperProps={{
                    component: "form",
                    onSubmit: (event) => {
                      event.preventDefault();
                      const formData = new FormData(event.currentTarget);
                      const formJson = Object.fromEntries(formData.entries());
                      let registerPromise = registerPatient(formJson);
                      toast.promise(registerPromise, {
                        loading: "Registering...",
                        success: "register successfully...",
                        error: "could not register",
                      });

                      handleCloseRegistration();
                      window.location.reload();
                    },
                  }}
                >
                  <DialogTitle>Registration</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Fill the form to register new patient.
                    </DialogContentText>
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="name"
                      name="name"
                      label="Enter Full Name"
                      type="text"
                      fullWidth
                      variant="standard"
                    />

                    {/* <InputLabel htmlFor="standard-adornment-password" >
                    Password
                  </InputLabel> */}
                    <Input
                      fullWidth
                      required
                      name="password"
                      margin="dense"
                      placeholder="Enter Password"
                      id="standard-adornment-password password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />

                    <TextField
                      required
                      margin="dense"
                      id="age"
                      name="age"
                      label="Enter Age"
                      type="text"
                      fullWidth
                      variant="standard"
                    />

                    <NativeSelect
                      required
                      margin="dense"
                      fullWidth
                      variant="standard"
                      inputProps={{
                        name: "gender",
                        id: "uncontrolled-native",
                      }}
                    >
                      <option value="">Choose Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </NativeSelect>

                    <TextField
                      required
                      margin="dense"
                      id="email"
                      name="email"
                      label="Email Address"
                      type="email"
                      fullWidth
                      variant="standard"
                    />
                    <TextField
                      id="standard-multiline-static"
                      label="Medical History"
                      multiline
                      rows={5}
                      variant="standard"
                      disabled
                      fullWidth
                      margin="dense"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseRegistration}>Cancel</Button>
                    <Button type="submit">Register</Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
            <div className="receptionViewTableContent">
              <main className="receptionViewTable">
                <ViewPatientTable />
              </main>
              <section className="receptionViewEditorContainer">
                <ReactQuill
                  theme="snow"
                  value={editorValue}
                  onChange={setEditorValue}
                  className="receptionEditor"
                />
                ;
              </section>
            </div>
          </div>
        }
      />
    </div>
  );
}

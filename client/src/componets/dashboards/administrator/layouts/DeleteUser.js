import React, { useEffect, useState } from "react";
import "../styles/DeleteUser.css";

// Fontawesome family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { TextField } from "@mui/material";
import toast from "react-hot-toast";
import { useFormik } from "formik";

import { useParams, useNavigate } from "react-router-dom";

import {
  faEnvelope,
  faUserShield,
  faUser,
  faBars,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import AdminRoot from "./AdminRoot";

export default function DeleteUser() {
  const [userName, setUserName] = React.useState(
    sessionStorage.getItem("username")
  );
  React.useEffect(() => {
    setUserName(sessionStorage.getItem("username"));
  }, []);
  const { id } = useParams();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  const [reason, setReason] = useState();
  const [deletedby, setDeletedBy] = useState();

  useEffect(() => {
    axios.get(`/api/users/${id}`).then((res) => {
      setUsername(res.data[0].username);
      setEmail(res.data[0].email);
      setPassword(res.data[0].password);
      setRole(res.data[0].role);
      setDeletedBy(userName);
    });
  }, [id]);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: username,
      password: password,
      role: role,
      email: email,
      reason: reason,
      deletedby: userName,
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let registerPromise = axios.delete(`/api/delete-user/` + id, {
        username,
        password,
        role,
        email,
      });
      toast.promise(registerPromise, {
        loading: "Deleting...",
        success: "Deleted successfully...",
        error: "could not Delete",
      });

      registerPromise.then(function () {
        axios.post(`/api/delete-user-register/` + id, {
          username,
          role,
          email,
          reason,
          deletedby,
        });
        navigate("/admin-manage-users");
      });
    },
  });
  return (
    <div>
      <AdminRoot
        component={
          <div>
            <div className="adminDeleteBodyUpdateContainer">
              <div className="adminDeleteContainer">
                <div className="adminDeleteLoginTitle">
                  <h2>DELETE </h2>{" "}
                  <h2>
                    {" "}
                    <br />{" "}
                    <span
                      style={{
                        color: "#14ac5f",
                        textDecoration: "underline",
                      }}
                    >
                      {" "}
                      HERE
                    </span>
                  </h2>
                </div>
                <form
                  className="adminDeleteFormContainer"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="adminDeleteLoginName">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="adminDeleteLoginNameIcon"
                    />
                    <TextField
                      name="username"
                      variant="standard"
                      id="standard-basic idOfName"
                      className="adminDeleteLoginInputs"
                      {...formik.getFieldProps("username")}
                      value={username}
                    />
                  </div>

                  <div className="adminDeleteLoginName">
                    <FontAwesomeIcon
                      icon={faUserShield}
                      className="adminDeleteLoginNameIcon"
                    />
                    <select
                      id="adminDeleteSelectOption"
                      className="adminDeleteLoginInputs"
                      {...formik.getFieldProps("role")}
                      name="role"
                      value={role}
                    >
                      <option value="">Choose Role</option>
                      <option value="doctor">Doctor</option>
                      <option value="pharmacist">Pharmacist</option>
                      <option value="receptionist">Receptionist</option>
                      <option value="administrator">Administrator</option>
                      <option value="labratorytechnician">
                        Labratory Technician
                      </option>
                    </select>
                  </div>
                  <div className="adminDeleteLoginName">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="adminDeleteLoginNameIcon"
                    />
                    <TextField
                      name="email"
                      variant="standard"
                      id="standard-basic idOfEmail"
                      className="adminDeleteLoginInputs"
                      {...formik.getFieldProps("email")}
                      value={email}
                    />
                  </div>
                  <div className="adminDeleteLoginName">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="adminDeleteLoginNameIcon"
                    />
                    <textarea
                      name="text"
                      rows={6}
                      style={{
                        resize: "none",
                        textAlign: "justify",
                        padding: "4px 8px",
                        fontSize: "16px",
                      }}
                      onResize={false}
                      variant="standard"
                      id="standard-basic idOfEmail"
                      className="adminDeleteLoginInputs"
                      {...formik.getFieldProps("reason")}
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Enter reason for account deletion."
                      required
                    />
                  </div>
                  <div className="adminDeleteLoginName">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="adminDeleteLoginNameIcon"
                    />
                    <TextField
                      name="name"
                      variant="standard"
                      id="standard-basic idOfName"
                      className="adminDeleteLoginInputs"
                      {...formik.getFieldProps("deletedby")}
                      value={deletedby}
                    />
                  </div>

                  <div className="loginButtonContainer">
                    <button
                      className="adminDeleteLoginPageButton"
                      type="submit"
                    >
                      Delete
                    </button>
                  </div>
                </form>
                <div className="adminDeleteLoginCopyRightContainer">
                  <p>
                    CopyRight &copy; 2024 Gebretsadik Shawo General Hospital.
                    All Rights Reserverd.
                  </p>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}

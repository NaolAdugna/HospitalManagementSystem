import React, { useState, useEffect } from "react";
import "../styles/UpdateUser.css";

// Fontawesome family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { TextField } from "@mui/material";
import toast from "react-hot-toast";
import { useFormik } from "formik";

import { useParams, useNavigate } from "react-router-dom";

import {
  faEnvelope,
  faLock,
  faUser,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import AdminRoot from "./AdminRoot";

export default function UpdateUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { id } = useParams();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();

  useEffect(() => {
    axios.get(`/api/users/${id}`).then((res) => {
      setUsername(res.data[0].username);
      setEmail(res.data[0].email);
      setPassword(res.data[0].password);
      setRole(res.data[0].role);
    });
  }, [id]);

  const navigate = useNavigate();

  const togglePasswordVisisbility = () => {
    setIsOpen(!isOpen);
    setIsPasswordVisible(!isPasswordVisible);
  };

  const formik = useFormik({
    initialValues: {
      username: username,
      password: password,
      role: role,
      email: email,
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let registerPromise = axios.put(`/api/update-user/` + id, {
        username,
        password,
        role,
        email,
      });
      toast.promise(registerPromise, {
        loading: "Updating...",
        success: "Updated successfully...",
        error: "could not Update",
      });

      registerPromise.then(function () {
        navigate("/admin-manage-users");
      });
    },
  });

  return (
    <div>
      <AdminRoot
        component={
          <div>
            <div className="adminUpdateBodyUpdateContainer">
              <div className="adminUpdateContainer">
                <div className="adminUpdateLoginTitle">
                  <h2>UPDATE </h2>{" "}
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
                  className="adminUpdateFormContainer"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="adminUpdateLoginName">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="adminUpdateLoginNameIcon"
                    />
                    <TextField
                      name="username"
                      variant="standard"
                      id="standard-basic idOfName"
                      className="adminUpdateLoginInputs"
                      {...formik.getFieldProps("username")}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="adminUpdateLoginPassword adminUpdateLoginName">
                    <FontAwesomeIcon
                      icon={faLock}
                      className="adminUpdateLoginNameIcon"
                    />
                    <div className="adminUpdatePasswordContainer">
                      <TextField
                        name="password"
                        variant="standard"
                        id="standard-password-basic"
                        autoComplete="current-password"
                        type={isOpen ? "text" : "password"}
                        className="adminUpdateLoginInputs"
                        {...formik.getFieldProps("password")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {isPasswordVisible ? (
                        <FontAwesomeIcon
                          icon={faEye}
                          className="adminUpdateShowPassword"
                          onClick={togglePasswordVisisbility}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faEyeSlash}
                          className="adminUpdateShowPassword"
                          onClick={togglePasswordVisisbility}
                        />
                      )}
                    </div>
                  </div>

                  <div className="adminUpdateLoginName">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="adminUpdateLoginNameIcon"
                    />
                    <TextField
                      name="email"
                      variant="standard"
                      id="standard-basic idOfEmail"
                      className="adminUpdateLoginInputs"
                      {...formik.getFieldProps("email")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="loginButtonContainer">
                    <button
                      className="adminUpdateLoginPageButton"
                      type="submit"
                    >
                      Update
                    </button>
                  </div>
                </form>
                <div className="adminUpdateLoginCopyRightContainer">
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

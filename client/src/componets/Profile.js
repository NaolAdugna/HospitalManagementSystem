import React, { useState } from "react";
import "../styles/Register.css";

// Fontawesome family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faUser,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { TextField } from "@mui/material";

import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";

import { registerdValidate } from "../functions/validate";
import { convertToBase64 } from "../functions/validate";

import Avatar from "../assets/images/profile.webp";

// import { useNavigate } from "react-router-dom";
import { updateUser } from "../functions/checker";
import Fetch from "../hooks/fetch";

export default function Profile() {
  const [file, setFile] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [{ isLoading, apiData, serverError }] = Fetch();
  // const navigate = useNavigate();

  const togglePasswordVisisbility = () => {
    setIsOpen(!isOpen);
    setIsPasswordVisible(!isPasswordVisible);
  };

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || "",
      lastName: apiData?.lastName || "",
      email: apiData?.email || "",
      mobile: apiData?.mobile || "",
      address: apiData?.address || "",
      password: apiData?.password || "",
    },
    enableReinitialize: true,
    validate: registerdValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, {
        profile: file || apiData?.profile || "",
      });
      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: "Updating...",
        success: <b>Update Successfully...!</b>,
        error: <b>Could not Update!</b>,
      });
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  // function userLogout() {
  //   localStorage.removeItem("token");
  //   navigate("/");
  // }
  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  return (
    <div className="bodyContainer">
      <Toaster position="top-center"></Toaster>
      <div className="loginContainer">
        <div className="loginTitle">
          <h2>PROFILE </h2>{" "}
          <h2>
            {" "}
            <br />{" "}
            {/* <span style={{ color: "#14ac5f", textDecoration: "underline" }}>
              {" "}
              HERE
            </span> */}
          </h2>
        </div>
        <form className="formContainer" onSubmit={formik.handleSubmit}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <label htmlFor="profile">
              <img
                src={apiData?.profile || file || Avatar}
                alt="avatar profile"
                style={{
                  border: "4px solid #f7fafc",
                  width: "130px",
                  borderRadius: "50%",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06),",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundSize: "contain",
                }}
              />
            </label>
            <input
              type="file"
              id="profile"
              name="profile"
              className="registerProfileFile"
              onChange={onUpload}
            />
          </div>

          <div className="loginName">
            <FontAwesomeIcon icon={faUser} className="loginNameIcon" />
            <TextField
              name="firstName"
              label="Enter First Name"
              variant="standard"
              id="standard-basic"
              placeholder="Enter First Name"
              className="loginInputs"
              {...formik.getFieldProps("firstName")}
            />
          </div>
          <div className="loginName">
            <FontAwesomeIcon icon={faUser} className="loginNameIcon" />
            <TextField
              name="lastName"
              label="Enter Last Name"
              variant="standard"
              id="standard-basic"
              placeholder="Enter Last Name"
              className="loginInputs"
              {...formik.getFieldProps("lastName")}
            />
          </div>
          <div className="loginName">
            <FontAwesomeIcon icon={faUser} className="loginNameIcon" />
            <TextField
              name="email"
              label="Enter email address"
              variant="standard"
              id="standard-basic"
              placeholder="Enter email address"
              className="loginInputs"
              {...formik.getFieldProps("email")}
            />
          </div>
          <div className="loginName">
            <FontAwesomeIcon icon={faUser} className="loginNameIcon" />
            <TextField
              name="mobiles"
              label="Enter Mobile address"
              variant="standard"
              id="standard-basic"
              placeholder="Enter Mobile address"
              className="loginInputs"
              {...formik.getFieldProps("mobiles")}
            />
          </div>
          <div className="loginName">
            <FontAwesomeIcon icon={faUser} className="loginNameIcon" />
            <TextField
              name="address"
              label="Enter address"
              variant="standard"
              id="standard-basic"
              placeholder="Enter address"
              className="loginInputs"
              {...formik.getFieldProps("address")}
            />
          </div>
          <div className="loginPassword loginName">
            <FontAwesomeIcon icon={faLock} className="loginNameIcon" />
            <div className="passwordContainer">
              <TextField
                name="password"
                label="Enter Password"
                variant="standard"
                id="standard-password-basic"
                autoComplete="current-password"
                type={isOpen ? "text" : "password"}
                className="loginInputs"
                {...formik.getFieldProps("password")}
              />
              {isPasswordVisible ? (
                <FontAwesomeIcon
                  icon={faEye}
                  className="showPassword"
                  onClick={togglePasswordVisisbility}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  className="showPassword"
                  onClick={togglePasswordVisisbility}
                />
              )}
            </div>
          </div>

          <div className="loginButtonContainer">
            <button className="loginPageButton" type="submit">
              Register
            </button>
          </div>
        </form>
        <div className="loginCopyRightContainer">
          <p>
            CopyRight &copy; 2024 Gebretsadik Shawo General Hospital. All Rights
            Reserverd.
          </p>
        </div>
      </div>
    </div>
  );
}

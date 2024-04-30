import React, { useState, useContext, useEffect } from "react";
import "../styles/RegisterUser.css";
// import SideBarData from "./Data";

// Fontawesome family
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faUser,
  faEyeSlash,
  faEye,
  faEnvelope,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { TextField } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import { useFormik } from "formik";

import { userRegistrationValidate } from "../../../../functions/validate";

import { registerUser } from "../../../../functions/checker";
import { useNavigate } from "react-router-dom";

import AdminRoot from "./AdminRoot";

// chat
import { AuthContext } from "../../../../context/context";
export default function RegisterUsers() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisisbility = () => {
    setIsOpen(!isOpen);
    setIsPasswordVisible(!isPasswordVisible);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      role: "",
      email: "",
    },
    validate: userRegistrationValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let registerPromise = registerUser(values);
      toast.promise(registerPromise, {
        loading: "creating...",
        success: "register successfully...",
        error: "could not register",
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
            <div className="adminRegisterBodyRegisterContainer">
              <div className="adminRegisterContainer">
                <div className="adminRegisterLoginTitle">
                  <h2>REGISTER </h2>{" "}
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
                  className="adminRegisterFormContainer"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="adminRegisterLoginName">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="adminRegisterLoginNameIcon"
                    />
                    <TextField
                      name="username"
                      label="Enter Username"
                      variant="standard"
                      id="standard-basic idOfName"
                      placeholder="Enter username"
                      className="adminRegisterLoginInputs"
                      {...formik.getFieldProps("username")}
                    />
                  </div>
                  <div className="adminRegisterLoginPassword adminRegisterLoginName">
                    <FontAwesomeIcon
                      icon={faLock}
                      className="adminRegisterLoginNameIcon"
                    />
                    <div className="adminRegisterPasswordContainer">
                      <TextField
                        name="password"
                        label="Enter Password"
                        variant="standard"
                        id="standard-password-basic"
                        autoComplete="current-password"
                        type={isOpen ? "text" : "password"}
                        className="adminRegisterLoginInputs"
                        {...formik.getFieldProps("password")}
                      />
                      {isPasswordVisible ? (
                        <FontAwesomeIcon
                          icon={faEye}
                          className="adminRegisterShowPassword"
                          onClick={togglePasswordVisisbility}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faEyeSlash}
                          className="adminRegisterShowPassword"
                          onClick={togglePasswordVisisbility}
                        />
                      )}
                    </div>
                  </div>

                  <div className="adminRegisterLoginName">
                    <FontAwesomeIcon
                      icon={faUserShield}
                      className="adminRegisterLoginNameIcon"
                    />
                    <select
                      id="adminRegisterSelectOption"
                      className="adminRegisterLoginInputs"
                      {...formik.getFieldProps("role")}
                      name="role"
                    >
                      <option value="">Choose Role</option>
                      <option value="doctor">Doctor</option>
                      <option value="pharmacist">Pharmacist</option>
                      <option value="receptionist">Receptionist</option>
                      <option value="administrator">Administrator</option>
                      <option value="labTechnician">
                        Labratory Technician
                      </option>
                    </select>
                  </div>
                  <div className="adminRegisterLoginName">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="adminRegisterLoginNameIcon"
                    />
                    <TextField
                      name="email"
                      label="Enter email address"
                      variant="standard"
                      id="standard-basic idOfEmail"
                      placeholder="Enter email address"
                      className="adminRegisterLoginInputs"
                      {...formik.getFieldProps("email")}
                    />
                  </div>

                  <div className="loginButtonContainer">
                    <button
                      className="adminRegisterLoginPageButton"
                      type="submit"
                    >
                      Register
                    </button>
                  </div>
                  <div className="adminRegisterRecaptchaContainer">
                    <ReCAPTCHA
                      size="normal"
                      badge="bottomright"
                      className="recaptchaContent"
                      sitekey="6Lc7vnEpAAAAAMTZG8RdEv78XquSIMvEa3EABIle"
                    />
                  </div>
                </form>
                <div className="adminRegisterLoginCopyRightContainer">
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
    // <div>
    //   <Drawer open={open} onClose={toggleDrawer(false)}>
    //     {DrawerList}
    //   </Drawer>
    //   <main className="adminRegisterDashboard ">
    //     <div className="adminRegisterDashboardFirstCard">
    //       <div className="adminRegisterDashboardNavBarContainer">
    //         <div>
    //           <FontAwesomeIcon
    //             icon={faBars}
    //             className="navBarHamburger"
    //             onClick={toggleDrawer(true)}
    //           />
    //         </div>
    //         <div className="adminRegisterDashboardLogOutContainer">
    //           <h4 style={{ textDecoration: "underline" }}>
    //             Welcome {userName}
    //           </h4>
    //           <Button
    //             id="basic-button"
    //             aria-controls={openProfile ? "basic-menu" : undefined}
    //             aria-haspopup="true"
    //             aria-expanded={openProfile ? "true" : undefined}
    //             onClick={handleClick}
    //           >
    //             <Avatar sx={{ bgcolor: "#5c6bc0" }}>
    //               {userNameFirstLetter}
    //             </Avatar>
    //           </Button>
    //           <Menu
    //             id="basic-menu"
    //             anchorEl={anchorEl}
    //             open={openProfile}
    //             onClose={handleClose}
    //             MenuListProps={{
    //               "aria-labelledby": "basic-button",
    //             }}
    //           >
    //             <MenuItem
    //               onClick={handleClickOpenProfileRecord}
    //               style={{
    //                 margin: "0px 4px 11px 4px",
    //               }}
    //             >
    //               Profile
    //             </MenuItem>
    //             <MenuItem
    //               onClick={handleLogout}
    //               style={{
    //                 backgroundColor: " rgba(255, 0, 0, 0.8)",
    //                 margin: "11px 4px 4px 4px",
    //                 color: "#fff",
    //               }}
    //             >
    //               Logout
    //             </MenuItem>
    //           </Menu>
    //           <Dialog
    //             fullWidth
    //             open={openProfileRecord}
    //             TransitionComponent={Transition}
    //             keepMounted
    //             onClose={handleCloseProfileRecord}
    //             aria-describedby="alert-dialog-slide-description"
    //           >
    //             <DialogTitle>
    //               {"Your Profile "} {userName}
    //             </DialogTitle>
    //             <DialogContent>
    //               <DialogContentText id="alert-dialog-slide-description">
    //                 <b> ID: </b> {idProfile}
    //               </DialogContentText>
    //               <DialogContentText id="alert-dialog-slide-description">
    //                 <b> Name: </b> {userName}
    //               </DialogContentText>
    //               <DialogContentText id="alert-dialog-slide-description">
    //                 <b> Email: </b> {emailSession}
    //               </DialogContentText>
    //               <DialogContentText id="alert-dialog-slide-description">
    //                 <b>Role: </b> {roleSession}
    //               </DialogContentText>
    //               <DialogContentText id="alert-dialog-slide-description">
    //                 <b> Date of Registration: </b> {dateofregistrationSession}
    //               </DialogContentText>
    //             </DialogContent>
    //             <DialogActions>
    //               <Button onClick={handleCloseProfileRecord}>Close</Button>
    //               <Button onClick={handleOpenEditProfile}>Edit</Button>
    //             </DialogActions>
    //           </Dialog>
    //           <Dialog
    //             open={openEditProfile}
    //             onClose={handleCloseEditProfile}
    //             PaperProps={{
    //               component: "form",
    //               onSubmit: (event) => {
    //                 event.preventDefault();
    //                 const formData = new FormData(event.currentTarget);
    //                 const formJson = Object.fromEntries(formData.entries());
    //                 let registerPromise = axios.put(
    //                   `/api/update-user-profile/`,
    //                   {
    //                     id: formJson.id,
    //                     chatpassword: formJson.chatpassword,
    //                     Name: formJson.name,
    //                     Email: formJson.email,
    //                   }
    //                 );
    //                 registerPromise
    //                   .then(() => {
    //                     handleUpdateProfile(formJson.name, formJson.email);
    //                     toast.success("Profile updated successfully");
    //                   })
    //                   .catch((error) => {
    //                     console.error("Could not update profile:", error);
    //                     toast.error("Failed to update profile");
    //                   });
    //                 handleCloseEditProfile();
    //               },
    //             }}
    //           >
    //             <DialogTitle>Update Your Profile</DialogTitle>
    //             <DialogContent>
    //               <DialogContentText>
    //                 Fill the form to update you profile
    //               </DialogContentText>
    //               <input type="hidden" name="id" value={idProfile} />
    //               <input
    //                 type="hidden"
    //                 name="chatpassword"
    //                 value={ChatPassword}
    //               />
    //               <label>FULL NAME</label>
    //               <TextField
    //                 required
    //                 margin="dense"
    //                 id="name"
    //                 name="name"
    //                 // label={userName}
    //                 value={Name}
    //                 onChange={(e) => setName(e.target.value)}
    //                 type="text"
    //                 fullWidth
    //                 variant="standard"
    //               />
    //               <label>EMAIL</label>
    //               <TextField
    //                 required
    //                 margin="dense"
    //                 id="email"
    //                 name="email"
    //                 value={Email}
    //                 onChange={(e) => setEmailUpdateProfile(e.target.value)}
    //                 type="email"
    //                 fullWidth
    //                 variant="standard"
    //               />
    //             </DialogContent>
    //             <DialogActions>
    //               <Button onClick={handleCloseEditProfile}>Cancel</Button>
    //               <Button type="submit">Update</Button>
    //             </DialogActions>
    //           </Dialog>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="adminRegisterDashboardSecondCard">
    //       <Toaster position="top-center" reverseOrder={false}></Toaster>
    //       <div>
    //         <div className="adminRegisterBodyRegisterContainer">
    //           <div className="adminRegisterContainer">
    //             <div className="adminRegisterLoginTitle">
    //               <h2>REGISTER </h2>{" "}
    //               <h2>
    //                 {" "}
    //                 <br />{" "}
    //                 <span
    //                   style={{
    //                     color: "#14ac5f",
    //                     textDecoration: "underline",
    //                   }}
    //                 >
    //                   {" "}
    //                   HERE
    //                 </span>
    //               </h2>
    //             </div>
    //             <form
    //               className="adminRegisterFormContainer"
    //               onSubmit={formik.handleSubmit}
    //             >
    //               <div className="adminRegisterLoginName">
    //                 <FontAwesomeIcon
    //                   icon={faUser}
    //                   className="adminRegisterLoginNameIcon"
    //                 />
    //                 <TextField
    //                   name="username"
    //                   label="Enter Username"
    //                   variant="standard"
    //                   id="standard-basic idOfName"
    //                   placeholder="Enter username"
    //                   className="adminRegisterLoginInputs"
    //                   {...formik.getFieldProps("username")}
    //                 />
    //               </div>
    //               <div className="adminRegisterLoginPassword adminRegisterLoginName">
    //                 <FontAwesomeIcon
    //                   icon={faLock}
    //                   className="adminRegisterLoginNameIcon"
    //                 />
    //                 <div className="adminRegisterPasswordContainer">
    //                   <TextField
    //                     name="password"
    //                     label="Enter Password"
    //                     variant="standard"
    //                     id="standard-password-basic"
    //                     autoComplete="current-password"
    //                     type={isOpen ? "text" : "password"}
    //                     className="adminRegisterLoginInputs"
    //                     {...formik.getFieldProps("password")}
    //                   />
    //                   {isPasswordVisible ? (
    //                     <FontAwesomeIcon
    //                       icon={faEye}
    //                       className="adminRegisterShowPassword"
    //                       onClick={togglePasswordVisisbility}
    //                     />
    //                   ) : (
    //                     <FontAwesomeIcon
    //                       icon={faEyeSlash}
    //                       className="adminRegisterShowPassword"
    //                       onClick={togglePasswordVisisbility}
    //                     />
    //                   )}
    //                 </div>
    //               </div>

    //               <div className="adminRegisterLoginName">
    //                 <FontAwesomeIcon
    //                   icon={faUserShield}
    //                   className="adminRegisterLoginNameIcon"
    //                 />
    //                 <select
    //                   id="adminRegisterSelectOption"
    //                   className="adminRegisterLoginInputs"
    //                   {...formik.getFieldProps("role")}
    //                   name="role"
    //                 >
    //                   <option value="">Choose Role</option>
    //                   <option value="doctor">Doctor</option>
    //                   <option value="pharmacist">Pharmacist</option>
    //                   <option value="receptionist">Receptionist</option>
    //                   <option value="administrator">Administrator</option>
    //                   <option value="labTechnician">
    //                     Labratory Technician
    //                   </option>
    //                 </select>
    //               </div>
    //               <div className="adminRegisterLoginName">
    //                 <FontAwesomeIcon
    //                   icon={faEnvelope}
    //                   className="adminRegisterLoginNameIcon"
    //                 />
    //                 <TextField
    //                   name="email"
    //                   label="Enter email address"
    //                   variant="standard"
    //                   id="standard-basic idOfEmail"
    //                   placeholder="Enter email address"
    //                   className="adminRegisterLoginInputs"
    //                   {...formik.getFieldProps("email")}
    //                 />
    //               </div>

    //               <div className="loginButtonContainer">
    //                 <button
    //                   className="adminRegisterLoginPageButton"
    //                   type="submit"
    //                 >
    //                   Register
    //                 </button>
    //               </div>
    //               <div className="adminRegisterRecaptchaContainer">
    //                 <ReCAPTCHA
    //                   size="normal"
    //                   badge="bottomright"
    //                   className="recaptchaContent"
    //                   sitekey="6Lc7vnEpAAAAAMTZG8RdEv78XquSIMvEa3EABIle"
    //                 />
    //               </div>
    //             </form>
    //             <div className="adminRegisterLoginCopyRightContainer">
    //               <p>
    //                 CopyRight &copy; 2024 Gebretsadik Shawo General Hospital.
    //                 All Rights Reserverd.
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </main>
    // </div>
  );
}

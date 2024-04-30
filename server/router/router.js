import { Router } from "express";
const router = Router();

/** import all controllers */
import * as controller from "../controllers/appController.js";
import * as adminController from "../controllers/adminController.js";
import { registerMail } from "../controllers/mail.js";
import Auth, { localVariables } from "../middleware/auth.js";

/** POST Methods */
router.route("/register").post(controller.register); // register user
router.route("/registerMail").post(registerMail); // send the email
router
  .route("/authenticate")
  .post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route("/login").post(controller.verifyUser, controller.login); // login in app

/** GET Methods */
// router.route("/user/:username").get(controller.getUser); // user with username
router
  .route("/generateOTP")
  .get(adminController.UserExistance, localVariables, controller.generateOTP); // generate random OTP
router.route("/verifyOTP").get(controller.verifyUser, controller.verifyOTP); // verify generated OTP
router.route("/createResetSession").get(controller.createResetSession); // reset all the variables

/** PUT Methods */
router.route("/updateuser").put(Auth, controller.updateUser); // is use to update the user profile
router
  .route("/resetPassword")
  .put(controller.verifyUser, controller.resetPassword); // use to reset password

router.route("/verifyrecaptcha").post(controller.verifyRecaptcha);

// Register User with Role by Admin
router.route("/create-users").post(adminController.register);

// Login User Staff
router
  .route("/login-user-staff")
  .post(adminController.UserExistForLogin, adminController.loginUser);
router
  .route("/update-user-staff")
  .put(Auth, adminController.updateUserStaffProfile);

// RETURNING USER FILE
router.route("/username").get(adminController.ReturnUserName);
// RETURNING USER INFORMATION
router.route("/users").get(adminController.ReturnUser);
router.route("/users/:id").delete(adminController.DeleteUser);
router.route("/users/:id").get(adminController.GetUserByIdController);
router.route("/update-user/:id").put(adminController.UpdateUser);
router.route("/delete-user/:id").delete(adminController.DeleteUser);
router
  .route("/delete-user-register/:id")
  .post(adminController.deleteUserRegisterController);
router.route("/deletedusers").get(adminController.ReturnDeletedUser);
router.route("/contact-us-message").get(adminController.ReturnContactUsMessage);
router.route("/user-role/:id").get(adminController.ReturnUserRole);
router.route("/users/:username").get(async (req, res) => {
  try {
    const { username } = req.method === "GET" ? req.query : req.body;
    // Fetch user data based on the provided username
    const userData = await adminController.UserExistance(username);
    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router
  .route("/user-existance")
  .post(adminController.UserExistance, (req, res) => res.end());

router.route("/user-email").get(adminController.ReturnEmailController);
router
  .route("/otp-generator")
  .get(
    adminController.UserExistance,
    localVariables,
    adminController.generateOTP
  );
router
  .route("/otp-verify")
  .get(adminController.UserExistance, adminController.verifyOTP);
router
  .route("/reset-password")
  .put(
    adminController.UserExistance,
    adminController.resetPasswordAdminController
  );

router.route("/create-lists").post(Auth, adminController.CreateList);
router.route("/token").post(Auth, adminController.Retrieval);

router.route("/gemini").post(adminController.geminiAI);

router
  .route("/contact-send-message")
  .post(adminController.contactSendMessageController);

// Register Patient by reception
router.route("/create-patient").post(adminController.registerPatientController);

router.route("/view-patient").get(adminController.ReturnPatientUser);

// Login User Staff
router
  .route("/login-user-patient")
  .post(adminController.PatientExistForLogin, adminController.loginPatient);

router
  .route("/patient-existance")
  .post(adminController.PatientExistanceController, (req, res) => res.end());
router
  .route("/patient-email")
  .get(adminController.ReturnPatientEmailController);

router
  .route("/otp-generator-patient")
  .get(
    adminController.PatientExistanceController,
    localVariables,
    adminController.generateOTP
  );

router
  .route("/otp-verify-patient")
  .get(adminController.PatientExistanceController, adminController.verifyOTP);
router
  .route("/reset-patient-password")
  .put(
    adminController.PatientExistanceController,
    adminController.resetPatientPasswordAdminController
  );
router
  .route("/update-user-profile/")
  .put(adminController.UpdateUserProfileController);
router
  .route("/update-patient-profile/")
  .put(adminController.UpdatePatientProfileController);

// User Mark Attendance
router.route("/user-attendance").post(adminController.MarkAttendance);

// User Mark Attendance
router
  .route("/user-afternoon-attendance/:id")
  .put(adminController.MarkAfternoonAttendance);
router
  .route("/user-marked-attendance")
  .get(adminController.DidUserMarkedAttendanceController);
router
  .route("/user-marked-afternoon-attendance/:id")
  .get(adminController.DidUserMarkedAfternoonAttendanceController);

router.route("/fetch-attendance").get(adminController.ReturnFetchAttendance);

router.route("/view-patient/:id").get(adminController.GetPatientByIdController);
router
  .route("/get-patient/:id")
  .get(adminController.GetPatientByIdAllDataController);
router
  .route("/update-patient/:id")
  .put(adminController.UpdatePatientController);
// router for chat
// router
//   .route("/chat")
//   .post(adminController.getChat)
//   .get(adminController.getChats);
// router.route("/createGroup").post(adminController.createGroup);
// router.route("/renameGroup").patch(adminController.renameGroup);
// router.route("/removeFromGroup").patch(adminController.removeFromGroup);
// router.route("/addUserToGroup").patch(adminController.addUserToGroup);

// // router for message

// router.route("/:chatId").get(adminController.allMessages);
// router.route("/message").post(adminController.sendMessage);

// Register appointment
router
  .route("/create-appointment")
  .post(adminController.registerAppointmentController);

router.route("/view-appointment").get(adminController.ReturnPatientAppointment);
router
  .route("/get-appointment/:id")
  .get(adminController.GetPatientAppointmentByIdController);

router
  .route("/delete-appointment/:rowsID")
  .delete(adminController.DeleteAppointmentController);

router
  .route("/delete-appointment-register/:rowsID")
  .post(adminController.deleteAppointmentRegisterController);

router
  .route("/update-appointment/:editRowId")
  .put(adminController.UpdateAppointmentController);

router
  .route("/view-deleted-appointment")
  .get(adminController.ReturnDeletedAppointment);

router
  .route("/number-of-admin/:role")
  .get(adminController.ReturnAdmininstrationUserController);

router
  .route("/number-of-patient/")
  .get(adminController.ReturnPatientUserController);

router
  .route("/patient-medical-history/:name")
  .get(adminController.ReturnPatientMedicalHistoryController);

router
  .route("/patient-appointment/:name")
  .get(adminController.ReturnPatientAppointmentDataController);
export default router;

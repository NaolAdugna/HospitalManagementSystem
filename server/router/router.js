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
export default router;

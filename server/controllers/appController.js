import {
  findUserName,
  findUserEmail,
  getAllPatient,
  updateUserRecords,
  savePatient,
} from "../modelSchema/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
// import ENV from "../../config.js";
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import mysqlPool from "../database/connection.js";
// import { request } from "express";

// const [firstname] = request.body;

// middleware to verify user
export async function verifyUser(req, res, next) {
  try {
    // const { username } = req.body;
    // const { firstname } = req.method == "GET" ? req.query : req.body;
    const { firstname, middlename, lastname } = req.body;

    if (!firstname) {
      return res.status(400).send({ error: "FirstName is required" });
    }

    // check the user existance
    let exist = await findUserName(firstname, middlename, lastname);
    if (!exist)
      return res.status(404).send({ error: `Can't find ${firstname}!` });
    next();
  } catch (error) {
    console.error("error occurred in verify user middleware", error);
    return res.status(404).send({ error: "Authentication Error" });
  }
}

// Post : http://localhost:8080/api/register

export async function register(req, res) {
  try {
    const {
      firstname,
      middlename,
      lastname,
      sex,
      dateofbirth,
      region,
      woreda,
      katana,
      kebele,
      housenumber,
      phonenumber,
      nameoffacility,
      medicalrecordnumber,
      dateofregistration,
      email,
      password,
    } = req.body;

    const existingUsername = await findUserName(
      firstname,
      middlename,
      lastname
    );

    if (existingUsername) {
      return res.status(400).send({ error: "Please use a unique username" });
    }

    const existingEmail = await findUserEmail(email);
    if (existingEmail) {
      return res.status(400).send({ error: "Please use a unique email" });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 3);
      const response = await savePatient(
        firstname,
        middlename,
        lastname,
        sex,
        dateofbirth,
        region,
        woreda,
        katana,
        kebele,
        housenumber,
        phonenumber,
        nameoffacility,
        medicalrecordnumber,
        dateofregistration,
        email,
        hashedPassword
      );
      return res.status(201).send({ msg: "User registration successful" });
    } else {
      return res.status(400).send({ error: "Password is required" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Internal server error", error });
  }
}

// Post http://localhost:8080/api/login

export async function login(req, res) {
  const { firstname, password, middlename, lastname } = req.body;

  try {
    findUserName(firstname, middlename, lastname)
      .then((user) => {
        bcrypt
          .compare(password, user.password)
          .then((passwordCheck) => {
            if (!passwordCheck)
              return res.status(400).send({ error: "Don't have Password" });

            // create jwt token
            const token = jwt.sign(
              {
                userId: user.id,
                username: user.firstname,
              },
              process.env.JWT_SECRET,
              { expiresIn: "24h" }
            );

            return res.status(200).send({
              msg: "Login Successful...!",
              username: user.firstname,
              token,
            });
          })
          .catch((error) => {
            return res.status(400).send({ error: "Password does not Match" });
          });
      })
      .catch((error) => {
        return res.status(404).send({ error: "Username not Found" });
      });
  } catch (error) {
    return res.status(500).send({ error });
  }
}

export async function getUser(req, res) {
  try {
    const { firstname } = req.params;

    if (!firstname) {
      return res.status(400).send({ error: "Invalid Username" });
    }

    const user = await findUserName(firstname, middlename, lastname);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Remove sensitive data before sending the user object
    const { password, ...userData } = user.toObject();

    return res.status(200).send(userData);
  } catch (error) {
    console.error("Error occurred while getting user:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
}

export async function updateUser(req, res) {
  try {
    const { id } = req.user;

    if (id) {
      const { woreda, katana, kebele, housenumber, phonenumber, email } =
        req.body;

      // Update the data using async/await
      await updateUserRecords({
        id,
        woreda,
        katana,
        kebele,
        housenumber,
        phonenumber,
        email,
      });

      return res.status(201).send({ msg: "Record Updated...!" });
    } else {
      return res.status(401).send({ error: "User Not Found...!" });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return res
      .status(500)
      .send({ error: "An error occurred while updating the user." });
  }
}

export async function generateOTP(req, res) {
  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  res.status(201).send({ code: req.app.locals.OTP });
}

export async function verifyOTP(req, res) {
  const { code } = req.query;
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null; // reset the OTP value
    req.app.locals.resetSession = true; // start session for reset password
    return res.status(201).send({ msg: "Verify Successsfully!" });
  }
  return res.status(400).send({ error: "Invalid OTP" });
}

export async function createResetSession(req, res) {
  if (req.app.locals.resetSession) {
    return res.status(201).send({ flag: req.app.locals.resetSession });
  }
  return res.status(440).send({ error: "Session expired!" });
}

export async function resetPassword(req, res) {
  try {
    if (!req.app.locals.resetSession)
      return res.status(440).send({ error: "Session expired!" });

    const { firstname, lastname, middlename, password } = req.body;

    try {
      const user = await findUserName(firstname, middlename, lastname);

      if (!user) {
        return res.status(404).send({ error: "Username not found" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await updateUserRecords(
        { firstname: user.firstname },
        { password: hashedPassword }
      );

      req.app.locals.resetSession = false; // reset session
      return res.status(201).send({ msg: "Record Updated...!" });
    } catch (error) {
      console.error("Error occurred:", error);
      return res
        .status(500)
        .send({ error: "An error occurred while resetting password." });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(401).send({ error: "Unauthorized" });
  }
}

export async function verifyRecaptcha(req, res) {
  try {
    const { captchaValue } = req.body;

    const [data] = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=6Lc7vnEpAAAAAMTZG8RdEv78XquSIMvEa3EABIle&response=${captchaValue}`
    );
    res.send(data);
  } catch (error) {
    console.error("error occured here in verify recaptcha controller", error);
    return res.status(404).send({ error: "Can not verify " });
  }
}

import UserModel from "../modelSchema/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import ENV from "../../config.js";
import axios from "axios";

// middleware to verify user
export async function verifyUser(req, res, next) {
  try {
    // const { username } = req.body;
    const { username } = req.method == "GET" ? req.query : req.body;

    if (!username) {
      return res.status(400).send({ error: "username is required" });
    }

    // check the user existance
    let exist = await UserModel.findOne({ username });
    if (!exist) return res.status(404).send({ error: "Can't find User!" });
    next();
  } catch (error) {
    console.error("error occurred in verify user middleware", error);
    return res.status(404).send({ error: "Authentication Error" });
  }
}

// Post : http://localhost:8080/api/register

export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;

    const existingUsername = await UserModel.findOne({ username });
    if (existingUsername) {
      return res.status(400).send({ error: "Please use a unique username" });
    }

    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).send({ error: "Please use a unique email" });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new UserModel({
        username,
        password: hashedPassword,
        profile,
        email,
      });

      await user.save();
      return res.status(201).send({ msg: "User registration successful" });
    } else {
      return res.status(400).send({ error: "Password is required" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Internal server error" });
  }
}

// Post http://localhost:8080/api/login

export async function login(req, res) {
  const { username, password } = req.body;

  try {
    UserModel.findOne({ username })
      .then((user) => {
        bcrypt
          .compare(password, user.password)
          .then((passwordCheck) => {
            if (!passwordCheck)
              return res.status(400).send({ error: "Don't have Password" });

            // create jwt token
            const token = jwt.sign(
              {
                userId: user._id,
                username: user.username,
              },
              ENV.JWT_SECRET,
              { expiresIn: "24h" }
            );

            return res.status(200).send({
              msg: "Login Successful...!",
              username: user.username,
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
    const { username } = req.params;

    if (!username) {
      return res.status(400).send({ error: "Invalid Username" });
    }

    const user = await UserModel.findOne({ username });

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
    const { userId } = req.user;

    if (userId) {
      const body = req.body;

      // Update the data using async/await
      await UserModel.updateOne({ _id: userId }, body);

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

    const { username, password } = req.body;

    try {
      const user = await UserModel.findOne({ username });

      if (!user) {
        return res.status(404).send({ error: "Username not found" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await UserModel.updateOne(
        { username: user.username },
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

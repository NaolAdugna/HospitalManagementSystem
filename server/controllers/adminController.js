import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import ENV from "../../config.js";
import axios from "axios";

import {
  findEmail,
  findUser,
  saveUser,
  updateUserStaffRecord,
} from "../modelSchema/UserCreation.model.js";

export async function register(req, res) {
  try {
    const { image, username, password, role, email } = req.body;

    const existingUsername = await findUser(username);

    if (existingUsername) {
      return res.status(400).send({ error: "Please use a unique username" });
    }

    const existingEmail = await findEmail(email);
    if (existingEmail) {
      return res.status(400).send({ error: "Please use a unique email" });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const response = await saveUser(
        image,
        username,
        hashedPassword,
        role,
        email
      );
      return res.status(201).send({ msg: "User registration successful" });
    } else {
      return res.status(400).send({ error: "Password is required" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Internal server error", error });
  }
}

export async function UserExistance(req, res, next) {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).send({ error: "username is required" });
    }

    // check the user existance
    let exist = await findUser(username);
    if (!exist)
      return res.status(404).send({ error: `Can't find ${username}!` });
    next();
  } catch (error) {
    console.error("error occurred in verify user middleware", error);
    return res.status(404).send({ error: "Authentication Error" });
  }
}

export async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    findUser(username)
      .then((user) => {
        if (!user) {
          return res.status(404).send({ error: "Username not Found" });
        }

        bcrypt
          .compare(password, user[0].password)
          .then((passwordCheck) => {
            if (!passwordCheck) {
              return res.status(400).send({ error: "Password does not Match" });
            }

            // create jwt token
            const token = jwt.sign(
              {
                id: user[0].id,
                username: user[0].username,
              },
              ENV.JWT_SECRET,
              { expiresIn: "24h" }
            );

            return res.status(200).send({
              msg: "Login Successful...!",
              username: user[0].username,
              token,
            });
          })
          .catch((error) => {
            return res.status(500).send({ error: "Error comparing passwords" });
          });
      })
      .catch((error) => {
        return res.status(500).send({ error: "Error finding user" });
      });
  } catch (error) {
    return res.status(500).send({ error });
  }
}

export async function updateUserStaffProfile(req, res) {
  try {
    const { id } = req.user;

    if (id) {
      const { username, password, role, email } = req.body;

      // Check if the username is defined and not empty
      if (username !== undefined && username.trim() !== "") {
        // Update the data using async/await
        await updateUserStaffRecord({
          id,
          username,
          password,
          role,
          email,
        });

        return res.status(201).send({ msg: "Record Updated...!" });
      } else {
        return res.status(400).send({ error: "Username is required" });
      }
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

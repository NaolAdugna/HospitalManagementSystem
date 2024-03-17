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
  GetUserName,
  GetUsers,
  DeleteUsers,
  UpdateUserStaff,
  GetUserById,
  GetRole,
} from "../modelSchema/UserCreation.model.js";

export async function register(req, res) {
  try {
    const { username, password, role, email } = req.body;

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
      const response = await saveUser(username, hashedPassword, role, email);
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
              roles: user[0].role,
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

export async function ReturnUserName(req, res) {
  try {
    const { userId } = req.body;
    if (userId) {
      const username = await GetUserName(userId);
      return res.status(200).send(username);
    } else {
      return res.status(401).send({ error: "User Not Found...!" });
    }
  } catch (error) {
    console.error("error occured during getuser", error);
    return res
      .status(500)
      .send({ error: "an error occured while getting user" });
  }
}
export async function ReturnUser(req, res) {
  try {
    const users = await GetUsers();
    return res.status(200).send(users);
  } catch (error) {
    console.error("error occured during getuser", error);
    return res
      .status(500)
      .send({ error: "an error occured while getting user" });
  }
}

export async function DeleteUser(req, res) {
  try {
    const id = req.params.id; // Correctly access the id parameter from req.params
    const users = await DeleteUsers(id);
    return res.status(200).send(users);
  } catch (error) {
    console.error("error occurred during delete user", error);
    return res
      .status(500)
      .send({ error: "an error occurred while deleting user" });
  }
}
export async function GetUserByIdController(req, res) {
  try {
    const id = req.params.id;
    const users = await GetUserById(id);
    return res.status(200).send(users);
  } catch (error) {
    console.error("error occurred during getting user", error);
    return res
      .status(500)
      .send({ error: "an error occurred while getting user" });
  }
}
export async function UpdateUser(req, res) {
  try {
    const id = req.params.id;

    const { username, password, role, email } = req.body;

    if (!username || !password || !role || !email) {
      return res.status(400).send({ error: "Missing required fields" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const users = await UpdateUserStaff(
      id,
      username,
      hashedPassword,
      role,
      email
    );

    return res.status(200).send(users);
  } catch (error) {
    console.error("Error occurred during Update user", error);
    return res
      .status(500)
      .send({ error: "An error occurred while updating user" });
  }
}

export async function ReturnUserRole(req, res) {
  try {
    const id = req.params.id;
    console.log("in returning role controller got id" + id);
    if (id) {
      const role = await GetRole(id); // Retrieve role instead of username
      if (role) {
        return res.status(200).send(role); // Send role data if found
      } else {
        return res.status(404).send({ error: "User not found." }); // Correct status code for user not found
      }
    } else {
      return res.status(400).send({ error: "User ID is required." }); // Correct status code for missing user ID
    }
  } catch (error) {
    console.error("Error occurred during ReturnUserRole:", error);
    return res
      .status(500)
      .send({ error: "An error occurred while returning role." });
  }
}

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import ENV from "../../config.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
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
  ReturnEmail,
  UpdateUserStaffPassword,
  findList,
  createList,
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
export async function UserExistForLogin(req, res, next) {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).send({ error: "username is required" });
    }

    // check the user existance
    let exist = await findUser(username);
    if (!exist) return res.status(404).send({ error: `User Did not exist!` });
    next();
  } catch (error) {
    console.error("error occurred in verify user middleware", error);
    return res.status(404).send({ error: "Authentication Error" });
  }
}

export async function UserExistance(req, res, next) {
  try {
    const { username } = req.method === "GET" ? req.query : req.body;

    if (!username) {
      return res.status(400).send({ error: "username is required" });
    }

    req.session.usernameForReset = username;
    // check the user existance
    let exist = await findUser(username);
    // return exist;
    if (!exist) {
      return res.status(404).send({ error: `User Did not exist!` });
    }
    next();
    req.userExit = true;
  } catch (error) {
    console.error("error occurred in verify user middleware", error);
    return res.status(404).send({ error: "Authentication Error" });
  }
}
export async function ReturnEmailController(req, res) {
  try {
    const { username } = req.method === "GET" ? req.query : req.body;
    if (!username) {
      return res.status(400).send({ error: "username is required" });
    }
    let emailReturn = await ReturnEmail(username);
    if (!emailReturn)
      return res.status(404).send({ error: `User Email did not Exists` });
    return res.status(200).send(emailReturn);
  } catch (error) {
    console.error("error in returning email controller", error);
    return res.status(404).send({ error: "Retrieval error" });
  }
}
export async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    const user = await findUser(username);

    if (!user) {
      return res.status(404).send({ error: "Username not found" });
    }

    const passwordCheck = await bcrypt.compare(password, user[0].password);

    if (!passwordCheck) {
      return res.status(400).send({ error: "Password does not match" });
    }

    const token = jwt.sign(
      {
        id: user[0].id,
        username: user[0].username,
      },
      ENV.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).send({
      msg: "Login Successful",
      username: user[0].username,
      roles: user[0].role,
      id: user[0].id,
      token,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
}
// export async function loginUser(req, res) {
//   const { username, password } = req.body;

//   try {
//     findUser(username)
//       .then((user) => {
//         if (!user) {
//           return res.status(404).send({ error: "Username not Found" });
//         }

//         bcrypt
//           .compare(password, user[0].password)
//           .then((passwordCheck) => {
//             if (!passwordCheck) {
//               return res.status(400).send({ error: "Password does not Match" });
//             }

//             // create jwt token
//             const token = jwt.sign(
//               {
//                 id: user[0].id,
//                 username: user[0].username,
//               },
//               ENV.JWT_SECRET,
//               { expiresIn: "24h" }
//             );

//             return res.status(200).send({
//               msg: "Login Successful...!",
//               username: user[0].username,
//               roles: user[0].role,
//               id: user[0].id,
//               token,
//             });
//           })
//           .catch((error) => {
//             return res.status(500).send({ error: "Error comparing passwords" });
//           });
//       })
//       .catch((error) => {
//         return res.status(500).send({ error: "Error finding user" });
//       });
//   } catch (error) {
//     console.error("Error occurred:", error);
//     return res.status(500).send({ error });
//   }
// }

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
export async function generateOTP(req, res) {
  req.app.locals.OTP = await otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: true,
    upperCaseAlphabets: true,
    specialChars: false,
  });
  res.status(201).send({ code: req.app.locals.OTP });
}

export async function verifyOTP(req, res) {
  const { code } = req.query;
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null;
    req.app.locals.resetSession = true;
    return res.status(201).send({ msg: "Verified Successfully" });
  }
  return res.status(400).send({ error: "Invalid OTP" });
}

export async function resetPasswordAdminController(req, res) {
  try {
    // if (!req.app.locals.resetSession)
    //   return res.status(440).send({ error: "Session expired!" });

    const { password } = req.body;
    const username = req.session.usernameForReset;
    try {
      const user = await findUser(username);

      if (!user) {
        return res.status(404).send({ error: "Username not found" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await UpdateUserStaffPassword(username, hashedPassword);

      req.app.locals.resetSession = false; // reset session
      return res.status(201).send({ msg: "Password Updated Successfully." });
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

export async function CreateList(req, res) {
  try {
    const { listtitle } = req.body;
    console.log("title from controller is ", listtitle);
    const { id } = req.user;
    console.log("id from controller is ", id);
    const existingList = await findList(id, listtitle);

    if (existingList) {
      return res
        .status(400)
        .send({ error: "This list exists, please add another" });
    }

    const response = await createList(id, listtitle);
    return res.status(201).send({ msg: "List created successfully" });
  } catch (error) {
    return res.status(500).send({ error: "Internal server error", error });
  }
}

export async function Retrieval(req, res) {
  try {
    const { id } = req.user;
    console.log("token retrieval");
    if (id) {
      console.log("id found ", id);
    }
    return id;
  } catch (error) {
    console.log(error);
  }
}

export async function geminiAI(req, res) {
  const genAI = new GoogleGenerativeAI(ENV.API_KEY);
  try {
    const { prompt } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const result = await model.generateContent([prompt]);

    const response = await result.response;
    const text = response.text();
    res.send(text);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to generate content");
  }
}

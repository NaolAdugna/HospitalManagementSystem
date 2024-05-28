import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import dotenv from "dotenv";
dotenv.config();
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
  contactSendMessageMysql,
  deleteUserRegister,
  GetDeletedUsers,
  GetContactUsMessage,
  registerPatientUser,
  findPatient,
  findPatientEmail,
  GetPatientUsers,
  ReturnPatientEmail,
  UpdatePatientPassword,
  UpdateUserStaffProfile,
  UpdatePatientProfile,
  SaveMarkedAttendance,
  DidUserMarkedAttendance,
  GetAttendanceUsers,
  GetPatientById,
  UpdatePatient,
  GetPatientByIdAllData,
  findPatientAppointment,
  registerPatientAppointment,
  GetPatientAppointment,
  GetPatientAppointmentByIdAllData,
  DeleteAppointment,
  deletedAppointmentRegister,
  UpdateAppointment,
  GetDeletedAppointment,
  findAdministratorUser,
  findNumberOfPatient,
  ReturnPatientMedicalHistory,
  // ReturnPatientAppointment,
  ReturnPatientAppointmentData,
  SaveAfternoonMarkedAttendance,
  DidUserAfternoonMarkedAttendance,
} from "../modelSchema/UserCreation.model.js";

import axios from "axios"; // Import axios library if not already imported
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

    // Add ChatEngine user creation/update logic here
    try {
      const r = await axios.put(
        "https://api.chatengine.io/users/",
        { username: username, secret: password, first_name: username },
        { headers: { "Private-Key": process.env.Private_Key } }
      );

      const token = jwt.sign(
        {
          id: user[0].id,
          username: user[0].username,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).send({
        msg: "Login Successful",
        username: user[0].username,
        roles: user[0].role,
        id: user[0].id,
        email: user[0].email,
        dateofregistration: user[0].dateofregistration,
        secret: password,
        chatEnginePass: r.data.id,
        token,
      });
    } catch (e) {
      console.error(
        "Error occurred while creating/updating ChatEngine user:",
        e
      );
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).send({ error: "Internal server error" });
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
    const id = req.params.id;
    const userId = req.params.id;
    const username = await GetUserName(userId);

    const users = await DeleteUsers(id);
    try {
      const r = await axios.put(
        `https://api.chatengine.io/users/`,
        { username: username, secret: "reception", first_name: username },
        { headers: { "Private-Key": process.env.Private_Key } }
      );
      const user_id = r.data.id;
      await axios.delete(`https://api.chatengine.io/users/${user_id}/`, {
        headers: { "Private-Key": process.env.Private_Key },
      });
    } catch (error) {
      console.error(error);
    }
    return res.status(200).send(users);
  } catch (error) {
    console.error("An error occurred during delete user:", error.message);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
    return res
      .status(500)
      .send({ error: "An error occurred while deleting user" });
  }
}

// export async function DeleteUser(req, res) {
//   try {
//     const id = req.params.id;
//     const { user_id } = req.body;
//     const users = await DeleteUsers(id);
//     const r = await axios.delete(
//       `https://api.chatengine.io/users/{{user_id}}/`,
//       { headers: { "Private-Key": "8b2d4084-a986-4011-b513-0cd5b692c99d" } }
//     );
//     return res.status(200).send(users);
//   } catch (error) {
//     console.error("error occurred during delete user", error);
//     return res
//       .status(500)
//       .send({ error: "an error occurred while deleting user" });
//   }
// }
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
    const userId = req.params.id;
    const usernameValue = await GetUserName(userId);
    console.log("user name is ", usernameValue);

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

    console.log("user is updated ");

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
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
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
  try {
    const { prompt } = req.body;

    // Input validation
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).send("Invalid prompt");
    }

    // Initialize Generative AI model
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Start chat with the model
    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    // Generate response
    const result = await chat.sendMessage([prompt]);
    const text = await result.response.text();

    // Send response
    res.send(text);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Failed to generate content");
  }
}

// export async function geminiAI(req, res) {
//   const genAI = new GoogleGenerativeAI(ENV.API_KEY);
//   try {
//     const { prompt } = req.body;
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//     const chat = model.startChat({
//       history: [],
//       generationConfig: {
//         maxOutputTokens: 500,
//       },
//     });

//     const result = await model.generateContent([prompt]);

//     const response = await result.response;
//     const text = response.text();
//     res.send(text);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Failed to generate content");
//   }
// }

// export async function contactSendMessageController(req, res) {
//   try {
//     const { name, email, message } = req.body;
//     const response = await contactSendMessageMysql(name, email, message);

//     return res.status(201).send({ msg: "Message Sent successful" });
//   } catch (error) {
//     return res.status(500).send({ error: "Internal server error", error });
//   }
// }
export async function contactSendMessageController(req, res) {
  try {
    const { name, email, message } = req.body;
    if ((name, email, message)) {
      const response = await contactSendMessageMysql(name, email, message);
      return res.status(201).send({ msg: "Message Sent successfully" });
    } else {
      console.log("name is ", name, "email is ", email, "message ", message);
    }
  } catch (error) {
    return res.status(500).send({ error: "Internal server error" });
  }
}

export async function deleteUserRegisterController(req, res) {
  try {
    const { username, role, email, reason, deletedby } = req.body;
    const response = await deleteUserRegister(
      username,
      role,
      email,
      reason,
      deletedby
    );
    return res.status(201).send({ msg: "User Deleted Registered successful" });
  } catch (error) {
    return res.status(500).send({ error: "Internal server error", error });
  }
}

export async function ReturnDeletedUser(req, res) {
  try {
    const users = await GetDeletedUsers();
    return res.status(200).send(users);
  } catch (error) {
    console.error("error occured during get deleted user", error);
    return res
      .status(500)
      .send({ error: "an error occured while getting deleted user" });
  }
}
export async function ReturnContactUsMessage(req, res) {
  try {
    const users = await GetContactUsMessage();
    return res.status(200).send(users);
  } catch (error) {
    console.error("error occured during get contact message", error);
    return res
      .status(500)
      .send({ error: "an error occured while getting contact message" });
  }
}

export async function registerPatientController(req, res) {
  try {
    const { name, password, age, gender, email, medicalhistory } = req.body;
    // const medicalhistory = "Empty File";
    const existingname = await findPatient(name);

    if (existingname) {
      return res.status(400).send({ error: "Please use a unique name" });
    }

    const existingEmail = await findPatientEmail(email);
    if (existingEmail) {
      return res.status(400).send({ error: "Please use a unique email" });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const response = await registerPatientUser(
        name,
        hashedPassword,
        age,
        gender,
        email,
        medicalhistory
      );
      return res.status(201).send({ msg: "Patient registration successful" });
    } else {
      return res.status(400).send({ error: "Password is required" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Internal server error", error });
  }
}

export async function ReturnPatientUser(req, res) {
  try {
    const users = await GetPatientUsers();
    return res.status(200).send(users);
  } catch (error) {
    console.error("error occured during get Patient user", error);
    return res
      .status(500)
      .send({ error: "an error occured while getting Patient user" });
  }
}

export async function PatientExistForLogin(req, res, next) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({ error: "name is required" });
    }

    // check the user existance
    let exist = await findPatient(name);
    if (!exist)
      return res.status(404).send({ error: `Patient Did not exist!` });
    next();
  } catch (error) {
    console.error("error occurred in verify user middleware", error);
    return res.status(404).send({ error: "Authentication Error" });
  }
}

export async function loginPatient(req, res) {
  const { name, password } = req.body;

  try {
    const user = await findPatient(name);

    if (!user) {
      return res.status(404).send({ error: "Name not found" });
    }

    const passwordCheck = await bcrypt.compare(password, user[0].password);

    if (!passwordCheck) {
      return res.status(400).send({ error: "Password does not match" });
    }

    const token = jwt.sign(
      {
        id: user[0].id,
        name: user[0].name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).send({
      msg: "Login Successful",
      name: user[0].name,
      id: user[0].id,
      email: user[0].email,
      age: user[0].age,
      gender: user[0].gender,
      dateofregistration: user[0].dateofregistration,
      token,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
}

export async function PatientExistanceController(req, res, next) {
  try {
    const { name } = req.method === "GET" ? req.query : req.body;

    if (!name) {
      return res.status(400).send({ error: "name is required" });
    }

    req.session.nameForReset = name;
    // check the user existance
    let exist = await findPatient(name);
    // return exist;
    if (!exist) {
      return res.status(404).send({ error: `User Did not exist!` });
    }
    next();
    req.userExit = true;
  } catch (error) {
    console.error("error occurred in verify find Patient middleware", error);
    return res.status(404).send({ error: "Authentication Error" });
  }
}

export async function ReturnPatientEmailController(req, res) {
  try {
    const { name } = req.method === "GET" ? req.query : req.body;
    if (!name) {
      return res.status(400).send({ error: "name is required" });
    }
    let emailReturn = await ReturnPatientEmail(name);
    if (!emailReturn)
      return res.status(404).send({ error: `User Email did not Exists` });
    return res.status(200).send(emailReturn);
  } catch (error) {
    console.error("error in returning email controller", error);
    return res.status(404).send({ error: "Retrieval error" });
  }
}

export async function resetPatientPasswordAdminController(req, res) {
  try {
    const { password } = req.body;
    const name = req.session.nameForReset;
    try {
      const user = await findPatient(name);

      if (!user) {
        return res.status(404).send({ error: "Name not found" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await UpdatePatientPassword(name, hashedPassword);

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

export async function UpdateUserProfileController(req, res) {
  try {
    const { Name, Email, id, chatpassword } = req.body;
    const userId = id;
    const usernameValues = await GetUserName(userId);

    // var data =

    if (!Name || !Email) {
      return res.status(400).send({ error: "Missing required fields" });
    }
    const users = await UpdateUserStaffProfile(id, Name, Email);
    try {
      // Make a PUT request to create the user and obtain the user ID
      const r = await axios.put(
        `https://api.chatengine.io/users/`,
        {
          username: usernameValues,
          secret: chatpassword,
          first_name: usernameValues,
        },
        { headers: { "Private-Key": process.env.Private_Key } }
      );

      const user_id = r.data.id; // Obtain the user ID from the response

      // Make a PATCH request to update the user with the obtained user ID
      await axios.patch(
        `https://api.chatengine.io/users/${user_id}/`,
        {
          username: Name,
          secret: chatpassword,
          first_name: Name,
        },
        { headers: { "Private-Key": process.env.Private_Key } }
      );

      console.log("User updated successfully in ChatEngine.io");
    } catch (error) {
      console.error(
        "Error occurred while updating user in ChatEngine.io:",
        error
      );
    }

    return res.status(200).send(users);
  } catch (error) {
    console.error("Error occurred during Update user", error);
    return res
      .status(500)
      .send({ error: "An error occurred while updating user" });
  }
}
export async function UpdatePatientProfileController(req, res) {
  try {
    const { Name, Email, Age, id } = req.body; // Change 'username' to 'Name'

    if (!Name || !Email || !Age) {
      return res.status(400).send({ error: "Missing required fields" });
    }
    const users = await UpdatePatientProfile(id, Name, Email, Age); // Update 'username' to 'Name'

    return res.status(200).send(users);
  } catch (error) {
    console.error("Error occurred during Update user", error);
    return res
      .status(500)
      .send({ error: "An error occurred while updating user" });
  }
}

export async function MarkAttendance(req, res) {
  try {
    const { UserName, id, Morning_Status, Afternoon_Status } = req.body;

    await SaveMarkedAttendance(UserName, id, Morning_Status, Afternoon_Status);

    return res.status(201).send({ msg: "Attendance Marked Successfully" });
  } catch (error) {
    return res.status(500).send({ error: "Internal server error", error });
  }
}

export async function MarkAfternoonAttendance(req, res) {
  try {
    const id = req.params.id;
    const { Afternoon_Status2 } = req.body;

    // Wait for the attendance to be marked
    await SaveAfternoonMarkedAttendance(id, Afternoon_Status2);

    // Send the response after the attendance is successfully marked
    return res
      .status(201)
      .send({ msg: "Afternoon Attendance Marked Successfully" });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error occurred while marking afternoon attendance: ", error);
    return res.status(500).send({ error: "Internal server error", error });
  }
}

export async function DidUserMarkedAttendanceController(req, res) {
  try {
    const { id } = req.query; // Retrieve id from query parameters
    const value = await DidUserMarkedAttendance(id);
    return res.status(200).send(value);
  } catch (error) {
    return res.status(500).send({ error: "internal server error", error });
  }
}

export async function DidUserMarkedAfternoonAttendanceController(req, res) {
  try {
    const id = req.params.id; // Retrieve id from query parameters
    const value = await DidUserAfternoonMarkedAttendance(id);
    // console.log("value is ", value[0].afternoon_status);
    if (value[0].afternoon_status === "absent") {
      return res.status(200).send(true);
    } else {
      return res.status(200).send(false);
    }
  } catch (error) {
    return res.status(500).send({ error: "internal server error", error });
  }
}

export async function ReturnFetchAttendance(req, res) {
  try {
    const users = await GetAttendanceUsers();
    return res.status(200).send(users);
  } catch (error) {
    console.error("error occured during get Attendance user", error);
    return res
      .status(500)
      .send({ error: "an error occured while getting Attendance user" });
  }
}

export async function GetPatientByIdController(req, res) {
  try {
    const id = req.params.id;
    const users = await GetPatientById(id);
    return res.status(200).send(users);
  } catch (error) {
    console.error("error occurred during getting patient", error);
    return res
      .status(500)
      .send({ error: "an error occurred while getting patient" });
  }
}
export async function GetPatientByIdAllDataController(req, res) {
  try {
    const id = req.params.id;
    const users = await GetPatientByIdAllData(id);
    return res.status(200).send(users);
  } catch (error) {
    console.error("error occurred during getting patient", error);
    return res
      .status(500)
      .send({ error: "an error occurred while getting patient" });
  }
}

export async function UpdatePatientController(req, res) {
  try {
    // const id = req.params.id;

    const { medicalhistory, id } = req.body;
    const users = await UpdatePatient(id, medicalhistory);
    return res.status(200).send(users);
  } catch (error) {
    console.error("Error occurred during Update user", error);
    return res
      .status(500)
      .send({ error: "An error occurred while updating user" });
  }
}

export async function registerAppointmentController(req, res) {
  try {
    const { patient_id, patient_name, doctor_name, date_of_appointment } =
      req.body;
    // const existingname = await findPatientAppointment(
    //   patient_name,
    //   date_of_appointment
    // );

    // if (existingname) {
    //   return res
    //     .status(400)
    //     .send({ error: "Appointment Exists. Please use a unique Appointment" });
    // }
    await registerPatientAppointment(
      patient_id,
      patient_name,
      doctor_name,
      date_of_appointment
    );
    return res.status(201).send({ msg: "Appointment registration successful" });
  } catch (error) {
    return res.status(500).send({ error: "Internal server error", error });
  }
}

export async function ReturnPatientAppointment(req, res) {
  try {
    const doctorName = req.query.doctorName;
    const users = await GetPatientAppointment(doctorName);
    return res.status(200).send(users);
  } catch (error) {
    console.error("error occured during get Patient user", error);
    return res
      .status(500)
      .send({ error: "an error occured while getting Patient user" });
  }
}

export async function GetPatientAppointmentByIdController(req, res) {
  try {
    const id = req.params.id;
    const users = await GetPatientAppointmentByIdAllData(id);
    return res.status(200).send(users);
  } catch (error) {
    console.error("error occurred during getting patient", error);
    return res
      .status(500)
      .send({ error: "an error occurred while getting patient" });
  }
}

export async function DeleteAppointmentController(req, res) {
  try {
    const rowsID = req.params.rowsID;

    const users = await DeleteAppointment(rowsID);
    return res.status(200).send(users);
  } catch (error) {
    console.error("An error occurred during delete user:", error.message);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
    return res
      .status(500)
      .send({ error: "An error occurred while deleting user" });
  }
}

export async function deleteAppointmentRegisterController(req, res) {
  try {
    const {
      patient_id,
      patient_name,
      doctor_name,
      date_of_appointment,
      reason_of_deletion,
    } = req.body;
    await deletedAppointmentRegister(
      patient_id,
      patient_name,
      doctor_name,
      date_of_appointment,
      reason_of_deletion
    );
    return res
      .status(201)
      .send({ msg: "Appointment Deleted Registered successful" });
  } catch (error) {
    return res.status(500).send({ error: "Internal server error", error });
  }
}
export async function UpdateAppointmentController(req, res) {
  try {
    const editRowId = req.params.editRowId; // Corrected from req.params.rowsID
    console.log("row is  ", editRowId);

    const { date_of_appointment_updated } = req.body;
    const users = await UpdateAppointment(
      editRowId,
      date_of_appointment_updated
    );
    return res.status(200).send(users);
  } catch (error) {
    console.error("Error occurred during Update app", error);
    return res
      .status(500)
      .send({ error: "An error occurred while updating app" });
  }
}

export async function ReturnDeletedAppointment(req, res) {
  try {
    const doctorName = req.query.doctorName;
    const users = await GetDeletedAppointment(doctorName);
    return res.status(200).send(users);
  } catch (error) {
    console.error("error occured during get Patient user", error);
    return res
      .status(500)
      .send({ error: "an error occured while getting Patient user" });
  }
}

export async function ReturnAdmininstrationUserController(req, res) {
  try {
    const role = req.params.role;
    const user = await findAdministratorUser(role);
    return res.status(200).send(`${user}`);
  } catch (error) {
    console.error("error occured is ", error);
  }
}

export async function ReturnPatientUserController(req, res) {
  try {
    const user = await findNumberOfPatient();
    return res.status(200).send(`${user}`);
  } catch (error) {
    console.error("error occured is ", error);
  }
}

// export async function ReturnPatientMedicalHistoryController(req, res) {
//   try {
//     const name = req.params.name;
//     const medicalhistory = await ReturnPatientMedicalHistory(name);
//     return res.status(200).send(`${medicalhistory}`);
//   } catch (error) {
//     console.log("error is ", error);
//   }
// }

export async function ReturnPatientMedicalHistoryController(req, res) {
  try {
    const name = req.params.name;

    // Await the asynchronous function call here
    const medicalHistoryResult = await ReturnPatientMedicalHistory(name);

    // Check if any result is returned
    if (medicalHistoryResult.length > 0) {
      // Extract the medicalhistory value from the first object in the array
      const medicalhistory = medicalHistoryResult[0].medicalhistory;

      return res.status(200).send(`${medicalhistory}`);
    } else {
      // Handle case when no medical history is found for the patient
      return res.status(404).send("No medical history found for the patient");
    }
  } catch (error) {
    console.log("error is ", error);
    return res.status(500).send("Internal server error");
  }
}

export async function ReturnPatientAppointmentDataController(req, res) {
  try {
    const name = req.params.name;

    // Await the asynchronous function call here
    const medicalHistoryResult = await ReturnPatientAppointmentData(name);

    // Check if any result is returned
    if (medicalHistoryResult.length > 0) {
      // Extract the medicalhistory value from the first object in the array
      const DoctorName = medicalHistoryResult[0].doctor_name;
      const DateOfAppointment = medicalHistoryResult[0].date_of_appointment;
      return res.status(200).json({ DoctorName, DateOfAppointment });
      // return res.status(200).send(`${DoctorName} ${DateOfAppointment}`);
    } else {
      // Handle case when no medical history is found for the patient
      return res
        .status(404)
        .send(`No Appointment found for the patient ${name}`);
    }
  } catch (error) {
    console.log("error is ", error);
    return res.status(500).send("Internal server error");
  }
}

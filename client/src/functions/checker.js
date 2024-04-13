import axios from "axios";
import { jwtDecode } from "jwt-decode";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/** Make API Requests */
/** To get username from Token */
export async function getUsername() {
  const token = localStorage.getItem("token");
  if (!token) return Promise.reject("Cannot find Token");
  let decode = jwtDecode(token);
  return decode;
}

/** authenticate function */
export async function authenticate(username) {
  try {
    return await axios.post("/api/authenticate", { username });
  } catch (error) {
    return { error: "Username doesn't exist...!" };
  }
}

export async function userExistanceChecker(username) {
  try {
    if (username) {
      const { status } = await axios.post("/api/user-existance", { username });

      return Promise.resolve({ status });
    }
  } catch (error) {
    throw new Error("User did not exists!");
    // return Promise.reject({ error: "Username doesn't exist HERE...!" });
  }
}

/** get User details */
export async function getUser({ username }) {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return { data };
  } catch (error) {
    return { error: "Password doesn't Match...!" };
  }
}

/** register user function */
export async function registerUser(credentials) {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post("/api/create-users", credentials);

    let { username, email } = credentials;

    /** send email */
    if (status === 201) {
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text: msg,
      });
    }

    return Promise.resolve(msg);
  } catch (error) {
    if (error.response) {
      return Promise.reject(error.response.data.error);
    } else if (error.request) {
      return Promise.reject("No response received from server");
    } else {
      return Promise.reject("Error while sending request");
    }
  }
}
export async function updateUserChecker(id, credentials) {
  try {
    const response = await axios.put(`/api/update-user/${id}`, credentials);

    const {
      data: { msg },
    } = response;

    return Promise.resolve(msg);
  } catch (error) {
    if (error.response) {
      return Promise.reject(error.response.data.error);
    } else if (error.request) {
      return Promise.reject("No response received from server");
    } else {
      return Promise.reject("Error while sending request");
    }
  }
}

/** login function */
export async function verifyPassword({ username, password }) {
  try {
    if (username) {
      const { data } = await axios.post("/api/login-user-staff", {
        username,
        password,
      });
      return Promise.resolve({ data });
    }
  } catch (error) {
    console.log(error + "error occuredd here");
    console.error("error occured in verify password with ", error);
    return Promise.reject({ error: "Password doesn't Match...!" });
  }
}

/** update user profile function */
export async function updateUser(response) {
  try {
    const token = await localStorage.getItem("token");
    const data = await axios.put("/api/updateuser", response, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't Update Profile...!" });
  }
}

export async function emailExistanceChecker(username) {
  try {
    const response = await axios.get("/api/user-email", {
      params: { username },
    });
    const email = response.data;
    return email;
  } catch (error) {
    return { error: "Username doesn't exist...!" };
    // return null;
  }
}
/** generate OTP */
export async function generateOTP(username) {
  try {
    const {
      data: { code },
      status,
    } = await axios.get("/api/otp-generator", { params: { username } });

    // send mail with the OTP
    if (status === 201) {
      const email = await emailExistanceChecker(username);
      const text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
      await axios.post("/api/registerMail", {
        username: username,
        userEmail: email,
        text: text,
        subject: "Password Recovery OTP",
      });
    }
    return code;
  } catch (error) {
    return { error };
  }
}

/** verify OTP */
export async function verifyOTP(username, code) {
  try {
    const { data, status } = await axios.get("/api/otp-verify", {
      params: { username, code },
    });
    return { data, status };
  } catch (error) {
    return Promise.reject(error);
  }
}

/** reset password */
export async function resetPassword({ username, password }) {
  try {
    const { data, status } = await axios.put("/api/reset-password", {
      username,
      password,
    });
    return Promise.resolve({ data, status });
  } catch (error) {
    console.error("error occured here in resetpassword checker", error);
    return Promise.reject({ error });
  }
}

// creating to do lists
export async function CreateListChecker({ id, listtitle }) {
  try {
    const response = await axios.post("/api/create-lists", { id, listtitle });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function sendContactMessage(credentials) {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post("/api/contact-send-message", credentials);

    return Promise.resolve(msg);
  } catch (error) {
    console.log("error occured in contact send message ", error);
  }
}

export async function registerPatient(credentials) {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post("/api/create-patient", credentials);

    let { name, email } = credentials;

    /** send email */
    if (status === 201) {
      await axios.post("/api/registerMail", {
        username: name,
        userEmail: email,
        text: msg,
      });
    }

    return Promise.resolve(msg);
  } catch (error) {
    if (error.response) {
      return Promise.reject(error.response.data.error);
    } else if (error.request) {
      return Promise.reject("No response received from server");
    } else {
      return Promise.reject("Error while sending request");
    }
  }
}

export async function verifyPatientPassword({ name, password }) {
  try {
    if (name) {
      const { data } = await axios.post("/api/login-user-patient", {
        name,
        password,
      });
      return Promise.resolve({ data });
    }
  } catch (error) {
    console.log(error + "error occuredd here");
    console.error("error occured in verify password with ", error);
    return Promise.reject({ error: "Password doesn't Match...!" });
  }
}

export async function PatientExistanceChecker(name) {
  try {
    if (name) {
      const { status } = await axios.post("/api/patient-existance", { name });

      return Promise.resolve({ status });
    }
  } catch (error) {
    throw new Error("Patient did not exists!");
  }
}
export async function emailPatientExistanceChecker(name) {
  try {
    const response = await axios.get("/api/patient-email", {
      params: { name },
    });
    const email = response.data;
    return email;
  } catch (error) {
    return { error: "Username doesn't exist...!" };
    // return null;
  }
}
export async function generateOTPPatient(name) {
  try {
    const {
      data: { code },
      status,
    } = await axios.get("/api/otp-generator-patient", { params: { name } });

    // send mail with the OTP
    if (status === 201) {
      const email = await emailPatientExistanceChecker(name);
      const text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
      await axios.post("/api/registerMail", {
        username: name,
        userEmail: email,
        text: text,
        subject: "Password Recovery OTP",
      });
    }
    return code;
  } catch (error) {
    return { error };
  }
}

export async function verifyPatientOTP(name, code) {
  try {
    const { data, status } = await axios.get("/api/otp-verify-patient", {
      params: { name, code },
    });
    return { data, status };
  } catch (error) {
    return Promise.reject(error);
  }
}
/** reset password */
export async function resetPatientPassword({ name, password }) {
  try {
    const { data, status } = await axios.put("/api/reset-patient-password", {
      name,
      password,
    });
    return Promise.resolve({ data, status });
  } catch (error) {
    console.error("error occured here in resetpassword checker", error);
    return Promise.reject({ error });
  }
}

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
    const response = await axios.post("/api/user-existance", { username });
    return response;
  } catch (error) {
    return { error: "Username doesn't exist...!" };
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
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return Promise.reject(error.response.data.error);
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject("No response received from server");
    } else {
      // Something happened in setting up the request that triggered an Error
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
    console.log("withoutdata", response);
    console.log("withdata", response.data);
    return email;
  } catch (error) {
    // return { error: "Username doesn't exist...!" };
    return null;
  }
}
/** generate OTP */
export async function generateOTP(username) {
  try {
    const {
      data: { code },
      status,
    } = await axios.get("/api/otp-generator", { params: { username } });
    console.log("otp code is ", code);

    // send mail with the OTP
    if (status === 201) {
      console.log("username for otp emmail", username);
      const email = await emailExistanceChecker(username);
      console.log("email for otp is ", email);
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
    const { data, status } = await axios.put("/api/resetPassword", {
      username,
      password,
    });
    return Promise.resolve({ data, status });
  } catch (error) {
    console.error("error occured here in resetpassword checker", error);
    return Promise.reject({ error });
  }
}

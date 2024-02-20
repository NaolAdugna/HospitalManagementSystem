import toast from "react-hot-toast";
import { authenticate } from "./checker";

// validate login page inputs
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);

  if (values.username) {
    const { status } = await authenticate(values.username);

    if (status !== 200) {
      errors.exist = toast.error("User does not exist...");
    }
  }

  return errors;
}

export async function recoveryValidate(values) {
  const errors = recoveryVerify({}, values);
  return errors;
}
export async function resetPasswordValidate(values) {
  const errors = resetVerify({}, values);

  if (values.password !== values.newPassword) {
    errors.exist = toast.error("password do not match...");
  }

  return errors;
}
export async function registerdValidate(values) {
  const errors = usernameVerify({}, values);

  emailVerify(errors, values);

  return errors;
}

// email verify
function emailVerify(error = [], values) {
  if (!values.email) {
    error.email = toast.error("Email Required...");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong Email...");
  } else if (!/^[A-Z0-9._5+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error("Invalid email address...");
  }
}

// validate username
function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username required...");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username");
  } else if (!values.password) {
    error.password = toast.error("Password required...");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Wrong Password...");
  } else if (values.password.length < 4) {
    error.password = toast.error("Password must be more than 4 character");
  }

  return error;
}

// validate recovery

function recoveryVerify(error = {}, values) {
  if (!values.password) {
    error.password = toast.error("OTP Code required...");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Invalid OTP code");
  }
}
function resetVerify(error = {}, values) {
  if (!values.password) {
    error.password = toast.error("password required...");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Invalid password");
  }
}

export function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

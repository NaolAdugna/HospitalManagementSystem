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
  // Initialize errors object with an empty object
  const errors = resetVerify({}, values);

  // Call resetVerify function and assign the returned errors to the errors object
  // const resetVerifyErrors = resetVerify({}, values);
  // Object.assign(errors, resetVerifyErrors);

  // Check if password and newPassword match
  if (values.password !== values.confirmPassword) {
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
function resetVerify(errors = {}, values) {
  if (!values.password) {
    errors.password = "password required...";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid password";
  } else if (values.confirmPassword.includes(" ")) {
    errors.password = "Invalid password";
  } else if (values.confirmPassword.includes(" ")) {
    errors.password = "Invalid password";
  }

  return errors;
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

import jwt from "jsonwebtoken";
import ENV from "../../config.js";

/** auth middleware */
export default async function Auth(req, res, next) {
  try {
    // Check if the 'Authorization' header is provided
    if (!req.headers.authorization) {
      throw new Error("Authorization header is missing");
    }

    // Split the header to extract the token
    const token = req.headers.authorization.split(" ")[1];

    // Retrieve the user details of the logged-in user
    const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);
    console.log("Decoded Token:", decodedToken);

    req.user = decodedToken;

    next();
  } catch (error) {
    console.error("Error in authentication:", error);
    res.status(401).json({ error: error.message }); // Return the error message from the caught error
  }
}

export function localVariables(req, res, next) {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
}

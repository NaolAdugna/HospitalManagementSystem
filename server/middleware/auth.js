import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
/** auth middleware */
export default async function Auth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decodedToken);

    req.user = decodedToken;

    next();
  } catch (error) {
    console.error("Error in authentication:", error);
    res.status(401).json({ error: error.message });
  }
}

export function localVariables(req, res, next) {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
}

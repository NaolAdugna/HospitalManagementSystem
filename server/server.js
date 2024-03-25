import express from "express";
import morgan from "morgan";
import cors from "cors";

import mysqlPool from "../server/database/connection.js";
import router from "./router/router.js";
import axios from "axios";
import session from "express-session";
import ENV from "../config.js";
import Jwt from "jsonwebtoken";
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");

const port = 8080;
app.use(
  session({
    secret: "secretnumber",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  req.setTimeout(200000);
  res.status(201).json("home get request");
});

// api routes
app.use("/api", router);

app.use(function (req, res, next) {
  Jwt.verify(
    req.sessionID["token"],
    ENV.JWT_SECRET,
    function (err, decodedToken) {
      if (err) {
        console.log("error in server js file ", err);
      } else {
        req.id = decodedToken.id;
        next();
      }
    }
  );
});

app.post("/api/verify-recaptcha", async (req, res) => {
  const { recaptchaToken } = req.body;

  try {
    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: "6Lc7vnEpAAAAAMTZG8RdEv78XquSIMvEa3EABIle",
          response: recaptchaToken,
        },
      }
    );
    const { success } = response.data;

    if (success) {
      res.status(200).json({ success: true });
    } else {
      res
        .status(400)
        .json({ success: false, error: "reCAPTCHA verification failed" });
    }
  } catch (error) {
    console.error("Error Verifying recaptcha: ", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

mysqlPool.query("SELECT 1").then(() => {
  console.log("Database Connection succeeded");
  try {
    app.listen(port, () => {
      console.log(`server connected to http://localhost:${port}`);
    });
  } catch (err) {
    console.log("Database connection failed. \n" + err);
  }
});

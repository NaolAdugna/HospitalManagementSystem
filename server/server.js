import express from "express";
import morgan from "morgan";
import cors from "cors";

import connect from "../server/database/connection.js";
import router from "./router/router.js";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");

const port = 8080;

app.get("/", (req, res) => {
  res.status(201).json("home get request");
});

// api routes
app.use("/api", router);

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

connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`server connected to http://localhost:${port}`);
      });
    } catch (error) {
      console.log("cannot connect to the server");
    }
  })
  .catch((error) => {
    console.log("invalid database");
  });

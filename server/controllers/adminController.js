import bcrypt from "bcrypt";

import {
  findEmail,
  findUser,
  saveUser,
} from "../modelSchema/UserCreation.model.js";

export async function register(req, res) {
  try {
    const { image, username, password, role, email } = req.body;

    const existingUsername = await findUser(username);

    if (existingUsername) {
      return res.status(400).send({ error: "Please use a unique username" });
    }

    const existingEmail = await findEmail(email);
    if (existingEmail) {
      return res.status(400).send({ error: "Please use a unique email" });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 3);
      const response = await saveUser(
        image,
        username,
        hashedPassword,
        role,
        email
      );
      return res.status(201).send({ msg: "User registration successful" });
    } else {
      return res.status(400).send({ error: "Password is required" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Internal server error", error });
  }
}

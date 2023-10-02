const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("../../models/Users");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await Users.findOne({ email });

    if (userExists) {
      return res.status(401).json({ message: "Email is already in use." });
    }

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        res
          .status(500)
          .json({ msg: "An error occurred while hashing the password." });
      }
      const user = await Users.create({
        username,
        email,
        password: hash,
      });
      res.json(user);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/", async (req, res) => {
  try {
    const { email } = req.body;
    const userExists = await Users.findOne({ email });

    if (!userExists) {
      return res.status(401).json({ message: "User does not exist." });
    }
    await Users.findOneAndDelete(email);
    res.json({ message: "User deleted." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

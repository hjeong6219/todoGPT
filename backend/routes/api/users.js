const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("../../models/Users");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, fullName } = req.body;
    const userExists = await Users.findOne({ email });
    if (userExists) {
      console.log(`User with email ${email} already exists.`);
      return res.status(400).json({ message: "User already exists." });
    }
    const user = new Users({ email, fullName });
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await Users.findOne({ email });
    if (!userExists) {
      console.log(`User with email ${email} does not exist.`);
      return res.status(401).json({ message: "User does not exist." });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) {
      console.log(`Incorrect password.`);
      return res.status(400).json({ message: "Incorrect password." });
    }

    console.log(`Login successful.`);
    return res.status(200).json({
      message: "Login successful.",
      userExists,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const userExists = await Users.findOne({ email });
    if (userExists) {
      console.log(`User with email ${email} already exists.`);
      return res
        .status(400)
        .json({ message: `User with email ${email} already exists.` });
    }

    const user = new Users({ fullName, email, password });

    // Password complexity validation 8 characters with upper case, lower case, and a number
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(401).json({
        message:
          "Password does not meet complexity requirements. \n The password should be minimum 8 characters with upper case, lower case, and a number",
      });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res
          .status(500)
          .json({ msg: "An error occurred while hashing the password." });
      }
      user.password = hash;

      await user.save();
      console.log(`User created for ${fullName}.`);
      return res.status(200).json({
        success: true,
        message: `User created for ${fullName}.`,
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const { email } = req.query;
    const userExists = await Users.findOne({ email });
    if (!userExists) {
      console.log(`User with email ${email} does not exist.`);
      return res.status(401).json({ message: "User does not exist." });
    }
    res.json(userExists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:email", async (req, res) => {
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

router.post("/email-reset", async (req, res) => {
  try {
    const { email } = req.body;
    const userExists = await Users.findOne({ email });

    if (!userExists) {
      return res.status(401).json({ message: "User does not exist." });
    }
    res.json({ message: "Confirmation email has been sent" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/password-reset", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await Users.findOne({ email });

    if (!userExists) {
      return res.status(401).json({ message: "User does not exist." });
    }

    // Password complexity validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res
        .status(401)
        .json({ message: "Password does not meet complexity requirements." });
    }

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        res
          .status(500)
          .json({ msg: "An error occurred while hashing the password." });
      }
      const isMatch = await bcrypt.compare(password, userExists.password);
      if (isMatch) {
        return res.status(401).json({
          message: "New password cannot be the same as old password.",
        });
      }
      userExists.password = hash;
      await userExists.save();
      res.json({ message: "Password reset successfully." });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

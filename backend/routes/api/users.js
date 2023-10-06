const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("../../models/Users");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await Users.findOne({ email });

    if (userExists) {
      return res.status(401).json({ message: "Email is already in use." });
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

router.delete("/delete/:email", async (req, res) => {
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

router.get("/get-user/:email", async (req, res) => {
  try {
    const { email } = req.body;
    const userExists = await Users.findOne({ email });
    if (!userExists) {
      return res.status(401).json({ message: "User does not exist." });
    }
    res.json(userExists);
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
      return res.status(401).json({ message: "User does not exist." });
    }
    const checkPassword = await bcrypt.compare(password, userExists.password);
    if (!checkPassword) {
      return res.status(401).json({ message: "Incorrect password." });
    }
    res.json(userExists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

const isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    // User is logged in
    next();
  } else {
    // User is not logged in
    res
      .status(401)
      .json({ message: "You must be logged in to access this resource." });
  }
};

module.exports = router;

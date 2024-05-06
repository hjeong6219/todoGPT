require("dotenv").config();
const connectDB = require("./db");
const express = require("express");
const app = express();
const todos = require("./routes/api/todos");
const users = require("./routes/api/users");
const chats = require("./routes/api/chats");
const cors = require("cors");

connectDB();

app.use(express.json());
app.use("/", (req, res) => {
  res.send("Welcome to the TodoGPT API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

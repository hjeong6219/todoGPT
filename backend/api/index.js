require("dotenv").config();
const connectDB = require("../db.js");
const express = require("express");
const app = express();
const todos = require("../routes/api/todos.js");
const users = require("../routes/api/users.js");
const chats = require("../routes/api/chats.js");
const cors = require("cors");

connectDB();

app.use(
  cors({
    origin: ["https://todogpt-three.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/todos", todos);
app.use("/users", users);
app.use("/chats", chats);
app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(5000, () => console.log("Server ready on port 5000."));

module.exports = app;

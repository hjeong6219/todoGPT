require("dotenv").config();
const connectDB = require("../../db");
const express = require("express");
const app = express();
const todos = require("./todos");
const users = require("./users");
const chats = require("./chats");
const cors = require("cors");

connectDB();

app.use(
  cors({
    origin: ["https://todogpt-three.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/todos", todos);
app.use("/users", users);
app.use("/chats", chats);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

require("dotenv").config();
const connectDB = require("./db");
const express = require("express");
const app = express();
const todos = require("./routes/api/todos");
const users = require("./routes/api/users");
const cors = require("cors");

connectDB();

const mongoose = require("mongoose");

app.use(cors({ origin: true, credentials: true }));

app.use(express.json());

app.use("/todos", todos);
app.use("/signup", users);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

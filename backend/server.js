require("dotenv").config();
const connectDB = require("./db");
const express = require("express");
const app = express();
const todos = require("./routes/api/todos");
const users = require("./routes/api/users");
const chats = require("./routes/api/chats");
const openai = require("./routes/api/openAI");
const cors = require("cors");

connectDB();

app.use(cors({ origin: true, credentials: true }));

app.use(express.json());

app.use("/todos", todos);
app.use("/users", users);
app.use("/chats", chats);
app.use("/openai", openai);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

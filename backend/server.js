require("dotenv").config();
const connectDB = require("./db");
const port = 5050;

connectDB();

const mongoose = require("mongoose");

const todosSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    default: true,
  },
});

const Todos = mongoose.model("Todos", todosSchema);

const newTodo = new Todos({
  title: "Todo 3",
  content: "Content!",
});

newTodo.save();

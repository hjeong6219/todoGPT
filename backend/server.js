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
    default: "",
    required: true,
  },
  createdAt: {
    type: String,
    default: "",
    required: false,
  },
  completed: {
    type: Boolean,
    default: false,
    required: false,
  },
  category: {
    type: Array,
    default: "",
    required: false,
  },
});

const Todos = mongoose.model("Todos", todosSchema);

const newTodo = new Todos({
  title: "Date",
  content: "Testing",
  createdAt: new Date().toLocaleDateString("en-US"),
  completed: false,
  category: ["diet", "food"],
});

newTodo.save();

const mongoose = require("mongoose");

const TodosSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    default: "",
    required: false,
  },
  createdAt: {
    type: Number,
    default: "",
    required: false,
  },
  updatedAt: {
    type: Number,
    default: "",
    required: false,
  },
  dueDate: {
    type: Number,
    default: "",
    required: false,
  },
  status: {
    type: String,
    default: "",
    required: false,
  },
  Progress: {
    type: Number,
    default: -1,
    required: false,
  },
  priority: {
    type: String,
    default: "",
    required: false,
  },
  category: {
    type: Array,
    default: null,
    required: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

module.exports = Todos = mongoose.model("todo", TodosSchema);

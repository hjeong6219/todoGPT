const mongoose = require("mongoose");

const TodosSchema = new mongoose.Schema({
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
  Progress: {
    type: Number,
    default: -1,
    required: false,
  },
  category: {
    type: Array,
    default: "",
    required: false,
  },
});

module.exports = Todos = mongoose.model("todo", TodosSchema);

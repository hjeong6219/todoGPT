const { isEmail } = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email address"],
    validate: {
      validator: isEmail,
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  fullName: {
    type: String,
    default: "",
    required: true,
  },
  todos: {
    type: Array,
    default: [],
    required: false,
  },
  password: {
    type: String,
    default: "",
    required: false,
  },
});

const Users = mongoose.model("user", UsersSchema);
module.exports = Users;

const { isEmail } = require("validator");
const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email address"],
    validate: {
      validator: isEmail,
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    default: "",
    required: [true, "Please enter a password"],
    validate: {
      validator: function (value) {
        return value.length >= 8;
      },
      message: () => "Password must be at least 8 characters long",
    },
  },
  username: {
    type: String,
    default: "",
    required: true,
  },
  createdAt: {
    type: String,
    default: "",
    required: false,
  },
  todos: {
    type: Array,
    default: [],
    required: false,
  },
});

module.exports = Users = mongoose.model("user", UsersSchema);

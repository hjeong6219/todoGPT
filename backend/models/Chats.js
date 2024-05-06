const mongoose = require("mongoose");

const ChatsSchema = new mongoose.Schema({
  todoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Todos",
    required: true,
  },
  messages: [
    {
      chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chats",
        required: false,
      },
      content: {
        type: String,
        required: true,
      },
      sender: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        required: false,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    required: false,
  },
});

const Chats = mongoose.model("chat", ChatsSchema);
module.exports = Chats;

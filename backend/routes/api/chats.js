const express = require("express");
const router = express.Router();

const Chats = require("../../models/Chats");

router.get("/", async (req, res) => {
  try {
    const todoId = req.query.todoId;
    const chats = await Chats.find({ todoId });
    res.json(chats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const chats = await Chats.findById(req.params.id);
    if (!chats) {
      return res.status(404).json({ msg: "Chats not found" });
    }
    const messages = chats.messages;
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/", async (req, res) => {
  const { todoId } = req.body;

  try {
    // Check if a chats is already created for the todo
    const existingChat = await Chats.findOne({ todoId });
    if (existingChat) {
      return res
        .status(400)
        .json({ msg: "Chats item with the same todoId already exists" });
    }
    // Create a new chats entry if no duplicates are found
    const chats = await Chats.create({
      todoId,
    });
    res.json(chats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/:id", async (req, res) => {
  try {
    const chats = await Chats.findById(req.params.id);
    if (!chats) {
      return res.status(404).json({ msg: "Chats not found" });
    }
    const {
      messages: [{ content, sender }],
    } = req.body;
    // push messages instead of rewriting to the chats for optimization
    const newMessages = {
      chatsId: req.params.id,
      content,
      sender,
      createdAt: Date.now(),
    };
    chats.messages.push(...[newMessages]);
    await chats.save();
    res.json(chats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const chats = await Chats.findByIdAndDelete(req.params.id);
    if (!chats) {
      return res.status(404).json({ msg: "Chats not found" });
    }
    res.json({ msg: "Chats removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

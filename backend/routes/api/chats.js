const express = require("express");
const router = express.Router();
const { OpenAI } = require("openai");

const openAiApi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const Chats = require("../../models/Chats");

router.get("/", async (req, res) => {
  try {
    const todoId = req.query.todoId;
    const chat = await Chats.find({ todoId });
    res.json(chat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const chat = await Chats.findById(req.params.id);
    if (!chat) {
      return res.status(404).json({ msg: "Chat not found" });
    }
    const messages = chat.messages;
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  const { todoId, content, sender } = req.body;
  try {
    // Check if a chat is already created for the todo
    const existingChat = await Chats.findOne({ todoId });
    if (existingChat) {
      return res
        .status(400)
        .json({ msg: "Chat item with the same todoId already exists" });
    }
    // Create a new chat entry if no duplicates are found
    const chat = await Chats.create({
      todoId,
      messages: [{ content, sender, createdAt: Date.now() }],
    });
    res.json(chat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const chat = await Chats.findById(req.params.id);
    if (!chat) {
      return res.status(404).json({ msg: "Chat not found" });
    }
    // push messages instead of rewriting to the chat for optimization
    const newMessages = {
      chatsId: req.params.id,
      content: req.body.content,
      sender: req.body.sender,
      createdAt: Date.now(),
    };
    chat.messages.push(...[newMessages]);
    await chat.save();
    res.json(chat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/:id/openai", async (req, res) => {
  try {
    console.log(req.body);
    const chat = await Chats.findById(req.params.id);
    if (!req.body.prompt) {
      return res.status(400).json({ msg: "Prompt is required" });
    } else if (!chat) {
      return res.status(404).json({ msg: "Chat not found" });
    }

    const response = await openAiApi.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "assistant", content: req.body.prompt }],
      max_tokens: 1000,
      frequency_penalty: 0.5,
      n: 1,
    });
    const newMessages = {
      chatsId: req.params.id,
      content: response.choices[0].message.content,
      sender: req.body.sender,
      createdAt: Date.now(),
    };
    chat.messages.push(...[newMessages]);
    await chat.save();
    res.json(chat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const chat = await Chats.findByIdAndDelete(req.params.id);
    if (!chat) {
      return res.status(404).json({ msg: "Chat not found" });
    }
    res.json({ msg: "Chat removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

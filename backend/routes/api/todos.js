const express = require("express");
const router = express.Router();

const Todos = require("../../models/Todos");

router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId;
    const todoColumns = [
      {
        id: "column1",
        title: "Todo",
        todos: [],
      },
      {
        id: "column2",
        title: "In Progress",
        todos: [],
      },
      {
        id: "column3",
        title: "Completed",
        todos: [],
      },
    ];
    const todos = await Todos.find({ userId });
    todos.forEach((todo) => {
      switch (todo.completed) {
        case "notStarted":
          todoColumns[0].todos.push(todo);
          break;
        case "inProgress":
          todoColumns[1].todos.push(todo);
          break;
        case "completed":
          todoColumns[2].todos.push(todo);
          break;
        default:
          // Handle any unexpected cases
          console.error("Unexpected todo completion status:", todo.completed);
          break;
      }
    });
    // const sortedTodos = [...todos];
    // let start = 0;
    // let end = sortedTodos.length - 1;
    // while (start < end) {
    //   while (start < end && !sortedTodos[start].completed) {
    //     start++;
    //   }
    //   while (start < end && sortedTodos[end].completed) {
    //     end--;
    //   }
    //   if (start < end) {
    //     [sortedTodos[start], sortedTodos[end]] = [
    //       sortedTodos[end],
    //       sortedTodos[start],
    //     ];
    //   }
    // }
    res.json(todoColumns);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const todo = await Todos.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  const { title, content, createdAt, completed, Progress, category, userId } =
    req.body;

  try {
    // Check if a Todo item with the same title already exists for the user
    const existingTodo = await Todos.findOne({ title, userId });
    if (existingTodo) {
      return res
        .status(400)
        .json({ msg: "Todo item with the same title already exists" });
    }

    // Create a new Todo item if no duplicates are found
    const todo = await Todos.create({
      title,
      content,
      createdAt,
      completed,
      Progress,
      category,
      userId,
    });
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", async (req, res) => {
  const { title, content, createdAt, completed, Progress, category, userId } =
    req.body;
  try {
    const todo = await Todos.findByIdAndUpdate(req.params.id, {
      title,
      content,
      createdAt,
      completed,
      Progress,
      category,
      userId,
    });
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todos.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }
    res.json({ msg: "Todo removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5050;

app.use(cors());
app.use(express.json());

let todos = [];

app.get("/api/home", (req, res) => {
  res.json({ message: "Hello World!", people: ["Harry", "Jack", "Barry"] });
});

app.get("/api/todos", (req, res) => {
  res.json({ todos });
});

app.post("/api/todos", (req, res) => {
  const { title, description } = req.body;
  const newTodo = { title, description };
  todos.push(req.body);
  res.json({ message: "Todo added successfully!", todo: newTodo });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

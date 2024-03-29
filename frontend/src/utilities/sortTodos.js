export default function sortTodos(todos, todoStatus = "all", todoSearch = "") {
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

  if (todoStatus !== "all") {
    todos = todos.map((column) => ({
      ...column,
      todos: column.todos.filter((todo) => todo.status === todoStatus),
    }));
  }

  if (todoSearch !== "") {
    todos = todos.map((column) => ({
      ...column,
      todos: column.todos.filter((todo) =>
        todo.title.toLowerCase().includes(todoSearch.toLowerCase())
      ),
    }));
  }

  todos.forEach((column) => {
    column.todos.forEach((todo) => {
      switch (todo.status) {
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
          console.error("Unexpected todo status:", todo.status);
          break;
      }
    });
  });
  return todoColumns;
}

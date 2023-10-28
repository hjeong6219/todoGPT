export default function sortTodos(todos) {
  const todoColumns = {
    column1: {
      title: "Todo",
      todos: [],
    },
    column2: {
      title: "In Progress",
      todos: [],
    },
    column3: {
      title: "Completed",
      todos: [],
    },
  };
  todos.forEach((todo) => {
    switch (todo.completed) {
      case "notStarted":
        todoColumns.column1.todos.push(todo);
        break;
      case "inProgress":
        todoColumns.column2.todos.push(todo);
        break;
      case "completed":
        todoColumns.column3.todos.push(todo);
        break;
      default:
        console.error("Unexpected todo completion status:", todo.completed);
        break;
    }
  });
  return todoColumns;
}

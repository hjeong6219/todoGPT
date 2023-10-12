import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: [
    {
      id: null,
      title: "title",
      content: "",
      completed: false,
      // dueDate: null,
      // category: [],
      // priority: "low",
      createdAt: "",
    },
  ],
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action) => {
      const todos = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo = [...todos, action.payload];
      }
    },
    updateContent: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.content = action.payload.content;
      }
    },
    updateTitle: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
      }
    },
    toggleTodo: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
});

export const {
  addTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
  updateContent,
  updateTitle,
} = todoSlice.actions;

export default todoSlice.reducer;

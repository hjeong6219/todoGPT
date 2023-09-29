import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const todoSlice = createSlice({
  name: "todos",
  initialState: [
    {
      id: nanoid(),
      title: "title",
      content: "test",
      completed: false,
      // dueDate: null,
      // category: [],
      // priority: "low",
      createdAt: new Date().toISOString(),
    },
  ],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: action.payload.id,
        content: action.payload.content,
        title: action.payload.title,
        completed: false,
        dueDate: null,
        category: [],
        priority: "low",
        createdAt: new Date().toISOString(),
      };
      state.push(newTodo);
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

export const { addTodo, toggleTodo, deleteTodo, updateContent, updateTitle } =
  todoSlice.actions;

export default todoSlice.reducer;

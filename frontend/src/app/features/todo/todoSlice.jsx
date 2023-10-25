import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: { currentTodo: null },
  reducers: {
    setCurrentTodo: (state, action) => {
      state.currentTodo = action.payload;
    },
    updateCurrentTodo: (state, action) => {
      state.currentTodo = {
        ...state.currentTodo,
        ...action.payload,
      };
    },
    clearCurrentTodo: (state) => {
      state.currentTodo = null;
    },
  },
});

export const { setCurrentTodo, clearCurrentTodo } = todoSlice.actions;

export default todoSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  columns: [],
  currentTodo: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
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
    setTodo: (state, action) => {
      state.columns = action.payload;
    },
    addTodo: (state, action) => {
      const { columnId, todo } = action.payload;
      const column = state.columns.find((col) => col.id === columnId);
      if (column) {
        column.todos.push(todo);
      }
    },
    removeTodo: (state, action) => {
      const { columnId, todoId } = action.payload;
      const column = state.columns.find((col) => col.id === columnId);
      if (column) {
        column.todos = column.todos.filter((todo) => todo._id !== todoId);
      }
    },
    moveTodo: (state, action) => {
      const { sourceColumnId, destinationColumnId, todoId } = action.payload;
      const sourceColumn = state.columns.find(
        (col) => col.id === sourceColumnId
      );
      const destinationColumn = state.columns.find(
        (col) => col.id === destinationColumnId
      );
      if (sourceColumn && destinationColumn) {
        const todoIndex = sourceColumn.todos.findIndex(
          (todo) => todo._id === todoId
        );
        if (todoIndex !== -1) {
          const [todo] = sourceColumn.todos.splice(todoIndex, 1);
          destinationColumn.todos.push(todo);
        }
      }
    },
    updateTodo: (state, action) => {
      const { todoId, updatedTodo } = action.payload;
      state.columns = state.columns.map((column) => {
        const updatedTodos = column.todos.map((todo) => {
          if (todo._id === todoId) {
            return { ...todo, ...updatedTodo };
          }
          return todo;
        });
        return { ...column, todos: updatedTodos };
      });
    },
  },
});

export const {
  setCurrentTodo,
  updateCurrentTodo,
  clearCurrentTodo,
  setTodo,
  addTodo,
  removeTodo,
  moveTodo,
  updateTodo,
} = todoSlice.actions;

export default todoSlice.reducer;

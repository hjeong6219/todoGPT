import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: [
    {
      todoId: "",
      chatHistory: [],
    },
  ],
  reducers: {
    addChat: (state, action) => {
      const newChat = {
        todoId: action.payload.todoId,
        chatHistory: action.payload.chatHistory,
      };
      state.push(newChat);
    },
    updateChatHistory: (state, action) => {
      const chat = state.find((chat) => chat.todoId === action.payload.todoId);
      if (chat) {
        chat.chatHistory = action.payload.chatHistory;
      }
    },
    deleteChat: (state, action) => {
      return state.filter((chat) => chat.todoId !== action.payload.todoId);
    },
  },
});

export const { addChat, updateChatHistory, deleteChat } = chatSlice.actions;

export default chatSlice.reducer;

const { createSlice } = require("@reduxjs/toolkit");

const messageSlice = createSlice({
  name: "message",
  initialState: [
    {
      content: [],
      sender: "",
    },
  ],
  reducers: {
    addMessage: (state, action) => {
      const newMessage = {
        chatId: action.payload.chatId,
        message: action.payload.message,
      };
      state.push(newMessage);
    },
    updateMessage: (state, action) => {
      const message = state.find(
        (message) => message.chatId === action.payload.chatId
      );
      if (message) {
        message.message = action.payload.message;
      }
    },
    deleteMessage: (state, action) => {
      return state.filter(
        (message) => message.chatId !== action.payload.chatId
      );
    },
  },
});

export const { addMessage, updateMessage, deleteMessage } =
  messageSlice.actions;

export default messageSlice.reducer;

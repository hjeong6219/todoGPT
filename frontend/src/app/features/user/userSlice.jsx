import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
  email: null,
  fullName: null,
  createdAt: null,
  lastLogin: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload._id;
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      // state.createdAt = action.payload.createdAt;
      // state.lastLogin = action.payload.lastLogin;
    },
    clearUser: (state) => {
      state._id = null;
      state.email = null;
      // state.createdAt = null;
      // state.lastLogin = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;

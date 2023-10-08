import { configureStore } from "@reduxjs/toolkit";
import { todosApi } from "./features/todo/todosApi";
import { usersApi } from "./features/todo/usersApi";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    [todosApi.reducerPath]: todosApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware, usersApi.middleware),
});

setupListeners(store.dispatch);

export default store;

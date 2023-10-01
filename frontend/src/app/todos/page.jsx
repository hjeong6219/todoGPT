"use client";

import React from "react";
import TodoList from "../components/TodoList";
import { Provider } from "react-redux";
import { store } from "../store";
import Header from "../components/Header";

function TodosPage() {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
}

export default TodosPage;

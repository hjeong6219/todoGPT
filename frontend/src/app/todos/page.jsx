"use client";

import React, { useState, useEffect } from "react";
import TodoList from "../components/TodoList";
import { Provider } from "react-redux";
import { store } from "../store";

function TodosPage() {
  const [user, setUser] = useState(null);
  const [authStatus, setAuthStatus] = useState(null);
  console.log(user);

  useEffect(() => {
    const getKindeSession = async () => {
      const res = await fetch("/api/kindeSession");
      const data = await res.json();
      setUser(data.user);
      setAuthStatus(data.authenticated);
    };

    getKindeSession();
  }, []);

  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
}

export default TodosPage;

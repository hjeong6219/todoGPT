// import { Provider } from "react-redux";
// import AppLayout from "./pages/AppLayout";
// import store from "./store";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import TodoPage from "./pages/TodoPage";
// import CalendarPage from "./pages/CalendarPage";
// import Header from "./components/Header";

import { useQuery } from "@tanstack/react-query";

// function App() {
//   return (
//     <Provider store={store}>
//       <BrowserRouter>
//         <Header />
//         <Routes>
//           <Route path="/" element={<TodoPage />} />
//           <Route path="/todo" element={<TodoPage />} />
//           <Route path="/calendar" element={<CalendarPage />} />
//           <Route path="/settings" element={<AppLayout />} />
//           <Route path="/login" element={<AppLayout />} />
//           <Route path="/forgot-password" element={<AppLayout />} />
//           <Route path="/reset-password" element={<AppLayout />} />
//           <Route path="/404" element={<AppLayout />} />
//           <Route path="*" element={<AppLayout />} />
//         </Routes>
//       </BrowserRouter>
//     </Provider>
//   );
// }

// export default App;

import { useState } from "react";

import { useMutation } from "@tanstack/react-query";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const { isLoading, error, data } = useQuery({
    queryKey: ["todos"],
    queryFn: () =>
      fetch("http://localhost:5050/api/todos").then((res) => res.json()),
  });

  const addTodoMutation = useMutation((newTodo) =>
    fetch("http://localhost:5050/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTodo }),
    }).then((res) => res.json())
  );

  const handleAddTodo = async () => {
    await addTodoMutation.mutateAsync(newTodo);
  };
  console.log(data);

  return (
    <div>
      <h1>App</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      {data ? data["todos"].map((i, j) => <div>{i["title"]}</div>) : null}
    </div>
  );
}

export default App;

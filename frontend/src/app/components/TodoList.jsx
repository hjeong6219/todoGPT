import Post from "./Post";
import Editor from "./Editor";
import { useState, useEffect } from "react";
import {
  useGetTodoByIdQuery,
  useGetTodosQuery,
} from "../features/todo/todosApi";

// async function fetchTodos() {
//   const res = await fetch("http://localhost:5000/todos");
//   return res.json();
// }

function TodoList() {
  const { data: todoList, isLoading } = useGetTodosQuery();
  // const todoList = fetchTodos();
  const [todos, setTodos] = useState(todoList);
  const [showEditor, setShowEditor] = useState(false);
  // const todoList = useSelector((state) => state.todo);

  useEffect(() => {
    setTodos(todoList);
  }, [todoList]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {showEditor && <Editor />}
      <div className={`${showEditor && "blur-sm"} w-full h-screen`}>
        <div>
          <input
            className="block w-2/5 h-12 px-4 mx-auto mt-5 shadow-md focus:outline-none focus:ring focus:ring-stone-200 bg-gradient-to-r from-stone-100 to-stone-200 text-stone-900 rounded-3xl"
            placeholder="What would you like to do?"
          />
          <button onClick={() => setShowEditor(!showEditor)}>Show form</button>
          <div className="grid w-auto grid-cols-3 gap-4 p-4 mt-4 h-76 bg-stone-100">
            {todoList.map((todo) => (
              <Post key={todo._id} todo={todo} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoList;

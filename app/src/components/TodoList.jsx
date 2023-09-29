import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Post from "./Post";
import Editor from "./Editor";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const todoList = useSelector((state) => state.todo);

  useEffect(() => {
    setTodos(todoList);
  }, [todoList]);

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
            {todos.map((todo) => (
              <Post
                key={todo.id}
                todo={todo}
                setTodos={setTodos}
                todos={todos}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoList;

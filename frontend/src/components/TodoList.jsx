import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TodoEntry from "./TodoEntry";
import TodoInput from "./TodoInput";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const todoList = useSelector((state) => state.todo);

  useEffect(() => {
    setTodos(todoList);
  }, [todoList]);

  return (
    <div className="w-full h-screen">
      <input
        className="block w-2/5 h-12 px-4 mx-auto mt-5 shadow-md focus:outline-none focus:ring focus:ring-stone-200 bg-gradient-to-r from-stone-100 to-stone-200 text-stone-900 rounded-3xl"
        placeholder="What would you like to do?"
      />
      <div className="grid w-auto grid-cols-3 gap-4 p-4 mt-4 h-76 bg-stone-100">
        {showEditor ? (
          <TodoInput />
        ) : (
          todos.map((todo) => (
            <TodoEntry
              key={todo.id}
              todo={todo}
              setTodos={setTodos}
              todos={todos}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TodoList;

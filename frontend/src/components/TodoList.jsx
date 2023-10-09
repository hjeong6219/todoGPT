"use client";
import Post from "./Post";
import Editor from "./Editor";
import {
  useAddTodoMutation,
  useGetTodoByIdQuery,
} from "../app/features/todo/todosApi";
import { useEffect, useState } from "react";
import { useGetUserByEmailQuery } from "../app/features/todo/usersApi";
import { redirect } from "next/navigation";
import TodoInput from "./TodoInput";

function TodoList({ user }) {
  const {
    data: userData,
    isLoading: isLoadingUser,
    error,
  } = useGetUserByEmailQuery(user.email);

  useEffect(() => {
    if (error?.data?.message == "User does not exist.") {
      const fullName = user.given_name + " " + user.family_name;
      redirect(
        "/auth-callback?origin=todos&userEmail=" +
          user.email +
          "&userName=" +
          fullName
      );
    }
  }, [userData, error]);

  const { data: todoList, isLoading: isLoadingTodos } = useGetTodoByIdQuery(
    userData?._id
  );

  const [showEditor, setShowEditor] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");
  const [currentTodo, setCurrentTodo] = useState(null);

  const [addTodo, { data: addTodoData, error: addTodoError }] =
    useAddTodoMutation();

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      try {
        const response = await addTodo({
          userId: userData._id,
          title: todoTitle,
          userEmail: userData.email,
        });
        setCurrentTodo(response.data);
        setShowEditor(true);
      } catch (error) {
        console.error("Failed to add todo");
      }
    }
  };

  if (isLoadingUser) {
    return <div>Loading User Data...</div>;
  }

  if (isLoadingTodos) return <div>Loading Todos...</div>;

  return (
    <>
      {showEditor && (
        <Editor todo={currentTodo} setShowEditor={setShowEditor} />
      )}
      {userData && (
        <div className={`${showEditor && "blur-sm"} w-full h-screen`}>
          <div>
            <TodoInput
              setTodoTitle={setTodoTitle}
              handleKeyDown={handleKeyDown}
            />
            {todoList && (
              <div className="grid w-auto grid-cols-3 gap-4 p-4 mt-4 h-76 bg-stone-100">
                {todoList.map((todo) => (
                  <Post key={todo._id} todo={todo} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default TodoList;

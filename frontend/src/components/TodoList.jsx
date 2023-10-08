"use client";
import Post from "./Post";
import Editor from "./Editor";
import {
  useGetTodoByIdQuery,
  useGetTodosQuery,
} from "../app/features/todo/todosApi";
import { useEffect, useState } from "react";
import {
  useAddUserMutation,
  useGetUserByEmailQuery,
} from "../app/features/todo/usersApi";
import { redirect } from "next/navigation";

function TodoList({ user }) {
  const {
    data: userExists,
    isLoading: isLoadingUser,
    error,
  } = useGetUserByEmailQuery(user.email);

  const [addUser, { isLoading: isLoadingUserAdd, error: errorUserAdd }] =
    useAddUserMutation();

  console.log(error);

  useEffect(() => {
    if (error?.data?.message == "User does not exist." && userExists == null) {
      const fullName = user.given_name + " " + user.family_name;
      addUser({ email: user.email, fullName: fullName });
      redirect("/todos");
    }
  }, [user.email, user.given_name, user.family_name, addUser, error]);

  const { data: todoList, isLoading } = useGetTodosQuery();

  const [showEditor, setShowEditor] = useState(false);

  const [todos, setTodos] = useState(null);

  useEffect(() => {
    if (userExists) {
      setTodos(todoList);
    }
  }, [todoList, userExists]);

  if (isLoadingUser) {
    return <div>Loading User Data...</div>;
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {showEditor && <Editor />}
      {userExists && (
        <div className={`${showEditor && "blur-sm"} w-full h-screen`}>
          <div>
            <input
              className="block w-2/5 h-12 px-4 mx-auto mt-5 shadow-md focus:outline-none focus:ring focus:ring-stone-200 bg-gradient-to-r from-stone-100 to-stone-200 text-stone-900 rounded-3xl"
              placeholder="What would you like to do?"
            />
            <button onClick={() => setShowEditor(!showEditor)}>
              Show form
            </button>
            <div className="grid w-auto grid-cols-3 gap-4 p-4 mt-4 h-76 bg-stone-100">
              {todoList.map((todo) => (
                <Post key={todo._id} todo={todo} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TodoList;

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
import { useAddChatMutation } from "@/app/features/chat/chatApi";
import Chat from "./chat/Chat";

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
  const [currentChat, setCurrentChat] = useState(null);

  const [addTodo, { data: addTodoData, error: addTodoError }] =
    useAddTodoMutation();

  const [addChat, { data: addChatData, error: addChatError }] =
    useAddChatMutation();

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      try {
        const addTodoResponse = await addTodo({
          userId: userData._id,
          title: todoTitle,
          userEmail: userData.email,
        });
        setCurrentTodo(addTodoResponse.data);
        try {
          const addChatResponse = await addChat({
            todoId: addTodoResponse.data._id,
            sender: "ai",
            content: "Hi there! How can I help you?",
          });
          setCurrentChat(addChatResponse.data);
          setShowEditor(true);
        } catch (error) {
          console.error("Failed to add chat");
        }
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
        <div className="absolute inset-x-0 w-4/5 max-w-screen-xl mx-auto shadow-lg border-stone-400 rounded-xl bg-stone-100 h-3/5 ">
          <Editor todo={currentTodo} setShowEditor={setShowEditor} />
          <Chat chatId={currentChat._id} />
        </div>
      )}
      {userData && (
        <div className={`${showEditor && "blur-sm"} w-full h-max`}>
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

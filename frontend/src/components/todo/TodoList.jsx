"use client";
import Post from "./Post";
import {
  useAddTodoMutation,
  useGetTodoByIdQuery,
  useUpdateTodoMutation,
} from "../../app/features/todo/todosApi";
import { useEffect, useState } from "react";
import { useGetUserByEmailQuery } from "../../app/features/todo/usersApi";
import { redirect } from "next/navigation";
import TodoInput from "./TodoInput";
import { useAddChatMutation } from "@/app/features/chat/chatApi";
import Chat from "../chat/Chat";
import { HiOutlineSave, HiX } from "react-icons/hi";
import TodoContent from "./TodoContent";

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
    userData?._id,
    {
      skip: !userData,
    }
  );

  const [showEditor, setShowEditor] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoContent, setTodoContent] = useState("");
  const [currentTodo, setCurrentTodo] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);

  const [addTodo, { data: addTodoData, error: addTodoError }] =
    useAddTodoMutation();

  const [addChat, { data: addChatData, error: addChatError }] =
    useAddChatMutation();

  const [updateTodo, { data: updateTodoData, error: updateTodoError }] =
    useUpdateTodoMutation();

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      try {
        const addTodoResponse = await addTodo({
          userId: userData._id,
          title: todoTitle,
          userEmail: userData.email,
        });
        setCurrentTodo(addTodoData);
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

  // const handleTitleChange = (event) => {
  //   event.preventDefault();
  //   setTodoTitle(event.target.value);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateTodo({
        ...addTodoData,
        userId: userData?._id,
        title: todoTitle,
        content: todoContent,
      });
    } catch (error) {
      console.error("Failed to update todo");
    }
  };

  if (isLoadingUser) {
    return <div>Loading User Data...</div>;
  }

  if (isLoadingTodos) return <div>Loading Todos...</div>;

  return (
    <>
      {showEditor && (
        <div className="absolute left-0 right-0 z-30 items-center justify-center w-4/5 p-4 mx-auto shadow-lg max-w-screen-2xl border-stone-400 rounded-xl bg-stone-100 h-3/5 ">
          <div className="relative w-full h-full">
            <div className="flex">
              <textarea
                className="relative z-50 flex-1 w-full h-12 col-span-7 px-4 py-2 text-2xl border-b-2 resize-none shadow-top-lg rounded-xl no-scrollbar focus:outline-none bg-stone-200 text-stone-900"
                type="text"
                value={todoTitle}
                onChange={(event) => setTodoTitle(event.target.value)}
                placeholder="Enter your title here"
              />
              <button
                type="submit"
                className="px-2 ml-2 text-stone-400 focus:outline-none bg-stone-100 hover:text-stone-700"
                onClick={handleSubmit}
              >
                <HiOutlineSave />
              </button>
              <button
                type="reset"
                className="px-2 ml-2 text-stone-400 focus:outline-none bg-stone-100 hover:text-stone-700"
                onClick={() => setShowEditor(false)}
              >
                <HiX />
              </button>
            </div>
            <div className="relative flex items-stretch h-full pt-2 pb-12">
              <TodoContent
                todoContent={todoContent}
                setTodoContent={setTodoContent}
              />
              <Chat chatId={currentChat._id} />
            </div>
          </div>
        </div>
      )}
      {userData && (
        <div className={`${showEditor && "blur-lg"} w-full h-max`}>
          <div>
            <TodoInput
              setTodoTitle={setTodoTitle}
              handleKeyDown={handleKeyDown}
            />
            {todoList.length > 0 ? (
              <div className="grid w-auto max-w-screen-xl grid-cols-3 gap-4 p-4 mx-auto mt-4 shadow-lg rounded-xl h-76 bg-stone-100">
                {todoList.map((todo) => (
                  <Post key={todo._id} todo={todo} />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}

export default TodoList;

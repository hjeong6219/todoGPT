"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import {
  useAddTodoMutation,
  useGetTodosByUserIdQuery,
} from "../../app/features/todo/todosApi";
import { useGetUserByEmailQuery } from "../../app/features/user/usersApi";
import { useAddChatMutation } from "@/app/features/chat/chatApi";

import TodoInput from "./TodoInput";
import Header from "../Header";
import TodoWrapper from "./TodoWrapper";
import Post from "./Post";
import KanbanBoard from "../dashboard/KanbanBoard";

function TodoList({ user }) {
  const {
    data: userData,
    isLoading: isLoadingUser,
    error,
  } = useGetUserByEmailQuery("jhn12212@gmail.com");

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

  const { data: todoData, isLoading: isLoadingTodos } =
    useGetTodosByUserIdQuery(userData?._id, {
      skip: !userData,
    });

  const [showTodo, setShowTodo] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [todoTitle, setTodoTitle] = useState("");

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
          setShowTodo(true);
        } catch (error) {
          console.error("Failed to add chat");
        }
      } catch (error) {
        console.error("Failed to add todo");
      }
    }
  };

  const handleShowTodo = (todo) => {
    setCurrentTodo(todo);
    setShowTodo(true);
  };

  if (isLoadingUser) {
    return <div>Loading User Data...</div>;
  }

  if (isLoadingTodos) return <div>Loading Todos...</div>;

  console.log(todoData);

  return (
    <>
      {todoData ? (
        <KanbanBoard todos={todoData} handleShowTodo={handleShowTodo} />
      ) : null}
      {/* {showTodo && <TodoWrapper setShowTodo={setShowTodo} />} */}
    </>
    //   {userData && (
    //     <section
    //       className={`${
    //         showTodo && "blur-lg"
    //       } w-full mx-auto max-w-screen-xl h-max`}
    //     >
    //       <TodoInput
    //         setTodoTitle={setTodoTitle}
    //         handleKeyDown={handleKeyDown}
    //       />
    //       {todoData.length > 0 ? (
    //         <div className="grid w-auto gap-4 p-4 mx-auto mt-4 h-fit ">
    //           {todoData.map((todo) => (
    //             <Post
    //               key={todo._id}
    //               todo={todo}
    //               handleShowTodo={handleShowTodo}
    //             />
    //           ))}
    //         </div>
    //       ) : null}
    //     </section>
    //   )}
    // </>
  );
}

export default TodoList;

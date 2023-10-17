import { useState } from "react";
import {
  useGetTodosByIdQuery,
  useUpdateTodoMutation,
} from "@/app/features/todo/todosApi";

import Chat from "../chat/Chat";
import EditorButton from "./EditorButton";
import Title from "./Title";
import TodoContent from "./TodoContent";

function TodoWrapper({ todo, setShowTodo }) {
  const { data: todoData, isLoading: isLoadingTodo } = useGetTodosByIdQuery(
    todo?._id,
    { skip: !todo }
  );

  const [updateTodo, { data: updateTodoData, error: updateTodoError }] =
    useUpdateTodoMutation();

  const handleUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = {
      title: formData.get("title"),
      content: formData.get("content"),
    };
    try {
      await updateTodo({
        ...todoData,
        title: formData.get("title"),
        content: formData.get("content"),
      });
    } catch (error) {
      console.error("Failed to update todo");
    }
  };

  function handleClose() {
    setShowTodo(false);
  }

  if (isLoadingTodo) {
    return <div>Loading...</div>;
  }

  return (
    <section className="absolute left-0 right-0 z-30 items-center justify-center w-4/5 p-4 mx-auto my-2 shadow-lg max-w-screen-2xl border-stone-400 rounded-xl bg-stone-100 h-3/5 ">
      {todoData && (
        <form className="relative w-full h-full" onSubmit={handleUpdate}>
          <div className="sticky w-full">
            <div className="flex items-center justify-center bg-stone-200 rounded-xl">
              <Title todoTitle={todoData.title} />
              <EditorButton type="submit" />
              <EditorButton type="close" onClick={handleClose} />
            </div>
          </div>
          <div className="relative flex items-stretch h-full pt-2 pb-12">
            <TodoContent todo={todoData} />
            <Chat todoId={todoData._id} />
          </div>
        </form>
      )}
    </section>
  );
}

export default TodoWrapper;

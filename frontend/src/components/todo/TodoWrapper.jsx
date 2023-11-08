import { useState } from "react";
import {
  useGetTodosByIdQuery,
  useUpdateTodoMutation,
} from "@/app/features/todo/todosApi";

import Chat from "../chat/Chat";
import EditorButton from "./EditorButton";
import Title from "./Title";
import TodoContent from "./TodoContent";
import RichTextEditor from "../RichTextEditor";
import { useDispatch, useSelector } from "react-redux";
import { clearCurrentTodo } from "@/app/features/todo/todoSlice";

function TodoWrapper({ setIsShowModal }) {
  const dispatch = useDispatch();
  const currentTodo = useSelector((state) => state.todoSlice.currentTodo);

  const { data: todoData, isLoading: isLoadingTodo } = useGetTodosByIdQuery(
    currentTodo._id,
    { skip: !currentTodo }
  );

  const [updateTodo, { data: updateTodoData, error: updateTodoError }] =
    useUpdateTodoMutation();

  const handleUpdate = async () => {
    try {
      await updateTodo({
        ...currentTodo,
      });
    } catch (error) {
      console.error("Failed to update todo");
    }
  };

  function handleClose() {
    dispatch(clearCurrentTodo());
    setIsShowModal(false);
  }

  // if (isLoadingTodo) {
  //   return <div>Loading...</div>;
  // }

  return (
    <section className="absolute z-30 items-center justify-center w-4/5 py-4 pl-8 pr-4 mx-auto my-2 shadow-lg max-w-screen-2xl border-stone-400 rounded-xl bg-stone-200 h-4/5 ">
      {todoData && (
        <div className="relative w-full h-full">
          <div className="sticky w-full">
            <div className="flex items-center justify-center bg-stone-200 rounded-xl">
              <Title todo={currentTodo} />
              <EditorButton type="submit" onClick={handleUpdate} />
              <EditorButton type="close" onClick={handleClose} />
            </div>
          </div>
          <div className="relative flex items-stretch w-full h-full pt-2 pb-20 mb-12 overflow-y-auto">
            <TodoContent todo={currentTodo} />
            {/* <Chat todoId={currentTodo._id} /> */}
          </div>
        </div>
      )}
    </section>
  );
}

export default TodoWrapper;

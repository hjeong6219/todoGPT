import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../../app/features/todo/todosApi";
import {
  useDeleteChatMutation,
  useGetChatByTodoQuery,
} from "@/app/features/chat/chatApi";
import cn from "@/utilities/cn";
import toast from "react-hot-toast";

import { HiX } from "react-icons/hi";
import { HiOutlinePencilSquare } from "react-icons/hi2";

function Post({ todo, handleShowTodo }) {
  const [updateTodoMutation] = useUpdateTodoMutation();
  const [deleteTodoMutation] = useDeleteTodoMutation();
  const [deleteChatMutation] = useDeleteChatMutation();

  const {
    data: currentChat,
    isLoading,
    isError,
  } = useGetChatByTodoQuery(todo._id);

  const handleCompletion = () => {
    updateTodoMutation({
      ...todo,
      status: todo.status !== "completed" ? "completed" : "notStarted",
    });
    toast.success("Todo updated!");
  };

  const handleDelete = (event) => {
    event.preventDefault();
    deleteTodoMutation(todo._id);
    deleteChatMutation(currentChat[0]._id);
    toast.success("Todo deleted!");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    currentChat && (
      <div className="flex w-full h-12 px-2 text-xl rounded-xl">
        <input
          type="checkbox"
          checked={todo.status === "completed" ? "checked" : ""}
          onChange={handleCompletion}
          className="my-auto mr-2 checkbox-sm checkbox"
        />
        <div
          className={cn({
            "line-through": todo.completed === "completed" ? true : false,
            "w-full py-2 resize-none  focus:outline-none text-stone-900": true,
          })}
        >
          {todo.title}
        </div>
        <button
          type="show"
          className="px-2 text-stone-400 focus:outline-none hover:text-stone-700"
          onClick={() => handleShowTodo(todo)}
        >
          <HiOutlinePencilSquare />
        </button>
        <button
          type="delete"
          className="px-2 text-stone-400 focus:outline-none hover:text-stone-700"
          onClick={handleDelete}
        >
          <HiX />
        </button>
      </div>
    )
  );
}

export default Post;

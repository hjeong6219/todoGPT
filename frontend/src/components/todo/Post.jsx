import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../../app/features/todo/todosApi";
import {
  useDeleteChatMutation,
  useGetChatByTodoQuery,
} from "@/app/features/chat/chatApi";
import cn from "@/utilities/cn";

import { HiX } from "react-icons/hi";
import { HiOutlinePencilSquare } from "react-icons/hi2";

function TodoEntry({ todo, handleShowTodo }) {
  const [updateTodoMutation] = useUpdateTodoMutation();
  const [deleteTodoMutation] = useDeleteTodoMutation();
  const [deleteChatMutation] = useDeleteChatMutation();

  const {
    data: currentChat,
    isLoading,
    isError,
  } = useGetChatByTodoQuery(todo._id);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateTodoMutation({ ...todo, title: title, content: content });
  };

  const handleCompletion = () => {
    updateTodoMutation({ ...todo, completed: !todo.completed });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    deleteTodoMutation(todo._id);
    deleteChatMutation(currentChat[0]._id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const todoCompleted = true;

  return (
    currentChat && (
      <div className="relative z-50 w-4/5 px-4 py-2 mx-auto transition-transform duration-300 ease-in-out transform hover:scale-105 bg-stone-100 blur-none rounded-3xl h-76">
        <div className="flex w-full h-12 px-2 text-xl rounded-xl">
          <input
            type="checkbox"
            checked={todo.completed === true ? "checked" : ""}
            onChange={handleCompletion}
            className="my-auto mr-2 checkbox-sm checkbox"
          />
          {/* <textarea
          className="w-full col-span-7 py-2 resize-none bg-stone-50 focus:outline-none text-stone-900"
          type="text"
          value={todo.title}
          onChange={handleTitleChange}
          placeholder="Enter your title here"
        /> */}
          <div
            className={cn({
              "line-through": todo.completed,
              "w-full py-2 resize-none bg-stone-100 focus:outline-none text-stone-900": true,
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
        {/* <div>
        <textarea
          className="w-full col-span-10 px-2 mt-4 resize-none h-80 rounded-xl scrollbar-hide bg-stone-50 text-stone-900 focus:outline-none"
          type="text"
          value={content}
          onChange={handleContentChange}
          placeholder="Enter your todo here"
        />
      </div> */}
      </div>
    )
  );
}

export default TodoEntry;

import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../../app/features/todo/todosApi";
import { useState } from "react";
import { HiCheck, HiX } from "react-icons/hi";
import {
  useDeleteChatMutation,
  useGetChatByTodoQuery,
} from "@/app/features/chat/chatApi";

function TodoEntry({ todo }) {
  const [content, setContent] = useState(todo.content);
  const [title, setTitle] = useState(todo.title);
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const [updateTodoMutation] = useUpdateTodoMutation();
  const [deleteTodoMutation] = useDeleteTodoMutation();
  const [deleteChatMutation] = useDeleteChatMutation();

  const { data: chat, isLoading, isError } = useGetChatByTodoQuery(todo._id);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateTodoMutation({ ...todo, title: title, content: content });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    deleteTodoMutation(todo._id);
    deleteChatMutation(chat[0]._id);
  };

  return (
    <div className="z-50 w-auto p-4 blur-none bg-stone-50 rounded-3xl h-76">
      <div className="grid w-full h-12 grid-cols-9 px-2 rounded-xl">
        <textarea
          className="w-full col-span-7 py-2 resize-none bg-stone-50 focus:outline-none text-stone-900"
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter your title here"
        />

        <button
          type="submit"
          className="col-span-1 px-2 ml-8 text-stone-400 focus:outline-none hover:text-stone-700"
          onClick={handleSubmit}
        >
          <HiCheck />
        </button>
        <button
          type="reset"
          className="col-span-1 px-2 ml-8 text-stone-400 focus:outline-none hover:text-stone-700"
          onClick={handleDelete}
        >
          <HiX />
        </button>
      </div>
      <div>
        <textarea
          className="w-full col-span-10 px-2 mt-4 resize-none h-80 rounded-xl scrollbar-hide bg-stone-50 text-stone-900 focus:outline-none"
          type="text"
          value={content}
          onChange={handleContentChange}
          placeholder="Enter your todo here"
        />
      </div>
    </div>
  );
}

export default TodoEntry;

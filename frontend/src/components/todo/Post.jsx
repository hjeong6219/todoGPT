import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../../app/features/todo/todosApi";
import { useState } from "react";
import { HiX } from "react-icons/hi";
import {
  useDeleteChatMutation,
  useGetChatByTodoQuery,
} from "@/app/features/chat/chatApi";
import { HiOutlinePencilSquare } from "react-icons/hi2";

function TodoEntry({ todo, handleShowTodo }) {
  // const [content, setContent] = useState();
  // const [title, setTitle] = useState(todo.title);
  // const handleContentChange = (event) => {
  //   setContent(event.target.value);
  // };
  // const handleTitleChange = (event) => {
  //   setTitle(event.target.value);
  // };

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

  const handleDelete = (event) => {
    event.preventDefault();
    deleteTodoMutation(todo._id);
    deleteChatMutation(currentChat[0]._id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    currentChat && (
      <div className="relative z-50 w-4/5 px-4 py-2 mx-auto blur-none bg-stone-50 rounded-3xl h-76">
        <div className="flex w-full h-12 px-2 text-xl rounded-xl">
          {/* <textarea
          className="w-full col-span-7 py-2 resize-none bg-stone-50 focus:outline-none text-stone-900"
          type="text"
          value={todo.title}
          onChange={handleTitleChange}
          placeholder="Enter your title here"
        /> */}
          <div className="w-full py-2 resize-none bg-stone-50 focus:outline-none text-stone-900">
            {todo.title}
          </div>
          <button
            type="submit"
            className="px-2 text-stone-400 focus:outline-none hover:text-stone-700"
            onClick={(event) => handleShowTodo(event, currentChat, todo)}
          >
            <HiOutlinePencilSquare />
          </button>
          <button
            type="reset"
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

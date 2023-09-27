import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteTodo,
  updateContent,
  updateTitle,
} from "../features/todo/todoSlice";
import { HiCheck, HiX } from "react-icons/hi";

function TodoEntry({ todo, todos }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState(todo.content);
  const [title, setTitle] = useState(todo.title);

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleSubmit = (event) => {
    if (content.trim() === "" && title.trim() === "") {
      dispatch(deleteTodo({ id: todo.id }));
    } else if (content.trim() === "" || title.trim() === "") {
      return;
    }
    dispatch(updateTitle({ id: todo.id, title: title }));
    dispatch(updateContent({ id: todo.id, content: content }));
  };

  const handleDelete = (event) => {
    dispatch(deleteTodo({ id: todo.id }));
  };

  return (
    <div className="w-auto p-4 bg-stone-50 rounded-3xl h-76">
      <div className="grid w-full h-12 grid-cols-10 px-2 border-2 rounded-xl border-stone-200">
        <textarea
          className="w-full col-start-1 col-end-8 px-2 py-2 resize-none scrollbar-hide bg-stone-50 focus:outline-none text-stone-900"
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter your title here"
        />

        <button
          type="submit"
          className="col-span-1 px-2 ml-2 text-stone-400 focus:outline-none hover:text-stone-700"
          onClick={handleSubmit}
        >
          <HiCheck />
        </button>
        <button
          type="reset"
          className="col-span-1 px-2 ml-2 text-stone-400 focus:outline-none hover:text-stone-700 "
        >
          <HiX />
        </button>
      </div>
      <div>
        <textarea
          className="w-full col-span-10 px-2 pt-2 mt-4 border-2 resize-none h-80 rounded-xl border-stone-200 scrollbar-hide bg-stone-50 text-stone-900 focus:outline-none"
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

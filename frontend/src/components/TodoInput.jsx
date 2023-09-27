import { useState } from "react";

import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";
import { HiCheck, HiX } from "react-icons/hi";

function TodoInput() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = nanoid();
    if (content.trim()) {
      dispatch(addTodo({ content, title, id }));
      setTitle("");
      setContent("");
    }
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
          className="w-full col-span-10 px-4 pt-2 mt-4 border-2 resize-none border-stone-200 rounded-xl h-80 scrollbar-hide bg-stone-50 text-stone-900 focus:outline-none"
          type="text"
          value={content}
          onChange={handleContentChange}
          placeholder="Enter your todo here"
        />
      </div>
    </div>
  );
}

export default TodoInput;

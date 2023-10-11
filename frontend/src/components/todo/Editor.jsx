"use client";
import { useEffect, useState } from "react";
import { HiCheck, HiX } from "react-icons/hi";

function TodoEditor({ todo, setShowEditor }) {
  const [title, setTitle] = useState(todo.title);
  const [content, setContent] = useState(todo.content);

  useEffect(() => {
    setTitle(todo.title);
    setContent(todo.content);
  }, [todo]);

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="absolute inset-y-0 z-40 items-center w-1/2 h-full m-auto overflow-x-hidden overflow-y-auto bg-stone-50 border-stone-400 focus:outline-none">
      <div className="grid grid-cols-9 border-b-2 border-stone-200">
        <textarea
          className="w-full h-12 col-span-7 px-4 py-2 text-2xl resize-none scrollbar-hide focus:outline-none bg-stone-50 text-stone-900"
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter your title here"
        />

        <button
          type="submit"
          className="col-span-1 px-2 ml-2 text-stone-400 focus:outline-none bg-stone-50 hover:text-stone-700"
          onClick={handleSubmit}
        >
          <HiCheck />
        </button>
        <button
          type="reset"
          className="col-span-1 px-2 ml-2 text-stone-400 focus:outline-none hover:text-stone-700"
          onClick={() => setShowEditor(false)}
        >
          <HiX />
        </button>
      </div>
      <div>
        <textarea
          className="w-full col-span-10 px-4 pt-2 text-xl resize-none h- bg-stone-50 scrollbar-hide text-stone-900 focus:outline-none"
          type="text"
          value={content}
          onChange={handleContentChange}
          placeholder="Enter your todo here"
        />
      </div>
    </div>
  );
}

export default TodoEditor;

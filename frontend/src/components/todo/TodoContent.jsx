"use client";

import { useEffect } from "react";

function TodoContent({ todoContent, setTodoContent }) {
  const handleContentChange = (event) => {
    setTodoContent(event.target.value);
  };

  return (
    <div className="left-0 z-40 flex-col items-center w-1/2 h-full pb-6 mr-2 shadow-lg rounded-xl bg-stone-50 focus:outline-none">
      <textarea
        className="flex-1 w-full h-full col-span-10 px-4 pt-2 overflow-x-hidden overflow-y-auto text-xl resize-none rounded-xl no-scrollbar bg-stone-50 scrollbar-hide text-stone-900 focus:outline-none"
        type="text"
        value={todoContent}
        onChange={handleContentChange}
        placeholder="Enter your todo here"
      />
    </div>
  );
}

export default TodoContent;

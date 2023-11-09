"use client";
import { useRef, useState } from "react";
import RichTextEditor from "../RichTextEditor";

function TodoContent({ todo, isMenuOpen }) {
  return (
    <div className="relative flex items-stretch w-full h-full pt-2 mb-12 overflow-y-auto">
      <div
        className={`z-40 rounded-t-sm shadow-lg pb-16  bg-stone-50 focus:outline-none flex-grow  ${
          isMenuOpen ? "w-4/5 rounded-bl-xl" : "w-full rounded-b-xl"
        }`}
      >
        <RichTextEditor
          className="w-full h-full px-4 pt-4 overflow-y-auto text-xl rounded-sm resize-none no-scrollbar bg-stone-50 focus:outline-none"
          name="content"
          todo={todo}
          // setContent={setContent}
        />
      </div>
      {isMenuOpen && (
        <div
          className={`z-50 relative right-0  w-1/5 h-full overflow-y-hidden rounded-br-xl shadow-lg no-scrollbar bg-stone-50 focus:outline-nonetransform transition-transform  ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        ></div>
      )}
      {/* <Chat todoId={currentTodo._id} /> */}
    </div>
  );
}

export default TodoContent;

"use client";
import { useRef, useState } from "react";
import RichTextEditor from "./RichTextEditor";
import { Editor } from "@tiptap/react";
import EditorMenu from "./EditorMenu";

function TodoContent({ todo, isMenuOpen }) {
  return (
    <div className="relative flex items-stretch w-full h-full pt-2 mb-12 overflow-y-auto">
      <div
        className={`z-40 rounded-t-sm shadow-lg pb-16  bg-stone-50 focus:outline-none flex-grow  ${
          isMenuOpen ? "w-3/5 2xl:w-3/4 rounded-bl-xl" : "w-full rounded-b-xl"
        }`}
      >
        <RichTextEditor
          className="w-full h-full px-4 pt-4 overflow-y-auto text-xl rounded-sm resize-none no-scrollbar bg-stone-50 focus:outline-none"
          name="content"
          todo={todo}
          // setContent={setContent}
        />
      </div>
      {isMenuOpen && <EditorMenu isMenuOpen={isMenuOpen} todo={todo} />}
      {/* <Chat todoId={currentTodo._id} /> */}
    </div>
  );
}

export default TodoContent;

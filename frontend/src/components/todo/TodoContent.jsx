"use client";
import { useRef, useState } from "react";
import RichTextEditor from "../RichTextEditor";

function TodoContent({ todo }) {
  return (
    <div className="z-40 items-stretch w-full h-full mr-2 overflow-y-auto shadow-lg rounded-xl no-scrollbar bg-stone-50 focus:outline-none">
      <RichTextEditor
        className="relative h-full px-8 pt-8 text-xl resize-none rounded-xl bg-stone-50 focus:outline-none"
        name="content"
        todo={todo}

        // setContent={setContent}
      />
    </div>
  );
}

export default TodoContent;

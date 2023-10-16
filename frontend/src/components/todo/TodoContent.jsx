"use client";
import { useRef, useState } from "react";
import RichTextEditor from "../RichTextEditor";

function TodoContent({ todo }) {
  return (
    <div className="left-0 z-40 flex-col items-center w-1/2 h-full pb-6 mr-2 shadow-lg rounded-xl bg-stone-50 focus:outline-none">
      <RichTextEditor
        className="w-full h-full col-span-10 px-4 pt-2 overflow-x-hidden overflow-y-auto text-xl resize-none rounded-xl no-scrollbar bg-stone-50 scrollbar-hide focus:outline-none"
        name="content"
        todo={todo}

        // setContent={setContent}
      />
    </div>
  );
}

export default TodoContent;

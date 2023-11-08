"use client";
import { useRef, useState } from "react";
import RichTextEditor from "../RichTextEditor";

function TodoContent({ todo }) {
  return (
    <div className="z-40 items-stretch w-full h-full overflow-y-auto rounded-sm shadow-lg no-scrollbar bg-stone-50 focus:outline-none">
      <RichTextEditor
        className="relative h-full px-6 pt-4 text-xl rounded-sm resize-none bg-stone-50 focus:outline-none"
        name="content"
        todo={todo}

        // setContent={setContent}
      />
    </div>
  );
}

export default TodoContent;

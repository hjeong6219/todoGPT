"use client";
import "../styles/tiptap.scss";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  useGetTodosByIdQuery,
  useUpdateTodoMutation,
  useUpdateTodoWithAiMutation,
} from "@/app/features/todo/todosApi";
import { setCurrentTodo } from "@/app/features/todo/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { chatCompletion } from "@/utilities/openAI";
import { Extension } from "@tiptap/core";

function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

const RichTextEditor = ({ className }) => {
  const [updateTodo, { data: updateTodoData, error: updateTodoError }] =
    useUpdateTodoMutation();

  const dispatch = useDispatch();
  const currentTodo = useSelector((state) => state.todoSlice.currentTodo);

  const [inputValue, setInputValue] = useState("");

  const [debouncedContent, setDebouncedContent] = useState(currentTodo.content);

  // Debounced API update function
  const debouncedUpdateTodo = useCallback(
    debounce((content) => {
      updateTodo({
        ...currentTodo,
        content,
      });
      dispatch(setCurrentTodo({ ...currentTodo, content: content }));
    }, 2000),
    [currentTodo, updateTodo, dispatch]
  );

  useEffect(() => {
    if (debouncedContent !== currentTodo.content) {
      debouncedUpdateTodo(debouncedContent);
    }
  }, [debouncedContent, debouncedUpdateTodo]);

  const CustomKeyboardShortcuts = Extension.create({
    name: "customKeyboardShortcuts",

    addKeyboardShortcuts() {
      return {
        "ctrl-alt-a": async () => {
          chatCompletion(this.editor, setDebouncedContent);
        },
      };
    },
    // keep the logic below for future reference when trying to use the keydown event vs shortcut
    // addKeyboardShortcuts() {
    //   return {
    //     "+": () => {
    //   if (lastChar === "+" && event.key === "+") {
    //     // // Stop the default '+' from being entered
    //     // event.preventDefault();
    //     // // Perform a backspace operation
    //     // const { tr } = view.state;
    //     // const backspaceTr = tr.delete(
    //     //   view.state.selection.$from.pos - 1,
    //     //   view.state.selection.$from.pos
    //     // );
    //     // view.dispatch(backspaceTr);
    //     // let htmlContent = view.dom.innerHTML;
    //     // htmlContent = htmlContent.replace(
    //     //   /<br class="ProseMirror-trailingBreak"[^>]*>|<p data-placeholder="[^"]*"[^>]*>.*?<\/p>|<p><\/p>/gis,
    //     //   ""
    //     // );
    //     console.log(this.editor.getHTML());
    //     // console.log(view.state.doc.content.size);
    //     return true;
    //   }
    //   return false;
    // },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      CustomKeyboardShortcuts,
      Link.configure({
        openOnClick: false,
        defaultProtocol: "https",
      }),
      Placeholder.configure({
        placeholder: "Type something...",
      }),
    ],
    content: currentTodo.content,
    onUpdate({ editor }) {
      setDebouncedContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: className,
      },

      // keep the logic below for future reference when trying to use the keydown event vs shortcut
      // handleDOMEvents: {
      //   keydown: (view, event) => {
      //     const lastChar = view.state.doc.textBetween(
      //       view.state.selection.$from.pos - 1,
      //       view.state.selection.$from.pos
      //     );
      //     if (lastChar === "+" && event.key === "+") {
      //       // Stop the default '+' from being entered
      //       event.preventDefault();
      //       // Perform a backspace operation
      //       const { tr } = view.state;
      //       const backspaceTr = tr.delete(
      //         view.state.selection.$from.pos - 1,
      //         view.state.selection.$from.pos
      //       );
      //       view.dispatch(backspaceTr);
      //       let htmlContent = view.dom.innerHTML;
      //       htmlContent = htmlContent.replace(
      //         /<br class="ProseMirror-trailingBreak"[^>]*>|<p data-placeholder="[^"]*"[^>]*>.*?<\/p>|<p><\/p>/gis,
      //         ""
      //       );
      //       chatCompletion(htmlContent, view, setDebouncedContent);
      //       // console.log(view.state.doc.content.size);
      //       return true;
      //     }
      //     return false;
      //   },
      // },
    },
    autofocus: true,
  });

  return (
    <>
      {editor && (
        <BubbleMenu
          tippyOptions={{ duration: 100 }}
          editor={editor}
          className="border-none rounded-md bg-stone-700 text-stone-400 "
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className="px-1 py-2 hover:text-stone-100 active:text-stone-100 "
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className="px-1 py-2 hover:text-stone-100"
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className="px-1 py-2 hover:text-stone-100"
          >
            Strike
          </button>
        </BubbleMenu>
      )}
      <EditorContent
        editor={editor}
        className={"w-full prose prose-sm h-full"}
      />
    </>
  );
};

export default RichTextEditor;

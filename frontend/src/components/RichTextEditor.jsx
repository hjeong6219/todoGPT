"use client";
import "../styles/tiptap.scss";
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  useGetTodosByIdQuery,
  useUpdateTodoMutation,
} from "@/app/features/todo/todosApi";
import { setCurrentTodo } from "@/app/features/todo/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { chatCompletion } from "@/utilities/openAI";
import { Extension } from "@tiptap/core";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Typography from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";
import CharacterCount from "@tiptap/extension-character-count";
import cn from "@/utilities/cn";

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

  const wordLimit = 2000;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TaskList,
      Typography,
      Highlight,
      TaskItem.configure({
        nested: true,
      }),
      CharacterCount.configure({
        limit: wordLimit,
      }),
      CustomKeyboardShortcuts,
      Link.configure({
        openOnClick: false,
        defaultProtocol: "https",
      }),
      Placeholder.configure({
        placeholder:
          "Press ctrl+alt+a to get recommendation from your AI assistant!",
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

  if (!editor) {
    return null;
  }

  return (
    <>
      <BubbleMenu
        tippyOptions={{ duration: 100 }}
        editor={editor}
        className="flex border-none rounded-md bg-stone-50 text-stone-400"
      >
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={cn({
            "px-2 py-1 mx-1 border-stone-700 text-stone-400 hover:text-stone-700 rounded-md border-2 active:text-stone-100 active:bg-stone-700": true,
            "text-stone-100 bg-stone-700  active:text-stone-500 active:bg-stone-100 hover:text-stone-400":
              editor.isActive("heading", { level: 1 }),
          })}
        >
          h1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={cn({
            "px-2 py-1 mx-1 border-stone-700 text-stone-400 hover:text-stone-700 rounded-md border-2 active:text-stone-100 active:bg-stone-700": true,
            "text-stone-100 bg-stone-700  active:text-stone-500 active:bg-stone-100 hover:text-stone-400":
              editor.isActive("heading", { level: 2 }),
          })}
        >
          h2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={cn({
            "px-2 py-1 mx-1 border-stone-700 text-stone-400 hover:text-stone-700 rounded-md border-2 active:text-stone-100 active:bg-stone-700": true,
            "text-stone-100 bg-stone-700  active:text-stone-500 active:bg-stone-100 hover:text-stone-400":
              editor.isActive("heading", { level: 3 }),
          })}
        >
          h3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn({
            "px-2 py-1 mx-1  border-stone-700 text-stone-400 hover:text-stone-700 font-bold rounded-md border-2 active:text-stone-100 active:bg-stone-700": true,
            "text-stone-100 bg-stone-700  active:text-stone-500 active:bg-stone-100 hover:text-stone-400":
              editor.isActive("bold"),
          })}
        >
          bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={cn({
            "px-2 py-1 mx-1 border-stone-700 text-stone-400 hover:text-stone-700 rounded-md border-2 underline active:text-stone-100 active:bg-stone-700": true,
            "text-stone-100 bg-stone-700  active:text-stone-500 active:bg-stone-100 hover:text-stone-400":
              editor.isActive("underline"),
          })}
        >
          underline
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn({
            "px-2 py-1 mx-1 border-stone-700 text-stone-400 hover:text-stone-700 italic rounded-md border-2 active:text-stone-100 active:bg-stone-700": true,
            "text-stone-100 bg-stone-700  active:text-stone-500 active:bg-stone-100 hover:text-stone-400":
              editor.isActive("italic"),
          })}
        >
          italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={cn({
            "px-2 py-1 mx-1 border-stone-700 text-stone-400 hover:text-stone-700 line-through rounded-md border-2 active:text-stone-100 active:bg-stone-700": true,
            "text-stone-100 bg-stone-700  active:text-stone-500 active:bg-stone-100 hover:text-stone-400":
              editor.isActive("strike"),
          })}
        >
          strike
        </button>
        <button
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={cn({
            "px-2 py-1 mx-1 border-stone-700 whitespace-nowrap text-stone-400 hover:text-stone-700 rounded-md border-2 active:text-stone-100 active:bg-stone-700": true,
            "text-stone-100 bg-stone-700  active:text-stone-500 active:bg-stone-100 hover:text-stone-400":
              editor.isActive("taskList"),
          })}
        >
          task list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn({
            "px-2 py-1 mx-1 border-stone-700 text-stone-400 whitespace-nowrap hover:text-stone-700 rounded-md border-2 active:text-stone-100 active:bg-stone-700": true,
            "text-stone-100 bg-stone-700  active:text-stone-500 active:bg-stone-100 hover:text-stone-400":
              editor.isActive("orderedList"),
          })}
        >
          num list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={cn({
            "px-2 py-1 mx-1 border-stone-700 text-stone-400 hover:text-stone-700 rounded-md border-2 active:text-stone-100 active:bg-stone-700": true,
            "text-stone-100 bg-stone-700  active:text-stone-500 active:bg-stone-100 hover:text-stone-400":
              editor.isActive("highlight"),
          })}
        >
          highlight
        </button>
      </BubbleMenu>

      <FloatingMenu
        tippyOptions={{ duration: 100 }}
        editor={editor}
        className="flex mb-16 border-none rounded-md bg-stone-50 text-stone-400"
      >
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={cn({
            "px-2 py-1 mx-1 border-stone-700 text-stone-400 hover:text-stone-700 rounded-md border-2 active:text-stone-100 active:bg-stone-700": true,
            "text-stone-100 bg-stone-700  active:text-stone-500 active:bg-stone-100 hover:text-stone-400":
              editor.isActive("heading", { level: 1 }),
          })}
        >
          h1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={cn({
            "px-2 py-1 mx-1 border-stone-700 text-stone-400 hover:text-stone-700 rounded-md border-2 active:text-stone-100 active:bg-stone-700": true,
            "text-stone-100 bg-stone-700  active:text-stone-500 active:bg-stone-100 hover:text-stone-400":
              editor.isActive("heading", { level: 2 }),
          })}
        >
          h2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={cn({
            "px-2 py-1 mx-1 border-stone-700 text-stone-400 hover:text-stone-700 rounded-md border-2 active:text-stone-100 active:bg-stone-700": true,
            "text-stone-100 bg-stone-700  active:text-stone-500 active:bg-stone-100 hover:text-stone-400":
              editor.isActive("heading", { level: 3 }),
          })}
        >
          h3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn({
            "px-2 py-1 mx-1 border-stone-700 text-stone-400 hover:text-stone-700 font-bold rounded-md border-2 active:text-stone-100 active:bg-stone-700": true,
            "text-stone-100 bg-stone-700  active:text-stone-500 active:bg-stone-100 hover:text-stone-400":
              editor.isActive("bold"),
          })}
        >
          bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={cn({
            "px-2 py-1 mx-1 border-stone-700 text-stone-400 hover:text-stone-700 underline rounded-md border-2 active:text-stone-100 active:bg-stone-700": true,
            "text-stone-100 bg-stone-700  active:text-stone-500 active:bg-stone-100 hover:text-stone-400":
              editor.isActive("underline"),
          })}
        >
          underline
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn({
            "px-2 py-1 mx-1 border-stone-700 text-stone-400 hover:text-stone-700 italic rounded-md border-2 active:text-stone-100 active:bg-stone-700": true,
            "text-stone-100 bg-stone-700  active:text-stone-500 active:bg-stone-100 hover:text-stone-400":
              editor.isActive("italic"),
          })}
        >
          italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={cn({
            "px-2 py-1 mx-1 border-stone-700 text-stone-400 hover:text-stone-700 line-through rounded-md border-2 active:text-stone-100 active:bg-stone-700": true,
            "text-stone-100 bg-stone-700  active:text-stone-500 active:bg-stone-100 hover:text-stone-400":
              editor.isActive("strike"),
          })}
        >
          strike
        </button>
        <button
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={cn({
            "px-2 py-1 mx-1 border-stone-700 text-stone-400 hover:text-stone-700 whitespace-nowrap rounded-md border-2 active:text-stone-100 active:bg-stone-700": true,
            "text-stone-100 bg-stone-700  active:text-stone-500 active:bg-stone-100 hover:text-stone-400":
              editor.isActive("taskList"),
          })}
        >
          task list
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn({
            "px-2 py-1 mx-1 border-stone-700 text-stone-400 whitespace-nowrap hover:text-stone-700 rounded-md border-2 active:text-stone-100 active:bg-stone-700": true,
            "text-stone-100 bg-stone-700  active:text-stone-500 active:bg-stone-100 hover:text-stone-400":
              editor.isActive("orderedList"),
          })}
        >
          num list
        </button>
      </FloatingMenu>

      <EditorContent editor={editor} className="h-full prose max-w-none" />

      <div className="relative bottom-0 w-full h-16 pt-6 pl-2 bg-stone-50 rounded-b-xl character-count text-stone-500">
        {editor.storage.characterCount.characters()}/{wordLimit} characters
        <br />
        {editor.storage.characterCount.words()} words
      </div>
    </>
  );
};

export default RichTextEditor;

"use client";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useUpdateTodoMutation } from "@/app/features/todo/todosApi";

const RichTextEditor = ({ className, todo }) => {
  const [updateTodo, { data: updateTodoData, error: updateTodoError }] =
    useUpdateTodoMutation();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        defaultProtocol: "https",
      }),
      Placeholder.configure({
        placeholder: "Type something...",
      }),
    ],
    content: todo.content,
    onUpdate({ editor }) {
      updateTodo({
        ...todo,
        content: editor.getHTML(),
      });
    },
    editorProps: {
      attributes: {
        class: className,
      },
    },
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
      <EditorContent editor={editor} className={"w-full h-full"} />
    </>
  );
};

export default RichTextEditor;

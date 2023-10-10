"use client";
import {
  useGetChatByTodoQuery,
  useUpdateChatMutation,
} from "@/app/features/chat/chatApi";
import { useState } from "react";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import TextareaAutosize from "react-textarea-autosize";

function ChatInput({ chatId }) {
  // console.log(chatId);
  const [message, setMessage] = useState("");
  const [updateChat, { data: updateChatData, error: updateChatError }] =
    useUpdateChatMutation();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateChat({
        _id: chatId,
        content: message,
        sender: "user",
      });
      setMessage("");
    } catch (err) {
      console.error(err.message);
    }
    console.log(chatId);
  };
  return (
    <form
      className="absolute bottom-0 w-full rounded-xl"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center px-1 py-2 rounded-lg bg-stone-200">
        <TextareaAutosize
          id="chat"
          rows="1"
          maxRows="3"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="block mx-2 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border resize-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Your message..."
        />
        <button
          type="submit"
          className="inline-flex justify-center py-2 pr-1 text-blue-400 rounded-full cursor-pointer "
        >
          <HiOutlinePaperAirplane className="text-3xl" />
        </button>
      </div>
    </form>
  );
}

export default ChatInput;

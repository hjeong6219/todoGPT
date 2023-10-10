"use client";
import { useGetChatByTodoQuery } from "@/app/features/chat/chatApi";
import { HiOutlineFaceSmile } from "react-icons/hi2";

function ChatBubble({ id, sender, content }) {
  return (
    <div
      className={`chat my-8 ${sender === "user" ? "chat-end" : "chat-start"}`}
    >
      <div
        className={`chat-bubble ${
          sender === "user" ? "chat-bubble-accent" : "chat-bubble-info"
        }`}
      >
        {content}
      </div>
    </div>
  );
}

export default ChatBubble;

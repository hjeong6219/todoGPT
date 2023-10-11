"use client";
import ChatInput from "@/components/chat/ChatInput";
import { useGetChatByIdQuery } from "../../app/features/chat/chatApi";
import ChatBubble from "@/components/chat/ChatBubble";
import { useEffect, useRef } from "react";

function Chat({ chatId }) {
  const { data: messages, isLoading, isError } = useGetChatByIdQuery(chatId);

  const chatEndRef = useRef(null);

  // Scroll to bottom of the chat when loaded and new message is added
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching chat data</div>;
  }
  return (
    <>
      <div className="absolute inset-y-0 right-0 z-40 items-center justify-center w-1/2 h-full max-w-screen-xl overflow-x-hidden overflow-y-auto no-scrollbar rounded-xl bg-stone-50 focus:outline-none">
        <div className="h-full pt-4 resize-none max-h-max scrollbar-hide focus:outline-none bg-stone-50 text-stone-900">
          {messages &&
            messages.map((message) => (
              <ChatBubble
                key={message._id}
                sender={message.sender}
                content={message.content}
              />
            ))}
        </div>
      </div>
      <div className="absolute bottom-0 right-0 z-50 items-center justify-center w-1/2 max-w-screen-xl h-fit bg-stone-50 focus:outline-none">
        <ChatInput ref={chatEndRef} chatId={chatId} />
      </div>
    </>
  );
}

export default Chat;

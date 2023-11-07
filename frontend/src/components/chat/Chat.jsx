"use client";
import ChatInput from "@/components/chat/ChatInput";
import { useGetChatByTodoQuery } from "../../app/features/chat/chatApi";
import ChatBubble from "@/components/chat/ChatBubble";
import { useEffect, useRef } from "react";

function Chat({ todoId }) {
  const {
    data: chatData,
    isLoading,
    isError,
  } = useGetChatByTodoQuery(todoId, {
    skip: !todoId,
  });

  const chatEndRef = useRef(null);

  // Scroll to bottom of the chat when loaded and new message is added
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching chat data</div>;
  }
  return (
    <div className="z-40 flex flex-col items-end justify-end w-1/2 h-full max-w-screen-xl ml-2 overflow-hidden shadow-lg rounded-xl bg-stone-50 focus:outline-none">
      <div className="w-full pt-4 overflow-y-auto resize-none no-scrollbar focus:outline-none bg-stone-50 rounded-xl text-stone-900">
        {chatData &&
          chatData[0].messages.map((message) => (
            <ChatBubble
              key={message._id}
              sender={message.sender}
              content={message.content}
            />
          ))}

        <ChatInput ref={chatEndRef} chatId={chatData[0]._id} />
      </div>
    </div>
  );
}

export default Chat;

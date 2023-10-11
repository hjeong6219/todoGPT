"use client";
import ChatInput from "@/components/chat/ChatInput";
import { useGetChatByTodoQuery } from "../features/chat/chatApi";
import ChatBubble from "@/components/chat/ChatBubble";
import { useEffect, useRef } from "react";

function Page() {
  const {
    data: chat,
    isLoading,
    isError,
  } = useGetChatByTodoQuery("65237f11c6758fe1b118185c");

  const chatEndRef = useRef(null);

  // Scroll to bottom of the chat when loaded and new message is added
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching chat data</div>;
  }
  return (
    <div className="absolute inset-0 z-50 items-center justify-center w-2/5 max-w-screen-xl m-auto overflow-x-hidden overflow-y-auto shadow-lg no-scrollbar h-3/5 rounded-xl bg-stone-50 border-stone-400 focus:outline-none">
      <div className="flex h-full ">
        <div className="relative flex items-stretch flex-1 h-full py-2 text-2xl resize-none scrollbar-hide focus:outline-none bg-stone-50 text-stone-900">
          <div>
            {chat &&
              chat[0].messages.map((message) => (
                <ChatBubble
                  key={message._id}
                  sender={message.sender}
                  content={message.content}
                />
              ))}
            <div />
            <ChatInput ref={chatEndRef} chatId={chat[0]._id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

"use client";
import { useGetChatByTodoQuery } from "@/app/features/chat/chatApi";

function Message() {
  const {
    data: chat,
    isLoading,
    isError,
  } = useGetChatByTodoQuery("65237f11c6758fe1b118185c");

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(chat);

  if (isError) {
    return <div>Error fetching chat data</div>;
  }

  return (
    <div>
      {chat &&
        chat[0].messages.map((message) => (
          <div key={message._id}>
            <p>{message.content}</p>
            <p>{message.sender}</p>
          </div>
        ))}
    </div>
  );
}

export default Message;

"use client";
import { useGetChatByTodoQuery } from "@/app/features/chat/chatApi";
import { HiOutlineFaceSmile } from "react-icons/hi2";

function Message() {
  // const {
  //   data: chat,
  //   isLoading,
  //   isError,
  // } = useGetChatByTodoQuery("65237f11c6758fe1b118185c");

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  // console.log(chat);

  // if (isError) {
  //   return <div>Error fetching chat data</div>;
  // }

  return (
    <div className="w-full">
      {/* {chat &&
        chat[0].messages.map((message) => (
          <div key={message._id}>
            <p>{message.content}</p>
            <p>{message.sender}</p>
          </div>
        ))} */}
      <div className="chat chat-start">
        <div className="chat-bubble chat-bubble-accent">
          It's over Anakin, <br />I have the high ground.
        </div>
      </div>
      <div className="chat chat-end">
        <div className="chat-bubble chat-bubble-info">
          You underestimate my power!
        </div>
      </div>
    </div>
  );
}

export default Message;

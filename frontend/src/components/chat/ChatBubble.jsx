function ChatBubble({ sender, content }) {
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

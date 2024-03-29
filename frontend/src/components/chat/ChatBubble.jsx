function ChatBubble({ sender, content }) {
  // Needed to display the messages with line
  const formattedContent = content.replace(/\n/g, "<br>");

  return (
    <div className={`chat ${sender === "user" ? "chat-end" : "chat-start"}`}>
      <div
        className={`chat-bubble  ${
          sender === "user" ? "chat-bubble-accent" : "chat-bubble-info"
        } text-sm lg:text-lg `}
        dangerouslySetInnerHTML={{ __html: formattedContent }}
      />
    </div>
  );
}

export default ChatBubble;

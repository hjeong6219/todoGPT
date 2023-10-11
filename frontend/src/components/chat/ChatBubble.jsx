function ChatBubble({ sender, content }) {
  // Needed to display the messages with line breaks
  const formattedContent = content.replace(/\n/g, "<br>");

  return (
    <div
      className={`chat my-8 ${sender === "user" ? "chat-end" : "chat-start"}`}
    >
      <div
        className={`chat-bubble ${
          sender === "user" ? "chat-bubble-accent" : "chat-bubble-info"
        }`}
        dangerouslySetInnerHTML={{ __html: formattedContent }}
      />
    </div>
  );
}

export default ChatBubble;

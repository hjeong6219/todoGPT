export const ChatContext = createContext({
  chat: {},
  setChat: () => {},
});

export function ChatProvider({ children }) {
  const [chat, setChat] = useState({});

  return (
    <ChatContext.Provider value={{ chat, setChat }}>
      {children}
    </ChatContext.Provider>
  );
}

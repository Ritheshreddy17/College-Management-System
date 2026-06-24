function ChatMessage({ sender, text }) {
  return (
    <div
      className={`mb-4 ${
        sender === "user"
          ? "text-right"
          : "text-left"
      }`}
    >
      <span
        className={`inline-block px-4 py-3 rounded-xl ${
          sender === "user"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        {text}
      </span>
    </div>
  );
}

export default ChatMessage;
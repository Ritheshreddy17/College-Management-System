import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ChatMessage from "../components/ChatMessage";

function AIAssistant() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] =
    useState([
      {
        sender: "bot",
        text: "Hello 👋 I am your College Management AI Assistant.",
      },
    ]);

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages([
      ...messages,
      {
        sender: "user",
        text: message,
      },
      {
        sender: "bot",
        text: "AI integration coming next...",
      },
    ]);

    setMessage("");
  };

  return (
    <MainLayout>
      <div className="bg-white p-6 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold mb-6">
          AI Assistant 🤖
        </h1>

        <div className="h-[500px] border rounded-xl p-4 overflow-y-auto">

          {messages.map(
            (msg, index) => (
              <ChatMessage
                key={index}
                sender={msg.sender}
                text={msg.text}
              />
            )
          )}

        </div>

        <div className="flex gap-3 mt-4">

          <input
            type="text"
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            placeholder="Ask anything..."
            className="flex-1 border rounded-xl px-4 py-3"
          />

          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-6 rounded-xl"
          >
            Send
          </button>

        </div>

      </div>
    </MainLayout>
  );
}

export default AIAssistant;
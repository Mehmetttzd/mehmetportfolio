"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Moon, Sun } from "lucide-react";

type Message = {
  sender: "user" | "bot";
  text: string;
};

export default function ChatSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      // ✅ Call FastAPI backend
      const res = await fetch("http://127.0.0.1:8000/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();
      const botReply: Message = { sender: "bot", text: data.answer };

      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error("Chat API error:", err);
      const botReply: Message = {
        sender: "bot",
        text: "⚠️ Sorry, something went wrong while fetching the answer.",
      };
      setMessages((prev) => [...prev, botReply]);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg hover:scale-110 transition"
      >
        <MessageCircle size={28} />
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className={`fixed top-0 right-0 h-full w-80 flex flex-col z-50 shadow-2xl ${
              darkMode
                ? "bg-gradient-to-b from-gray-900 to-gray-800 text-white"
                : "bg-gradient-to-b from-white to-gray-100 text-gray-900"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
              <h2 className="font-semibold">Ask Me Anything</h2>
              <div className="flex items-center gap-3">
                {/* Dark mode toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[80%] px-4 py-2 rounded-2xl shadow ${
                    msg.sender === "user"
                      ? darkMode
                        ? "bg-emerald-600 text-white self-end ml-auto"
                        : "bg-emerald-500 text-white self-end ml-auto"
                      : darkMode
                      ? "bg-gray-700 text-gray-100"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-300 dark:border-gray-700 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about AI, backend, cloud..."
                className={`flex-1 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none ${
                  darkMode
                    ? "bg-gray-800 text-white placeholder-gray-400"
                    : "bg-white text-gray-900 placeholder-gray-500 border"
                }`}
              />
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-semibold shadow hover:opacity-90 transition"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

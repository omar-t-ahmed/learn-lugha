"use client";

import React, { useState, useEffect } from "react";

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [input, setInput] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Handle Text-to-Speech
  const handleSpeak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  // Handle Speech-to-Text
  const handleListen = () => {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = "ar"; // Set language to Arabic
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsSpeaking(true);
    };

    recognition.onend = () => {
      setIsSpeaking(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setMessages((prevMessages) => [...prevMessages, { text: transcript, isUser: true }]);
      // You can trigger a response here based on the transcript
    };

    recognition.start();
  };

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    setMessages((prevMessages) => [...prevMessages, { text: input, isUser: true }]);
    setInput("");

    // Simulate a bot response (Replace this with actual bot integration)
    setTimeout(() => {
      const botResponse = `Bot response to "${input}"`;
      setMessages((prevMessages) => [...prevMessages, { text: botResponse, isUser: false }]);
      handleSpeak(botResponse);
    }, 1000);
  };

  return (
    <div className="bg-transparent border border-gray-500 rounded-lg w-full max-w-lg p-4 mt-6">
      <div className="p-4 h-60 overflow-y-scroll bg-white rounded-lg">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded ${
              message.isUser ? "bg-blue-500 text-white text-right" : "bg-gray-200 text-black"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="flex p-2 border-t mt-2">
        <input
          type="text"
          className="flex-grow p-2 border border-gray-300 rounded-l-md text-black"  
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-2 rounded-r-md"
        >
          Send
        </button>
      </div>
      <div className="flex p-2 border-t justify-between mt-2">
        <button
          onClick={handleListen}
          className={`p-2 ${isSpeaking ? "bg-red-500" : "bg-green-500"} text-white rounded-md`}
        >
          {isSpeaking ? "Listening..." : "Speak"}
        </button>
        <button
          onClick={() => handleSpeak("How can I help you learn Arabic today?")}
          className="bg-purple-500 text-white p-2 rounded-md"
        >
          Listen
        </button>
      </div>
    </div>
  );
};

export default Chatbot;

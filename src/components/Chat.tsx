"use client";

import React, { useState, useRef, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

const userProfilePic = "/user-pfp-2.jpg"; // Path relative to the public directory
const botProfilePic = "/teacher-pfp-3.jpg"; // Path relative to the public directory

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null); // Track which message is being read
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null); // Reference to the audio element

  // Handle Text-to-Speech
  const handleSpeak = async (text: string, index: number) => {
    try {
      // Stop current audio if playing
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
        setSpeakingIndex(null);
        if (speakingIndex === index) return; // If the same message is clicked again, stop the playback
      }

      const response = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }), // Send the text to the TTS route
      });

      if (!response.ok) {
        throw new Error("TTS request failed");
      }

      const blob = await response.blob(); // Get the audio content as a Blob
      const url = URL.createObjectURL(blob); // Create a URL for the audio content

      const audio = new Audio(url); // Create a new audio element
      audioRef.current = audio; // Set the audio reference

      audio.onplay = () => setSpeakingIndex(index); // Set the index of the message being read
      audio.onended = () => {
        setSpeakingIndex(null); // Clear the index when done speaking
        audioRef.current = null; // Clear the audio reference
      };

      audio.play(); // Play the audio
    } catch (error) {
      console.error("Error during TTS:", error);
    }
  };

  // Initialize Speech Recognition
  const initializeSpeechRecognition = () => {
    if (recognitionRef.current) return;

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = "ar"; // Set language to Arabic
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setMessages((prevMessages) => [...prevMessages, { text: transcript, isUser: true }]);
      handleBotResponse(transcript); // Trigger bot response based on the transcript
    };

    recognitionRef.current = recognition;
  };

  // Toggle Speech-to-Text Listening
  const toggleListening = () => {
    initializeSpeechRecognition();

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    setMessages((prevMessages) => [...prevMessages, { text: input, isUser: true }]);
    setInput("");

    await handleBotResponse(input);
  };

  const handleBotResponse = async (userInput: string) => {
    try {
      setIsThinking(true);
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: userInput }),
      });

      const data = await response.json();
      const botResponse = data.response;

      // Add the bot's response to the messages and immediately trigger playback
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, { text: botResponse, isUser: false }];
        handleSpeak(botResponse, updatedMessages.length - 1); // Trigger the TTS for the new message
        return updatedMessages;
      });
    } catch (error) {
      console.error("Error communicating with OpenAI:", error);
    } finally {
      setIsThinking(false);
    }
  };

  // useEffect to trigger introductory message
  useEffect(() => {
    const introMessage = "Welcome to the lesson! Let's start learning Arabic.";
    setMessages([{ text: introMessage, isUser: false }]);
    handleSpeak(introMessage, 0);
  }, []); // Empty dependency array to ensure it only runs on mount

  return (
    <div className="bg-transparent border border-gray-500 rounded-lg w-full max-w-lg p-4 mt-6">
      <div className="p-4 h-60 overflow-y-scroll bg-white rounded-lg">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 p-2 flex items-center ${
              message.isUser ? "justify-end" : "justify-start"
            }`}
          >
            {!message.isUser && (
              <img
                src={botProfilePic}
                alt="Chatbot"
                className={`w-8 h-8 rounded-full mr-2 transition-all ${
                  speakingIndex === index ? "border-4 border-green-500" : ""
                }`}
              />
            )}
            <div
              className={`inline-block p-2 rounded-lg ${
                message.isUser ? "bg-blue-500 text-white" : "bg-purple-200 text-black"
              }`}
              style={{ maxWidth: "75%" }} // Adjust max-width as needed
            >
              {message.text}
            </div>
            {message.isUser && (
              <img
                src={userProfilePic}
                alt="User"
                className="w-8 h-8 rounded-full ml-2"
              />
            )}
            {!message.isUser && (
              <button
                onClick={() => handleSpeak(message.text, index)}
                className={`ml-2 ${speakingIndex === index ? "text-black" : "text-gray-600 hover:text-gray-800"}`}
                title="Listen to message"
              >
                <i className="fas fa-volume-up"></i>
              </button>
            )}
          </div>
        ))}
        {isThinking && (
          <div className="mb-2 p-2 flex items-center justify-start">
            <img
              src={botProfilePic}
              alt="Chatbot"
              className="w-8 h-8 rounded-full mr-2"
            />
            <div
              className="inline-block p-2 rounded-lg bg-purple-200 text-black"
              style={{ maxWidth: "75%" }}
            >
              <span className="animate-pulse">thinking...</span>
            </div>
          </div>
        )}
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
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 active:bg-blue-700 transition-colors"
        >
          Send
        </button>
      </div>
      <div className="flex p-2 border-t justify-center mt-2">
        <button
          onClick={toggleListening}
          className={`p-2 ${isListening ? "bg-red-500 hover:bg-red-600 active:bg-red-700" : "bg-green-500 hover:bg-green-600 active:bg-green-700"} text-white rounded-md flex items-center transition-colors`}
        >
          <i className={`fas ${isListening ? "fa-microphone-slash" : "fa-microphone"} mr-2`}></i>
          {isListening ? "Stop Speaking" : "Start Speaking"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;

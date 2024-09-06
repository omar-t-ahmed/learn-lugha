"use client";

import React, { useState, useRef, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Image from "next/image";

const userProfilePic = "/arabic-user.png"; // Path relative to the public directory
const botProfilePic = "/arabic-teacher-male.png"; // Path relative to the public directory

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean; translation?: string }[]>([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null); // Track which message is being read
  const [volumeLevel, setVolumeLevel] = useState(0); // State to track the volume level
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null); // Reference to the audio element
  const isSpeakingRef = useRef(false); // To prevent overlapping speech handling
  const isProcessingTTS = useRef(false); // To prevent multiple TTS requests
  const [translatedMessages, setTranslatedMessages] = useState<{ [key: number]: string }>({});
  const [showTranslation, setShowTranslation] = useState<{ [key: number]: boolean }>({}); // Track whether to show translation
  const messageRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Handle Text-to-Speech
  const handleSpeak = async (text: string, index: number) => {
    try {
      console.log("Sending TTS request for text:", text); // Add this log
      if (isProcessingTTS.current) return;
      isProcessingTTS.current = true;
  
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
  
      if (!response.ok) {
        throw new Error("TTS request failed");
      }
  
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.play();
    } catch (error) {
      console.error("Error during TTS:", error);
    } finally {
      isProcessingTTS.current = false;
    }
  };

  // Initialize Speech Recognition
  const initializeSpeechRecognition = () => {
    if (recognitionRef.current) return;

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = "ar";
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
      handleBotResponse(transcript);
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

  // Handle Translate
  const handleTranslate = async (text: string, index: number) => {
    setShowTranslation((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));

    if (translatedMessages[index]) return;

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, targetLanguage: "en" }),
      });

      if (!response.ok) {
        throw new Error("Translation request failed");
      }

      const data = await response.json();
      setTranslatedMessages((prev) => ({
        ...prev,
        [index]: data.translatedText,
      }));
    } catch (error) {
      console.error("Error during translation:", error);
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
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.text !== 'thinking...'));

      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: userInput }),
      });

      const data = await response.json();
      const botResponse = data.response;

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, { text: botResponse, isUser: false }];
        handleSpeak(botResponse, updatedMessages.length - 1);
        return updatedMessages;
      });
    } catch (error) {
      console.error("Error communicating with OpenAI:", error);
    } finally {
      setIsThinking(false);
    }
  };

  useEffect(() => {
    const introMessage = "Welcome to the lesson! Let's start learning Arabic.";
    setMessages([{ text: introMessage, isUser: false }]);
    handleSpeak(introMessage, 0);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center p-4 w-full max-w-screen-xl mx-auto">
      {/* Teacher Profile Picture */}
      <div className="absolute left-5 top-1/3 transform -translate-y-1/3">
        <Image
          src={botProfilePic}
          alt="Chatbot"
          className={`w-40 h-60 rounded-full transition-all ${
            speakingIndex !== null ? `border-8 border-green-500` : ""
          }`}
          style={{
            borderWidth: `${speakingIndex !== null ? (volumeLevel / 256) * 10 : 8}px`,
          }}
        />
      </div>

      {/* User Profile Picture */}
      <div className="absolute right-5 top-1/3 transform -translate-y-1/3">
        {/* <img
          src={userProfilePic}
          alt="User"
          className={`w-45 h-60 rounded-full transition-all duration-300 ${
            isListening ? `transform scale-130 border-8 border-red-500` : ""
          }`}
        /> */}
        <div className="mt-4 flex justify-center">
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex flex-col items-center w-full max-w-5xl mt-6 overflow-y-auto h-80 pr-2 no-scrollbar">
        <div className="w-full px-28">
          {messages.map((message, index) => (
            <div key={index} className={`mb-2`}>
              <div
                className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  ref={(el) => {
                    messageRefs.current[index] = el; // Assign the element to the ref
                  }}
                  className={`inline-block p-3 rounded-lg ${
                    message.isUser ? "bg-blue-500 text-white" : "bg-purple-200 text-black"
                  }`}
                  style={{ maxWidth: "65%", textAlign: "left", wordBreak: "break-word" }}
                >
                  {message.text}
                </div>
                {!message.isUser && (
                  <>
                    <button
                      onClick={() => handleSpeak(message.text, index)}
                      className={`ml-2 ${speakingIndex === index ? "text-black" : "text-gray-600 hover:text-gray-800"}`}
                      title="Listen to message"
                    >
                      <i className="fas fa-volume-up"></i>
                    </button>
                    <button
                      onClick={() => handleTranslate(message.text, index)}
                      className={`ml-2 text-gray-600 hover:text-gray-800`}
                      title="Translate message"
                    >
                      <i className="fas fa-language"></i>
                    </button>
                  </>
                )}
              </div>
              {showTranslation[index] && translatedMessages[index] && (
                <div
                  className="p-2 bg-purple-100 rounded-lg text-gray-500"
                  style={{
                    width: messageRefs.current[index]?.offsetWidth, // Match width to Arabic message
                    textAlign: "left",
                    marginTop: "0px", // Keep it close to the original message
                    border: "1px solid #ddd",
                  }}
                >
                  {translatedMessages[index]}
                </div>
              )}
            </div>
          ))}
          {isThinking && (
            <div className="mb-2 flex justify-start items-center">
              <div className="inline-block p-3 rounded-lg bg-purple-200 text-black" style={{ maxWidth: "65%" }}>
                <span className="animate-pulse">thinking...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input and buttons */}
      <div className="w-full max-w-xl mt-4">
        <div className="flex p-2 border-t mt-2 justify-center">
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
          <div className="flex gap-10 justify-between">
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 active:bg-blue-700 transition-colors"
            >
              Send
            </button>
            <button
              onClick={toggleListening}
              className={`p-2 ${isListening ? "bg-red-500" : "bg-green-500"} text-white rounded-md flex items-center`}
            >
              <i className={`fas ${isListening ? "fa-microphone-slash" : "fa-microphone"} mr-2`}></i>
              {isListening ? "Stop Speaking" : "Start Speaking"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

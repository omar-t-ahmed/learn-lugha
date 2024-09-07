"use client";

import React, { useState, useRef, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Image from "next/image";

// Define your lesson here
const lesson = {
  "lesson": "Introductions and Greetings",
  "objectives": [
    "Learn how to greet others in Arabic",
    "Introduce yourself and ask for someone's name",
    "Learn basic pronouns and polite phrases"
  ],
  "vocabulary": [
    {
      "arabic": "أَﻧَﺎ",
      "english": "I am",
      "type": "pronoun"
    },
    {
      "arabic": "اِسْمِي",
      "english": "My name is",
      "type": "phrase"
    },
    {
      "arabic": "مَا اِسْمُكَ؟",
      "english": "What is your name? (m)",
      "type": "question"
    },
    {
      "arabic": "مَا اِسْمُكِ؟",
      "english": "What is your name? (f)",
      "type": "question"
    },
    {
      "arabic": "مِنْ أَيْنَ أَنْتَ؟",
      "english": "Where are you from? (m)",
      "type": "question"
    },
    {
      "arabic": "مِنْ أَيْنَ أَنْتِ؟",
      "english": "Where are you from? (f)",
      "type": "question"
    },
    {
      "arabic": "كَيفَ حَالُكَ؟",
      "english": "How are you? (m)",
      "type": "question"
    },
    {
      "arabic": "كَيفَ حَالُكِ؟",
      "english": "How are you? (f)",
      "type": "question"
    },
    {
      "arabic": "بِخَيْرٍ",
      "english": "I am fine",
      "type": "phrase"
    },
    {
      "arabic": "الحَمْدُ لِلَّه",
      "english": "Praise be to Allah",
      "type": "expression"
    },
    {
      "arabic": "شُكْرًا",
      "english": "Thank you",
      "type": "expression"
    },
    {
      "arabic": "السَّلامُ عَلَيْكُم",
      "english": "Peace be upon you",
      "type": "greeting"
    },
    {
      "arabic": "وَعَلَيْكُمُ السَّلام",
      "english": "And upon you be peace",
      "type": "greeting"
    },
    {
      "arabic": "مَعَ السَّلامَة",
      "english": "With peace (Goodbye)",
      "type": "farewell"
    },
    {
      "arabic": "وَدَاعًا",
      "english": "Goodbye",
      "type": "farewell"
    },
    {
      "arabic": "أَنَا مِنْ",
      "english": "I am from",
      "type": "phrase"
    }
  ]
};

const userProfilePic = "/arabic-user.png"; // Path relative to the public directory
const botProfilePic = "/arabic-teacher-male.png"; // Path relative to the public directory

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean; translation?: string }[]>([]);
  const [input, setInput] = useState("");
  const [usedVocabulary, setUsedVocabulary] = useState<string[]>([]);
  const [lessonCompleted, setLessonCompleted] = useState(false);
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

      audio.onplay = () => setSpeakingIndex(index);
      audio.onended = () => {
        setSpeakingIndex(null);
        isProcessingTTS.current = false;
      };
    } catch (error) {
      console.error("Error during TTS:", error);
      isProcessingTTS.current = false;
    }
  };

  // Initialize Speech Recognition
  const initializeSpeechRecognition = () => {
    if (recognitionRef.current) return;

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = "ar";
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
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

      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: userInput, lesson }),
      });

      const data = await response.json();
      const botResponse = data.response;
      const newUsedVocab = data.usedVocabulary;

      // Update vocabulary and messages
      setUsedVocabulary((prevUsed) => [
        ...prevUsed,
        ...newUsedVocab.filter((vocab: string) => !prevUsed.includes(vocab)),
      ]);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, isUser: false },
      ]);

      handleSpeak(botResponse, messages.length);
      if (usedVocabulary.length === lesson.vocabulary.length) {
        setLessonCompleted(true);
      }
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

  // Helper function to check if a vocabulary word is used
  const isVocabularyUsed = (arabicWord: string) => {
    return usedVocabulary.includes(arabicWord);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center p-4 w-full max-w-screen-xl mx-auto">
      {/* Teacher Profile Picture */}
      <div className="absolute left-5 top-1/3 transform -translate-y-1/3">
        <Image
          src={botProfilePic}
          alt="Chatbot"
          width={160} // specify the width
          height={240} // specify the height
          className={`w-40 h-60 rounded-full transition-all ${
            speakingIndex !== null ? `border-8 border-green-500` : ""
          }`}
        />
      </div>

      {/* Chat Messages */}
      <div className="flex flex-col items-center w-full max-w-5xl mt-6 overflow-y-auto h-80 pr-2 no-scrollbar">
        <div className="w-full px-28">
          {messages.map((message, index) => (
            <div key={index} className={`mb-2`}>
              <div className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
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

      {/* Input */}
      {!lessonCompleted && (
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
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 active:bg-blue-700 transition-colors"
            >
              Send
            </button>
            <button
              onClick={toggleListening}
              className={`p-2 ml-2 ${isListening ? "bg-red-500" : "bg-green-500"} text-white rounded-md flex items-center`}
            >
              <i className={`fas ${isListening ? "fa-microphone-slash" : "fa-microphone"} mr-2`}></i>
              {isListening ? "Stop Speaking" : "Start Speaking"}
            </button>
          </div>
        </div>
      )}

      {/* Vocabulary Progress */}
      <div className="w-full max-w-3xl mt-6">
        <h3 className="text-xl font-semibold">Vocabulary Progress</h3>
        <ul className="list-disc list-inside mt-4">
          {lesson.vocabulary.map((vocab, index) => (
            <li key={index} className="mb-2">
              <span className={`font-bold ${isVocabularyUsed(vocab.arabic) ? "text-green-500" : "text-gray-400"}`}>
                {vocab.arabic}
              </span>
              {" - "}
              <span className="text-gray-700">{vocab.english}</span>
            </li>
          ))}
        </ul>
      </div>

      {lessonCompleted && (
        <div className="mt-6 text-green-500 text-xl">
          <p>Congratulations! You've completed the lesson!</p>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
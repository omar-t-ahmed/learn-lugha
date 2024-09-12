"use client";

import React, { useState, useRef, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from "next/image";
import Confetti from "react-confetti";
import { getCurrentUserToken } from "@/firebase";

// Define your lesson here
interface ChatbotProps {
    user: any;
    lesson: {
      lesson_id: number;
      title: string;
      objectives: string[];
      vocabulary: { arabic: string; english: string; type: string; }[];
    };
  }

const userProfilePic = "/arabic-user.png"; // Path relative to the public directory
const botProfilePic = "/arabic-teacher-male-pfp.png"; // Path relative to the public directory

const Chatbot: React.FC<ChatbotProps> = ({ user, lesson }) => {
    const [messages, setMessages] = useState<
        {
            content: string;
            isUser: boolean;
            translation?: string;
            role: string;
        }[]
    >([]);
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
    const [translatedMessages, setTranslatedMessages] = useState<{
        [key: number]: string;
    }>({});
    const [showTranslation, setShowTranslation] = useState<{
        [key: number]: boolean;
    }>({}); // Track whether to show translation
    const messageRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
    const messageEndRef = useRef<HTMLDivElement | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [confetti, setConfetti] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state
    const [feedback, setFeedback] = useState<string | null>(null); // Add feedback state

    const scrollToBottom = () => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
            });
        }
    };

    // Fetch existing transcript if the lesson is already completed
    const fetchTranscript = async () => {
        try {
            const token = await getCurrentUserToken();
            const response = await fetch(`/api/transcripts?lessonId=${lesson.lesson_id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const transcript = await response.json();
                setMessages(transcript.messages);
                setLessonCompleted(true);
            } else {
                console.error("Failed to fetch transcript");
            }
        } catch (error) {
            console.error("Error fetching transcript:", error);
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    // Handle Text-to-Speech
    const handleSpeak = async (text: string, index: number) => {
        try {
            if (isProcessingTTS.current) return;
            isProcessingTTS.current = true;

            // Stop current audio if playing
            if (audioRef.current && !audioRef.current.paused) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                audioRef.current = null;
                setSpeakingIndex(null);
                return;
            }

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

            const audioContext = new (window.AudioContext ||
                (window as any).webkitAudioContext)();
            const source = audioContext.createMediaElementSource(audio);
            const analyser = audioContext.createAnalyser();
            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            source.connect(analyser);
            analyser.connect(audioContext.destination);

            audio.onplay = () => {
                setSpeakingIndex(index);
                const visualize = () => {
                    analyser.getByteFrequencyData(dataArray);
                    let volume = 0;
                    for (let i = 0; i < dataArray.length; i++) {
                        if (dataArray[i] > volume) {
                            volume = dataArray[i];
                        }
                    }
                    setVolumeLevel(volume);
                    if (audioRef.current) {
                        requestAnimationFrame(visualize);
                    }
                };
                visualize();
            };

            audio.onended = () => {
                setSpeakingIndex(null);
                audioRef.current = null;
                audioContext.close();
                isSpeakingRef.current = false;
                isProcessingTTS.current = false;
            };

            audio.play();
        } catch (error) {
            console.error("Error during TTS:", error);
            isSpeakingRef.current = false;
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

            setMessages((prevMessages) => {
                const newMessages = [...prevMessages, { content: transcript, isUser: true, role: "user" }];
                handleBotResponse(transcript, newMessages);
                return newMessages; // Set the updated messages
            });
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

    const generateFeedback = (message: string) => {
        // Placeholder function to generate feedback
        // You can replace this with actual logic to analyze the message
        if (message.includes("wrong")) {
            return "It seems like there might be a grammar issue in your sentence.";
        }
        return "Your sentence looks good!";
    };

    const handleSendMessage = async () => {
        if (input.trim() === "") return;

        // Track used vocabulary based on user input
        const userVocabularyUsed = lesson.vocabulary
            .filter((vocab) => input.includes(vocab.arabic))
            .map((vocab) => vocab.arabic);

        // Update the vocabulary state for the user
        setMessages((prevMessages) => {
            const newMessages = [...prevMessages, { content: input, isUser: true, role: "user" }];
            handleBotResponse(input, newMessages);
            setInput(""); // Clear input after setting the new message
            return newMessages; // Set the updated messages
        });

        // Generate feedback for the last user message
        const lastUserMessage = messages[messages.length - 1];
        if (lastUserMessage && lastUserMessage.isUser) {
            const feedback = generateFeedback(lastUserMessage.content);
            setFeedback(feedback);
        }
    };

    const handleBotResponse = async (userInput: string, conversation: { content: string; isUser: boolean; role: string }[]) => {
        if (lessonCompleted) return;

        try {
            setIsThinking(true);

            const response = await fetch("/api/openai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    input: userInput,
                    lesson,
                    conversation,
                    usedVocabulary,
                }),
            });

            if (response.status === 204) {
                // Do nothing if it's a duplicate response
                return;
            }

            const data = await response.json();
            const botResponse = data.response;
            setFeedback(data.feedback);
            setUsedVocabulary(data.usedVocabulary); // Update used vocabulary state
            setMessages((prevMessages) => [
                ...prevMessages,
                { content: botResponse, isUser: false, role: "system" },
            ]);

            handleSpeak(botResponse, messages.length);
            if (data.lessonCompleted) {
                setLessonCompleted(true);
                setConfetti(true);

                // Get the user token
                const token = await getCurrentUserToken();

                // Send PATCH request to update user's lessons and progress
                await fetch("/api/users", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`, // Include the token in the headers
                    },
                    body: JSON.stringify({
                        lessons: [...user.lessons, lesson.lesson_id],
                        completedLesson: true, // Indicate that a lesson was completed
                    }),
                });

                // Send POST request to create a new transcript
                await fetch("/api/transcripts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`, // Include the token in the headers
                    },
                    body: JSON.stringify({
                        messages: conversation,
                        lessonId: lesson.lesson_id,
                        userId: user.id,
                    }),
                });

                setTimeout(() => {
                    setConfetti(false);
                }, 5000);

                return;
            }
        } catch (error) {
            console.error("Error communicating with OpenAI:", error);
        } finally {
            setIsThinking(false);
        }
    };

    useEffect(() => {
        scrollToBottom(); // Scroll to the bottom whenever a new message is added
    }, [messages]);

    useEffect(() => {
        const introMessage = "Welcome to the lesson! Let's start learning Arabic.";
        setMessages([{ content: introMessage, isUser: false, role: "system" }]);
        // handleSpeak(introMessage, 0);
    }, []);

    useEffect(() => {
        fetchTranscript();
    }, [lesson.lesson_id]);

    // Helper function to check if a vocabulary word is used
    const isVocabularyUsed = (arabicWord: string) => {
        return usedVocabulary.includes(arabicWord);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const endLesson = async (messages: any) => {
        setLessonCompleted(true);
        setConfetti(true);

        try {
            // Get the user token
            const token = await getCurrentUserToken();

            // Send PATCH request to update user's lessons
            await fetch("/api/users", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Include the token in the headers
                },
                body: JSON.stringify({
                    lessons: [...user.lessons, lesson.lesson_id],
                    completedLesson: true, // Indicate that a lesson was completed
                }),
            });

            // Send POST request to create a new transcript
            await fetch("/api/transcripts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Include the token in the headers
                },
                body: JSON.stringify({
                    messages: messages,
                    lessonId: lesson.lesson_id,
                    userId: user.id,
                }),
            });

        } catch (error) {
            console.error("Error ending lesson:", error);
        } finally {
            setTimeout(() => {
                setConfetti(false);
            }, 5000);
        }
    };
    
    return (
        <div className="relative min-h-screen flex flex-col p-4 w-full max-w-screen-xl mx-auto">
            <>
                {confetti && <Confetti />}
                
                <div className="flex flex-col sm:flex-row w-full h-full">
                    <div className="flex flex-col items-center w-full sm:w-1/4 h-full">
                        <div className="flex w-full flex-col items-center pb-4 border-b border-gray-300">
                            <img
                                src={botProfilePic}
                                alt="Chatbot"
                                className={`w-24 h-36 sm:w-40 sm:h-40 rounded-full transition-all ${
                                    speakingIndex !== null ? `border-8 border-indigo-500` : ""
                                }`}
                                style={{
                                    borderWidth: `${speakingIndex !== null ? (volumeLevel / 256) * 10 : 8}px`,
                                }}
                            />
                            <button
                                onClick={() => { endLesson(messages) }}
                                className="mt-2 bg-red-500 text-white p-2 rounded-md flex items-center"
                            >
                                End Lesson
                            </button>
                        </div>

                        <div className="mt-4 w-full max-w-xs overflow-y-auto hidden sm:block flex-grow">
                            <div className="bg-indigo-500 p-4 rounded shadow-lg w-full mb-4">
                                <h3 className="text-xl text-center font-semibold">Feedback</h3>
                                <p>{feedback}</p>
                            </div>
                            <div className="w-full">
                        <h3 className="text-xl font-semibold text-center">Vocabulary</h3>
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
                        </div>
                    </div>

                    <div className="border-l-2 border-gray-300 mx-4"></div> {/* Thin line between sections */}

                    <div className="flex flex-col items-start w-full sm:w-3/4 h-full">
                        {loading ? (
                            <img src="/loading-spinner.gif" alt="Loading..." />
                        ) : (
                            <>
                                <div className="flex flex-col items-start w-full overflow-y-auto pr-2 no-scrollbar flex-grow" style={{ height: '30rem' }}>
                                    <div className="w-full px-4 sm:px-6 h-full overflow-y-auto">
                                        {messages.map((message, index) => (
                                            <div key={index} className="mb-2">
                                                <div className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                                                    <div
                                                        ref={(el) => {
                                                            messageRefs.current[index] = el; // Assign the element to the ref
                                                        }}
                                                        className={`inline-block p-2 sm:p-3 rounded-lg ${
                                                            message.isUser ? "bg-blue-500 text-white" : "bg-purple-200 text-black"
                                                        }`}
                                                        style={{
                                                            maxWidth: "80%",
                                                            textAlign: "left",
                                                            wordBreak: "break-word",
                                                        }}
                                                    >
                                                        {message.content}
                                                    </div>
                                                    {!message.isUser && (
                                                        <>
                                                            <button
                                                                onClick={() => handleSpeak(message.content, index)}
                                                                className={`ml-2 ${
                                                                    speakingIndex === index ? "text-black" : "text-gray-600 hover:text-gray-800"
                                                                }`}
                                                                title="Listen to message"
                                                            >
                                                                <i className="fas fa-volume-up"></i>
                                                            </button>
                                                            <button
                                                                onClick={() => handleTranslate(message.content, index)}
                                                                className="ml-2 text-gray-600 hover:text-gray-800"
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
                                                            width: messageRefs.current[index]?.offsetWidth,
                                                            textAlign: "left",
                                                            marginTop: "0px",
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
                                                <div className="inline-block p-2 sm:p-3 rounded-lg bg-purple-200 text-black" style={{ maxWidth: "80%" }}>
                                                    <span className="animate-pulse">Thinking...</span>
                                                </div>
                                            </div>
                                        )}
                                        <div ref={messageEndRef}></div>
                                    </div>
                                </div>
                                {!lessonCompleted && (
                                    <div className="w-full mt-4">
                                        <div className="flex p-2 border-t mt-2 justify-center">
                                            <input
                                                type="text"
                                                className="flex-grow p-2 border border-gray-600 rounded-l-md text-white bg-gray-800"
                                                placeholder="Type your message..."
                                                value={input}
                                                onChange={(e) => setInput(e.target.value)}
                                                onKeyPress={(e) => {
                                                    if (e.key === "Enter") handleSendMessage();
                                                }}
                                            />
                                            <button
                                                onClick={handleSendMessage}
                                                className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700 active:bg-blue-800 transition-colors"
                                            >
                                                <i className="fas fa-paper-plane mr-2"> </i>
                                                <>Send</>
                                            </button>
                                            <button
                                                onClick={toggleListening}
                                                className={`p-2 ml-2 ${isListening ? "bg-red-600" : "bg-green-600"} text-white rounded-md flex items-center`}
                                            >
                                                <i className={`fas ${isListening ? "fa-microphone-slash" : "fa-microphone"} mr-2`}></i>
                                                {isListening ? "Stop Speaking" : "Start Speaking"}
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {lessonCompleted && (
                                    <div className="mt-6 text-green-500 w-full text-xl text-center flex justify-center">
                                        <p>You&apos;ve completed this lesson!</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Vocabulary Section for Mobile */}
                <div className="block sm:hidden mt-4">
                    <div className="bg-indigo-500 p-4 rounded shadow-lg w-full mb-4 ">
                        <h3 className="text-xl text-center font-semibold">Feedback</h3>
                        <p>{feedback}</p>
                    </div>

                    <div className="w-full">
                        <h3 className="text-xl font-semibold text-center">Vocabulary</h3>
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
                </div>
            </>
        </div>
    );
};

export default Chatbot;
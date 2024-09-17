"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Tutorial from "@/components/Tutorial"; // Ensure correct import path
import Navbar from "@/components/Navbar";
import { getCurrentUserToken } from "@/firebase"; // Import your Firebase token function

const LessonPage = () => {
  const router = useRouter();
  const [userToken, setUserToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [tutorialCompleted, setTutorialCompleted] = useState(false); // New state for tutorial completion

  // Fetch user authentication token and user details
  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const token = await getCurrentUserToken();
        if (!token) {
          router.push("/login"); // Redirect to login if not authenticated
        } else {
          setUserToken(token);

          const response = await fetch("/api/users", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Pass the token
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setLoading(false); // User is authenticated and data fetched, stop loading

            // Check if the user has completed the tutorial
            if (userData.tutorialCompleted) {
              setTutorialCompleted(true); // Set tutorial as completed
            }
          } else {
            router.push("/login"); // Redirect to login if response is not ok
          }
        }
      } catch (error) {
        console.error("Error checking user authentication:", error);
        router.push("/login"); // Redirect to login if any error occurs
      }
    };

    checkUserAuth();
  }, [router]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl text-white">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="relative flex flex-col items-center justify-start p-10">
        <h1 className="text-4xl font-bold mb-4">Arabic Tutorial</h1>
        {tutorialCompleted ? ( // Check if tutorial is completed
          <>
            <p className="text-2xl mb-6 text-center">You have already completed the tutorial.</p>
            <button
              className="mt-6 px-4 py-2 bg-indigo-500 text-white font-semibold rounded hover:bg-indigo-400 transition mx-auto block"
              onClick={() => router.push("/home")}
            >
              Back to Lessons
            </button>
          </>
        ) : (
          <>
            <Tutorial
              user={user}
              lesson={{
                lesson_id: 1, // Static ID for the tutorial
                title: "Common Arabic Words",
                objectives: ["Learn basic Arabic greetings", "Understand common phrases"], // Add objectives
                vocabulary: [
                  { arabic: "مرحبا", english: "Hello", type: "word" },
                  { arabic: "شكرا", english: "Thank you", type: "word" },
                  { arabic: "نعم", english: "Yes", type: "word" },
                  { arabic: "لا", english: "No", type: "phrase" },
                  { arabic: "من فضلك", english: "Please", type: "phrase" },
                  { arabic: "لا أعرف", english: "I don't know", type: "phrase" },
                ],
              }}
              onComplete={() => setTutorialCompleted(true)} // Mark tutorial as completed
            />
            <button
              className="mt-6 px-4 py-2 bg-indigo-500 text-white font-semibold rounded hover:bg-indigo-400 transition"
              onClick={() => router.push("/home")}
            >
              Back to Lessons
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LessonPage;
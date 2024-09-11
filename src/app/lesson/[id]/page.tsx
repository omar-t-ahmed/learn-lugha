"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Chatbot from "@/components/Chat"; // Ensure correct import path
import Navbar from "@/components/Navbar";
import { getCurrentUserToken } from "@/firebase"; // Import your Firebase token function
import { lessons } from "@/lib/lessons"; // Import lessons from lessons.ts

const LessonPage = () => {
  const params = useParams();
  const router = useRouter();
  const [userToken, setUserToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const id = Number(params.id);
  const lessonKey = `lesson_${id}` as keyof typeof lessons;
  const lesson = lessons[lessonKey];

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

  if (!lesson) {
    return (
      <div className="bg-gradient-to-br from-black via-gray-900 to-purple-700 min-h-screen text-white">
        <Navbar />
        <div>
          <h1 className="text-4xl font-bold mb-10">Lesson not found</h1>
          <button
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-gray-100 transition"
            onClick={() => router.push("/home")}
          >
            Back to Lessons
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="relative flex flex-col items-center justify-start p-10">
        <h1 className="text-4xl font-bold mb-4">{lesson.title}</h1>
        {/* <p className="text-lg mb-6">{lesson.content}</p> */}
        {/* Include the Chatbot under the lesson heading and pass user and lesson */}
        <Chatbot user={user} lesson={{ ...lesson, lesson_id: id }} />
        <button
          className="mt-6 px-4 py-2 bg-indigo-500 text-white font-semibold rounded hover:bg-gray-100 transition"
          onClick={() => router.push("/home")}
        >
          Back to Lessons
        </button>
      </div>
    </div>
  );
};

export default LessonPage;
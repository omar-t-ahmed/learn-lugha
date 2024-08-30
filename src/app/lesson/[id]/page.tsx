"use client";

import { useParams, useRouter } from "next/navigation";
import Chatbot from "@/components/Chat"; // Ensure correct import path

const lessonData: Record<number, { title: string; content: string }> = {
  1: {
    title: "Lesson 1: Introduction to Arabic",
    content: "Welcome to Lesson 1! In this lesson, we'll cover the basics of Arabic..."
  },
  2: {
    title: "Lesson 2: Basic Vocabulary",
    content: "In Lesson 2, we'll explore some essential Arabic vocabulary..."
  },
  3: {
    title: "Lesson 3: Simple Sentences",
    content: "Lesson 3 is all about forming simple sentences in Arabic..."
  },
  // ... More lessons
};

const LessonPage = () => {
  const params = useParams();
  const router = useRouter();
  
  const id = Number(params.id);
  const lesson = lessonData[id];

  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-gradient-to-b from-black to-purple-900 min-h-screen text-white">
        <h1 className="text-4xl font-bold mb-10">Lesson not found</h1>
        <button
          className="px-4 py-2 bg-white text-purple-700 rounded hover:bg-gray-100 transition"
          onClick={() => router.push("/lessons")}
        >
          Back to Lessons
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-start p-10 bg-gradient-to-b from-black to-purple-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-4">{lesson.title}</h1>
      <p className="text-lg mb-6">{lesson.content}</p>

      {/* Include the Chatbot under the lesson heading */}
      <Chatbot />

      <button
        className="mt-6 px-4 py-2 bg-white text-purple-700 rounded hover:bg-gray-100 transition"
        onClick={() => router.push("/lessons")}
      >
        Back to Lessons
      </button>
    </div>
  );
};

export default LessonPage;

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import from next/navigation
import Navbar from "@/components/Navbar";

// Define the Lesson type
interface Lesson {
  id: number;
  title: string;
  completed: boolean;
}

const lessons: Lesson[] = [
  { id: 1, title: "Lesson 1", completed: true },
  { id: 2, title: "Lesson 2", completed: false },
  { id: 3, title: "Lesson 3", completed: false },
  { id: 4, title: "Lesson 4", completed: false },
  { id: 5, title: "Lesson 5", completed: false },
  { id: 6, title: "Lesson 6", completed: false },
  { id: 7, title: "Lesson 7", completed: false },
  { id: 8, title: "Lesson 8", completed: false },
];

export default function LessonPath() {
  const router = useRouter(); // Use the correct router hook

  const [selectedLesson, setSelectedLesson] = useState<Lesson & { isUnlocked: boolean } | null>(null);
  const [dialogPosition, setDialogPosition] = useState<{ top: number; left: number } | null>(null);

  const handleClick = (event: React.MouseEvent, lesson: Lesson, isUnlocked: boolean) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const top = rect.bottom + window.scrollY; // Positioning below the circle
    const left = rect.left + window.scrollX + rect.width / 2;
    setDialogPosition({ top, left });
    setSelectedLesson({ ...lesson, isUnlocked });
  };

  const handleClose = () => {
    setSelectedLesson(null);
    setDialogPosition(null);
  };

  const navigateToLesson = (lessonId: number) => {
    router.push(`/lesson/${lessonId}`); // Ensure this matches the path structure
  };

  return (
    <div className=" bg-gradient-to-br from-black via-gray-900 to-purple-700 min-h-screen text-white">
      <Navbar/>
        <div className="flex flex-col items-center justify-center p-10">
        <h1 className="text-3xl font-bold mb-10">LearnLugha Path</h1>
        <div className="relative flex flex-col items-center w-full max-w-2xl">
          {lessons.map((lesson, index) => {
            const isUnlocked = index === 0 || lessons[index - 1].completed;
            const lessonStatus = lesson.completed
              ? "bg-green-500 border-green-700"
              : isUnlocked
              ? "bg-yellow-500 border-yellow-700"
              : "bg-gray-600 border-gray-700";

            return (
              <div
                key={lesson.id}
                className={`relative flex items-center mb-20 ${
                  index % 2 === 0 ? "self-start" : "self-end"
                }`}
                style={{
                  position: "relative",
                  left: index % 2 === 0 ? "105px" : "-105px",
                }}
                onClick={(e) => handleClick(e, lesson, isUnlocked)}
              >
                {/* Lesson circles */}
                <div
                  className={`relative flex items-center justify-center w-16 h-16 rounded-full border-4 transition-transform duration-200 transform hover:scale-110 cursor-pointer ${lessonStatus}`}
                >
                  <span className="text-white text-lg font-bold">{lesson.id}</span>
                </div>


              </div>
            );
          })}
        </div>

        {/* Dialog Box */}
        {selectedLesson && dialogPosition && (
          <div
            className={`absolute z-50 p-5 rounded-lg text-white dialog-box ${
              selectedLesson.completed
                ? "bg-green-500"
                : selectedLesson.isUnlocked
                ? "bg-yellow-500"
                : "bg-gray-600"
            }`}
            style={{
              top: `${dialogPosition.top + 10}px`, // Positioning directly underneath the circle
              left: `${dialogPosition.left}px`,
              transform: "translateX(-50%)", // Center the dialog box horizontally
            }}
          >
            {/* Close "X" */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-lg font-bold"
              style={{
                color:
                  selectedLesson.completed
                    ? "#1C4532" // Darker green
                    : selectedLesson.isUnlocked
                    ? "#7B341E" // Darker yellow
                    : "#2D3748", // Darker gray (ensures visibility)
              }}
            >
              &times;
            </button>

            <div
              className="absolute top-[-10px] left-[50%] transform translate-x-[-50%] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px]"
              style={{
                borderBottomColor:
                  selectedLesson.completed
                    ? "#38a169" // Match the green color
                    : selectedLesson.isUnlocked
                    ? "#ecc94b" // Match the yellow color
                    : "#718096", // Match the gray color
              }}
            ></div>

            <h2 className="text-2xl font-bold mb-2">{selectedLesson.title}</h2>
            <p className="text-lg mb-4">
              {selectedLesson.completed
                ? "This lesson is completed."
                : selectedLesson.isUnlocked
                ? "This lesson is unlocked."
                : "Sorry, this lesson is locked."}
            </p>

            {selectedLesson.completed && (
              <button
                className="px-4 py-2 bg-white text-green-700 rounded hover:bg-gray-100 transition"
                onClick={() => navigateToLesson(selectedLesson.id)}
              >
                Go to Lesson
              </button>
            )}

            {selectedLesson.isUnlocked && !selectedLesson.completed && (
              <button
                className="px-4 py-2 bg-white text-yellow-700 rounded hover:bg-gray-100 transition"
                onClick={() => navigateToLesson(selectedLesson.id)}
              >
                Start Lesson
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

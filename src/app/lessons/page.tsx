"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

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
  const router = useRouter();

  const [selectedLesson, setSelectedLesson] = useState<Lesson & { isUnlocked: boolean } | null>(null);
  const [dialogPosition, setDialogPosition] = useState<{ top: number; left: number } | null>(null);

  const handleClick = (event: React.MouseEvent, lesson: Lesson, isUnlocked: boolean) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const top = rect.bottom + window.scrollY;
    const left = rect.left + window.scrollX + rect.width / 2;
    setDialogPosition({ top, left });
    setSelectedLesson({ ...lesson, isUnlocked });
  };

  const handleClose = () => {
    setSelectedLesson(null);
    setDialogPosition(null);
  };

  const navigateToLesson = (lessonId: number) => {
    router.push(`/lesson/${lessonId}`);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
      <Sidebar />
      <div className="md:ml-64 p-5 md:p-10 flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-5 md:mb-10">Lessons</h1>
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
                className={`relative flex items-center mb-10 md:mb-20 ${
                  index % 2 === 0 ? "md:self-start md:ml-16" : "md:self-end md:mr-16"
                } justify-center md:justify-${index % 2 === 0 ? 'start' : 'end'}`}
                onClick={(e) => handleClick(e, lesson, isUnlocked)}
              >
                <div
                  className={`relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border-4 transition-transform duration-200 transform hover:scale-110 cursor-pointer ${lessonStatus}`}
                >
                  <span className="text-white text-lg md:text-xl font-bold">{lesson.id}</span>
                </div>
              </div>
            );
          })}
        </div>

        {selectedLesson && dialogPosition && (
          <div
            className={`absolute z-50 p-5 rounded-lg text-white dialog-box w-64 ${
              selectedLesson.completed
                ? "bg-green-500"
                : selectedLesson.isUnlocked
                ? "bg-yellow-500"
                : "bg-gray-600"
            }`}
            style={{
              top: `${dialogPosition.top + 10}px`,
              left: `${dialogPosition.left}px`,
              transform: "translateX(-50%)",
            }}
          >
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-lg font-bold"
              style={{
                color:
                  selectedLesson.completed
                    ? "#1C4532"
                    : selectedLesson.isUnlocked
                    ? "#7B341E"
                    : "#2D3748",
              }}
            >
              &times;
            </button>

            <div
              className="absolute top-[-10px] left-[50%] transform translate-x-[-50%] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px]"
              style={{
                borderBottomColor:
                  selectedLesson.completed
                    ? "#38a169"
                    : selectedLesson.isUnlocked
                    ? "#ecc94b"
                    : "#718096",
              }}
            ></div>

            <h2 className="text-xl font-bold mb-2">{selectedLesson.title}</h2>
            <p className="text-md mb-4">
              {selectedLesson.completed
                ? "This lesson is completed."
                : selectedLesson.isUnlocked
                ? "This lesson is unlocked."
                : "Sorry, this lesson is locked."}
            </p>

            {selectedLesson.completed && (
              <button
                className="px-4 py-2 bg-white text-green-700 rounded hover:bg-gray-100 transition w-full"
                onClick={() => navigateToLesson(selectedLesson.id)}
              >
                Go to Lesson
              </button>
            )}

            {selectedLesson.isUnlocked && !selectedLesson.completed && (
              <button
                className="px-4 py-2 bg-white text-yellow-700 rounded hover:bg-gray-100 transition w-full"
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
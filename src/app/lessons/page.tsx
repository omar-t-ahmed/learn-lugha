"use client";

import React from "react";

const lessons = [
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
  return (
    <div className="flex flex-col items-center justify-center p-10 bg-gradient-to-b from-black to-purple-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-10">LearnLugha Path</h1>
      <div className="relative flex flex-col items-center w-full max-w-2xl">
        {lessons.map((lesson, index) => (
          <div
            key={lesson.id}
            className={`flex items-center mb-10 ${
              index % 2 === 0 ? "self-start" : "self-end"
            }`}
            style={{
              position: "relative",
              left: index % 2 === 0 ? "105px" : "-105px", // Adjusted horizontal spacing here
            }}
          >
            {/* Lesson circles */}
            <div
              className={`relative flex items-center justify-center w-16 h-16 rounded-full border-4 transition-transform duration-200 transform hover:scale-110 ${
                lesson.completed
                  ? "bg-green-500 border-green-700"
                  : "bg-gray-600 border-gray-700"
              }`}
            >
              <span className="text-white text-lg font-bold">{lesson.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

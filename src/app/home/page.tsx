"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import UserProgress from "@/components/UserProgress";
import { getCurrentUserToken } from "@/firebase";
import { chapters, lessons, LessonType } from "@/lib/lessons"; // Import chapters and lessons from lessons.ts

type UserType = {
  lessons: number[];
  name: string;
  progress: {
    level: number;
    xp: number;
  };
  gender: string; // Added gender
};

export default function LessonPath() {
  const router = useRouter();
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userLessons, setUserLessons] = useState<number[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<any | null>(null);
  const [dialogPosition, setDialogPosition] = useState<{ top: number; left: number } | null>(null);
  const [user, setUser] = useState<UserType | null>(null); // State for user data

  // Define a set of colors for the chapter titles
  const chapterColors = ["bg-indigo-500", "bg-blue-500", "bg-green-500", "bg-cyan-500", "bg-red-500", "bg-yellow-500", "bg-pink-500"];

  useEffect(() => {
    const fetchTokenAndProgress = async () => {
      try {
        const token = await getCurrentUserToken();
        if (!token) {
          router.push("/");
          return;
        }
        setUserToken(token);

        // Fetch user data including lessons, name, level, xp, and gender
        const user: UserType = await fetchUser(token);
        setUser(user);
        setUserLessons(user.lessons);
      } catch (error) {
        console.error("Error fetching user lessons:", error);
      }
    };

    fetchTokenAndProgress();
  }, [router]);

  const fetchUser = async (token: string): Promise<UserType> => {
    const response = await fetch('/api/users', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  };

  const handleClick = (event: React.MouseEvent, lesson: LessonType, lessonKey: string) => {
    const lessonNumber = parseInt(lessonKey.split('lesson_')[1], 10);
    const isCompleted = userLessons.includes(lessonNumber);
    const lastCompletedLessonNumber = userLessons[userLessons.length - 1];
    const isUnlocked = isCompleted || lessonNumber === lastCompletedLessonNumber + 1;

    if (!isUnlocked) return;

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const top = rect.bottom + window.scrollY;
    const isOdd = lessonNumber % 2 === 0;

    const left = isOdd ? rect.left - 300 : rect.right + 50;

    setDialogPosition({ top, left });
    setSelectedLesson({ ...lesson, lessonKey, isCompleted, isUnlocked });
  };

  const handleClose = () => {
    setSelectedLesson(null);
    setDialogPosition(null);
  };

  const navigateToLesson = (lessonKey: string) => {
    router.push(`/lesson/${lessonKey.split('lesson_')[1]}`);
  };

  if (!userToken) {
    return null;
  }

  let globalLessonIndex = 0;
  {console.log(user)}
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white flex relative">
      {/* Sidebar */}
      <Sidebar />

      {/* Progress Bar on Top Right */}
      <div className="absolute top-5 right-5 z-20 hidden md:block">
        {user && <UserProgress name={user.name.split(' ')[0]} level={user.progress.level} xp={user.progress.xp} />}
      </div>

      {/* Main content */}
      <div className="flex-grow p-5 md:p-10 flex flex-col items-center relative">
        <div className="relative w-full flex flex-col space-y-16 items-center">
          {/* Pre Lesson and Resources side by side */}
          <div className="w-full flex flex-row justify-center space-x-10">
            <div className="flex flex-col items-center relative z-10">
              <h2
                className="p-4 rounded-md text-xl md:text-2xl font-bold text-center bg-purple-500 cursor-pointer"
                onClick={() => router.push('/tutorial')}
              >
                Tutorial
              </h2>
            </div>
            <div className="flex flex-col items-center relative z-10">
              <h2
                className="p-4 rounded-md text-xl md:text-2xl font-bold text-center bg-teal-500 cursor-pointer"
                onClick={() => router.push('/resources')}
              >
                Resources
              </h2>
            </div>
          </div>

          <h1 className="text-xl md:text-3xl font-bold mb-5 md:mb-10">Lessons</h1>

          {chapters.map((chapter, chapterIndex) => {
            const chapterColor = chapterColors[chapterIndex % chapterColors.length];

            return (
              <div key={chapterIndex} className="w-full flex flex-col items-center relative z-10">
                <h2
                  className={`p-4 rounded-md text-xl md:text-2xl w-full md:w-2/3 lg:w-1/2 font-bold mb-10 text-center ${chapterColor}`}
                >
                  Chapter {chapter.chapter}
                </h2>
                <div className="flex flex-col space-y-16 items-center">
                  {chapter.lessons.map((lessonKey, lessonIndex) => {
                    const lesson = lessons[lessonKey as keyof typeof lessons];
                    if (!lesson) {
                      console.error(`Lesson not found for key: ${lessonKey}`);
                      return null;
                    }
                    const lessonNumber = parseInt(lessonKey.split('lesson_')[1], 10);
                    const isCompleted = userLessons.includes(lessonNumber);
                    const lastCompletedLessonNumber = userLessons[userLessons.length - 1];
                    const isUnlocked = isCompleted || lessonNumber === lastCompletedLessonNumber + 1;

                    const lessonStatus = isCompleted
                      ? "bg-green-500 border-green-700"
                      : isUnlocked
                      ? "bg-yellow-500 border-yellow-700"
                      : "bg-gray-600 border-gray-700";

                    const isRight = globalLessonIndex % 2 !== 0;

                    globalLessonIndex++;

                    return (
                      <div
                        key={lessonKey}
                        className={`relative flex flex-col items-center cursor-pointer transition-all transform hover:scale-105 ${
                          isRight ? "translate-x-16" : ""
                        } ${!isUnlocked ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={(e) => handleClick(e, lesson, lessonKey)}
                      >
                        <div
                          className={`relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full border-4 transition-transform duration-200 transform ${lessonStatus}`}
                        >
                          <span className="text-white text-lg md:text-xl font-bold">{lessonNumber}</span>
                        </div>
                        <p className="text-center text-white mt-2">{lesson.title}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected lesson dialog */}
        {selectedLesson && dialogPosition && (
          <div
            className={`absolute z-50 p-4 rounded-lg text-white w-64 ${
              selectedLesson.isCompleted ? "bg-green-500" : selectedLesson.isUnlocked ? "bg-yellow-500" : "bg-gray-600"
            }`}
            style={{
              top: `${dialogPosition.top - 120}px`,
              left: `${dialogPosition.left}px`,
            }}
          >
            <button
              onClick={handleClose}
              className="absolute top-0 right-2 text-lg font-bold"
            >
              &times;
            </button>

            <h2 className="text-lg font-bold mb-2">{selectedLesson.title}</h2>
            <p className="text-sm mb-4">
              {selectedLesson.isCompleted ? "This lesson is completed." : "This lesson is unlocked."}
            </p>

            {selectedLesson.isUnlocked && !selectedLesson.isCompleted && (
              <button
                className="px-4 py-1 bg-white text-yellow-700 rounded hover:bg-gray-100 transition w-full"
                onClick={() => navigateToLesson(selectedLesson.lessonKey)}
              >
                Start Lesson
              </button>
            )}

            {selectedLesson.isCompleted && (
              <button
                className="px-4 py-1 bg-white text-green-700 rounded hover:bg-gray-100 transition w-full"
                onClick={() => navigateToLesson(selectedLesson.lessonKey)}
              >
                Review Lesson
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
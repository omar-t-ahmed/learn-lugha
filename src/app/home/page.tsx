"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import UserProgress from "@/components/UserProgress";
import { getCurrentUserToken } from '@/firebase'; // Import the token function

interface Lesson {
  id: number;
  title: string;
  completed: boolean;
}

const lessons: Lesson[] = [
  { id: 1, title: "Lesson 1", completed: false },
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
  const [userToken, setUserToken] = useState<string | null>(null); // Store the user's token
  const [userProgress, setUserProgress] = useState<number>(0); // Track user progress
  const [selectedLesson, setSelectedLesson] = useState<Lesson & { isUnlocked: boolean } | null>(null);
  const [dialogPosition, setDialogPosition] = useState<{ top: number; left: number } | null>(null);

  // Fetch user token and progress when the component mounts
  useEffect(() => {
    const fetchTokenAndProgress = async () => {
      try {
        const token = await getCurrentUserToken(); // Fetch the token
        if (!token) {
          router.push("/login"); // Redirect to login if no token
          return;
        }
        setUserToken(token);

        // Fetch user progress from API
        const response = await fetch("/api/progress", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pass the token
          },
        });

        const data = await response.json();
        setUserProgress(data.level || 0); // Set progress based on response
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    fetchTokenAndProgress();
  }, [router]);

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

  if (!userToken) {
    return null; // Render nothing while checking the token
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
      <Sidebar />
      <div className="md:ml-64 p-5 md:p-10 flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-5 md:mb-10">Lessons</h1>
        <UserProgress maxLevel={8} /> {/* Pass max level for user progress */}
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
      </div>
    </div>
  );
}
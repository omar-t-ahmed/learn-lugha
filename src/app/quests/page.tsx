"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar"; // Import the Sidebar component

// Define the Quest type
interface Quest {
  id: number;
  title: string;
  completed: boolean;
}

const quests: Quest[] = [
  { id: 1, title: "Quest 1", completed: true },
  { id: 2, title: "Quest 2", completed: false },
  { id: 3, title: "Quest 3", completed: false },
  { id: 4, title: "Quest 4", completed: false },
  { id: 5, title: "Quest 5", completed: false },
  { id: 6, title: "Quest 6", completed: false },
  { id: 7, title: "Quest 7", completed: false },
  { id: 8, title: "Quest 8", completed: false },
];

export default function QuestPath() {
  const router = useRouter();

  const [selectedQuest, setSelectedQuest] = useState<Quest & { isUnlocked: boolean } | null>(null);
  const [dialogPosition, setDialogPosition] = useState<{ top: number; left: number } | null>(null);

  const handleClick = (event: React.MouseEvent, quest: Quest, isUnlocked: boolean) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const top = rect.bottom + window.scrollY;
    const left = rect.left + window.scrollX + rect.width / 2;
    setDialogPosition({ top, left });
    setSelectedQuest({ ...quest, isUnlocked });
  };

  const handleClose = () => {
    setSelectedQuest(null);
    setDialogPosition(null);
  };

  const navigateToQuest = (questId: number) => {
    router.push(`/quest/${questId}`);
  };

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-purple-700 min-h-screen text-white">
      <Sidebar />
      <div className="ml-64 p-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-10">LearnLugha Quests</h1>
        <div className="relative flex flex-col items-center w-full max-w-2xl">
          {quests.map((quest, index) => {
            const isUnlocked = index === 0 || quests[index - 1].completed;
            const questStatus = quest.completed
              ? "bg-blue-500 border-blue-700"
              : isUnlocked
              ? "bg-orange-500 border-orange-700"
              : "bg-gray-600 border-gray-700";

            return (
              <div
                key={quest.id}
                className={`relative flex items-center mb-20 ${
                  index % 2 === 0 ? "self-start" : "self-end"
                }`}
                style={{
                  position: "relative",
                  left: index % 2 === 0 ? "105px" : "-105px",
                }}
                onClick={(e) => handleClick(e, quest, isUnlocked)}
              >
                <div
                  className={`relative flex items-center justify-center w-16 h-16 rounded-full border-4 transition-transform duration-200 transform hover:scale-110 cursor-pointer ${questStatus}`}
                >
                  <span className="text-white text-lg font-bold">{quest.id}</span>
                </div>
              </div>
            );
          })}
        </div>

        {selectedQuest && dialogPosition && (
          <div
            className={`absolute z-50 p-5 rounded-lg text-white dialog-box ${
              selectedQuest.completed
                ? "bg-blue-500"
                : selectedQuest.isUnlocked
                ? "bg-orange-500"
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
                  selectedQuest.completed
                    ? "#2B6CB0"
                    : selectedQuest.isUnlocked
                    ? "#DD6B20"
                    : "#2D3748",
              }}
            >
              &times;
            </button>

            <div
              className="absolute top-[-10px] left-[50%] transform translate-x-[-50%] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px]"
              style={{
                borderBottomColor:
                  selectedQuest.completed
                    ? "#4299e1"
                    : selectedQuest.isUnlocked
                    ? "#ED8936"
                    : "#718096",
              }}
            ></div>

            <h2 className="text-2xl font-bold mb-2">{selectedQuest.title}</h2>
            <p className="text-lg mb-4">
              {selectedQuest.completed
                ? "This quest is completed."
                : selectedQuest.isUnlocked
                ? "This quest is unlocked."
                : "Sorry, this quest is locked."}
            </p>

            {selectedQuest.completed && (
              <button
                className="px-4 py-2 bg-white text-blue-700 rounded hover:bg-gray-100 transition"
                onClick={() => navigateToQuest(selectedQuest.id)}
              >
                Go to Quest
              </button>
            )}

            {selectedQuest.isUnlocked && !selectedQuest.completed && (
              <button
                className="px-4 py-2 bg-white text-orange-700 rounded hover:bg-gray-100 transition"
                onClick={() => navigateToQuest(selectedQuest.id)}
              >
                Start Quest
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

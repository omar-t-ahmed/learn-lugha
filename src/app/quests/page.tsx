"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar"; // Import the Sidebar component
import ProgressBar from "@/components/ProgressBar"; // Import the custom ProgressBar component
import { FaCheckCircle, FaGem } from 'react-icons/fa';

interface Quest {
  id: number;
  title: string;
  description: string;
  goal: string;
  progress: number; // Progress in percentage
  completed: boolean;
}

const questsData: Quest[] = [
  {
    id: 1,
    title: 'Earn 10 XP',
    description: 'Earn a total of 10 experience points.',
    goal: '10 XP',
    progress: 50, // Example progress
    completed: false,
  },
  {
    id: 2,
    title: 'Complete 5 minutes of learning',
    description: 'Spend at least 5 minutes learning today.',
    goal: '5 minutes',
    progress: 75,
    completed: false,
  },
  {
    id: 3,
    title: 'Score 80% or higher in 2 lessons',
    description: 'Achieve at least 80% score in 2 lessons.',
    goal: '80% in 2 lessons',
    progress: 25,
    completed: false,
  },
];

const QuestPage = () => {
  const [quests, setQuests] = useState(questsData);

  const handleQuestCompletion = (id: number) => {
    setQuests(prevQuests =>
      prevQuests.map(quest =>
        quest.id === id ? { ...quest, completed: true } : quest
      )
    );
  };

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-purple-700 min-h-screen text-white flex">
      <Sidebar />
      <div className="ml-64 p-10 flex flex-col items-center w-full">
        <h1 className="text-3xl font-bold mb-10">Daily Quests</h1>
        <div className="space-y-4 w-full max-w-3xl">
          {quests.map(quest => (
            <div key={quest.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">{quest.title}</h2>
                {quest.completed && (
                  <FaCheckCircle className="text-green-500 text-2xl" />
                )}
              </div>
              <p className="text-gray-300 mb-2">{quest.description}</p>
              <ProgressBar
                progress={quest.progress}
                completed={quest.completed}
              />
              <div className="flex items-center justify-between text-gray-400">
                <span>{quest.progress}% completed</span>
                {quest.completed ? (
                  <span className="text-green-600 flex items-center">
                    <FaGem className="mr-1" /> 5 Gems
                  </span>
                ) : (
                  <button
                    onClick={() => handleQuestCompletion(quest.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    Mark as Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestPage;

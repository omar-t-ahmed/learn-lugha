'use client';
import React, { useState, useEffect } from "react";
import { getCurrentUserToken } from '@/firebase'; // Assuming you stored the Firebase config in a file like firebase.ts

interface UserProgressProps {
  maxLevel: number;
}

const UserProgress: React.FC<UserProgressProps> = ({ maxLevel }) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const token = await getCurrentUserToken(); // Get the user's token

        if (!token) {
          console.error("No user token found");
          return;
        }

        const response = await fetch("/api/progress", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Use the Firebase token
          },
        });

        const data = await response.json();
        setProgress(data.level); // Set progress level from the fetched data
      } catch (error) {
        console.error("Failed to fetch progress:", error);
      }
    };

    fetchProgress();
  }, []);

  const percentage = (progress / maxLevel) * 100;

  return (
    <div className="p-4 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
      <div className="w-full bg-gray-300 rounded-full h-6">
        <div
          className="bg-green-500 h-6 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-center text-white text-sm mt-2">
        {progress} / {maxLevel} lessons completed
      </p>
    </div>
  );
};

export default UserProgress;
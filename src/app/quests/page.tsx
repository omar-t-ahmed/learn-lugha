"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";

const QuestsPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-purple-700 min-h-screen text-white">
      <Sidebar />
      <div className="ml-64 p-10">
        <h1 className="text-3xl font-bold mb-10">Quests</h1>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Active Quests</h2>
          <ul className="list-disc list-inside">
            <li className="text-lg mb-2">Quest 1: Description of Quest 1.</li>
            <li className="text-lg mb-2">Quest 2: Description of Quest 2.</li>
            <li className="text-lg mb-2">Quest 3: Description of Quest 3.</li>
          </ul>
          <p className="text-lg mt-4">Additional quest details or instructions can be added here.</p>
        </div>
      </div>
    </div>
  );
};

export default QuestsPage;

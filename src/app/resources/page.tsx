"use client";

import React from "react";
import Sidebar from "@/components/Sidebar"; // Import the Sidebar component

// Define the Resource type
interface Resource {
  id: number;
  title: string;
  description: string;
  link: string;
}

// Array of resources
const resources: Resource[] = [
  {
    id: 1,
    title: "Linguanaut: Learn Arabic",
    description: "A comprehensive resource for learning Arabic with various lessons and materials.",
    link: "https://www.linguanaut.com/learn-arabic/index.php",
  },
  {
    id: 2,
    title: "Arabic Keyboard",
    description: "An online tool to help with typing in Arabic.",
    link: "https://www.arabic-keyboard.org/",
  },
  {
    id: 3,
    title: "ArabicPod101 YouTube Channel",
    description: "A YouTube channel offering Arabic lessons for beginners and advanced learners.",
    link: "https://www.youtube.com/user/ArabicPod101",
  },
];

export default function ResourcesPage() {
  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-purple-700 min-h-screen text-white">
      <Sidebar />
      <div className="ml-64 p-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-10">Arabic Learning Resources</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {resources.map((resource) => (
            <div key={resource.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-2">{resource.title}</h2>
              <p className="text-gray-300 mb-4">{resource.description}</p>
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 transition"
              >
                Visit Resource
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

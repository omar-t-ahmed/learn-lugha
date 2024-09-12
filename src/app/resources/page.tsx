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
    title: "Arabic Alphabet",
    description: "If you're a beginner and you want to learn the Arabic alphabet, start here!",
    link: "https://www.arabic-course.com/arabic-alphabet.html",
  },
  {
    id: 2,
    title: "Arabic Grammar and Basics",
    description: "If you a want a full comprehensive course on Arabic grammar and basics, start here!",
    link: "https://www.madinaharabic.com/arabic-reading-course/lessons",
  },
  {
    id: 3,
    title: "ArabicPod101 YouTube Channel",
    description: "A great summary of basic conversational Arabic for beginners!",
    link: "https://www.youtube.com/watch?v=UvWJoZJfVuk",
  },
];

export default function ResourcesPage() {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
      <Sidebar />
      <div className="ml-64 p-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-10">Arabic Learning Resources</h1>
        <div className="flex flex-col items-center w-full max-w-6xl">
          {resources.map((resource) => (
            <div key={resource.id} className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 w-full text-center">
              <h2 className="text-2xl text-indigo-500 font-bold mb-2">{resource.title}</h2>
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

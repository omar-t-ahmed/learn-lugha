"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";

const ProfilePage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-purple-700 min-h-screen text-white">
      <Sidebar />
      <div className="ml-64 p-10">
        <h1 className="text-3xl font-bold mb-10">Profile</h1>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
          <p className="text-lg mb-2">Name: John Doe</p>
          <p className="text-lg mb-2">Email: john.doe@example.com</p>
          <p className="text-lg mb-2">Member since: January 2022</p>
          <p className="text-lg">Additional profile information goes here.</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

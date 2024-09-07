"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";

const ProfilePage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
      <Sidebar />
      <div className="p-4 md:ml-64 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10">Profile</h1>
        <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">User Profile</h2>
          <p className="text-base md:text-lg mb-2">Name: John Doe</p>
          <p className="text-base md:text-lg mb-2">Email: john.doe@example.com</p>
          <p className="text-base md:text-lg mb-2">Member since: January 2022</p>
          <p className="text-base md:text-lg">Additional profile information goes here.</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
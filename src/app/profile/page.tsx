"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

interface User {
  email: string;
  name?: string;
  username: string;
  gender: string;
  createdAt: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you're storing the JWT in localStorage
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
      <Sidebar />
      <div className="p-4 md:ml-64 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10">Profile</h1>
        <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg">
          {user ? (
            <>
              <h2 className="text-xl md:text-2xl font-semibold mb-4">User Profile</h2>
              <p className="text-base md:text-lg mb-2">Name: {user.name || "N/A"}</p>
              <p className="text-base md:text-lg mb-2">Email: {user.email}</p>
              <p className="text-base md:text-lg mb-2">Username: {user.username}</p>
              <p className="text-base md:text-lg mb-2">Gender: {user.gender}</p>
              <p className="text-base md:text-lg mb-2">Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
            </>
          ) : (
            <p className="text-base md:text-lg">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

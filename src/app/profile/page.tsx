"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { getCurrentUserToken } from "@/firebase"; // Adjust the import path as needed
import Avatar from "@mui/material/Avatar";

interface User {
  email: string;
  name?: string;
  username: string;
  gender: string;
  createdAt: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await getCurrentUserToken();
        if (!token) {
          throw new Error("User not authenticated");
        }
  
        const response = await fetch("/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to fetch user data: ${errorData.error}`);
        }
  
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, []);
  
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
        <Sidebar />
        <div className="p-4 md:ml-64 md:p-10 flex items-center justify-center">
          <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md">
            <p className="text-base md:text-lg text-center">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
      <Sidebar />
      <div className="p-4 md:ml-64 flex items-center justify-center min-h-screen">
        <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">My Profile</h2>
          <Avatar sx={{ width: 120, height: 120, marginBottom: 2 }} />
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">Name: {user?.name || "N/A"}</p>
            <p className="text-lg font-semibold mb-2">Email: {user?.email}</p>
            <p className="text-lg font-semibold mb-2">Username: {user?.username}</p>
            <p className="text-lg font-semibold mb-2">Gender: {user?.gender}</p>
            {/* Removed the Date Joined section */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

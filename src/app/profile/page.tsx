"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { getCurrentUserToken } from "@/firebase"; // Adjust the import path as needed
import { useRouter } from "next/navigation"; // For navigation

interface User {
  email: string;
  name?: string;
  username: string;
  gender: string;
  createdAt: string;
  isSubscribed: boolean;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false); // Manage cancellation state
  const router = useRouter(); // For navigation

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
            Authorization: `Bearer ${token}`, // Correctly formatted Bearer token
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

  const handleCancelSubscription = async () => {
    if (!user) return;

    const confirmed = window.confirm("Are you sure you want to cancel your subscription?");
    if (confirmed) {
      try {
        setIsCancelling(true);

        const response = await fetch("/api/stripe/cancel-subscription", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.email }),
        });

        if (!response.ok) {
          throw new Error("Failed to cancel subscription");
        }

        const result = await response.json();
        console.log(result.message);
        setUser({ ...user, isSubscribed: false });
      } catch (error) {
        console.error("Error canceling subscription:", error);
      } finally {
        setIsCancelling(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
        <Sidebar />
        <div className="p-4 md:ml-64 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10">Profile</h1>
          <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg">
            <p className="text-base md:text-lg">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

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
              
              {user.isSubscribed ? (
                <button
                  onClick={handleCancelSubscription}
                  disabled={isCancelling}
                  className="mt-4 px-4 py-2 bg-red-500 text-white font-bold rounded-lg shadow hover:bg-red-600 transition"
                >
                  {isCancelling ? "Cancelling..." : "Cancel Subscription"}
                </button>
              ) : (
                <div>
                  <p className="text-green-500 mb-4">You are not subscribed to any plan.</p>
                  <button
                    onClick={() => router.push("/subscribe")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded-lg shadow hover:bg-blue-600 transition"
                  >
                    Subscribe Now
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-base md:text-lg">No user data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
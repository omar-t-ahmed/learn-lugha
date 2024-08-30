"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { PrismaClient } from "@prisma/client";
import Navbar from "@/components/Navbar";

const prisma = new PrismaClient();

export default function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Create the user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Extract the user UID from Firebase
      const userUID = userCredential.user.uid;

      // Store the additional user information in MongoDB
      await prisma.user.create({
        data: {
          id: userUID, // Using Firebase UID as the MongoDB ID
          name: name,
          username: username,
          email: email,
        },
      });

      // Redirect to the lessons page
      router.push("/lessons");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-purple-700">
      <Navbar />
      <div className="min-h-screen flex flex-col md:flex-row md:pb-10">
        <div className="hidden md:flex md:flex-1 md:flex-col md:justify-center md:items-center p-10">
          <div className="z-10 max-w-lg mx-auto text-left">
            <h2 className="text-white text-3xl font-bold mb-6">
              Start Your Arabic Learning Journey Today
            </h2>
            <ul className="text-gray-300 space-y-3">
              <li className="flex items-start justify-center">
                <span className="mr-2">✓</span>
                <span>
                  Master Arabic with our AI-powered platform, designed to adapt
                  to your learning style and pace.
                </span>
              </li>
              <li className="flex items-start justify-center">
                <span className="mr-2">✓</span>
                <span>
                  Experience a personalized learning journey and tailored
                  lessons that evolve as you progress.
                </span>
              </li>
              <li className="flex items-start justify-center">
                <span className="mr-2">✓</span>
                <span>
                  Track your progress with achievement badges and personalized
                  tips to stay motivated.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="z-10 flex-1 flex items-center justify-center p-4 md:p-10">
          <form
            onSubmit={handleSignUp}
            className="bg-zinc-800 p-6 md:p-8 rounded-lg shadow-lg w-full max-w-lg md:max-w-lg"
          >
            <h1 className="text-2xl font-semibold mb-6 text-center text-white">
              Create your account
            </h1>

            <div className="mb-4">
              <label
                className="block text-white text-sm font-medium mb-1"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-700 bg-zinc-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your Name"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-white text-sm font-medium mb-1"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-700 bg-zinc-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your Username"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-white text-sm font-medium mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-700 bg-zinc-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="example@gmail.com"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-white text-sm font-medium mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-700 bg-zinc-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Password"
                required
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-white text-sm font-medium mb-1"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full px-4 py-2 border border-zinc-700 bg-zinc-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Confirm Password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-md"
            >
              Create account
            </button>

            <button
              type="button"
              className="w-full mt-4 py-3 border border-purple-600 bg-transparent hover:bg-purple-900 text-white font-semibold rounded-md flex items-center justify-center"
            >
              <span className="mr-2">G</span> Sign Up with Google
            </button>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <a href="/login" className="text-purple-600 hover:text-purple-700 underline">
                  Sign in
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
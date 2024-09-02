"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import bcrypt from 'bcryptjs';

export default function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Passwords must be at least 6 characters.");
      return;
    }

    try {
      // Hash the password
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Create the user in your database
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password: hashedPassword,
          name,
          username,
        }),
      });

      if (response.ok) {
        // Automatically log the user in
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (result?.error) {
          setError(result.error);
        } else {
          router.push("/lessons");
        }
      } else {
        console.error("Failed to create user in database");
        setError("Failed to create user in database.");
      }
    } catch (error: any) {
      console.error("Error signing up:", error);
      setError("An error occurred while signing up. Please try again.");
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signIn("google", { callbackUrl: "/lessons" });
      if (result?.error) {
        setError("Failed to sign up with Google.");
      }
    } catch (error: any) {
      console.error("Error signing up with Google:", error);
      setError("An error occurred while signing up with Google. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-purple-700 min-h-screen">
      <Navbar />
      <div className="min-h-screen flex flex-col md:flex-row md:pb-10">
        {/* Left Text Section */}
        <div className="hidden md:flex md:flex-1 md:flex-col md:justify-center md:items-center p-10">
          <div className="z-10 max-w-lg mx-auto text-left">
            <h2 className="text-white text-3xl font-bold mb-6">
              Start Your Arabic Learning Journey Today
            </h2>
            <ul className="text-gray-300 space-y-3">
              <li className="flex items-start justify-center">
                <Image
                  src="/check_circle.svg"
                  alt="Check"
                  width={15}
                  height={15}
                  className="mr-2 mt-1"
                />
                <p>
                  Master Arabic with our AI-powered platform, designed to adapt
                  to your learning style and pace.
                </p>
              </li>
              <li className="flex items-start justify-center">
                <Image
                  src="/check_circle.svg"
                  alt="Check"
                  width={15}
                  height={15}
                  className="mr-2 mt-1"
                />
                <p>
                  Experience a personalized learning journey and tailored
                  lessons that evolve as you progress.
                </p>
              </li>
              <li className="flex items-start justify-center">
                <Image
                  src="/check_circle.svg"
                  alt="Check"
                  width={15}
                  height={15}
                  className="mr-2 mt-1"
                />
                <p>
                  Track your progress with achievement badges and personalized
                  tips to stay motivated.
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Sign-Up Form Section */}
        <div className="z-10 flex-1 flex items-center justify-center p-4 md:p-10">
          <div className="w-full max-w-xl bg-zinc-900 p-8 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-center text-white mb-10">Create an account</h1>
            
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={handleGoogleSignUp}
                className="flex items-center justify-center w-2/3 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700"
              >
                <span className="mr-2">G</span> Sign Up with Google
              </button>
            </div>
            
            <div className="flex items-center justify-center text-gray-500 mb-6">
              <span className="w-1/4 border-t border-gray-700"></span>
              <span className="px-2">or</span>
              <span className="w-1/4 border-t border-gray-700"></span>
            </div>
            
            <form onSubmit={handleSignUp}>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-4 w-full px-4 py-3 border border-zinc-700 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Name"
                required
              />
              
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mb-4 w-full px-4 py-3 border border-zinc-700 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Username"
                required
              />
              
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4 w-full px-4 py-3 border border-zinc-700 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Email"
                required
              />
              
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4 w-full px-4 py-3 border border-zinc-700 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Password"
                required
              />
              
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mb-6 w-full px-4 py-3 border border-zinc-700 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Confirm password"
                required
              />
              
              {error && (
                <div className="mb-4 p-2 text-red-600 bg-red-100 rounded">
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200"
              >
                Sign up
              </button>
            </form>
            
            <p className="mt-6 text-center text-gray-400">
              Already have an account?{" "}
              <a href="/signin" className="text-purple-600 underline font-semibold">
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

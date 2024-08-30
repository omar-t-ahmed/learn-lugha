"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Navbar from "@/components/Navbar";

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/lessons');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-black via-black to-purple-700 text-white">
      <main className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-6 py-10">
        <form onSubmit={handleSignUp} className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <p className="text-3xl md:text-4xl font-extrabold text-white mb-8 text-center">Sign Up</p>
          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-700 bg-zinc-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-2" htmlFor="password">
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
          <div className="mb-10">
            <label className="block text-white text-sm font-medium mb-2" htmlFor="confirm-password">
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
            Sign Up
          </button>
          <button
            type="button"
            className="w-full mt-4 py-3 bg-purple-800 hover:bg-purple-900 text-white font-semibold rounded-md"
          >
            <span className="mr-2">G</span> Sign Up with Google
          </button>
        </form>
      </main>
      <footer className="mb-5">
        <p className="text-center text-gray-400">© 2024 LearnLugha. All rights reserved.</p>
      </footer>
    </div>
  );
}

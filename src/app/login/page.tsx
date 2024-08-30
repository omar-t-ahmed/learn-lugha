"use client";

import { useState } from 'react';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/lessons');
    } catch (error: any) {
      if (error.code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password.');
      } else if (error.code === 'auth/user-not-found') {
        setError('User not found.');
      } else {
        setError('Incorrect username or password.');
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-purple-700 min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center p-6 md:p-16 mt-10 md:mt-20">
        <form onSubmit={handleLogin} className="bg-zinc-800 p-6 md:p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h1 className="text-2xl font-semibold mb-6 text-center text-white">Sign in</h1>
          {error && (
            <div className="mb-4 p-4 bg-red-600 text-white rounded-md">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-zinc-700 bg-zinc-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-zinc-700 bg-zinc-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-md"
          >
            Sign in
          </button>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              New to LearnLugha?{" "}
              <a href="/signup" className="text-purple-600 hover:text-purple-700 underline">
                Create an account
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
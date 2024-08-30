"use client";

import { useState } from 'react';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // State for error messages
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous error messages
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/lessons'); // Redirect to the lessons page
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
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-black via-black to-purple-700 text-white">
      <main className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8">Login</h1>
        <form onSubmit={handleLogin} className="bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-md">
          {error && (
            <div className="mb-4 p-4 bg-red-600 text-white rounded-md">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-600 bg-zinc-900 text-white rounded-md focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-600 bg-zinc-900 text-white rounded-md focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-md"
          >
            Login
          </button>
        </form>
      </main>
      <footer className="mb-5">
        <p className="text-center text-gray-400">© 2024 LearnLugha. All rights reserved.</p>
      </footer>
    </div>
  );
}

"use client";

import { useState } from 'react';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
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

  const handleGoogleSignIn = async () => {
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/lessons');
    } catch (error: any) {
      setError('Failed to sign in with Google.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-purple-700 min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center p-6 md:p-16 mt-10 md:mt-20">
        <div className="w-full max-w-xl bg-zinc-900 p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-center text-white mb-10">Sign in</h1>
          {error && (
            <div className="mb-4 p-4 bg-red-600 text-white rounded-md">
              {error}
            </div>
          )}
          
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center w-2/3 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700"
            >
              <span className="mr-2">G</span> Sign in with Google
            </button>
          </div>

          <div className="flex items-center justify-center text-gray-500 mb-6">
            <span className="w-1/4 border-t border-gray-700"></span>
            <span className="px-2">or</span>
            <span className="w-1/4 border-t border-gray-700"></span>
          </div>

          <form onSubmit={handleLogin}>
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

            <button
              type="submit"
              className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200"
            >
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400">
            New to LearnLugha?{" "}
            <a href="/signup" className="text-purple-600 underline font-semibold">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function Welcome() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login'); // Redirect to login if no user is logged in
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-black via-black to-purple-700 text-white">
      <Navbar /> {/* Optional: Include Navbar if needed */}
      <main className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 text-center">
          Welcome to LearnLugha
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Start your Arabic learning journey today!
        </p>
        <div className="flex space-x-4">
          <Link href="/signup">
            <button className="py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-md">
              Get Started
            </button>
          </Link>
          <Link href="/login">
            <button className="py-2 px-4 bg-gray-700 hover:bg-gray-800 text-white font-bold rounded-md">
              I Already Have an Account
            </button>
          </Link>
        </div>
      </main>
      <footer className="mb-5">
        <p className="text-center text-gray-400">© 2024 LearnLugha. All rights reserved.</p>
      </footer>
    </div>
  );
}

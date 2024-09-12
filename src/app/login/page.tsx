"use client";

import { useState } from "react";
import { auth } from "@/firebase";
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/LEARN LUGHA.png";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/home");
        } catch (error: any) {
            if (error.code === "auth/invalid-email") {
                setError("Invalid email address.");
            } else if (error.code === "auth/wrong-password") {
                setError("Incorrect password.");
            } else if (error.code === "auth/user-not-found") {
                setError("User not found.");
            } else {
                setError("Incorrect username or password.");
            }
        }
    };

    const handleGoogleSignIn = async () => {
        setError(null);
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            auth.currentUser
                ?.getIdToken(true)
                .then((idToken) => {
                })
                .catch((error) => {
                    console.error("Error getting ID token:", error);
                });
            router.push("/home");
        } catch (error: any) {
            setError("Failed to sign in with Google.");
        }
    };

    return (
        <div className="bg-black min-h-screen relative isolate">
            {/* Navbar */}
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-center p-6 lg:px-8">
                    <Link href="/" className="flex justify-center mb-1 items-center">
                        <Image src={logo} className="block h-9 w-9" alt="Logo" />
                    </Link>
                </nav>
            </header>

            {/* Background Polygons */}
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#001aff] to-[#c689fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
            </div>
            <div className="absolute inset-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
                <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#7b00ff] to-[#1100ff] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
            </div>

            {/* Login Form */}
            <div className="min-h-screen flex items-center justify-center p-6 md:p-16">
                <div className="w-full max-w-xl bg-zinc-900 p-8 rounded-2xl shadow-lg">
                    <h1 className="text-3xl font-bold text-center text-white mb-10">
                        Sign in
                    </h1>
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
                        <Link href="/signup" className="text-purple-600 hover:underline font-semibold">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
"use client";

import React, { useState, useEffect } from "react";
import { auth } from "@/firebase"; // Ensure this is the correct path to your firebase file
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function CheckoutPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    // Fetch the logged-in user's email
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && user.email) {
                setUserEmail(user.email);
            } else {
                setUserEmail(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleCheckout = async (plan: {
        name: string;
        price: number;
        interval: string;
    }) => {
        if (!userEmail) {
            setError("You must be logged in to subscribe.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ plan, email: userEmail }), // Send plan and user email
            });

            const session = await res.json();

            if (session.error) {
                setError(session.error.message);
                setLoading(false);
                return;
            }

            // Redirect to Stripe Checkout
            window.location.href = session.url;
        } catch (error) {
            setError("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="relative isolate min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 to-black text-white">
            <Navbar />

            {/* Hero-like background polygons */}
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#001aff] to-[#c689fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]">
                </div>
            </div>
            <div className="absolute inset-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
                <div
                    className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#7b00ff] to-[#1100ff] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]">
                </div>
            </div>

            <div className="flex flex-grow flex-col items-center justify-center w-full max-w-7xl mx-auto px-6 pt-20">
                <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text text-white leading-8 text-center">
                    Join our {" "}
                    <span className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600">
                        Premium Plan
                    </span>
                    {" "} to Continue your Journey
                </h1>
                <p className="mt-4 text-md md:text-lg text-gray-400 text-center">
                    Unlock premium features to accelerate your Arabic learning
                    journey.
                </p>

                {error && <p className="text-red-500 mt-4">{error}</p>}

                <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mt-12">

                    <div className="p-6 bg-gray-900 border-2 border-gray-700 rounded-lg shadow-lg hover:scale-105 transform transition-all flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4 text-center">
                                Pro Plan
                            </h2>
                            <p className="text-gray-400 text-center mb-6">
                                $4.99/month
                            </p>
                            <ul className="text-gray-300 space-y-3">
                                <li className="flex items-start justify-center">
                                    <Image src="/check_circle.svg" alt="Check" width={15} height={15} className="mr-2 mt-1" />
                                    <p>Access to 50+ lessons</p>
                                </li>
                                <li className="flex items-start justify-center">
                                    <Image src="/check_circle.svg" alt="Check" width={15} height={15} className="mr-2 mt-1" />
                                    <p>Personalized learning paths</p>
                                </li>
                                <li className="flex items-start justify-center">
                                    <Image src="/check_circle.svg" alt="Check" width={15} height={15} className="mr-2 mt-1 mb-10" />
                                    <p>AI-powered conversations</p>
                                </li>
                            </ul>
                        </div>
                        <button
                            onClick={() =>
                                handleCheckout({
                                    name: "Pro Plan",
                                    price: 499,
                                    interval: "month",
                                })
                            }
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
                        >
                            Subscribe to Premium
                        </button>
                    </div>
                </div>
            </div>

            <footer className="mt-12 mb-5">
                <p className="text-center text-gray-400">
                    © 2024 LearnLugha. All rights reserved.
                </p>
            </footer>
        </div>
    );
}

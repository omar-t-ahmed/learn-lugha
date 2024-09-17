"use client";

import React, { useState, useEffect } from "react";
import { auth } from "@/firebase"; // Ensure this is the correct path to your firebase file
import { onAuthStateChanged } from "firebase/auth";

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
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-black via-black to-purple-700 text-white">
            <div className="flex flex-grow flex-col items-center justify-center w-full max-w-7xl mx-auto px-6">
                <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text text-white leading-8 text-center">
                    Choose Your{" "}
                    <span className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600">
                        Subscription Plan
                    </span>
                </h1>
                <p className="mt-4 text-md md:text-lg text-gray-400 text-center">
                    Unlock premium features to accelerate your Arabic learning
                    journey.
                </p>

                {error && <p className="text-red-500 mt-4">{error}</p>}

                <div className="grid grid-cols-1 gap-8 mt-12">
                    <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transform transition-all flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4 text-center">
                                Premium Plan
                            </h2>
                            <p className="text-gray-400 text-center mb-6">
                                $5/month
                            </p>
                            <ul className="text-gray-400 mb-8 space-y-3 h-32">
                                <li>✓ Access to 50+ lessons</li>
                                <li>✓ AI-powered conversations</li>
                            </ul>
                        </div>
                        <button
                            onClick={() =>
                                handleCheckout({
                                    name: "Premium Plan",
                                    price: 500,
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

'use client'
import React, { useState } from "react";

export default function Waitlist() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("Thank you! You've been added to the waitlist.");
        setEmail(""); // Clear the email field after submission
    };

    return (
        <div className="max-w-md mx-auto  p-10 rounded-md shadow-md">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Join the Waitlist
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <input
                    type="email"
                    className="p-3 border border-gray-600 bg-zinc-900 rounded-md mb-4 text-white"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="button-purple"
                >
                    Join Waitlist
                </button>
            </form>
            {message && <p className="mt-4 text-white">{message}</p>}
        </div>
    );
}
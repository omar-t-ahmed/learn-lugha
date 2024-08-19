'use client';

import React, { useState } from "react";
import db from "../../src/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Waitlist() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted"); // Check if form submission is triggered

        try {
            console.log("Attempting to add to Firestore"); // Check before Firestore call

            // Add the email to Firestore
            const docRef = await addDoc(collection(db, "waitlist"), {
                email: email,
                timestamp: new Date(), // Optionally, you can store the timestamp for when the email was added
            });
            console.log("Document successfully written with ID: ", docRef.id);

            // Show confirmation message
            setMessage("Thank you! You've been added to the waitlist.");
            setEmail(""); // Clear the email field after submission

        } catch (error) {
            // Type guard to check if the error is an instance of Error
            if (error instanceof Error) {
                console.error("Error adding document: ", error.message);
                setMessage("There was an error. Please try again.");
            } else {
                console.error("Unexpected error: ", error);
                setMessage("There was an unexpected error. Please try again.");
            }
        }
    };

    return (
        <div className="max-w-md mx-auto p-10 rounded-md shadow-md">
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
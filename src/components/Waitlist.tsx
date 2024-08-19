'use client';

import React, { useState } from "react";
import db from "../../src/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Waitlist() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted");
    
        try {
            console.log("Attempting to add to Firestore");
    
            // Add the email to Firestore
            const docRef = await addDoc(collection(db, "waitlist"), {
                email: email,
                timestamp: new Date(),
            });
            console.log("Document successfully written with ID: ", docRef.id);
    
            // Send the confirmation email via the API route
            const response = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
    
            const data = await response.json();
    
            if (data.success) {
                setMessage("Thank you! You've been added to the waitlist.");
            } else {
                setMessage("There was an error sending the confirmation email.");
            }
    
            setEmail(""); // Clear the email field after submission
    
        } catch (error) {
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
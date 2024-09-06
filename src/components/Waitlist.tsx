'use client';

import React, { useState } from "react";
import {db} from "../../src/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

export default function Waitlist() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            // Query Firestore to check if the email already exists
            const q = query(collection(db, "waitlist"), where("email", "==", email));
            const querySnapshot = await getDocs(q);
    
            if (!querySnapshot.empty) {
                setMessage("This email is already on the waitlist.");
                return;
            }
    
            // Add the email to Firestore
            await addDoc(collection(db, "waitlist"), {
                email: email,
                timestamp: new Date(),
            });
    
            // Immediately provide positive feedback before the email is sent
            setMessage("Thank you! You've been added to the waitlist.");
    
            // Send the confirmation email via the API route
            const response = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
    
            const data = await response.json();
    
            if (!data.success) {
                setMessage("Thank you! You've been added to the waitlist, but there was an error sending the confirmation email.");
            }
    
            setEmail(""); // Clear the email field after submission
    
        } catch (error) {
            setMessage("There was an error. Please try again.");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-10 rounded-md">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Sign up for our waitlist and get <span className="font-bold text-purple-400">5 free lessons!</span>
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="flex rounded-md shadow-sm">
                    <input
                        type="email"
                        className="p-3 border-t-2 border-b-2 border-l-2 border-gray-600 bg-zinc-900 text-white flex-grow rounded-l-md focus:outline-none"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="button-purple p-3 text-white font-bold bg-purple-500 rounded-r-md"
                    >
                        Sign Up
                    </button>
                </div>
            </form>
            {message && <p className="mt-4 text-white text-center">{message}</p>}
        </div>
    );
}
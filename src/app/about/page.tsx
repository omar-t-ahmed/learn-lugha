'use client'
import React from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function About() {
  return (
    <div className="relative isolate min-h-screen flex flex-col items-center bg-black text-white">
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

      {/* About Content */}
      <main className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-6 pb-16 pt-10">
        <p className="text-4xl font-bold tracking-tight text-white text-center">
          About LearnLugha
        </p>
        <p className="mt-6 mb-14 text-lg leading-8 text-gray-400 text-center">
          LearnLugha is a language learning platform designed to help you master Arabic using the power of AI. Our mission is to make learning Arabic accessible, engaging, and effective for everyone, no matter your skill level.
        </p>

        <section className="w-full text-center mb-10">
          <h2 className="text-3xl font-semibold text-white mb-4">Our Vision</h2>
          <ul className="text-gray-300 space-y-3">
            <li className="flex items-center justify-center">
              <p>At LearnLugha, we believe language is a gateway to culture, and by learning Arabic, you&apos;re opening doors to new opportunities. Our vision is to break down language barriers and make learning enjoyable, by combining advanced AI technology with human-centered design. Whether you&apos;re preparing for travel, improving career opportunities, or connecting with Arabic-speaking communities, LearnLugha is your partner in mastering the Arabic language.</p>
            </li>
          </ul>
        </section>

        <section className="w-full text-center mb-10">
          <h2 className="text-3xl font-semibold text-white mb-4">How It Works</h2>
          <ul className="text-gray-300 space-y-3">
            <li className="flex items-center justify-center">
              <p>LearnLugha uses advanced AI to customize lessons based on your progress and learning style. As you complete lessons, our AI analyzes your strengths and areas for improvement, adapting future lessons to suit your needs. This ensures a personalized experience that keeps you motivated and progressing.</p>
            </li>
          </ul>
        </section>

        <section className="w-full text-center mb-10">
          <h2 className="text-3xl font-semibold text-white mb-4">What We Offer</h2>
          <ul className="text-gray-300 space-y-3">
            <li className="flex items-center justify-center">
              <Image src="/check_circle.svg" alt="Check" width={15} height={15} className="mr-2 mt-1" />
              <p>AI-driven lessons tailored to your level and pace</p>
            </li>
            <li className="flex items-center justify-center">
              <Image src="/check_circle.svg" alt="Check" width={15} height={15} className="mr-2 mt-1" />
              <p>Real-time feedback on pronunciation and grammar</p>
            </li>
            <li className="flex items-center justify-center">
              <Image src="/check_circle.svg" alt="Check" width={15} height={15} className="mr-2 mt-1" />
              <p>Conversation practice through an AI chatbot</p>
            </li>
            <li className="flex items-center justify-center">
              <Image src="/check_circle.svg" alt="Check" width={15} height={15} className="mr-2 mt-1" />
              <p>Trackable progress and achievement badges</p>
            </li>
          </ul>
        </section>

        <section className="w-full text-center">
          <h2 className="text-3xl font-semibold text-white mb-4">Join Us</h2>
          <ul className="text-gray-300 space-y-3">
            <li className="flex items-center justify-center">
              <p>We&apos;re excited to help you on your journey to mastering Arabic. Sign up today and be a part of a growing community of learners who are transforming their lives through language.</p>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
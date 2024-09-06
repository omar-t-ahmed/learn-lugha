'use client'
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";

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
      <main className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-6 pb-16 pt-8">
        <p className="text-4xl font-bold tracking-tight text-white text-center">
          About LearnLugha
        </p>
        <p className="mt-6 mb-14 text-lg leading-8 text-gray-400 text-center">
          LearnLugha is a language learning platform designed to help you master Arabic using the power of AI. Our mission is to make learning Arabic accessible, engaging, and effective for everyone, no matter your skill level.
        </p>

        <section className="w-full text-left mb-10">
          <h2 className="text-3xl font-semibold text-white mb-4">Our Vision</h2>
          <p className="text-lg text-gray-400 leading-8">
            At LearnLugha, we believe language is a gateway to culture, and by learning Arabic, you&apos;re opening doors to new opportunities. Our vision is to break down language barriers and make learning enjoyable, by combining advanced AI technology with human-centered design. Whether you&apos;re preparing for travel, improving career opportunities, or connecting with Arabic-speaking communities, LearnLugha is your partner in mastering the Arabic language.
        </p>
        </section>

        <section className="w-full text-left mb-10">
          <h2 className="text-3xl font-semibold text-white mb-4">How It Works</h2>
          <p className="text-lg text-gray-400 leading-8">
            LearnLugha uses advanced AI to customize lessons based on your progress and learning style. As you complete lessons, our AI analyzes your strengths and areas for improvement, adapting future lessons to suit your needs. This ensures a personalized experience that keeps you motivated and progressing.
          </p>
        </section>

        <section className="w-full text-left mb-10">
          <h2 className="text-3xl font-semibold text-white mb-4">What We Offer</h2>
          <p className="text-lg text-gray-400 leading-8">
            LearnLugha provides a wide range of tools to help you learn Arabic effectively, including:
          </p>
          <ul className="list-disc list-inside text-gray-400 text-lg">
            <li>AI-driven lessons tailored to your level and pace</li>
            <li>Real-time feedback on pronunciation and grammar</li>
            <li>Conversation practice through an AI chatbot</li>
            <li>Trackable progress and achievement badges</li>
          </ul>
        </section>

        <section className="w-full text-left">
          <h2 className="text-3xl font-semibold text-white mb-4">Join Us</h2>
          <p className="text-lg text-gray-400 leading-8">
            We’re excited to help you on your journey to mastering Arabic. Sign up today and be a part of a growing community of learners who are transforming their lives through language.
          </p>
        </section>
      </main>
    </div>
  );
}
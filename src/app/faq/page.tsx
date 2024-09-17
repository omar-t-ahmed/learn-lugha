'use client'
import Link from "next/link";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <div className="relative isolate min-h-screen flex flex-col items-center bg-black text-white">
      <Navbar />

      {/* Hero-like background polygons */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#001aff] to-[#c689fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}
        ></div>
      </div>
      <div className="absolute inset-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#7b00ff] to-[#1100ff] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}
        ></div>
      </div>

      {/* FAQ Content */}
      <main className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-6 py-10 ">
      <p className="text-4xl font-bold tracking-tight text-white text-center">
          Frequently Asked Questions
        </p>
        <p className="mt-2 mb-10 text-lg leading-8 text-gray-400 text-center">
          Find answers to common questions and learn how LearnLugha can help you master Arabic.
        </p>

        <Accordion type="single" collapsible className="w-full text-left text-white space-y-4 p-5 rounded-md">
          <AccordionItem value="item-1">
            <AccordionTrigger className="p-4 rounded-lg text-2xl font-bold text-white text-center md:text-left">
              <p className="ml-6 md:ml-0">What is LearnLugha?</p>
            </AccordionTrigger>
            <AccordionContent className="p-4 rounded-lg mt-2 text-lg">
              <p className="mt-2 text-center md:text-left">
                LearnLugha is more than just a language learning app—it&apos;s an AI-powered platform crafted to help you master Arabic in a way that&apos;s both engaging and highly effective. Whether you&apos;re a complete beginner or looking to refine your skills, LearnLugha offers an interactive experience that adapts to your needs and makes learning enjoyable.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="p-4 rounded-lg text-2xl font-bold text-white text-center md:text-left">
              How does AI enhance my language learning experience?
            </AccordionTrigger>
            <AccordionContent className="p-4 rounded-lg mt-2 text-lg">
              <p className="mt-2 text-center md:text-left">
                Our AI is designed to take your learning to the next level by tailoring the experience to suit your individual style. It offers personalized feedback, pinpoints areas where you can improve, and adjusts the difficulty of lessons based on your progress. This means that as you learn, the platform evolves with you, ensuring that you&apos;re always challenged, but never overwhelmed.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="p-4 rounded-lg text-2xl font-bold text-white text-center md:text-left">
              When will LearnLugha be available?
            </AccordionTrigger>
            <AccordionContent className="p-4 rounded-lg mt-2 text-lg">
              <p className="mt-2 text-center md:text-left">
                We&apos;re in the exciting final stages of development and aiming to launch very soon. By signing up for the waitlist, you&apos;ll be among the first to know when we go live, giving you early access to start your Arabic learning journey right away.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="p-4 rounded-lg text-2xl font-bold text-white text-center md:text-left">
              Is LearnLugha suitable for beginners?
            </AccordionTrigger>
            <AccordionContent className="p-4 rounded-lg mt-2 text-lg">
              <p className="mt-2 text-center md:text-left">
                Absolutely! LearnLugha is designed to cater to all skill levels, from complete beginners to advanced learners. If you&apos;re just starting your Arabic learning journey, our AI-driven platform will guide you through the basics with personalized lessons that focus on essential vocabulary, grammar, and pronunciation.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="p-4 rounded-lg text-2xl font-bold text-white text-center md:text-left">
              What makes LearnLugha different from other language learning apps?
            </AccordionTrigger>
            <AccordionContent className="p-4 rounded-lg mt-2 text-lg">
              <p className="mt-2 text-center md:text-left">
                LearnLugha is unique because it uses AI to create a truly personalized learning journey. Unlike traditional apps that offer a one-size-fits-all approach, our platform continuously adapts to your individual progress and learning style.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="p-4 rounded-lg text-2xl font-bold text-white text-center md:text-left">
              How do I track my progress with LearnLugha?
            </AccordionTrigger>
            <AccordionContent className="p-4 rounded-lg mt-2 text-lg">
              <p className="mt-2 text-center md:text-left">
                As you use LearnLugha, you&apos;ll earn achievement badges as you reach new milestones, and receive personalized tips on areas where you can improve. These features help keep you engaged and on track to reach your language goals.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger className="p-4 rounded-lg text-2xl font-bold text-white text-center md:text-left">
              How does the AI chatbot interface work in LearnLugha?
            </AccordionTrigger>
            <AccordionContent className="p-4 rounded-lg mt-2 text-lg">
              <p className="mt-2 text-center md:text-left">
                The AI chatbot in LearnLugha is like having a conversation partner available anytime you want to practice. It simulates real-life conversations that adjust to your skill level, allowing you to practice everything from basic greetings to more complex discussions.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </div>
  );
}
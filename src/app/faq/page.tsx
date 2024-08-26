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
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-black via-black to-purple-700 text-white">
      <main className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8">
          Frequently Asked Questions
        </h1>
        <Accordion type="single" collapsible className="w-full text-left text-gray-400 space-y-4">
          <AccordionItem value="item-1">
            <AccordionTrigger className="bg-gray-900 p-4 rounded-lg shadow-md text-2xl font-bold text-purple-500">
              What is LearnLugha?
            </AccordionTrigger>
            <AccordionContent className="bg-gray-900 p-4 rounded-lg shadow-md mt-2 text-lg">
              <p className="mt-2">
                LearnLugha is an AI-powered platform designed to help you learn Arabic in an engaging and effective way.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="bg-gray-900 p-4 rounded-lg shadow-md text-2xl font-bold text-purple-500">
              How does AI enhance my language learning experience?
            </AccordionTrigger>
            <AccordionContent className="bg-gray-900 p-4 rounded-lg shadow-md mt-2 text-lg">
              <p className="mt-2">
                Our AI adapts to your learning style, offering personalized feedback, identifying areas for improvement, and adjusting the difficulty of lessons.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="bg-gray-900 p-4 rounded-lg shadow-md text-2xl font-bold text-purple-500">
              When will LearnLugha be available?
            </AccordionTrigger>
            <AccordionContent className="bg-gray-900 p-4 rounded-lg shadow-md mt-2 text-lg">
              <p className="mt-2">
                We&apos;re currently in the final stages of development and plan to launch soon. By joining the waitlist, you&apos;ll be among the first to know when we go live.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="bg-gray-900 p-4 rounded-lg shadow-md text-2xl font-bold text-purple-500">
              Is LearnLugha suitable for beginners?
            </AccordionTrigger>
            <AccordionContent className="bg-gray-900 p-4 rounded-lg shadow-md mt-2 text-lg">
              <p className="mt-2">
                Absolutely! LearnLugha is designed to cater to all skill levels, from complete beginners to advanced learners. If you&apos;re just starting your Arabic learning journey, our AI-driven platform will guide you through the basics with personalized lessons that focus on essential vocabulary, grammar, and pronunciation. The learning experience is interactive and adapts to your pace, ensuring that you build a strong foundation before moving on to more complex topics. As you progress, the AI continuously tailors the content to match your growing proficiency, making your learning experience both effective and enjoyable.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="bg-gray-900 p-4 rounded-lg shadow-md text-2xl font-bold text-purple-500">
              What makes LearnLugha different from other language learning apps?
            </AccordionTrigger>
            <AccordionContent className="bg-gray-900 p-4 rounded-lg shadow-md mt-2 text-lg">
              <p className="mt-2">
                LearnLugha stands out due to its AI-driven approach, which provides a highly personalized learning experience. Unlike traditional apps, our platform continually adapts to your needs, making your journey to fluency smoother and more efficient.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger className="bg-gray-900 p-4 rounded-lg shadow-md text-2xl font-bold text-purple-500">
              How do I track my progress with LearnLugha?
            </AccordionTrigger>
            <AccordionContent className="bg-gray-900 p-4 rounded-lg shadow-md mt-2 text-lg">
              <p className="mt-2">
                LearnLugha offers detailed progress tracking through interactive dashboards and achievement badges. You&apos;ll be able to see your improvement in vocabulary, grammar, and pronunciation over time, as well as receive personalized recommendations on areas to focus on.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger className="bg-gray-900 p-4 rounded-lg shadow-md text-2xl font-bold text-purple-500">
              How does the AI chatbot interface work in LearnLugha?
            </AccordionTrigger>
            <AccordionContent className="bg-gray-900 p-4 rounded-lg shadow-md mt-2 text-lg">
              <p className="mt-2">
                The AI chatbot in LearnLugha allows you to practice Arabic conversation in a natural and interactive way. You can engage in real-time dialogue with the AI, which simulates everyday conversations based on your skill level. The chatbot responds to your inputs, provides instant feedback, and helps you improve your vocabulary, grammar, and pronunciation. Whether you&apos;re practicing greetings, ordering food, or discussing more complex topics, the AI chatbot adapts to your progress, making your learning experience both practical and immersive.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
      <footer className="mb-5">
        <p className="text-center text-gray-400">© 2024 LearnLugha. All rights reserved.</p>
      </footer>
    </div>
  );
}
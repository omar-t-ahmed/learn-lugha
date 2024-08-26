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
      <main className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-6 py-10">
        <p className="text-2xl md:text-4xl p-4 font-extrabold text-white mb-8  rounded-md">
          Frequently Asked Questions
        </p>
        <Accordion type="single" collapsible className="w-full text-left text-gray-400 space-y-4">
          <AccordionItem value="item-1">
            <AccordionTrigger className="p-4 rounded-lg text-2xl font-bold text-purple-500">
              What is LearnLugha?
            </AccordionTrigger>
            <AccordionContent className="p-4 rounded-lg mt-2 text-lg">
              <p className="mt-2">
                LearnLugha is more than just a language learning app—it&apos;s an AI-powered platform crafted to help you master Arabic in a way that&apos;s both engaging and highly effective. Whether you&apos;re a complete beginner or looking to refine your skills, LearnLugha offers an interactive experience that adapts to your needs and makes learning enjoyable.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="p-4 rounded-lg text-2xl font-bold text-purple-500">
              How does AI enhance my language learning experience?
            </AccordionTrigger>
            <AccordionContent className="p-4 rounded-lg mt-2 text-lg">
              <p className="mt-2">
                Our AI is designed to take your learning to the next level by tailoring the experience to suit your individual style. It offers personalized feedback, pinpoints areas where you can improve, and adjusts the difficulty of lessons based on your progress. This means that as you learn, the platform evolves with you, ensuring that you&apos;re always challenged, but never overwhelmed.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="p-4 rounded-lg text-2xl font-bold text-purple-500">
              When will LearnLugha be available?
            </AccordionTrigger>
            <AccordionContent className="p-4 rounded-lg mt-2 text-lg">
              <p className="mt-2">
                We&apos;re in the exciting final stages of development and aiming to launch very soon. By signing up for the waitlist, you&apos;ll be among the first to know when we go live, giving you early access to start your Arabic learning journey right away.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="p-4 rounded-lg text-2xl font-bold text-purple-500">
              Is LearnLugha suitable for beginners?
            </AccordionTrigger>
            <AccordionContent className="p-4 rounded-lg mt-2 text-lg">
              <p className="mt-2">
                Absolutely! LearnLugha is designed to cater to all skill levels, from complete beginners to advanced learners. If you&apos;re just starting your Arabic learning journey, our AI-driven platform will guide you through the basics with personalized lessons that focus on essential vocabulary, grammar, and pronunciation. The learning experience is interactive and adapts to your pace, ensuring that you build a strong foundation before moving on to more complex topics. As you progress, the AI continuously tailors the content to match your growing proficiency, making your learning experience both effective and enjoyable.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="p-4 rounded-lg text-2xl font-bold text-purple-500">
              What makes LearnLugha different from other language learning apps?
            </AccordionTrigger>
            <AccordionContent className="p-4 rounded-lg mt-2 text-lg">
              <p className="mt-2">
                LearnLugha is unique because it uses AI to create a truly personalized learning journey. Unlike traditional apps that offer a one-size-fits-all approach, our platform continuously adapts to your individual progress and learning style. This means that your path to fluency is not only smoother but also more efficient, as the content you encounter is always relevant to your current skill level and goals.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger className="p-4 rounded-lg text-2xl font-bold text-purple-500">
              How do I track my progress with LearnLugha?
            </AccordionTrigger>
            <AccordionContent className="p-4 rounded-lg mt-2 text-lg">
            <p className="mt-2">
              As you use LearnLugha, you&apos;ll earn achievement badges as you reach new milestones, and receive personalized tips on areas where you can improve. These features help keep you engaged and on track to reach your language goals, making your learning experience both rewarding and effective.
            </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger className="p-4 rounded-lg text-2xl font-bold text-purple-500">
              How does the AI chatbot interface work in LearnLugha?
            </AccordionTrigger>
            <AccordionContent className="p-4 rounded-lg mt-2 text-lg">
              <p className="mt-2">
                The AI chatbot in LearnLugha is like having a conversation partner available anytime you want to practice. It simulates real-life conversations that adjust to your skill level, allowing you to practice everything from basic greetings to more complex discussions. The chatbot can help you to quickly improve your language skills in a practical and engaging way.
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
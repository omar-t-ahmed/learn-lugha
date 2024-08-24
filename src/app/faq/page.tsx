import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";

export default function FAQ() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-black via-black to-purple-700 text-white">
      <main className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8">
          Frequently Asked Questions
        </h1>
        <div className="w-full text-left text-gray-400 space-y-4">
          <div className="bg-gray-900 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-purple-500">What is LearnLugha?</h2>
            <p className="mt-2">
              LearnLugha is an AI-powered platform designed to help you learn Arabic in an engaging and effective way.
            </p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-purple-500">How does AI enhance my language learning experience?</h2>
            <p className="mt-2">
              Our AI adapts to your learning style, offering personalized feedback, identifying areas for improvement, and adjusting the difficulty of lessons.
            </p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-purple-500">When will LearnLugha be available?</h2>
            <p className="mt-2">
              We&apos;re currently in the final stages of development and plan to launch soon. By joining the waitlist, you&apos;ll be among the first to know when we go live.
            </p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-purple-500">Is LearnLugha suitable for beginners?</h2>
            <p className="mt-2">
              Absolutely! LearnLugha caters to all skill levels, from complete beginners to advanced learners. Our AI tailors lessons based on your starting point and learning progress.
            </p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-purple-500">What makes LearnLugha different from other language learning apps?</h2>
            <p className="mt-2">
              LearnLugha stands out due to its AI-driven approach, which provides a highly personalized learning experience. Unlike traditional apps, our platform continually adapts to your needs, making your journey to fluency smoother and more efficient.
            </p>
          </div>
        </div>
      </main>
      <footer className="mb-5">
        <p className="text-center text-gray-400">© 2024 LearnLugha. All rights reserved.</p>
      </footer>
    </div>
  );
}

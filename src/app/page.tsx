import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import Waitlist from "@/components/Waitlist";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-black via-black to-purple-700 text-white">
      <main className="flex flex-grow flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto px-6">
        <div className="flex flex-col justify-center flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text text-white leading-8">
            Accelerate Your <span className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600">Arabic Language Learning</span> Journey
          </h1>
          <p className="mt-4 md:mt-6 text-md md:text-lg text-gray-400">
            Experience the future of language learning with AI-driven lessons.
          </p>
        </div>
        <div className="flex-1 flex justify-center mt-8 md:mt-0">
          <Waitlist />
        </div>
      </main>
        <footer className="mb-5">
        <p className="text-center text-gray-400">© 2024 LearnLugha. All rights reserved.</p>
        </footer>
    </div>
  );
}
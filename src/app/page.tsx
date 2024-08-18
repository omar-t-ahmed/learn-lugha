import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import Waitlist from "@/components/Waitlist";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-black via-black to-purple-700 text-white">
      <main className="flex flex-grow items-center justify-between w-full max-w-7xl mx-auto px-6">
        <div className="flex flex-col justify-center flex-1">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text text-white">
            Accelerate Your <span className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600">AI Language Learning</span> Journey
          </h1>
          <p className="mt-6 text-lg text-gray-400">
            Experience the future of language learning with AI-driven lessons.
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <Waitlist />
        </div>
      </main>
    </div>
  );
}
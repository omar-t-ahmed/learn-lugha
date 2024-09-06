'use client'
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";

export default function PrivacyPolicy() {
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

      {/* Privacy Policy Content */}
      <main className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-6 pt-8 pb-16">
        <p className="text-4xl font-bold tracking-tight text-white text-left">
          Privacy Policy
        </p>
        <p className="mt-6 mb-14 text-lg leading-8 text-gray-400 text-center">
          At LearnLugha, your privacy is very important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our platform.
        </p>

        <section className="w-full text-left mb-10">
          <h2 className="text-3xl font-semibold text-white mb-4">Information We Collect</h2>
          <p className="text-lg text-gray-400 leading-8">
            We collect personal information that you provide to us directly, such as your name, email address, and learning preferences. We may also collect usage data, such as how you interact with the platform and which lessons you complete, to help us improve your experience.
          </p>
        </section>

        <section className="w-full text-left mb-10">
          <h2 className="text-3xl font-semibold text-white mb-4">How We Use Your Information</h2>
          <p className="text-lg text-gray-400 leading-8">
            Your information is used to provide personalized learning experiences and to improve our services. We may use your email address to communicate important updates or notifications about your progress. Rest assured, we will never share your data with third parties without your consent.
          </p>
        </section>

        <section className="w-full text-left mb-10">
          <h2 className="text-3xl font-semibold text-white mb-4">Your Data Security</h2>
          <p className="text-lg text-gray-400 leading-8">
            We use industry-standard encryption and security protocols to protect your personal information. Access to your data is restricted to authorized personnel only, and we regularly review our security practices to ensure your information is safe.
          </p>
        </section>

        <section className="w-full text-left mb-10">
          <h2 className="text-3xl font-semibold text-white mb-4">Your Rights</h2>
          <p className="text-lg text-gray-400 leading-8">
            You have the right to access, update, or delete your personal information at any time. If you wish to exercise these rights, please contact us, and we will assist you in managing your data.
          </p>
        </section>

        <section className="w-full text-left">
          <h2 className="text-3xl font-semibold text-white mb-4">Contact Us</h2>
          <p className="text-lg text-gray-400 leading-8">
            If you have any questions or concerns about your data, please feel free to reach out to us. Your privacy and security are our top priorities.
          </p>
        </section>
      </main>
    </div>
  );
}
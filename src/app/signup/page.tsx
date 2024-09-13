'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/LEARN LUGHA.png";

export default function SignUp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "unknown">("unknown");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Passwords must be at least 6 characters.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        
      );
      const userUID = userCredential.user.uid;

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, username, gender }),
      });

      if (response.ok) {
        router.push("/home");
      } else {
        setError("Failed to create user in database.");
      }
    } catch (error: any) {
      setError(error.code === 'auth/email-already-in-use' ? "Email is already in use." : "An error occurred while signing up. Please try again.");
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email || "",
          name: user.displayName || "Google User",
          username: user.email?.split('@')[0] || user.uid,
          gender: "unknown", // Default to unknown for Google sign-ups
        }),
      });

      if (response.ok) {
        router.push("/home");
      } else {
        setError("Failed to create user in database");
      }
    } catch (error: any) {
      setError("An error occurred while signing up with Google. Please try again.");
    }
  };

  return (
    <div className="bg-black min-h-screen relative isolate">
      {/* Navbar */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <Link href="/" className="flex justify-center mb-1 items-center">
              <Image src={logo} className="block h-9 w-9 mb-1" alt="Logo" />
            </Link>
          </div>
        </nav>
      </header>

      {/* Background Polygons */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#001aff] to-[#c689fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
      </div>
      <div className="absolute inset-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#7b00ff] to-[#1100ff] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
      </div>

      {/* Sign-Up Form */}
      <div className="min-h-screen flex flex-col md:flex-row md:pb-10">
        {/* Left Text Section */}
        <div className="hidden md:flex md:flex-1 md:flex-col md:justify-center md:items-center p-10">
          <div className="z-10 max-w-lg mx-auto text-left">
            <h2 className="text-white text-3xl font-bold mb-6">
              Start Your Arabic Learning Journey Today
            </h2>
            <ul className="text-gray-300 space-y-3">
              <li className="flex items-start justify-center">
                <Image src="/check_circle.svg" alt="Check" width={15} height={15} className="mr-2 mt-1" />
                <p>Master Arabic with our AI-powered platform, designed to adapt to your learning style and pace.</p>
              </li>
              <li className="flex items-start justify-center">
                <Image src="/check_circle.svg" alt="Check" width={15} height={15} className="mr-2 mt-1" />
                <p>Experience a personalized learning journey and tailored lessons that evolve as you progress.</p>
              </li>
              <li className="flex items-start justify-center">
                <Image src="/check_circle.svg" alt="Check" width={15} height={15} className="mr-2 mt-1" />
                <p>Track your progress with achievement badges and personalized tips to stay motivated.</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Sign-Up Form Section */}
        <div className="z-10 flex-1 flex mt-16 items-end justify-center p-4 md:p-10">
          <div className="w-full max-w-xl bg-zinc-900 p-8 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-center text-white mb-10">Create an account</h1>

            <div className="flex justify-center gap-4 mb-6">
              <button onClick={handleGoogleSignUp} className="flex items-center justify-center w-2/3 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700">
                <span className="mr-2">G</span> Sign Up with Google
              </button>
            </div>

            <div className="flex items-center justify-center text-gray-500 mb-6">
              <span className="w-1/4 border-t border-gray-700"></span>
              <span className="px-2">or</span>
              <span className="w-1/4 border-t border-gray-700"></span>
            </div>

            <form onSubmit={handleSignUp} className="space-y-5">
              <div className="space-y-1">
                <label className="text-gray-400">Name</label>
                <input type="text" className="w-full p-3 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                  placeholder="Name"
                  value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              <div className="space-y-1">
                <label className="text-gray-400">Username</label>
                <input type="text" className="w-full p-3 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                  placeholder="Username"
                  value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>

              <div className="space-y-1">
                <label className="text-gray-400">Email</label>
                <input type="email" className="w-full p-3 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                  placeholder="Email"
                  value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div className="space-y-1">
                <label className="text-gray-400">Password</label>
                <input type="password" className="w-full p-3 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                  placeholder="Password"
                  value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>

              <div className="space-y-1">
                <label className="text-gray-400">Confirm Password</label>
                <input type="password" className="w-full p-3 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                  placeholder="Confirm password"
                  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>

              <div className="space-y-1">
                <label className="text-gray-400">Gender</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="male"
                      checked={gender === "male"}
                      onChange={() => setGender("male")}
                      className="text-indigo-500 focus:ring-indigo-500"
                    />
                    <span className="text-gray-300">Male</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="female"
                      checked={gender === "female"}
                      onChange={() => setGender("female")}
                      className="text-indigo-500 focus:ring-indigo-500"
                    />
                    <span className="text-gray-300">Female</span>
                  </label>
                </div>
              </div>

              <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500">
                Sign Up
              </button>
              {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            </form>

            <p className="text-gray-400 text-center mt-6">
              Already have an account? <Link href="/signin" className="text-indigo-500 hover:text-indigo-400">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

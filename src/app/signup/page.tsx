import Navbar from "@/components/Navbar";

export default function SignUp() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-black via-black to-purple-700 text-white">
      <main className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8">Sign Up</h1>
        <form className="bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-md">
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border border-gray-600 bg-zinc-900 text-white rounded-md focus:outline-none"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-600 bg-zinc-900 text-white rounded-md focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-600 bg-zinc-900 text-white rounded-md focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-md"
          >
            Sign Up
          </button>
        </form>
      </main>
      <footer className="mb-5">
        <p className="text-center text-gray-400">© 2024 LearnLugha. All rights reserved.</p>
      </footer>
    </div>
  );
}

import Navbar from "@/components/Navbar";

export default function SignUp() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-gray-900 to-purple-700">
      <div className="flex-1 flex flex-col justify-center p-10">
        <div className="max-w-lg mx-auto">
          <h2 className="text-white text-3xl font-bold mb-6">Start Your Arabic Learning Journey Today</h2>
          <ul className="text-gray-300 space-y-3">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Master Arabic with our AI-powered platform, designed to adapt to your learning style and pace.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Experience a personalized learning journey and tailored lessons that evolve as you progress.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Track your progress with achievement badges and personalized tips to stay motivated.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-10">
        <form className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-semibold mb-6 text-center text-white">Create your LearnLugha account</h1>

          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-zinc-700 bg-zinc-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="example@gmail.com"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-1" htmlFor="full-name">
              Full name
            </label>
            <input
              type="text"
              id="full-name"
              className="w-full px-4 py-2 border border-zinc-700 bg-zinc-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-zinc-700 bg-zinc-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Password"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-1" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="w-full px-4 py-2 border border-zinc-700 bg-zinc-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Confirm Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-md"
          >
            Create account
          </button>

          <button
            type="button"
            className="w-full mt-4 py-3 border border-purple-600 bg-transparent hover:bg-purple-900 text-white font-semibold rounded-md flex items-center justify-center"
          >
            <span className="mr-2">G</span> Sign Up with Google
          </button>
        </form>
      </div>
    </div>
  );
}
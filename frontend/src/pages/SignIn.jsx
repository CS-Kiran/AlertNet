import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [isCitizenLogin, setIsCitizenLogin] = useState(true);

  return (
    <div className="relative h-screen flex flex-col items-center justify-center bg-gray-50 overflow-hidden">
      
      {/* Back to Home Icon */}
      <Link
        to="/"
        className="fixed z-10 top-4 left-4 border-2 p-2 rounded-full border-gray-600 hover:scale-110 transition duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-8 h-8 text-gray-600 hover:text-gray-800 transition-all"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </Link>

      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Login to your account
      </h1>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white shadow-lg rounded-lg border border-gray-200">
        {/* Tabs for Citizen and Police Login */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsCitizenLogin(true)}
            className={`px-4 py-2 w-1/2 text-center font-semibold text-lg border-b-2 ${
              isCitizenLogin
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-blue-500"
            } transition-all`}
          >
            Citizen
          </button>
          <button
            onClick={() => setIsCitizenLogin(false)}
            className={`px-4 py-2 w-1/2 text-center font-semibold text-lg border-b-2 ${
              !isCitizenLogin
                ? "border-red-800 text-red-800"
                : "border-transparent text-gray-500 hover:text-red-800"
            } transition-all`}
          >
            Police
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`w-full px-4 py-3 border border-gray-300 rounded focus:outline-none transition-all ${
                isCitizenLogin
                  ? "focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                  : "focus:ring-2 focus:ring-red-300 focus:border-transparent"
              }`}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`w-full px-4 py-3 border border-gray-300 rounded focus:outline-none transition-all ${
                isCitizenLogin
                  ? "focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                  : "focus:ring-2 focus:ring-red-300 focus:border-transparent"
              }`}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-md font-semibold text-white transition-all shadow-lg ${
              isCitizenLogin
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-red-800 hover:bg-red-700"
            }`}
          >
            Sign In
          </button>
        </form>

        {/* Register Link - Conditional Based on Citizen/Police Tab */}
        <div className="text-center mt-4">
          <p>
            Don&apos;t have an account?
            <Link
              to={isCitizenLogin ? "/register_citizen" : "/register_police"}
              className={`text-md text-gray-700 font-bold transition-all ${
                isCitizenLogin
                  ? "hover:text-blue-600"
                  : "hover:text-red-800"
              }`}
            >
              {" "}
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext"; // Import your useAlert hook
import axios from "axios"; // Import axios

export default function SignIn() {
  const [isCitizenLogin, setIsCitizenLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isCitizenLogin 
      ? "http://localhost:8080/api/citizens/login" 
      : "http://localhost:8080/api/police/login";

    const tokenKey = isCitizenLogin ? "citizenToken" : "policeToken";

    try {
      const response = await axios.post(endpoint, {
        email,
        password,
      });

      const data = response.data;

      // Check login success and account status
      if (response.status === 200) {
        if (data.accountStatus === "activated") {
          console.log(response.data)
          localStorage.setItem(tokenKey, data.token); // Store JWT token
          showAlert("success", "Login successful!");

          if (isCitizenLogin) {
            navigate("/citizen/dashboard");
          } else {
            navigate("/police/dashboard");
          }
        } else if (data.accountStatus === "suspended") {
          showAlert("warning", "Your account is suspended. Please contact admin.");
        } else {
          showAlert("info", "Your account is not activated. Please contact admin.");
        }
      } else {
        showAlert("error", "Invalid email or password.");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        showAlert("error", "Email not found. Please register.");
      } else {
        showAlert("error", "Error during login. Please try again.");
      }
    }
  };

  return (
    <div className="relative h-screen flex flex-col items-center justify-center bg-gray-50 overflow-hidden">
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
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </Link>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">Login to your account</h1>

      <div className="relative z-10 w-full max-w-md p-8 bg-white shadow-lg rounded-lg border border-gray-200">
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <label htmlFor="password" className="text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all shadow-lg ${
              isCitizenLogin
                ? "bg-gradient-to-r from-blue-600 to-blue-500"
                : "bg-gradient-to-r from-red-900 to-red-800"
            }`}
          >
            Sign In
          </button>
        </form>

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

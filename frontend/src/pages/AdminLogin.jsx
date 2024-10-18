import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAlert } from "../context/AlertContext";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { showAlert } = useAlert();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/admin/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200 && response.data.success) {
        showAlert("success", "Login successful!");
      } else {
        showAlert(
          "error",
          response.data.message ||
            "Login failed. Please check your credentials."
        );
      }
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      showAlert(
        "error",
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="relative h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Login</h1>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white shadow-lg rounded-lg border border-gray-200">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Password Input */}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Link to Home */}
        <div className="text-center mt-4">
          <p>
            Back to
            <Link
              to="/"
              className="text-md text-gray-700 font-bold hover:text-blue-500 transition-all"
            >
              {" "}
              Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

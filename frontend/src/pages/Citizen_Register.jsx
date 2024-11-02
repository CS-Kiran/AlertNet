import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAlert } from "../context/AlertContext";

export default function CitizenRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });
  const [consentGiven, setConsentGiven] = useState(false);
  const { showAlert } = useAlert();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    setConsentGiven(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, phone, address } = formData;

    const userData = {
      name,
      email,
      password,
      phone,
      address,
    };

    try {
      const response = await axios.post("http://localhost:8080/api/citizens/register", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log("User registered successfully");
        showAlert("success", "Registration successful!");
        handleClear();
      } else {
        showAlert(
          "error",
          response.data.message ||
            "Registration failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      showAlert(
        "error",
        error.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  const handleClear = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
    });
    setConsentGiven(false);
  };

  // Function to check if all required fields are filled
  const isFormValid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      formData.phone &&
      formData.address &&
      consentGiven
    );
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 p-6">
      {/* Back to Home Icon */}
      <Link
        to="/login"
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

      {/* Registration Form Container */}
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-2xl p-8 z-10">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Citizen Registration</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-gray-600">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Address */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="address" className="text-sm font-medium text-gray-600">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="Enter your address"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="consent"
              checked={consentGiven}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              required
            />
            <label htmlFor="consent" className="text-sm font-medium text-gray-600">
              I consent to the storage of my data for registration purposes.
            </label>
          </div>

          {/* Button Group */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleClear}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-gray-300 to-gray-200 text-gray-800 font-bold transition duration-300 hover:scale-105"
            >
              Clear
            </button>

            <button
              type="submit"
              disabled={!isFormValid()}
              className={`py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-full transition duration-300 hover:scale-105 ${
                !isFormValid() && "cursor-not-allowed opacity-70"
              }`}
            >
              Register
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-800 font-bold transition duration-300">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

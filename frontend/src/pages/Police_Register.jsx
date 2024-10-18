import { useState } from "react";
import { Link } from "react-router-dom";

export default function PoliceRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    department: "",
    rank: "",
    badgeNumber: "",
    stationAddress: "",
    yearsOfService: "",
    govIdProof: null, // Government ID upload
    policeCertificate: null, // Police certification upload
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelation: "",
  });

  const [consentGiven, setConsentGiven] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0], // Handle both govIdProof and policeCertificate
    });
  };

  const handleCheckboxChange = (e) => {
    setConsentGiven(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form Submitted:", formData);
  };

  // Function to check if all required fields are filled
  const isFormValid = () => {
    return (
      formData.name &&
      formData.dob &&
      formData.gender &&
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      formData.phone &&
      formData.address &&
      formData.department &&
      formData.rank &&
      formData.badgeNumber &&
      formData.stationAddress &&
      formData.govIdProof &&
      formData.policeCertificate &&
      formData.emergencyContactName &&
      formData.emergencyContactPhone &&
      consentGiven
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 p-6">
      {/* Back to Login Icon */}
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
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </Link>

      <div className="w-full max-w-3xl p-8 bg-white shadow-2xl rounded-lg">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Police Registration
        </h2>

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

          {/* Date of Birth */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="dob" className="text-sm font-medium text-gray-600">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              required
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="gender"
              className="text-sm font-medium text-gray-600"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Email */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-600"
            >
              Official Email Address
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
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-600"
            >
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
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-600"
            >
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
            <label
              htmlFor="phone"
              className="text-sm font-medium text-gray-600"
            >
              Station Phone Number
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
            <label
              htmlFor="address"
              className="text-sm font-medium text-gray-600"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="Enter your residential address"
              required
            />
          </div>

          {/* Professional Information */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="department"
              className="text-sm font-medium text-gray-600"
            >
              Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="Enter your department"
              required
            />
          </div>

          {/* Additional Professional Fields: Rank, Badge Number, Years of Service */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="rank"
                className="text-sm font-medium text-gray-600"
              >
                Rank
              </label>
              <input
                type="text"
                id="rank"
                name="rank"
                value={formData.rank}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Enter your rank"
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label
                htmlFor="badgeNumber"
                className="text-sm font-medium text-gray-600"
              >
                Badge Number
              </label>
              <input
                type="text"
                id="badgeNumber"
                name="badgeNumber"
                value={formData.badgeNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Enter your badge number"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Station Address */}
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="stationAddress"
                className="text-sm font-medium text-gray-600"
              >
                Station Address
              </label>
              <input
                type="text"
                id="stationAddress"
                name="stationAddress"
                value={formData.stationAddress}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Enter your station address"
                required
              />
            </div>

            {/* Years of Service */}
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="yearsOfService"
                className="text-sm font-medium text-gray-600"
              >
                Years of Service
              </label>
              <input
                type="number"
                id="yearsOfService"
                name="yearsOfService"
                value={formData.yearsOfService}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Enter years of service"
                required
              />
            </div>
          </div>

          {/* Upload Section */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="govIdProof"
              className="text-sm font-medium text-gray-600"
            >
              Upload Government ID Proof
            </label>
            <input
              type="file"
              id="govIdProof"
              name="govIdProof"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              required
            />
          </div>

          {/* Emergency Contact Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="emergencyContactName"
                className="text-sm font-medium text-gray-600"
              >
                Emergency Contact Name
              </label>
              <input
                type="text"
                id="emergencyContactName"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Enter emergency contact name"
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label
                htmlFor="emergencyContactPhone"
                className="text-sm font-medium text-gray-600"
              >
                Emergency Contact Phone
              </label>
              <input
                type="tel"
                id="emergencyContactPhone"
                name="emergencyContactPhone"
                value={formData.emergencyContactPhone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Enter emergency contact phone"
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label
                htmlFor="emergencyContactRelation"
                className="text-sm font-medium text-gray-600"
              >
                Emergency Contact Relationship
              </label>
              <input
                type="text"
                id="emergencyContactRelation"
                name="emergencyContactRelation"
                value={formData.emergencyContactRelation}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Enter relationship"
                required
              />
            </div>
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
            <label
              htmlFor="consent"
              className="text-sm font-medium text-gray-600"
            >
              I consent to the storage of my data for registration purposes.
            </label>
          </div>
          {/* Buttons */}
          <div className="flex justify-between mt-6">
            {/* Clear Button */}
            <button
              type="button"
              onClick={() =>
                setFormData({
                  name: "",
                  dob: "",
                  gender: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  phone: "",
                  address: "",
                  department: "",
                  rank: "",
                  badgeNumber: "",
                  stationAddress: "",
                  yearsOfService: "",
                  govIdProof: null,
                  policeCertificate: null,
                  emergencyContactName: "",
                  emergencyContactPhone: "",
                  emergencyContactRelation: "",
                })
              }
              className="w-full py-3 px-4 mr-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition duration-300"
            >
              Clear
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid()}
              className={`w-full py-3 px-4 ml-2 bg-blue-600 text-white font-bold rounded-md transition duration-300 hover:bg-blue-700 ${
                !isFormValid() && "cursor-not-allowed opacity-50"
              }`}
            >
              Register
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-800 font-bold transition duration-300"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

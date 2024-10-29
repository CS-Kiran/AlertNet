import { useState, useEffect } from "react";
import axios from "axios";
import { useAlert } from "../context/AlertContext";
import { decodeJwt } from "../utility/decodeJwt";

const BroadcastAlert = () => {
  const [formData, setFormData] = useState({
    type: "",
    image: null,
    name: "",
    description: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    eyeColor: "",
    hairColor: "",
    lastSeenLocation: "",
    lastSeenDate: "",
    caseID: "",
    dateOfReport: "",
    caseStatus: "",
    contactName: "",
    contactPhone: "",
    secondaryContactName: "",
    secondaryContactPhone: "",
    crimeCommitted: "",
    dangerLevel: "",
  });

  const [step, setStep] = useState(1);
  const { showAlert } = useAlert();
  const [userInfo, setUserInfo] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const tokenKey = "policeToken";

  useEffect(() => {
    const token = localStorage.getItem(tokenKey);
    if (token) {
      try {
        const decoded = decodeJwt(token); // Use the custom decode function
        setUserInfo(decoded);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, [tokenKey]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
  
    // Append policeId
    form.append("policeId", userInfo.id);
  
    // Append each formData field to the FormData object
    for (const key in formData) {
      if (formData[key] !== undefined) {
        form.append(key, formData[key]);
      }
    }
  
    // Check and append imagePath if it exists
    if (formData.imageFile) { // Ensure this key matches your formData structure
      form.append("imagePath", formData.imageFile);
    }
  
    console.log("Form Data Before Submission:", [...form.entries()]);
  
    try {
      const response = await axios.post(
        "http://localhost:8080/api/alerts/create",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.status === 200) {
        console.log("Alert posted successfully:", response.data);
        showAlert("success", "Alert sent successfully!");
        handleClear();
      } else {
        console.error("Unexpected response status:", response.status);
        showAlert("error", response.data.message || "Failed to send alert.");
      }
    } catch (error) {
      console.error("Error during alert submission:", error);
  
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        showAlert(
          "error",
          error.response.data.message || "Failed to send alert. Please try again."
        );
      } else if (error.request) {
        console.error("Request data:", error.request);
        showAlert("error", "No response received from the server. Please try again.");
      } else {
        console.error("Error message:", error.message);
        showAlert("error", "An error occurred while sending the alert. Please try again.");
      }
    }
  };
  

  const handleClear = () => {
    setFormData({
      type: "",
      image: null,
      name: "",
      description: "",
      age: "",
      gender: "",
      height: "",
      weight: "",
      eyeColor: "",
      hairColor: "",
      lastSeenLocation: "",
      lastSeenDate: "",
      healthCondition: "",
      caseID: "",
      dateOfReport: "",
      caseStatus: "",
      contactName: "",
      contactPhone: "",
      secondaryContactName: "",
      secondaryContactPhone: "",
      crimeCommitted: "",
      dangerLevel: "",
    });
  };

  const handleNextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const handlePrevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <>
      <h2 className="text-5xl font-semibold text-center text-blue-700 mb-10">
        Broadcast Alert
      </h2>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <>
                {/* Step 1: Basic Information */}
                <h3 className="text-3xl font-semibold text-gray-700 text-center">
                  Basic Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-600 font-medium">
                      Alert Type
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 p-2 rounded-lg"
                    >
                      <option value="" disabled>
                        Select type
                      </option>
                      <option value="missing">Missing</option>
                      <option value="wanted">Wanted</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      required
                      className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Full name"
                      className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      placeholder="Brief description"
                      className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                {/* Step 2: Physical Characteristics */}
                <h3 className="text-3xl font-semibold text-gray-700 text-center">
                  Physical Characteristics
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-600 font-medium">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      required
                      placeholder="Age"
                      className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 p-2 rounded-lg"
                    >
                      <option value="" disabled>
                        Select gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium">
                      Height
                    </label>
                    <input
                      type="text"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      required
                      placeholder="Height in cm"
                      className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium">
                      Weight
                    </label>
                    <input
                      type="text"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      placeholder="Weight in kg"
                      className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium">
                      Eye Color
                    </label>
                    <input
                      type="text"
                      name="eyeColor"
                      value={formData.eyeColor}
                      onChange={handleInputChange}
                      placeholder="Eye color"
                      className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium">
                      Hair Color
                    </label>
                    <input
                      type="text"
                      name="hairColor"
                      value={formData.hairColor}
                      onChange={handleInputChange}
                      placeholder="Hair color"
                      className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium">
                      Distinctive Features
                    </label>
                    <textarea
                      name="distinctiveFeatures"
                      value={formData.distinctiveFeatures}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Scars, tattoos, etc."
                      className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                {/* Step 3: Last Seen and Contact Details */}
                <h3 className="text-3xl font-semibold text-gray-700 text-center">
                  Last Seen & Contact Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-600 font-medium">
                      Last Seen Location
                    </label>
                    <input
                      type="text"
                      name="lastSeenLocation"
                      value={formData.lastSeenLocation}
                      onChange={handleInputChange}
                      required
                      placeholder="Last seen location"
                      className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium">
                      Last Seen Date
                    </label>
                    <input
                      type="date"
                      name="lastSeenDate"
                      value={formData.lastSeenDate}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      required
                      placeholder="Primary contact"
                      className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      required
                      placeholder="Contact phone number"
                      className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium">
                      Secondary Contact Name
                    </label>
                    <input
                      type="text"
                      name="secondaryContactName"
                      value={formData.secondaryContactName}
                      onChange={handleInputChange}
                      placeholder="Secondary contact"
                      className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium">
                      Secondary Contact Phone
                    </label>
                    <input
                      type="tel"
                      name="secondaryContactPhone"
                      value={formData.secondaryContactPhone}
                      onChange={handleInputChange}
                      placeholder="Secondary contact number"
                      className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                  </div>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                {/* Step 4: Case Details */}
                <h3 className="text-3xl font-semibold text-gray-700 text-center">
                  Case Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-600 font-medium">
                      Case ID
                    </label>
                    <input
                      type="text"
                      name="caseID"
                      value={formData.caseID}
                      onChange={handleInputChange}
                      required
                      placeholder="Case ID"
                      className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium">
                      Date of Report
                    </label>
                    <input
                      type="date"
                      name="dateOfReport"
                      value={formData.dateOfReport}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium">
                      Case Status
                    </label>
                    <select
                      name="caseStatus"
                      value={formData.caseStatus}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 p-2 rounded-lg"
                    >
                      <option value="" disabled>
                        Select status
                      </option>
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                      <option value="in-progress">In Progress</option>
                    </select>
                  </div>

                  {formData.type === "wanted" && (
                    <>
                      <div>
                        <label className="block text-gray-600 font-medium">
                          Crime Committed
                        </label>
                        <input
                          type="text"
                          name="crimeCommitted"
                          value={formData.crimeCommitted}
                          onChange={handleInputChange}
                          placeholder="Crime committed"
                          className="w-full border border-gray-300 p-2 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 font-medium">
                          Danger Level
                        </label>
                        <select
                          name="dangerLevel"
                          value={formData.dangerLevel}
                          onChange={handleInputChange}
                          required
                          className="w-full border border-gray-300 p-2 rounded-lg"
                        >
                          <option value="" disabled>
                            Select danger level
                          </option>
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
            {/* Navigation Buttons */}
            <div className="flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  Previous
                </button>
              )}
              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-green-600 text-white py-2 px-4 font-bold rounded-lg hover:bg-green-700"
                >
                  Broadcast
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BroadcastAlert;

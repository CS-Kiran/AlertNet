import { useState } from "react";

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
    distinctiveFeatures: "",
    lastSeenLocation: "",
    lastSeenDate: "",
    clothingDescription: "",
    healthCondition: "",
    caseDetails: "",
    caseID: "",
    dateOfReport: "",
    caseStatus: "",
    contactName: "",
    contactPhone: "",
    secondaryContactName: "",
    secondaryContactPhone: "",
    knownAffiliations: "",
    previousOffenses: "",
    crimeCommitted: "",
    dangerLevel: "",
    additionalInfo: "",
  });

  const [step, setStep] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  const handleNextStep = () => setStep((prev) => Math.min(prev + 1, 5));
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
                          Previous Offenses
                        </label>
                        <input
                          type="text"
                          name="previousOffenses"
                          value={formData.previousOffenses}
                          onChange={handleInputChange}
                          placeholder="Previous offenses"
                          className="w-full border border-gray-300 p-2 rounded-lg"
                        />
                      </div>
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

            {step === 5 && (
              <>
                {/* Step 5: Additional Information */}
                <h3 className="text-3xl font-semibold text-gray-700 text-center">
                  Additional Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-600 font-medium">
                      Health Condition
                    </label>
                    <textarea
                      name="healthCondition"
                      value={formData.healthCondition}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Any known health conditions"
                      className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium">
                      Clothing Description
                    </label>
                    <textarea
                      name="clothingDescription"
                      value={formData.clothingDescription}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Clothing description"
                      className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium">
                      Additional Info
                    </label>
                    <textarea
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Any additional information"
                      className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                  </div>
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
              {step < 5 ? (
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

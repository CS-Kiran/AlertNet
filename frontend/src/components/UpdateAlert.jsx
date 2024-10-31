import { useState , useEffect} from "react";

const UpdateAlert = ({ alert , onClose , onUpdate}) => {
  const [formData, setFormData] = useState({
    type: "",
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

  useEffect(() => {
    setFormData({
      type: alert.type || "",
      name: alert.name || "",
      description: alert.description || "",
      age: alert.age || "",
      gender: alert.gender || "",
      height: alert.height || "",
      weight: alert.weight || "",
      eyeColor: alert.eyeColor || "",
      hairColor: alert.hairColor || "",
      lastSeenLocation: alert.lastSeenLocation || "",
      lastSeenDate: alert.lastSeenDate || "",
      caseID: alert.caseID || "",
      dateOfReport: alert.dateOfReport || "",
      caseStatus: alert.caseStatus || "",
      contactName: alert.contactName || "",
      contactPhone: alert.contactPhone || "",
      secondaryContactName: alert.secondaryContactName || "",
      secondaryContactPhone: alert.secondaryContactPhone || "",
      crimeCommitted: alert.crimeCommitted || "",
      dangerLevel: alert.dangerLevel || "",
    });
  }, [alert]);

  console.log(formData)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/alerts/${alert.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Alert updated successfully");
        onUpdate();
      } else {
        console.error("Failed to update alert");
      }
    } catch (error) {
      console.error("Error updating alert:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
          Update Alert Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Information */}
          <div>
            <label className="block text-gray-600 font-medium">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            >
              <option value="">Select Type</option>
              <option value="missing">Missing</option>
              <option value="wanted">Wanted</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
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
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Physical Description */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 font-medium">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-600 font-medium">Height</label>
              <input
                type="text"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium">Weight</label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <label className="block text-gray-600 font-medium">
              Last Seen Location
            </label>
            <input
              type="text"
              name="lastSeenLocation"
              value={formData.lastSeenLocation}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
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
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Case ID</label>
            <input
              type="text"
              name="caseID"
              value={formData.caseID}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Contact Information */}
          <div>
            <label className="block text-gray-600 font-medium">
              Contact Name
            </label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">
              Contact Phone
            </label>
            <input
              type="text"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
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
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">
              Secondary Contact Phone
            </label>
            <input
              type="text"
              name="secondaryContactPhone"
              value={formData.secondaryContactPhone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
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
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select Danger Level</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-gray-600 font-medium">
              Case Status
            </label>
            <select
              name="caseStatus"
              value={formData.caseStatus}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Select Case Status</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Update Alert
            </button>
            <button
              type="button"
              className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAlert;

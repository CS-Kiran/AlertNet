import { useState } from "react";
import axios from "axios";
import { useAlert } from "../context/AlertContext";


const EditProfile = ({ role, userDetails, onCancel, onUpdate }) => {
  const { showAlert } = useAlert();
  const [formData, setFormData] = useState({
    phone: userDetails.phone,
    address: userDetails.address,
    ...(role === "police" && {
      rank: userDetails.rank,
      department: userDetails.department,
      stationAddress: userDetails.stationAddress,
      yearsOfService: userDetails.yearsOfService,
      emergencyContactName: userDetails.emergencyContactName,
      emergencyContactPhone: userDetails.emergencyContactPhone,
      emergencyContactRelation: userDetails.emergencyContactRelation,
    }),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/api/${role}/update/${userDetails.id}`,
        formData
      );
      showAlert("success", "Profile updated successfully!");
      onUpdate();
    } catch (error) {
      showAlert("error", "Error updating profile" + error);
    }
  };
  

  console.log(userDetails);
  return (
    <div className="container max-w-xl p-8 bg-white rounded-lg shadow-xl mx-auto my-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Edit Profile
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        {/* Add more fields as necessary based on role */}
        {role === "police" && (
          <>
            <div>
              <label className="block text-gray-700">Rank:</label>
              <input
                type="text"
                name="rank"
                value={formData.rank}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Department:</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Years of Service:</label>
              <input
                type="number"
                name="yearsOfService"
                value={formData.yearsOfService}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">
                Emergency Contact Name:
              </label>
              <input
                type="text"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">
                Emergency Contact Phone:
              </label>
              <input
                type="tel"
                name="emergencyContactPhone"
                value={formData.emergencyContactPhone}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">
                Emergency Contact Relation:
              </label>
              <input
                type="text"
                name="emergencyContactRelation"
                value={formData.emergencyContactRelation}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
            </div>
          </>
        )}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onCancel}
            className="mt-4 px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-md shadow hover:bg-red-600 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition-all"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;

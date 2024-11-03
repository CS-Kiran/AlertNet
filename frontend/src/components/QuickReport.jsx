import { useState } from "react";
import axios from "axios";
import { MdClose } from "react-icons/md";
import LocationSelector from "../utility/LocationSelector";
import { useAlert } from "../context/AlertContext";


const QuickReport = ({ onClose }) => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [reporterName, setReporterName] = useState("");
  const [image, setImage] = useState(null);
  const [lastSeenLocation, setLastSeenLocation] = useState("");
  const { showAlert } = useAlert();


  const handleLocationSelect = (location) => {
    const [lat, lng] = location.split(",").map((coord) => coord.trim());
    setLatitude(lat);
    setLongitude(lng);
    setLastSeenLocation(location);
  };

  const handleReportSubmit = async () => {
    const formData = new FormData();
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("reporterName", reporterName);
    if (image) formData.append("image", image);
    formData.append("lastSeenLocation", lastSeenLocation); // Append lastSeenLocation

    try {
      await axios.post(
        "http://localhost:8080/api/quick-report/create",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      showAlert("success", "Report submitted successfully!");
      onClose();
    } catch (error) {
      showAlert("error", "Failed to submit report"+error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 relative max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <MdClose
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer text-gray-600 hover:text-red-600"
        />
        <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center">
          Quick Report
        </h2>

        <form>
          {/* Location Selector */}
          <LocationSelector
            onLocationSelect={handleLocationSelect}
            formData={{ latitude, longitude }}
          />

          {/* Display Selected Coordinates */}
          <div className="mb-4 mt-4">
            <label className="block font-semibold">Latitude</label>
            <input
              type="text"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Latitude"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Longitude</label>
            <input
              type="text"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Longitude"
              readOnly
            />
          </div>

          {/* Reporter Name */}
          <div className="mb-4">
            <label className="block font-semibold">Reporter Name</label>
            <input
              type="text"
              value={reporterName}
              onChange={(e) => setReporterName(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block font-semibold">
              Upload Image (Optional)
            </label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full"
            />
          </div>
        </form>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6 space-x-4">
          <button
            onClick={handleReportSubmit}
            className="px-6 py-2 font-bold bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full hover:bg-green-700"
          >
            Report
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 font-bold bg-gradient-to-r from-gray-400 to-gray-300 rounded-full hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickReport;

import { useState } from "react";
import axios from "axios";
import { useAlert } from "../context/AlertContext";


const DetailedReport = ({ onClose, alertId, citizenId, policeId }) => {
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const { showAlert } = useAlert();


  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("alertId", alertId);
    formData.append("citizenId", citizenId);
    formData.append("policeId", policeId);
    
    // Append each file to the 'images' key
    images.forEach((file) => formData.append("images", file)); // Change here
  
    formData.append("message", message);
  
    try {
      const response = await axios.post("http://localhost:8080/api/reports/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showAlert("success", "Report submitted successfully!");
      onClose();
    } catch (err) {
      showAlert("success", "Error submitting report" + err);
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-4xl text-center font-semibold mb-4 text-blue-600">Submit Report</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold">Upload Images:</label>
          <input type="file" multiple onChange={handleFileChange} className="mb-4 border rounded p-2" />
          <label className="block mb-2 font-semibold">Detailed Description of Incident:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            className="border rounded w-full p-2 mb-4"
            placeholder="Please provide Location/Address and Incident details here..."
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 px-4 rounded-full w-full hover:bg-blue-700"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default DetailedReport;

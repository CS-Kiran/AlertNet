import { useState } from "react";
import axios from "axios";

const Reports = ({ onClose, alertId, citizenId, policeId }) => {
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState(""); // State for message input
  const [error, setError] = useState(null);

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
      alert("Report submitted successfully!");
      onClose();
    } catch (err) {
      setError(err.response ? err.response.data : "Error submitting report");
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
        <h2 className="text-2xl font-semibold mb-4">Submit Report</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold">Upload Images:</label>
          <input type="file" multiple onChange={handleFileChange} className="mb-4" />
          <label className="block mb-2 font-semibold">Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            className="border rounded w-full p-2 mb-4"
            placeholder="Enter your message here..."
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reports;

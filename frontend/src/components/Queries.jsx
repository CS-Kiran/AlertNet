import { useState } from "react";
import axios from "axios";

const Queries = ({ Id, Name, Role }) => {
  const [formData, setFormData] = useState({
    name: Name,
    id: Id,
    message: "",
    queryType: "Technical",
    status: "Pending",
    role: Role,
  });
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/queries",
        formData
      );
      setResponseMessage("Query submitted successfully!");
      setFormData({
        name: Name,
        id: Id,
        message: "",
        queryType: "Technical",
        status: "Pending",
        role: Role,
      });
    } catch (error) {
      setResponseMessage("Failed to submit query.");
    }
  };

  return (
    <div className="flex justify-center py-10">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-semibold text-blue-600 mb-6 text-center">
          Submit a Query
        </h2>
        {responseMessage && (
          <p className="text-center text-lg text-green-500 mb-4">
            {responseMessage}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {formData.role.toUpperCase()} ID
            </label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              readOnly
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              readOnly
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type of Query
            </label>
            <select
              name="queryType"
              value={formData.queryType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Technical">Technical</option>
              <option value="Account Issue">Account Issue</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-200"
          >
            Submit Query
          </button>
        </form>
      </div>
    </div>
  );
};

export default Queries;

import { useState } from "react";
import axios from "axios";
import UserQueriesModal from "./UserQueriesModal";
import { useAlert } from "../context/AlertContext";

const Queries = ({ Id, Name, Role }) => {
  const [formData, setFormData] = useState({
    name: Name,
    senderId: Id,
    message: "",
    queryType: "Technical",
    status: "Pending",
    role: Role,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showAlert } = useAlert();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
      await axios.post("http://localhost:8080/api/queries", formData);
      showAlert("success", "Query submitted successfully!");
      setFormData({
        name: Name,
        senderId: Id,
        message: "",
        queryType: "Technical",
        status: "Pending",
        role: Role,
      });
    } catch (error) {
      showAlert("error", "Failed to submit query" + error);
    }
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center px-4">
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
        <button
          onClick={handleOpenModal}
          className="p-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-full shadow-md mb-6 hover:shadow-lg transition duration-200"
        >
          Track Queries
        </button>

        {isModalOpen && (
          <UserQueriesModal userId={Id} onClose={handleCloseModal} Name={Name}/>
        )}

        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Submit a Query
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {formData.role.toUpperCase()} ID
            </label>
            <input
              type="text"
              name="id"
              value={formData.senderId}
              readOnly
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-100 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              readOnly
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-100 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type of Query
            </label>
            <select
              name="queryType"
              value={formData.queryType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Technical">Technical</option>
              <option value="Account Issue">Account Issue</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit Query
          </button>
        </form>
      </div>
    </div>
  );
};

export default Queries;

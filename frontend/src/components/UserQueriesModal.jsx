import { useState, useEffect } from "react";
import axios from "axios";

const UserQueriesModal = ({ userId, onClose }) => {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/queries/sender/${userId}`);
        setQueries(response.data);
      } catch (error) {
        console.error("Error fetching queries:", error);
      }
    };

    fetchQueries();
  }, [userId]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-semibold text-center mb-4">Your Queries</h2>
        {queries.length > 0 ? (
          <ul className="space-y-4">
            {queries.map((query) => (
              <li key={query.id} className="p-4 bg-gray-100 rounded-md shadow">
                <h3 className="font-bold text-lg">Admin : {query.adminResponse || "Not yet Responded!!"}</h3>
                <p className="text-sm text-gray-700">Query : {query.message}</p>
                <p className="text-sm text-gray-700">{query.queryType}</p>
                <p className="text-xs text-gray-600 mt-1">Status: {query.status}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No queries found.</p>
        )}
      </div>
    </div>
  );
};

export default UserQueriesModal;

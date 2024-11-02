import { useEffect, useState } from "react";
import axios from "axios";

const ViewQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [adminResponse, setAdminResponse] = useState("");

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/queries");
        setQueries(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load queries");
        setLoading(false);
      }
    };
    fetchQueries();
  }, []);

  const handleResponseChange = (e) => {
    setAdminResponse(e.target.value);
  };

  const handleSubmitResponse = async () => {
    try {
      const updatedQuery = {
        ...selectedQuery,
        adminResponse,
        status: "Resolved",
      };
      await axios.put(
        `http://localhost:8080/api/queries/${selectedQuery.queryId}`,
        updatedQuery
      );
      setResponseMessage("Response submitted successfully!");

      // Update the query list with the new response
      setQueries((prevQueries) =>
        prevQueries.map((query) =>
          query.queryId === selectedQuery.queryId ? updatedQuery : query
        )
      );

      // Reset response and selected query
      setSelectedQuery(null);
      setAdminResponse("");
    } catch (error) {
      setResponseMessage("Failed to submit response.");
    }
  };

  if (loading) {
    return (
      <p className="text-center text-lg text-gray-500">Loading queries...</p>
    );
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-blue-600 mb-6 text-center">
        View All Queries
      </h2>
      {responseMessage && (
        <p className="text-center text-lg text-green-500 mb-4">
          {responseMessage}
        </p>
      )}
      <div className="overflow-auto rounded-lg shadow-lg mb-6">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-5 text-center border-b-2 border-gray-300 font-semibold uppercase tracking-wider">
                Query ID
              </th>
              <th className="py-3 px-5 text-center border-b-2 border-gray-300 font-semibold uppercase tracking-wider">
                Role
              </th>
              <th className="py-3 px-5 text-center border-b-2 border-gray-300 font-semibold uppercase tracking-wider">
                Name
              </th>
              <th className="py-3 px-5 text-center border-b-2 border-gray-300 font-semibold uppercase tracking-wider">
                Query Type
              </th>
              <th className="py-3 px-5 text-center border-b-2 border-gray-300 font-semibold uppercase tracking-wider">
                Message
              </th>
              <th className="py-3 px-5 text-center border-b-2 border-gray-300 font-semibold uppercase tracking-wider">
                Status
              </th>
              <th className="py-3 px-5 text-center border-b-2 border-gray-300 font-semibold uppercase tracking-wider">
                Admin Response
              </th>
              <th className="py-3 px-5 text-center border-b-2 border-gray-300 font-semibold uppercase tracking-wider">
                Actions
              </th>
              <th className="py-3 px-5 text-center border-b-2 border-gray-300 font-semibold uppercase tracking-wider">
                Updated On
              </th>
            </tr>
          </thead>
          <tbody>
            {queries.map((query) => (
              <tr
                key={query.queryId}
                className="hover:bg-gray-100 border-b border-gray-300 text-center font-semibold"
              >
                <td className="py-4 px-5 text-sm text-gray-700">
                  {query.queryId}
                </td>
                <td className="py-4 px-5 text-sm text-gray-700">
                  {query.role.toUpperCase()}
                </td>
                <td className="py-4 px-5 text-sm text-gray-700">
                  {query.name}
                </td>
                <td className="py-4 px-5 text-sm text-gray-700">
                  {query.queryType}
                </td>
                <td className="py-4 px-5 text-sm text-gray-700">
                  {query.message}
                </td>
                <td className="py-4 px-5 text-sm text-gray-700">
                  {query.status}
                </td>
                <td className="py-4 px-5 text-sm text-gray-700">
                  {query.adminResponse || "Not Responded!!"}
                </td>
                <td className="py-4 px-5 text-sm text-gray-700">
                  <button
                    onClick={() => {
                      setSelectedQuery(query);
                      setAdminResponse(query.adminResponse || "");
                    }}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition duration-200"
                  >
                    Respond
                  </button>
                </td>
                <td className="py-4 px-5 text-sm text-gray-700">
                  {new Date(query.updatedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedQuery && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-xl w-full">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
              Respond to Query #{selectedQuery.queryId}
            </h3>
            <textarea
              value={adminResponse}
              onChange={handleResponseChange}
              placeholder="Enter your response here..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            ></textarea>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleSubmitResponse}
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:scale-105 transition duration-200"
              >
                Submit Response
              </button>
              <button
                onClick={() => {
                  setSelectedQuery(null);
                  setAdminResponse("");
                }}
                className="bg-gradient-to-b from-gray-300 to-gray-200 text-gray-800 px-4 py-2 rounded-lg font-bold hover:scale-105 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewQueries;

import { useEffect, useState } from "react";
import axios from "axios";
import { decodeJwt } from "../utility/decodeJwt";

const SubmittedReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("citizenToken");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const decoded = decodeJwt(token);
        const citizenId = decoded.id;

        const response = await axios.get(
          `http://localhost:8080/api/reports/citizen/${citizenId}`
        );
        setReports(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load reports");
        setLoading(false);
      }
    };

    fetchReports();
  }, [token]);

  if (loading) {
    return (
      <p className="text-center text-lg text-gray-500">Loading reports...</p>
    );
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">{error}</p>;
  }

  return (
    <div className="flex justify-center py-2">
      <div className=" w-full">
        <h2 className="text-4xl font-semibold text-blue-600 mb-8 text-center">
          Submitted Reports
        </h2>
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-center border-b-2 border-gray-300 font-semibold uppercase tracking-wider">
                  Report ID
                </th>
                <th className="py-3 px-4 text-center border-b-2 border-gray-300 font-semibold uppercase tracking-wider">
                  Report Details
                </th>
                <th className="py-3 px-4 text-center border-b-2 border-gray-300 font-semibold uppercase tracking-wider">
                  Case Status
                </th>
                <th className="py-3 px-4 text-center border-b-2 border-gray-300 font-semibold uppercase tracking-wider">
                  Reported On
                </th>
              </tr>
            </thead>
            <tbody>
              {reports.length > 0 ? (
                reports.map((report, index) => (
                  <tr
                    key={index}
                    className="hover:bg-blue-100 transition-colors duration-200 border-b border-gray-300 text-center font-semibold"
                  >
                    <td className="py-4 px-4 border-b border-gray-200 text-sm text-gray-700">
                      {report.reportId}
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200 text-sm text-gray-700">
                      {report.message}
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200 text-sm text-gray-700">
                      {report.alert.caseStatus.toUpperCase()}
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200 text-sm text-gray-700">
                      {new Date(report.reportedTime).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-4 text-center text-gray-500">
                    No reports found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubmittedReports;

import { useEffect, useState } from "react";
import axios from "axios";
import { MdClose } from "react-icons/md"; 

const ViewQuickReports = ({ isOpen, onClose }) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/quick-report/all"
        );
        setAlerts(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load alerts" + error);
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-lg text-gray-500">Loading alerts...</p>
    );
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">{error}</p>;
  }

  return (
    isOpen && ( // Render the modal only if isOpen is true
      <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-75">
        <div className="bg-white rounded-lg shadow-lg p-6 relative w-full max-w-5xl overflow-y-auto">
          <MdClose
            className="absolute top-4 right-4 w-6 h-6 cursor-pointer text-gray-700"
            onClick={onClose}
          />
          <h2 className="text-4xl font-semibold text-blue-600 mb-6 text-center">
            Quick Reports
          </h2>
          <div className="overflow-auto rounded-lg shadow-lg">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-5 text-center border-b-2 border-gray-300 font-semibold uppercase tracking-wider">
                    ID
                  </th>
                  <th className="py-3 px-5 text-center border-b-2 border-gray-300 font-semibold uppercase tracking-wider">
                    Latitude
                  </th>
                  <th className="py-3 px-5 text-center border-b-2 border-gray-300 font-semibold uppercase tracking-wider">
                    Longitude
                  </th>
                  <th className="py-3 px-5 text-center border-b-2 border-gray-300 font-semibold uppercase tracking-wider">
                    Reporter Name
                  </th>
                  <th className="py-3 px-5 text-center border-b-2 border-gray-300 font-semibold uppercase tracking-wider">
                    File
                  </th>
                  <th className="py-3 px-5 text-center border-b-2 border-gray-300 font-semibold uppercase tracking-wider">
                    Report Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {alerts.map((alert, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 border-b border-gray-300 text-center font-semibold"
                  >
                    <td className="py-4 px-5 border-b border-gray-200 text-sm text-gray-700">
                      {alert.quickReportId}
                    </td>
                    <td className="py-4 px-5 border-b border-gray-200 text-sm text-gray-700">
                      {alert.latitude}
                    </td>
                    <td className="py-4 px-5 border-b border-gray-200 text-sm text-gray-700">
                      {alert.longitude}
                    </td>
                    <td className="py-4 px-5 border-b border-gray-200 text-sm text-gray-700">
                      {alert.reporterName}
                    </td>
                    <td className="py-4 px-5 border-b border-gray-200 text-sm text-blue-500 cursor-pointer">
                      <a
                        href={`http://localhost:8080/api/quick-report/download/${alert.imagePath
                          .split("\\")
                          .pop()}`}
                        download
                        className="text-blue-600 underline"
                      >
                        {alert.imagePath.split("\\").pop()}
                      </a>
                    </td>
                    <td className="py-4 px-5 border-b border-gray-200 text-sm text-gray-700">
                      {new Date(alert.reportTime).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  );
};

export default ViewQuickReports;

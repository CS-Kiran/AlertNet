import { useEffect, useState } from 'react';
import axios from 'axios';

const ViewQuickReports = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/quick-report/all');
        setAlerts(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load alerts');
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  const handleDownload = async (filename) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/quick-report/download/${filename}`);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename); // Use the filename for download
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert('Failed to download file');
    }
  };

  if (loading) {
    return <p className="text-center text-lg text-gray-500">Loading alerts...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Quick Reports</h2>
      <div className="overflow-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-5 border-b-2 border-gray-300 text-left font-semibold uppercase tracking-wider">Quick Report ID</th>
              <th className="py-3 px-5 border-b-2 border-gray-300 text-left font-semibold uppercase tracking-wider">Latitude</th>
              <th className="py-3 px-5 border-b-2 border-gray-300 text-left font-semibold uppercase tracking-wider">Longitude</th>
              <th className="py-3 px-5 border-b-2 border-gray-300 text-left font-semibold uppercase tracking-wider">Reporter Name</th>
              <th className="py-3 px-5 border-b-2 border-gray-300 text-left font-semibold uppercase tracking-wider">File</th>
              <th className="py-3 px-5 border-b-2 border-gray-300 text-left font-semibold uppercase tracking-wider">Report Time</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert, index) => (
              <tr key={index} className="hover:bg-gray-100 border-b border-gray-300">
                <td className="py-4 px-5 border-b border-gray-200 text-sm text-gray-700">{alert.quickReportId}</td>
                <td className="py-4 px-5 border-b border-gray-200 text-sm text-gray-700">{alert.latitude}</td>
                <td className="py-4 px-5 border-b border-gray-200 text-sm text-gray-700">{alert.longitude}</td>
                <td className="py-4 px-5 border-b border-gray-200 text-sm text-gray-700">{alert.reporterName}</td>
                <td className="py-4 px-5 border-b border-gray-200 text-sm text-blue-500 cursor-pointer">
                  <button onClick={() => handleDownload(alert.imagePath.split('/').pop())} className="text-blue-500 underline">
                    {alert.imagePath.split('/').pop()}
                  </button>
                </td>
                <td className="py-4 px-5 border-b border-gray-200 text-sm text-gray-700">{alert.reportTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewQuickReports;
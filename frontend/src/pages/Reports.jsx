import { useEffect, useState } from "react";
import axios from "axios";
import { MdClose } from "react-icons/md";
import { MdImage } from "react-icons/md";
import { decodeJwt } from "../utility/decodeJwt";
import DetailModal from "../components/DetailModal";
import ViewQuickReports from "../components/ViewQuickReports";

const Reports = () => {
  const token = localStorage.getItem("policeToken");
  const decoded = decodeJwt(token);
  const police_Id = decoded.id;

  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [policeId, setPoliceId] = useState(police_Id);
  const [isFiltered, setIsFiltered] = useState(false);
  const [showQuickReportsModal, setShowQuickReportsModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState({});
  const [modalTitle, setModalTitle] = useState("");

  const handleViewQuickReports = () => {
    setShowQuickReportsModal(true);
  };

  const handleCloseQuickReportsModal = () => {
    setShowQuickReportsModal(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/reports/all");
      console.log(response.data);
      const sortedReports = response.data.sort((a, b) => {
        if (a.alert && b.alert) {
          return a.alert.alertId - b.alert.alertId;
        }
        return 0;
      });
  
      setReports(sortedReports);
      setFilteredReports(sortedReports);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const handleFilterToggle = () => {
    setIsFiltered(!isFiltered);
    if (!isFiltered) {
      setFilteredReports(
        reports.filter((report) => report.police.id === policeId)
      );
    } else {
      setFilteredReports(reports);
    }
  };

  const handleShowImages = (images, reportId) => {
    setSelectedImages(images);
    setSelectedReportId(reportId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImages([]);
    setSelectedReportId(null);
  };

  const handleDownloadAllImages = async () => {
    if (!selectedReportId) return;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/reports/images/${selectedReportId}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `report_${selectedReportId}_images.zip`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading all images:", error);
    }
  };

  const handleOpenDetailModal = (report) => {
    if (report.alert) {
      setSelectedDetails(report.alert);
      setModalTitle("Alert Details");
    } else if (report.citizen) {
      setSelectedDetails(report.citizen);
      setModalTitle("Citizen Details");
    } else {
      console.error("No details available for this report.");
      return; // Exit if no valid details are found
    }
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedDetails({});
  };

  return (
    <div className="p-4">
      <h1 className="text-5xl text-center text-blue-600 font-bold mb-4">
        Reports
      </h1>
      <div className="mb-4 flex justify-between items-center">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isFiltered}
            onChange={handleFilterToggle}
            className="mr-2"
          />
          Filter by my Police ID
        </label>
        <button
          className="bg-gradient-to-r from-green-700 to-green-600 text-white px-4 py-2 rounded-full font-bold mr-4"
          onClick={handleViewQuickReports}
        >
          View Quick Reports
        </button>
      </div>

      {/* Quick Reports Modal */}
      <ViewQuickReports
        isOpen={showQuickReportsModal}
        onClose={handleCloseQuickReportsModal}
      />
      <div className="overflow-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-5 text-center border-b-2 border-gray-300 font-semibold uppercase tracking-wider">Alert ID</th>
              <th className="py-3 px-5 text-center border-b-2 border-gray-300 font-semibold uppercase tracking-wider">Citizen ID</th>
              <th className="py-3 px-5 text-center border-b-2 border-gray-300 font-semibold uppercase tracking-wider">Message</th>
              <th className="py-3 px-5 text-center border-b-2 border-gray-300 font-semibold uppercase tracking-wider">Images</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-100 border-b border-gray-300 text-center font-normal">
                <td className="py-2 border-b text-center cursor-pointer">
                  <p
                    onClick={() => handleOpenDetailModal(report)} // Pass the entire report object
                  >
                    {report.alert.alertId}
                  </p>
                </td>
                <td className="py-2 border-b text-center cursor-pointer">
                  <p
                    onClick={() => handleOpenDetailModal(report)} // Pass the entire report object
                  >
                    {report.citizen.id}
                  </p>
                </td>
                <td className="py-2 border-b text-center">{report.message}</td>
                <td className="py-2 border-b text-center">
                  <div
                    onClick={() =>
                      handleShowImages(report.imagePaths, report.alert.alertId)
                    }
                    className="cursor-pointer"
                  >
                    <MdImage className="w-6 h-6 text-blue-600 mx-auto" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-75">
          <div className="bg-white rounded-lg shadow-lg p-6 relative">
            <MdClose
              className="absolute top-2 right-2 w-6 h-6 cursor-pointer text-gray-700"
              onClick={handleCloseModal}
            />
            <h2 className="text-lg font-bold mb-4">Images</h2>
            <ul>
              {selectedImages.map((imagePath, index) => {
                const fileName = imagePath.split("\\").pop();
                return (
                  <li key={index} className="mb-2">
                    <a
                      href={`http://localhost:8080/api/reports/download/${selectedReportId}/${fileName}`}
                      download
                      className="text-blue-600 underline"
                    >
                      {fileName}
                    </a>
                  </li>
                );
              })}
            </ul>
            <button
              className="mt-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg transition duration-300 hover:scale-105"
              onClick={handleDownloadAllImages}
            >
              Download All Images
            </button>
          </div>
        </div>
      )}

      {/* Detail Modal for Alert Details */}
      <DetailModal
        isOpen={showDetailModal}
        onClose={handleCloseDetailModal}
        title={modalTitle}
        details={selectedDetails}
      />
    </div>
  );
};

export default Reports;

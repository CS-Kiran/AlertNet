import { useEffect, useState } from "react";
import axios from "axios";
import { MdClose } from "react-icons/md";
import { decodeJwt } from "../utility/decodeJwt";
import UpdateAlert from "./UpdateAlert";

const ManageAlert = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedAlert, setExpandedAlert] = useState(null);
  const [filter, setFilter] = useState("all");
  const [showPoliceAlerts, setShowPoliceAlerts] = useState(false);
  const [showPoliceID, setShowPoliceID] = useState();
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [alertToUpdate, setAlertToUpdate] = useState(null);

  const tokenKey = "policeToken";

  useEffect(() => {
    const token = localStorage.getItem(tokenKey);
    if (token) {
      try {
        const decoded = decodeJwt(token);
        setShowPoliceID(decoded);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, [tokenKey]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/alerts/all"
        );
        const sortedAlerts = response.data.sort((a, b) => a.alertId - b.alertId);
      
      setAlerts(sortedAlerts);
      } catch (err) {
        setError(err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [showUpdateForm]);

  const openPopup = (alertId) => {
    setExpandedAlert(alertId);
  };

  const closePopup = () => {
    setExpandedAlert(null);
  };

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  const handleUpdateAlert = (alert) => {
    setAlertToUpdate(alert);
    setShowUpdateForm(true);
  };

  const closeUpdateForm = () => {
    setShowUpdateForm(false);
    setAlertToUpdate(null);
  };

  if (loading) {
    return <div className="text-center">Loading alerts...</div>;
  }

  if (error) {
    return (
      <div className="text-red-600 text-center">
        Error fetching alerts: {error}
      </div>
    );
  }

  // Filter alerts based on the selected filter
  const filteredAlerts = alerts.filter((alert) => {
    const matchesType =
      filter === "all" ||
      (filter === "missing" && alert.type.toLowerCase() === "missing") ||
      (filter === "wanted" && alert.type.toLowerCase() === "wanted");

    const matchesPoliceId =
      !showPoliceAlerts || (showPoliceID && alert.policeId === showPoliceID.id);

    return matchesType && matchesPoliceId;
  });

  const toggleShowPoliceAlerts = () => {
    setShowPoliceAlerts((prevState) => !prevState);
  };

  // Find the selected alert for the popup
  const selectedAlert = alerts.find((alert) => alert.alertId === expandedAlert);

  return (
    <div className="mx-auto">
      <h2 className="text-5xl font-bold text-center mb-10 text-blue-700">
        Manage Alert&apos;s
      </h2>
      <div className="flex justify-between items-center mb-6">
        {/* Filter Options */}
        <div>
          <button
            className={`py-2 px-6 mx-2 rounded-full ${
              filter === "all" ? "bg-gradient-to-r from-blue-600 to-blue-500 font-bold text-white shadow-xl" : "transition duration-300 hover:shadow-md bg-gray-200"
            }`}
            onClick={() => handleFilterChange("all")}
          >
            All
          </button>
          <button
            className={`py-2 px-6 mx-2 rounded-full ${
              filter === "missing" ? "bg-gradient-to-r from-blue-600 to-blue-500 font-bold text-white shadow-xl" : "transition duration-300 hover:shadow-md bg-gray-200"
            }`}
            onClick={() => handleFilterChange("missing")}
          >
            Missing
          </button>
          <button
            className={`py-2 px-6 mx-2 rounded-full ${
              filter === "wanted" ? "bg-gradient-to-r from-blue-600 to-blue-500 font-bold text-white shadow-xl" : "transition duration-300 hover:shadow-md bg-gray-200"
            }`}
            onClick={() => handleFilterChange("wanted")}
          >
            Wanted
          </button>
        </div>
        <div>
          <input
            type="checkbox"
            checked={showPoliceAlerts}
            onChange={toggleShowPoliceAlerts}
            className="toggle-checkbox"
          />
          <label className="mx-2 text-gray-700">Show My Alert&apos;s Only</label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.alertId}
            className="relative bg-white rounded-lg shadow-lg p-4"
          >
            {alert.imagePath && (
              <img
                src={`http://localhost:8080/api/alerts/${alert.imagePath
                  .split("/")
                  .pop()}`}
                alt={alert.name}
                className="w-full h-40 object-cover rounded-lg transition-transform transform duration-300 hover:scale-105"
              />
            )}
            <h3 className="text-xl font-bold text-blue-700 mt-2">
            {alert.alertId} : {alert.name}
            </h3>
            <p className="text-gray-700">
              <strong>Description : </strong> {alert.description}
            </p>
            <p className="text-gray-700">
              <strong>Last Seen : </strong> {alert.lastSeenDate}
            </p>
            <p className="text-gray-700 font-bold">
              Status:
              <span
                className={`font-bold ${
                  alert.caseStatus === "open"
                    ? "text-green-600"
                    : alert.caseStatus === "in-progress"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {alert.caseStatus.toUpperCase()}
              </span>
            </p>
            <div className="flex justify-between font-semibold">
              <button
                className="mt-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 px-4 rounded-lg transition duration-200 hover:scale-105"
                onClick={() => openPopup(alert.alertId)}
              >
                View Details
              </button>

              {alert.policeId === showPoliceID.id && (
                <button
                  className="mt-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 py-2 px-4 rounded-lg transition duration-200 hover:scale-105"
                  onClick={() => handleUpdateAlert(alert)}
                >
                  Update Alert
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Popup Window for Alert Details */}
      {expandedAlert && selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="bg-white rounded-lg p-6 relative max-w-lg w-full max-h-screen"
            style={{ maxHeight: "100vh" }}
          >
            <MdClose
              onClick={closePopup}
              className="absolute top-4 right-4 cursor-pointer text-gray-600 hover:text-red-600"
            />
            <h3 className="text-3xl font-bold text-blue-700 mb-4 text-center">
              {selectedAlert.alertId} : {selectedAlert.name}
            </h3>
            {selectedAlert.imagePath && (
              <img
                src={`http://localhost:8080/api/alerts/${selectedAlert.imagePath
                  .split("/")
                  .pop()}`}
                alt={selectedAlert.name}
                className="w-auto h-[15rem] object-cover rounded-lg mb-4 ml-5 transition-transform transform duration-300 hover:scale-110"
              />
            )}
            <p className="text-gray-700">
              <strong>Description : </strong> {selectedAlert.description}
            </p>
            <p className="text-gray-700">
              <strong>Last Seen : </strong> {selectedAlert.lastSeenDate}
            </p>
            {selectedAlert.age && (
              <p className="text-gray-700">
                <strong>Age : </strong> {selectedAlert.age}
              </p>
            )}
            {selectedAlert.gender && (
              <p className="text-gray-700">
                <strong>Gender : </strong> {selectedAlert.gender}
              </p>
            )}
            {selectedAlert.height && (
              <p className="text-gray-700">
                <strong>Height : </strong> {selectedAlert.height} cm
              </p>
            )}
            {selectedAlert.weight && (
              <p className="text-gray-700">
                <strong>Weight : </strong> {selectedAlert.weight} kg
              </p>
            )}
            {selectedAlert.eyeColor && (
              <p className="text-gray-700">
                <strong>Eye Color : </strong> {selectedAlert.eyeColor}
              </p>
            )}
            {selectedAlert.hairColor && (
              <p className="text-gray-700">
                <strong>Hair Color : </strong> {selectedAlert.hairColor}
              </p>
            )}
            {selectedAlert.lastSeenLocation && (
              <p className="text-gray-700">
                <strong>Last Seen Location : </strong>{" "}
                {selectedAlert.lastSeenLocation}
              </p>
            )}
            {selectedAlert.lastSeenDate && (
              <p className="text-gray-700">
                <strong>Last Seen Date : </strong> {selectedAlert.lastSeenDate}
              </p>
            )}
            {selectedAlert.contactName && selectedAlert.contactPhone && (
              <p className="text-gray-700">
                <strong>Contact : </strong> {selectedAlert.contactName} (
                {selectedAlert.contactPhone})
              </p>
            )}
            {selectedAlert.secondaryContactName &&
              selectedAlert.secondaryContactPhone && (
                <p className="text-gray-700">
                  <strong>Secondary Contact : </strong>{" "}
                  {selectedAlert.secondaryContactName} (
                  {selectedAlert.secondaryContactPhone})
                </p>
              )}
            {selectedAlert.crimeCommitted && (
              <p className="text-gray-700">
                <strong>Crime Committed : </strong>{" "}
                {selectedAlert.crimeCommitted}
              </p>
            )}
            {selectedAlert.dateOfReport && (
              <p className="text-gray-700">
                <strong>Date of Report : </strong> {selectedAlert.dateOfReport}
              </p>
            )}
            {selectedAlert.dangerLevel && (
              <p className="text-gray-700">
                <strong>Danger Level : </strong>
                <span
                  className={`font-bold ${
                    selectedAlert.dangerLevel === "low"
                      ? "text-green-600"
                      : selectedAlert.dangerLevel === "medium"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {selectedAlert.dangerLevel.toUpperCase()}
                </span>
              </p>
            )}

            <p className="text-gray-700">
              <strong>Status : </strong>
              <span
                className={`font-bold ${
                  selectedAlert.caseStatus === "open"
                    ? "text-green-600"
                    : selectedAlert.caseStatus === "closed"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {selectedAlert.caseStatus.toUpperCase()}
              </span>
            </p>
          </div>
        </div>
      )}

      {showUpdateForm && (
        <UpdateAlert
          alert={alertToUpdate}
          onClose={closeUpdateForm}
          onUpdate={handleUpdateAlert}
        />
      )}
    </div>
  );
};

export default ManageAlert;

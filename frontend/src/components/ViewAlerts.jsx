import { useState, useEffect } from "react";
import axios from "axios";
import { MdClose } from "react-icons/md";

const ViewAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedAlert, setExpandedAlert] = useState(null);
  const [filter, setFilter] = useState("missing");

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/alerts/all"
        );
        setAlerts(response.data);
      } catch (err) {
        setError(err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  const openPopup = (alert) => setExpandedAlert(alert);
  const closePopup = () => setExpandedAlert(null);
  const handleFilterChange = (filterType) => setFilter(filterType);

  const filteredAlerts = alerts.filter((alert) =>
    filter === "missing"
      ? alert.type.toLowerCase() === "missing"
      : alert.type.toLowerCase() === "wanted"
  );

  const getGradientBorderClass = (alert) => {
    if (alert.type.toLowerCase() === "wanted") {
      switch (alert.dangerLevel) {
        case "low":
          return "border-2 border-green-500";
        case "medium":
          return "border-2 border-yellow-500";
        case "high":
          return "border-2 border-red-500";
        default:
          return "";
      }
    }
    return "";
  };

  if (loading) {
    return (
      <div className="text-center text-2xl font-semibold animate-pulse text-blue-500">
        Loading alerts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center text-lg font-semibold">
        Error fetching alerts: {error}
      </div>
    );
  }

  return (
    <div className="max-h-screen">
      <div className="absolute top-4 right-6">
        <button className="px-6 py-2 rounded-full font-bold shadow-md transition-all transform duration-300 hover:scale-105 bg-green-600 text-white hover:shadow-xl hover:bg-green-700">
          {" "}
          Quick Report{" >> "}
        </button>
      </div>
      {/* Filter Buttons */}
      <div className="flex justify-center mb-10 space-x-4">
        {["missing", "wanted"].map((type) => (
          <button
            key={type}
            onClick={() => handleFilterChange(type)}
            className={`px-6 py-2 rounded-full font-semibold shadow-md transition-transform transform duration-300 hover:scale-105 ${
              filter === type
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Alert Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.alertId}
            onClick={() => openPopup(alert)}
            className={`relative bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-2xl ${getGradientBorderClass(
              alert
            )}`}
          >
            <div className="w-full h-48 overflow-hidden rounded-lg">
              {alert.imagePath ? (
                <img
                  src={`http://localhost:8080/api/alerts/${alert.imagePath
                    .split("/")
                    .pop()}`}
                  alt={alert.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <p className="text-gray-400">No Image Available</p>
                </div>
              )}
            </div>
            <h3 className="text-lg font-bold text-blue-700 mt-4">
              {alert.name}
            </h3>
            <p className="text-gray-600 mt-1">
              <span className="font-semibold">Description:</span>{" "}
              {alert.description}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Last Seen:</span>{" "}
              {alert.lastSeenDate}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`font-bold ${
                  alert.caseStatus === "open"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {alert.caseStatus.toUpperCase()}
              </span>
            </p>
            {/* Report Button on Card */}
            <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 focus:outline-none">
              Report
            </button>
          </div>
        ))}
      </div>

      {/* Popup Window for Expanded Alert */}
      {expandedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 relative max-w-lg w-full max-h-screen">
            <MdClose
              onClick={closePopup}
              className="absolute top-4 right-4 cursor-pointer text-gray-600 hover:text-red-600"
            />
            {/* Report Button in Popup */}
            <button className="absolute top-4 left-4 px-4 py-2 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 focus:outline-none">
              Report
            </button>
            <h3 className="text-3xl font-bold text-blue-700 mb-4 text-center">
              {expandedAlert.name}
            </h3>
            {expandedAlert.imagePath && (
              <img
                src={`http://localhost:8080/api/alerts/${expandedAlert.imagePath
                  .split("/")
                  .pop()}`}
                alt={expandedAlert.name}
                className="w-full h-64 object-cover rounded-lg mb-4 transition-transform transform duration-300 hover:scale-105"
              />
            )}
            <div className="text-gray-700">
              <p>
                <strong>Description: </strong> {expandedAlert.description}
              </p>
              <p>
                <strong>Last Seen: </strong> {expandedAlert.lastSeenDate}
              </p>
              {expandedAlert.age && (
                <p>
                  <strong>Age: </strong> {expandedAlert.age}
                </p>
              )}
              {expandedAlert.gender && (
                <p>
                  <strong>Gender: </strong> {expandedAlert.gender}
                </p>
              )}
              {expandedAlert.height && (
                <p>
                  <strong>Height: </strong> {expandedAlert.height} cm
                </p>
              )}
              {expandedAlert.weight && (
                <p>
                  <strong>Weight: </strong> {expandedAlert.weight} kg
                </p>
              )}
              {expandedAlert.eyeColor && (
                <p>
                  <strong>Eye Color: </strong> {expandedAlert.eyeColor}
                </p>
              )}
              {expandedAlert.hairColor && (
                <p>
                  <strong>Hair Color: </strong> {expandedAlert.hairColor}
                </p>
              )}
              {expandedAlert.lastSeenLocation && (
                <p>
                  <strong>Last Seen Location: </strong>{" "}
                  {expandedAlert.lastSeenLocation}
                </p>
              )}
              {expandedAlert.contactName && expandedAlert.contactPhone && (
                <p>
                  <strong>Contact: </strong> {expandedAlert.contactName} (
                  {expandedAlert.contactPhone})
                </p>
              )}
              {expandedAlert.secondaryContactName &&
                expandedAlert.secondaryContactPhone && (
                  <p>
                    <strong>Secondary Contact: </strong>{" "}
                    {expandedAlert.secondaryContactName} (
                    {expandedAlert.secondaryContactPhone})
                  </p>
                )}
              {expandedAlert.crimeCommitted && (
                <p>
                  <strong>Crime Committed: </strong>{" "}
                  {expandedAlert.crimeCommitted}
                </p>
              )}
              {expandedAlert.dateOfReport && (
                <p>
                  <strong>Date of Report: </strong> {expandedAlert.dateOfReport}
                </p>
              )}
              {expandedAlert.dangerLevel && (
                <p>
                  <strong>Danger Level: </strong>
                  <span
                    className={`font-bold ${
                      expandedAlert.dangerLevel === "low"
                        ? "text-green-600"
                        : expandedAlert.dangerLevel === "medium"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {expandedAlert.dangerLevel}
                  </span>
                </p>
              )}
              <p>
                <strong>Status: </strong>
                <span
                  className={`font-bold ${
                    expandedAlert.caseStatus === "open"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {expandedAlert.caseStatus}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAlerts;

import { useEffect, useState } from "react";
import axios from "axios";
import { useAlert } from "../context/AlertContext";

const CitizenManagement = () => {
  const [citizenDetails, setCitizenDetails] = useState([]);
  const [selectedCitizen, setSelectedCitizen] = useState(null);
  const { showAlert } = useAlert();

  useEffect(() => {
    const fetchCitizenDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/citizens/all"
        );
        const sortedDetails = response.data.sort((a, b) => a.id - b.id);
        setCitizenDetails(sortedDetails);
      } catch (error) {
        console.error("Error fetching citizen details:", error);
        showAlert("error", "Failed to fetch citizen details.");
      }
    };

    fetchCitizenDetails();
  }, [showAlert]);

  // Function to activate the citizen account
  const activateCitizen = async () => {
    if (!selectedCitizen) return;

    const confirmed = window.confirm(
      "Are you sure you want to activate this account?"
    );
    if (!confirmed) return;

    setCitizenDetails((prevDetails) =>
      prevDetails.map((citizen) =>
        citizen.id === selectedCitizen.id
          ? { ...citizen, accountStatus: "activated" }
          : citizen
      )
    );

    try {
      await axios.put(
        `http://localhost:8080/api/citizens/activate/${selectedCitizen.id}`,
        {
          accountStatus: "activated",
        }
      );
      showAlert("success", "Account activated successfully!");
      closeModal();
    } catch (error) {
      showAlert("error", error.response?.data?.message || "Activation failed.");
      setCitizenDetails((prevDetails) =>
        prevDetails.map((citizen) =>
          citizen.id === selectedCitizen.id
            ? { ...citizen, accountStatus: "in-review" }
            : citizen
        )
      );
    }
  };

  // Function to suspend the citizen account
  const suspendCitizen = async () => {
    if (!selectedCitizen) return;

    const confirmed = window.confirm(
      "Are you sure you want to suspend this account? The user will not be able to access their account."
    );
    if (!confirmed) return;

    setCitizenDetails((prevDetails) =>
      prevDetails.map((citizen) =>
        citizen.id === selectedCitizen.id
          ? { ...citizen, accountStatus: "suspended" }
          : citizen
      )
    );

    try {
      await axios.put(
        `http://localhost:8080/api/citizens/suspend/${selectedCitizen.id}`,
        {
          accountStatus: "suspended",
        }
      );
      showAlert("success", "Account suspended successfully!");
      closeModal();
    } catch (error) {
      showAlert("error", error.response?.data?.message || "Suspension failed.");
      setCitizenDetails((prevDetails) =>
        prevDetails.map((citizen) =>
          citizen.id === selectedCitizen.id
            ? { ...citizen, accountStatus: "activated" }
            : citizen
        )
      );
    }
  };

  const handleView = (citizen) => {
    setSelectedCitizen(citizen);
  };

  const closeModal = () => {
    setSelectedCitizen(null);
  };

  return (
    <div className="bg-gray-100 flex min-h-full">
      <div className="min-w-6xl w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
          Citizen Accounts
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-700 text-white text-lg font-semibold text-center">
                <th className="p-4">Id</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Address</th>
                <th className="p-4">More</th>
              </tr>
            </thead>
            <tbody>
              {citizenDetails.length > 0 ? (
                citizenDetails.map((citizen, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-blue-100 transition-all duration-200 border-gray-200 text-center border-b ${
                      citizen.accountStatus === "suspended"
                        ? "border-l-4 border-red-700"
                        : ""
                    }`}
                  >
                    <td className="p-4">{citizen.id}</td>
                    <td className="p-4">{citizen.name}</td>
                    <td className="p-4">{citizen.email}</td>
                    <td className="p-4">{citizen.phone}</td>
                    <td className="p-4">{citizen.address}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleView(citizen)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md transition duration-200 shadow-md"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-4 text-gray-500">
                    No citizen details available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCitizen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              {selectedCitizen.id} : {selectedCitizen.name}
            </h2>
            <p>
              <strong>Email:</strong> {selectedCitizen.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedCitizen.phone}
            </p>
            <p>
              <strong>Address:</strong> {selectedCitizen.address}
            </p>
            <p
              className={`py-2 mt-5 px-4 rounded text-center ${
                selectedCitizen.accountStatus === "activated"
                  ? "bg-green-200 text-green-800"
                  : selectedCitizen.accountStatus === "suspended"
                  ? "bg-red-200 text-red-800"
                  : "bg-gray-500 text-gray-200"
              }`}
            >
              <strong>Account Status:</strong>{" "}
              <span className="font-bold capitalize">
                {selectedCitizen.accountStatus}
              </span>
            </p>

            <div className="flex justify-between mt-6">
              <button
                onClick={closeModal}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded shadow-md transition duration-200"
              >
                Close
              </button>

              {["in-review", "suspended"].includes(
                selectedCitizen.accountStatus
              ) && (
                <button
                  onClick={activateCitizen}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded shadow-md transition duration-200"
                >
                  Activate
                </button>
              )}

              {selectedCitizen.accountStatus === "activated" && (
                <button
                  onClick={suspendCitizen}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded shadow-md transition duration-200"
                >
                  Suspend
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CitizenManagement;

import { useEffect, useState } from "react";
import axios from "axios";
import { useAlert } from "../context/AlertContext";

const User = () => {
  const [policeDetails, setPoliceDetails] = useState([]);
  const [selectedPolice, setSelectedPolice] = useState(null);
  const { showAlert } = useAlert();

  useEffect(() => {
    const fetchPoliceDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/police/all"
        );
        const sortedDetails = response.data.sort((a, b) => a.id - b.id);
        setPoliceDetails(sortedDetails);
      } catch (error) {
        console.error("Error fetching police details:", error);
        showAlert("error", "Failed to fetch police details.");
      }
    };

    fetchPoliceDetails();
  }, [showAlert]);

// Function to activate the police account
const activatePolice = async () => {
  if (!selectedPolice) return;

  // Confirmation dialog
  const confirmed = window.confirm("Are you sure you want to activate this account?");
  if (!confirmed) return; // Exit if the user cancels

  // Update local state
  setPoliceDetails((prevDetails) =>
    prevDetails.map((police) =>
      police.id === selectedPolice.id
        ? { ...police, accountStatus: "activated" }
        : police
    )
  );

  try {
    await axios.put(
      `http://localhost:8080/api/police/activate/${selectedPolice.id}`,
      { accountStatus: "activated" }
    );
    showAlert("success", "Account activated successfully!");
    closeModal();
  } catch (error) {
    showAlert("error", error.response?.data?.message || "Activation failed.");
    setPoliceDetails((prevDetails) =>
      prevDetails.map((police) =>
        police.id === selectedPolice.id
          ? { ...police, accountStatus: "in-review" }
          : police
      )
    );
  }
};

// Function to suspend the police account
const suspendPolice = async () => {
  if (!selectedPolice) return;

  // Confirmation dialog
  const confirmed = window.confirm("Are you sure you want to suspend this account? Respective user will not be able to access the account again.");
  if (!confirmed) return; // Exit if the user cancels

  // Update local state
  setPoliceDetails((prevDetails) =>
    prevDetails.map((police) =>
      police.id === selectedPolice.id
        ? { ...police, accountStatus: "suspended" }
        : police
    )
  );

  try {
    await axios.put(
      `http://localhost:8080/api/police/suspend/${selectedPolice.id}`,
      { accountStatus: "suspended" }
    );
    showAlert("success", "Account suspended successfully!");
    closeModal();
  } catch (error) {
    showAlert("error", error.response?.data?.message || "Suspension failed.");
    setPoliceDetails((prevDetails) =>
      prevDetails.map((police) =>
        police.id === selectedPolice.id
          ? { ...police, accountStatus: "activated" }
          : police
      )
    );
  }
};


  const handleView = (police) => {
    setSelectedPolice(police);
  };

  const closeModal = () => {
    setSelectedPolice(null);
  };

  return (
    <div className="bg-gray-100 flex min-h-full">
      <div className="min-w-6xl w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
          Police Accounts
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-700 text-white text-lg font-semibold text-center">
                <th className="p-4">Id</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Department</th>
                <th className="p-4">Rank</th>
                <th className="p-4">Badge Number</th>
                <th className="p-4">Years of Service</th>
                <th className="p-4">More</th>
              </tr>
            </thead>
            <tbody>
              {policeDetails.length > 0 ? (
                policeDetails.map((police, index) => (
                  <tr
                  key={index}
                  className={`hover:bg-blue-100 transition-all duration-200 border-gray-200 text-center border-b ${
                    police.accountStatus === "suspended" ? "border-l-4 border-red-700" : ""
                  }`}
                >
                    <td className="p-4">{police.id}</td>
                    <td className="p-4">{police.name}</td>
                    <td className="p-4">{police.email}</td>
                    <td className="p-4">{police.phone}</td>
                    <td className="p-4">{police.department}</td>
                    <td className="p-4">{police.rank}</td>
                    <td className="p-4">{police.badgeNumber}</td>
                    <td className="p-4">{police.yearsOfService}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleView(police)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md transition duration-200 shadow-md"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center p-4 text-gray-500">
                    No police details available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedPolice && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              {selectedPolice.id} : {selectedPolice.name}
            </h2>
            <p>
              <strong>Date of Birth:</strong> {selectedPolice.dob}
            </p>
            <p>
              <strong>Gender:</strong> {selectedPolice.gender}
            </p>
            <p>
              <strong>Email:</strong> {selectedPolice.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedPolice.phone}
            </p>
            <p>
              <strong>Department:</strong> {selectedPolice.department}
            </p>
            <p>
              <strong>Rank:</strong> {selectedPolice.rank}
            </p>
            <p>
              <strong>Badge Number:</strong> {selectedPolice.badgeNumber}
            </p>
            <p>
              <strong>Years of Service:</strong> {selectedPolice.yearsOfService}
            </p>
            <p>
              <strong>Station Address:</strong> {selectedPolice.stationAddress}
            </p>
            <p>
              <strong>Emergency Details:</strong>{" "}
              {selectedPolice.emergencyContactName} (
              {selectedPolice.emergencyContactRelation}),{" "}
              {selectedPolice.emergencyContactPhone}
            </p>
            <p>
              <strong>Government ID Proof:</strong>
              <a
                href={`http://localhost:8080/api/police/idproof/${selectedPolice.govIdProofPath
                  .split("\\")
                  .pop()}`}
                download
                className="text-blue-600 underline"
              >
                {selectedPolice.govIdProofPath.split("\\").pop()}
              </a>
            </p>

            <p
              className={`py-2 mt-5 px-4 rounded text-center ${
                selectedPolice.accountStatus === "in-review"
                  ? "bg-yellow-200 text-yellow-800"
                  : selectedPolice.accountStatus === "activated"
                  ? "bg-green-200 text-green-800"
                  : selectedPolice.accountStatus === "suspended"
                  ? "bg-red-200 text-red-800"
                  : "bg-gray-500 text-gray-200"
              }`}
            >
              <strong>Account Status:</strong>{" "}
              <span className="font-bold capitalize">
                {selectedPolice.accountStatus}
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
                selectedPolice.accountStatus
              ) && (
                <button
                  onClick={activatePolice}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded shadow-md transition duration-200"
                >
                  Activate
                </button>
              )}

              {selectedPolice.accountStatus === "activated" && (
                <button
                  onClick={suspendPolice}
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

export default User;

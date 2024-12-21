import { useState, useEffect } from "react";
import EditProfile from "./EditProfile";
import axios from "axios";


const Profile = ({ role, userDetails }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(userDetails);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/${role}/${userDetails.id}`);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    if (isEditing) {
      fetchUserDetails();
    }
  }, [isEditing]);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleUpdateProfile = () => {
    setIsEditing(false);
    fetchUserDetails();
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="container max-w-xl p-8 bg-white rounded-lg shadow-xl mx-auto my-auto">
      {isEditing ? (
        <EditProfile
          role={role}
          userDetails={userData}
          onCancel={handleCancelEdit}
          onUpdate={handleUpdateProfile}
        />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 shadow-md rounded-lg p-4 bg-gradient-to-r from-gray-300 to-gray-200 transition-transform transform duration-300 hover:scale-105">
            {userData.name}
          </h1>

          {role === "police" ? (
            <div className="police-info space-y-4">
              <p className="text-gray-700">
                <strong>Email:</strong>{" "}
                <span className="text-gray-500">{userData.email}</span>
              </p>
              <p className="text-gray-700">
                <strong>Badge Number:</strong>{" "}
                <span className="text-gray-500">{userData.badgeNumber}</span>
              </p>
              <p className="text-gray-700">
                <strong>Rank:</strong>{" "}
                <span className="text-gray-500">{userData.rank}</span>
              </p>
              <p className="text-gray-700">
                <strong>Department:</strong>{" "}
                <span className="text-gray-500">{userData.department}</span>
              </p>
              <p className="text-gray-700">
                <strong>Date of Birth:</strong>{" "}
                <span className="text-gray-500">{userData.dob}</span>
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong>{" "}
                <span className="text-gray-500">{userData.phone}</span>
              </p>
              <p className="text-gray-700">
                <strong>Gender:</strong>{" "}
                <span className="text-gray-500">{userData.gender}</span>
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong>{" "}
                <span className="text-gray-500">{userData.address}</span>
              </p>
              <p className="text-gray-700">
                <strong>Station Address:</strong>{" "}
                <span className="text-gray-500">
                  {userData.stationAddress}
                </span>
              </p>
              <p className="text-gray-700">
                <strong>Years of Service:</strong>{" "}
                <span className="text-gray-500">
                  {userData.yearsOfService}
                </span>
              </p>
              <p className="text-gray-700">
                <strong>Emergency Contact:</strong>{" "}
                <span className="text-gray-500">
                  {userData.emergencyContactName}
                </span>
              </p>
              <p className="text-gray-700">
                <strong>Emergency Contact Phone:</strong>{" "}
                <span className="text-gray-500">
                  {userData.emergencyContactPhone}
                </span>
              </p>
              <p className="text-gray-700">
                <strong>Emergency Contact Relation:</strong>{" "}
                <span className="text-gray-500">
                  {userData.emergencyContactRelation}
                </span>
              </p>
              <p className="text-gray-700 font-bold">
                Government ID Proof:
                <a
                  href={`http://localhost:8080/api/police/idproof/${userData.govIdProofPath
                    .split("/")
                    .pop()}`}
                  download
                  className="text-blue-600 underline"
                >
                  {userData.govIdProofPath.split("/").pop()}
                </a>
              </p>
            </div>
          ) : (
            <div className="citizen-info space-y-4">
              <p className="text-gray-700">
                <strong>Email:</strong>{" "}
                <span className="text-gray-500">{userData.email}</span>
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong>{" "}
                <span className="text-gray-500">{userData.phone}</span>
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong>{" "}
                <span className="text-gray-500">{userData.address}</span>
              </p>
            </div>
          )}

          <button
            onClick={handleEditProfile}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-full shadow hover:bg-blue-700 transition-all transform hover:translate-y-1"
          >
            Edit Profile
          </button>
        </>
      )}
    </div>
  );
};

export default Profile;

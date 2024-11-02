import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import BroadcastAlert from "../components/BroadcastAlert";
import ManageAlert from "../components/ManageAlert";
import UpdateAlert from "../components/UpdateAlert";
import axios from "axios";
import { decodeJwt } from "../utility/decodeJwt";
import Profile from "../components/Profile";
import Reports from "./Reports";
import Queries from "../components/Queries";

export default function PoliceDashboard() {
  const role = "police";
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("policeToken");

  const decoded = decodeJwt(token);
  const policeId = decoded.id;
  const policeName = decoded.username;

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (token) {
        try {
          const decoded = decodeJwt(token);
          const policeId = decoded.id;

          const response = await axios.get(
            `http://localhost:8080/api/police/${policeId}`
          );
          setUserDetails(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching user details:", error);
          setError("Failed to fetch user details");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setError("No token found. Please log in.");
      }
    };

    fetchUserDetails();
  }, [token]);

  const handleEditProfile = () => {
    console.log("Edit Profile clicked");
    // Add logic to handle profile editing, maybe navigate to an edit page
  };

  if (loading) {
    return <div>Loading user details...</div>; // Display loading state
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex">
      <Sidebar role="police" />
      <div className="flex-grow p-6 ml-72 bg-slate-50 min-h-screen">
        <Routes>
          <Route path="alerts" element={<BroadcastAlert />} />
          <Route path="manage-alerts" element={<ManageAlert />} />
          <Route path="update-alerts" element={<UpdateAlert />} />
          <Route path="reports" element={<Reports />} />
          <Route
            path="dashboard"
            element={
              <Profile
                role={role}
                userDetails={userDetails}
                onEditProfile={handleEditProfile}
              />
            }
          />
          <Route
            path="queries"
            element={<Queries Id={policeId} Name={policeName} Role={role}/>}
          />
        </Routes>
      </div>
    </div>
  );
}

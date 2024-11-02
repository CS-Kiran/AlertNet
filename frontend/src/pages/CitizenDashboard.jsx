import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ViewAlerts from "../components/ViewAlerts";
import Profile from "../components/Profile";
import axios from "axios";
import { decodeJwt } from "../utility/decodeJwt";
import SubmittedReports from "../components/SubmittedReports";
import Queries from "../components/Queries";

export default function CitizenDashboard() {
  const role = "citizen";
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("citizenToken");

  const decoded = decodeJwt(token);
  const citizenId = decoded.id;
  const citizenName = decoded.username;

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (token) {
        try {
          const decoded = decodeJwt(token);
          const citizenId = decoded.id;

          const response = await axios.get(
            `http://localhost:8080/api/citizens/${citizenId}`
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
      <Sidebar role={role} />
      <div className="flex-grow p-6 ml-72 bg-slate-50 min-h-screen">
        <Routes>
          <Route
            path="dashboard"
            element={
              <Profile
                role={"citizens"}
                userDetails={userDetails}
                onEditProfile={handleEditProfile}
              />
            }
          />
          <Route path="view-alerts" element={<ViewAlerts />} />
          <Route path="reports" element={<SubmittedReports />} />
          <Route
            path="queries"
            element={<Queries Id={citizenId} Name={citizenName} Role={role}/>}
          />
        </Routes>
      </div>
    </div>
  );
}

import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ViewAlerts from "../components/ViewAlerts";

export default function CitizenDashboard() {
    const role = "citizen";

  return (
    <div className="flex">
    <Sidebar role={role} />
    <div className="flex-grow p-6 ml-72 bg-slate-50 min-h-screen">
      <Routes>
        <Route path="view-alerts" element={<ViewAlerts />} />
      </Routes>
    </div>
  </div>
  )
}

import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import BroadcastAlert from "../components/BroadcastAlert";
import ManageAlert from "../components/ManageAlert";
import UpdateAlert from "../components/UpdateAlert";

export default function PoliceDashboard() {
  const role = "police";

  return (
    <div className="flex">
      <Sidebar role={role} />
      <div className="flex-grow p-6 ml-72 bg-slate-50 min-h-screen">
        <Routes>
          <Route path="alerts" element={<BroadcastAlert />} />
          <Route path="manage-alerts" element={<ManageAlert />} />
          <Route path="update-alerts" element={<UpdateAlert />} />
        </Routes>
      </div>
    </div>
  );
}

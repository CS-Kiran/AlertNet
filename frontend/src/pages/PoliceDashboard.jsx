import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import BroadcastAlert from "../components/BroadcastAlert";

export default function PoliceDashboard() {
    const role = "police";

    return (
        <div className="flex">
      <Sidebar role={role} />
      <div className="flex-grow p-6 ml-72 bg-slate-50 min-h-screen">
        <Routes>
          <Route path="alerts" element={<BroadcastAlert/>} />
        </Routes>
      </div>
    </div>
    )
}

// 1 --> Add Login Police Details like Name , id etc on dashboard + Total alerts broadcasted + Case solved/pending + Public Reports.
// 2 --> Create API with alert_id , police_id(FK) columns also.
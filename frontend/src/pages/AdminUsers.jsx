import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import User from "../components/Users";

function AdminUsers() {
  const role = "admin";

  return (
    <div className="flex">
      <Sidebar role={role} />
      <div className="flex-grow p-6 ml-72 bg-slate-50 min-h-screen">
        <Routes>
          <Route path="users" element={<User />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminUsers;
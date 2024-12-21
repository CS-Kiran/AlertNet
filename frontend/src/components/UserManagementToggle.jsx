import { useState } from "react";
import User from "./Users";
import CitizenManagement from "./CitizenManagement";

const UserManagementToggle = () => {
  const [showCitizens, setShowCitizens] = useState(false);

  const handleToggle = (e) => {
    setShowCitizens(e.target.checked);
  };

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-end pb-4">
        <label className="flex items-center space-x-4">
          <input
            type="checkbox"
            checked={showCitizens}
            onChange={handleToggle}
            className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring focus:ring-blue-400"
          />
          <span className="text-gray-700 font-semibold">
            Show Citizen&apos;s
          </span>
        </label>
      </div>

      {/* Toggle between User and CitizenManagement components */}
      <div className="container mx-auto px-4">
        {showCitizens ? <CitizenManagement /> : <User />}
      </div>
    </div>
  );
};

export default UserManagementToggle;

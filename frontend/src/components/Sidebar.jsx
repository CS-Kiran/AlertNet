import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { decodeJwt } from "../utility/decodeJwt";
import { getLinksByRole } from "../utility/Links";

const Sidebar = ({ role }) => {
  const links = getLinksByRole(role);
  const [activePath, setActivePath] = useState(links[0]?.path || "");
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const tokenKey = `${role}Token`;

  useEffect(() => {
    const token = localStorage.getItem(tokenKey);
    if (token) {
      try {
        const decoded = decodeJwt(token);
        setUserInfo(decoded);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, [tokenKey]);

  useEffect(() => {
    if (activePath) {
      navigate(activePath);
    }
  }, [activePath, navigate]);

  const handleNavigation = (path) => {
    setActivePath(path);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem(tokenKey);
    navigate("/");
  };

  return (
    <div className="h-screen w-72 bg-gradient-to-b from-blue-700 to-blue-600 text-slate-50 fixed shadow-lg">
      <div className="border-b-2 text-center p-6 text-3xl font-bold tracking-wider transition hover:scale-105 duration-300">
        <p>Welcome</p>
        {userInfo
          ? `${
              userInfo.username.charAt(0).toUpperCase() +
              userInfo.username.slice(1)
            }`
          : `${role.charAt(0).toUpperCase() + role.slice(1)} Dashboard`}
      </div>
      <nav className="mt-10 ml-2 space-y-2">
        {links.map((link) => (
          <button
            key={link.path}
            onClick={() => handleNavigation(link.path)}
            className={`w-full flex items-center px-6 py-3 font-semibold text-lg rounded-l-full transition-all ${
              activePath === link.path
                ? "bg-white text-blue-600 shadow-lg"
                : "hover:bg-blue-500 hover:bg-opacity-80"
            }`}
          >
            {link.name}
          </button>
        ))}
      </nav>
      <div className="absolute flex justify-center bottom-4 left-14">
        <button
          onClick={handleLogout}
          aria-label="Logout"
          className="w-full flex items-center justify-center px-6 py-3 font-semibold text-lg rounded-full transition-all bg-white hover:scale-105 hover:bg-red-700 hover:text-slate-50 duration-300 shadow-lg text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-9V4a1 1 0 00-1-1H5a1 1 0 00-1 1v16a1 1 0 001 1h7a1 1 0 001-1v-1"
            />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

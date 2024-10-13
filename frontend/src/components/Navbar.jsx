import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="text-gray-700 mx-5">
        <nav className="p-4 font-semibold">
          <div className="container mx-auto flex justify-between items-center">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3 cursor-pointer p-2 text-3xl font-bold transition hover:scale-110">
              <img
                src="/alertNet.png"
                alt="AlertNet Logo"
                className="w-10 h-10"
              />
              <span>AlertNet</span>
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-8 text-lg">
              <Link
                to="/database"
                className="px-4 py-2 transition-all duration-500 hover:scale-105 hover:text-blue-700"
              >
                Database
              </Link>
              <Link
                to="/admin_login"
                className="px-4 py-2 transition-all duration-500 hover:scale-105 hover:text-blue-700"
              >
                Admin
              </Link>
              <Link
                to="/login"
                className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition duration-300"
              >
                Sign In
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;

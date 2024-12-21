import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-700 to-blue-900 text-white py-10">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center border-b border-blue-500 pb-6">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold mb-2">AlertNet</h1>
            <p className="text-sm max-w-md">
              Stay connected with a robust alert and notification system.
              Empowering communities and law enforcement.
            </p>
          </div>
          <div className="font-bold text-xl">
            <Link
              to="/admin_login"
              className="px-4 py-2 transition duration-300 hover:scale-110"
            >
              Admin
            </Link>
          </div>
          {/* Social Icons */}
          <div className="flex space-x-4 mt-6 lg:mt-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white text-blue-700 rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white text-blue-700 rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white text-blue-700 rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white text-blue-700 rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center mt-6 text-sm">
          <p className="text-center lg:text-left">
            &copy; {new Date().getFullYear()} AlertNet. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 lg:mt-0">
            <a
              href="/privacy-policy"
              className="hover:text-blue-400 transition"
            >
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-blue-400 transition">
              Terms of Service
            </a>
            <a href="/contact" className="hover:text-blue-400 transition">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

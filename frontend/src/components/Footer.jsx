import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-700 to-blue-900 text-white py-10 cursor-default">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center border-b border-blue-500 pb-6">
          {/* Brand Section */}
          <div className="text-center lg:text-left lg:mr-10">
            <h1 className="text-3xl font-bold mb-4">AlertNet</h1>
            <p className="text-sm max-w-md leading-relaxed">
              Stay connected with a robust alert and notification system. 
              Empowering communities and law enforcement with timely updates.
            </p>
          </div>

          {/* Social Icons and Admin Button */}
          <div className="flex flex-col items-center mt-6 lg:mt-0 lg:ml-10">
            {/* Social Icons */}
            <div className="flex space-x-4 mb-4">
              {[
                { href: "https://facebook.com", icon: <FaFacebook size={20} /> },
                { href: "https://twitter.com", icon: <FaTwitter size={20} /> },
                { href: "https://instagram.com", icon: <FaInstagram size={20} /> },
                { href: "https://linkedin.com", icon: <FaLinkedin size={20} /> },
              ].map(({ href, icon }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white text-blue-700 rounded-full shadow-md hover:bg-blue-500 hover:text-white transition transform hover:scale-110"
                >
                  {icon}
                </a>
              ))}
            </div>
            {/* Admin Button */}
            <Link
              to="/admin_login"
              className="text-white font-semibold bg-blue-500 px-6 py-2 rounded-md shadow-lg hover:bg-blue-600 transition transform hover:scale-105"
            >
              Admin Login
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center mt-6 text-sm">
          {/* Copyright */}
          <p className="text-center lg:text-left mb-4 lg:mb-0">
            &copy; {new Date().getFullYear()} AlertNet. All rights reserved.
          </p>

          {/* Footer Links */}
          <div className="flex space-x-6">
            {[
              { href: "/privacy-policy", text: "Privacy Policy" },
              { href: "/terms", text: "Terms of Service" },
              { href: "/contact", text: "Contact Us" },
            ].map(({ href, text }, index) => (
              <a
                key={index}
                href={href}
                className="hover:text-blue-400 transition"
              >
                {text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

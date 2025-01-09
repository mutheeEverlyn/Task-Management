import { Link } from "react-router-dom";
import MyTasks from "../assets/MyTasks.svg";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-5 flex flex-col items-center md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Logo Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img src={MyTasks} alt="MyTasks Logo" className="w-20 mb-2" />
          <p className="text-gray-400 text-xs">
            Simplify your tasks and workflow with MyTasks.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold text-sm mb-2">Quick Links</h3>
          <ul className="text-xs space-y-1">
            <li>
              <Link to="/about" className="hover:text-blue-400">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="hover:text-blue-400">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-blue-400">
                Services
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-blue-400">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="hover:text-blue-400">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold text-sm mb-2">Follow Us</h3>
          <ul className="text-xs space-y-1">
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-gray-700 mt-4 pt-3 text-center">
        <p className="text-gray-500 text-xs">
          &copy; 2024 MyTasks. All rights reserved. |{" "}
          <a href="https://www.mytasks.com" className="hover:text-blue-400">
            www.MyTasks.com
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

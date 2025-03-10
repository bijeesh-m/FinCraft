import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center"></div>
      <div className="flex justify-center space-x-4 mt-4">
        <Link to="/facebook" className="hover:text-blue-400">
          <FaFacebook size={24} />
        </Link>
        <Link to="/twitter" className="hover:text-blue-400">
          <FaTwitter size={24} />
        </Link>
        <Link to="/instagram" className="hover:text-blue-400">
          <FaInstagram size={24} />
        </Link>
        <Link to="/linkedin" className="hover:text-blue-400">
          <FaLinkedin size={24} />
        </Link>
      </div>
      <div className="text-center mt-4">
        <p>
          &copy; {new Date().getFullYear()} Finserv. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

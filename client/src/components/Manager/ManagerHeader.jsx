import React from "react";

const ManagerFooter = () => {
    return (
        <footer className="bg-gray-800 text-white py-4 mt-10">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
                {/* Left Section */}
                <p className="text-sm text-gray-300">
                    © {new Date().getFullYear()} Manager Dashboard. All rights reserved.
                </p>

                {/* Center Section - Links */}
                <div className="flex space-x-4 mt-2 md:mt-0">
                    <a href="/privacy" className="text-gray-300 hover:text-white transition">
                        Privacy Policy
                    </a>
                    <a href="/terms" className="text-gray-300 hover:text-white transition">
                        Terms of Use
                    </a>
                    <a href="/help" className="text-gray-300 hover:text-white transition">
                        Help Center
                    </a>
                </div>

                {/* Right Section - Social Icons */}
                <div className="flex space-x-4 mt-2 md:mt-0">
                    <a href="#" className="text-gray-300 hover:text-white transition">
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white transition">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white transition">
                        <i className="fab fa-linkedin"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default ManagerFooter;

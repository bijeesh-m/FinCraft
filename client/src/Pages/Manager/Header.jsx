import { useState, useRef, useEffect } from "react";
import { Menu, X, User, Settings, LogOut } from "lucide-react";
import axiosInstance from "../../axiosConfig";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const navigate = useNavigate();

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        axiosInstance
            .get("/User/Logout")
            .then(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("userid");
                Cookies.remove("AccessToken");
                navigate("/signin");
            })
            .catch((error) => console.error("Error during logout", error));
    };

    return (
        <header className="bg-white  shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
                {/* Logo */}
                <h1 className="text-xl font-bold">Manager Dashboard</h1>

                {/* Desktop Menu */}
                <nav className="hidden md:flex space-x-6">
                    <a href="#" className="hover:text-gray-200">
                        Dashboard
                    </a>
                    <a href="#" className="hover:text-gray-200">
                        Reports
                    </a>
                    <a href="#" className="hover:text-gray-200">
                        Settings
                    </a>
                </nav>

                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button className="flex items-center space-x-2 " onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <User size={20} />
                        <span className="hidden md:inline">Manager</span>
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <div className="absolute z-40 right-0 mt-2 w-40 bg-white overflow-hidden text-gray-800 shadow-md rounded-lg">
                            <button className="flex w-full no-underline items-center px-4 py-2 hover:bg-gray-100">
                                <Settings size={16} className="mr-2" /> Settings
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex w-full no-underline items-center px-4 py-2 hover:bg-gray-100"
                            >
                                <LogOut size={16} className="mr-2" /> Logout
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <nav className="md:hidden bg-blue-700">
                    <a href="#" className="block px-4 py-2 hover:bg-blue-800">
                        Dashboard
                    </a>
                    <a href="#" className="block px-4 py-2 hover:bg-blue-800">
                        Reports
                    </a>
                    <a href="#" className="block px-4 py-2 hover:bg-blue-800">
                        Settings
                    </a>
                </nav>
            )}
        </header>
    );
};

export default Header;

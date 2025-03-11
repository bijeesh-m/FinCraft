import { useState, useRef, useEffect } from "react";
import { Menu, X, User, Settings, LogOut } from "lucide-react";
import axiosInstance from "../../axiosConfig";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const navigate = useNavigate();

    // Close dropdown and menu when clicking outside
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
        <header className="bg-white shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
                {/* Logo */}
                <Link className=" no-underline text-black" to={"/manager"}>
                    <h1 className="text-xl font-bold">Manager Dashboard</h1>
                </Link>

                {/* Desktop Menu */}
                <nav className={`md:flex space-x-6 hidden`}>
                    <Link to={"/manager"} className="hover:text-gray-500 no-underline">
                        Dashboard
                    </Link>
                    <Link to={"/manager/requests"} className="hover:text-gray-500 no-underline">
                        Requests
                    </Link>
                </nav>

                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button className="flex items-center space-x-2" onClick={() => setDropdownOpen((prev) => !prev)}>
                        <User size={20} />
                        <span className="hidden md:inline">Manager</span>
                    </button>

                    {/* Dropdown Menu */}
                    <div
                        className={`absolute right-0 mt-2 w-40 z-40 bg-white shadow-md rounded-lg overflow-hidden transition-all duration-200 ${
                            dropdownOpen ? "block" : "hidden"
                        }`}
                    >
                        <button
                            onClick={() => navigate("/manager/profile")}
                            className="flex w-full items-center px-4 py-2 hover:bg-gray-100"
                        >
                            <Settings size={16} className="mr-2" /> Profile
                        </button>
                        <button onClick={handleLogout} className="flex w-full items-center px-4 py-2 hover:bg-gray-100">
                            <LogOut size={16} className="mr-2" /> Logout
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden" onClick={() => setMenuOpen((prev) => !prev)}>
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}

            {/* Sidebar Navigation */}
            <div
                className={`fixed top-0 left-0 h-screen w-64 bg-blue-700 text-white transform transition-transform duration-300 z-50 ${
                    menuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <button className="absolute top-4 right-4 text-white" onClick={() => setMenuOpen(false)}>
                    <X size={24} />
                </button>
                <nav className="mt-16 space-y-4 text-white">
                    <Link
                        to={"/manager"}
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="block text-white px-6 py-3 hover:bg-blue-800"
                    >
                        Dashboard
                    </Link>
                    <Link
                        to={"/manager/requests"}
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="block text-white px-6 py-3 hover:bg-blue-800"
                    >
                        Requests
                    </Link>
                </nav>
            </div>

            {/* Overlay */}
            {menuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMenuOpen(false)}></div>
            )}
        </header>
    );
};

export default Header;

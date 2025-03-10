import { useState } from "react";
import { Link } from "react-router-dom";

const AdminHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="flex">
            {/* Overlay (click outside to close) */}
            {menuOpen && (
                <div
                    className="fixed z-50 inset-0 bg-black bg-opacity-50 md:hidden"
                    onClick={() => setMenuOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 bg-blue-900 text-white w-64 md:w-full  px-5 py-4 justify-between md:flex items-center    transform ${
                    menuOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out md:translate-x-0 md:relative z-50 `}
                onClick={(e) => e.stopPropagation()} // Prevent overlay click from closing menu
            >
                <h2 className="text-2xl  items-center justify-center md:mb-5 mb-0  font-bold ">BankAdmin</h2>
                <nav className="flex flex-col md:flex-row    gap-3">
                    {[
                        { name: "Dashboard", path: "/admin/dashboard" },
                        { name: "Add Manager", path: "/admin/addmanager" },
                        { name: "Users", path: "/admin/users" },
                        { name: "Complaints", path: "/admin/complaints" },
                        { name: "FeedBacks", path: "/admin/feedbacks" },
                    ].map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="hover:text-gray-300 no-underline"
                            onClick={() => setMenuOpen(false)} // Close sidebar on navigation
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Header for Mobile */}
            <div className="flex-1">
                <header className="bg-blue-900 text-white p-4 shadow-md flex justify-between items-center md:hidden">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-white text-3xl focus:outline-none focus:ring-2 focus:ring-white"
                    >
                        {menuOpen ? "✖" : "☰"}
                    </button>
                    <nav className=" md:flex-col space-x-4 hidden ">
                        {[
                            { name: "Dashboard", path: "/admin/dashboard" },
                            { name: "Add Manager", path: "/admin/addmanager" },
                            { name: "Users", path: "/admin/users" },
                            { name: "Complaints", path: "/admin/complaints" },
                            { name: "FeedBacks", path: "/admin/feedbacks" },
                        ].map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="hover:text-gray-300 no-underline"
                                onClick={() => setMenuOpen(false)} // Close sidebar on navigation
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </header>
            </div>
        </div>
    );
};

export default AdminHeader;

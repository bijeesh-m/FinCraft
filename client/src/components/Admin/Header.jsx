

import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const AdminHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="h-screen flex flex-col">
            {/* Top Navbar for Large Screens */}
            <header className="bg-blue-900 text-white p-4 shadow-md hidden  md:flex justify-between items-center">
                <h2 className="text-lg font-semibold mb-0">BankAdmin</h2>
                <nav className="flex gap-4">
                    {[
                        { name: "Dashboard", path: "/admin/dashboard" },
                        { name: "Add Manager", path: "/admin/addmanager" },
                        { name: "Users", path: "/admin/users" },
                        { name: "Complaints", path: "/admin/complaints" },
                        { name: "FeedBacks", path: "/admin/feedbacks" },
                    ].map((item) => (
                        <Link key={item.path} to={item.path} className="hover:text-gray-300 no-underline">
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </header>

            {/* Mobile Header */}
            <div className="md:hidden">
                <header className="bg-blue-900 text-white p-4 shadow-md flex justify-between items-center">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-white text-3xl focus:outline-none focus:ring-2 focus:ring-white"
                    >
                        {menuOpen ? "✖" : "☰"}
                    </button>
                    <h2 className="text-lg mb-0 font-semibold">BankAdmin</h2>
                </header>

                {/* Mobile Sidebar */}
                {menuOpen && (
                    <>
                        {/* Overlay to close sidebar */}
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMenuOpen(false)}></div>

                        <div className="fixed inset-y-0 left-0 w-64 bg-blue-900 text-white px-5 py-4 z-50 transform translate-x-0 transition-transform duration-300 ease-in-out flex flex-col">
                            <nav className="flex flex-col gap-3">
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
                                        className="hover:text-gray-300 no-underline p-2"
                                        onClick={() => setMenuOpen(false)} // Close sidebar on click
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </>
                )}
            </div>

            {/* Page Content */}
            <main className=" flex-1">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminHeader;


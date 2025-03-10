// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../Images/Logo.jpg";
// import { FaSearch, FaUser } from "react-icons/fa";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";

// function Header() {
//     const token = localStorage.getItem("AccessToken") || Cookies.get("AccessToken");
//     const [search, setSearch] = useState("");
//     const [searchResults, setSearchResults] = useState([]);
//     const navigate = useNavigate();

//     let role = null;

//     if (token) {
//         try {
//             const decodedToken = jwtDecode(token);
//             role = decodedToken.role;
//         } catch (error) {
//             console.error("Error decoding token:", error);
//         }
//     }

//     const items = [
//         { id: 1, name: "Loans", link: "/loans" },
//         { id: 2, name: "Insurances", link: "/insurance" },
//         { id: 3, name: "Cards", link: "/cards" },
//         { id: 4, name: "Deposit/Withdrawal", link: "/deposits" },
//         { id: 5, name: "Payment/Transfer", link: "/paymentsTransfer" },
//         { id: 6, name: "Account Dashboard", link: "/bankaccntdash" },

//         { id: 7, name: "Request", link: "/request" },
//         { id: 8, name: "View Staff", link: "/view-staff" },
//         { id: 9, name: "Add Staff", link: "/add-staff" },

//         {
//             id: 10,
//             name: "Account Opening Request",
//             link: "/accountrequests",
//         },

//         { id: 11, name: "View Users", link: "/view-users" },
//         { id: 12, name: "Complaints", link: "/complaints" },
//         { id: 13, name: "Feedbacks", link: "/feedbacks" },
//         { id: 14, name: "Add Manager", link: "/add-manager" },
//     ];

//     const filteredItems = items.filter((item) => {
//         switch (role) {
//             case "user":
//                 return (
//                     item.name === "Loans" ||
//                     item.name === "Insurances" ||
//                     item.name === "Cards" ||
//                     item.name === "Deposit/Withdrawal" ||
//                     item.name === "Payment/Transfer" ||
//                     item.name === "Account Dashboard"
//                 );
//             case "manager":
//                 return item.name === "Request" || item.name === "View Staff" || item.name === "Add Staff";
//             case "staff":
//                 return item.name === "Account Opening Request" || item.name === "Request";
//             case "admin":
//                 return (
//                     item.name === "View Users" ||
//                     item.name === "Complaints" ||
//                     item.name === "Feedbacks" ||
//                     item.name === "Add Manager"
//                 );
//             default:
//                 return false;
//         }
//     });

//     const handleSearchChange = (e) => {
//         const query = e.target.value;
//         setSearch(query);
//         if (query) {
//             const filteredResults = filteredItems.filter((item) =>
//                 item.name.toLowerCase().includes(query.toLowerCase())
//             );
//             setSearchResults(filteredResults);
//         } else {
//             setSearchResults([]);
//         }
//     };

//     const handleResultClick = (link) => {
//         setSearch("");
//         setSearchResults([]);
//         navigate(link);
//     };

//     const handleLogoClick = () => {
//         console.log("Role:", role);

//         if (role === "manager") {
//             navigate("/mngerdash");
//         } else if (role === "admin") {
//             navigate("/admindash");
//         } else if (role === "staff") {
//             navigate("/staffdash");
//         } else if (role === "user") {
//             navigate("/");
//         } else {
//             navigate("/");
//         }
//     };

//     return (
//         <div>
//             <nav className="bg-slate-50 border-b border-gray-100 shadow-md shadow-gray-100">
//                 <div className="container mx-auto px-4 py-4 flex flex-wrap justify-center sm:justify-between items-center ">
//                     <div className="flex-shrink-0 ml-0">
//                         <button onClick={handleLogoClick} className="text-black">
//                             <img
//                                 src={logo}
//                                 alt="UnityPointLOGO"
//                                 className="w-14 h-1w-14 rounded-full  transition duration-300 transform hover:scale-105"
//                             />
//                         </button>
//                     </div>

//                     <div className="flex-grow flex justify-center">
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 value={search}
//                                 onChange={handleSearchChange}
//                                 placeholder="Search..."
//                                 className="w-64 p-2 rounded-lg border border-teal-500 focus:outline-none focus:ring focus:ring-teal-300"
//                             />
//                             <button type="button" className="absolute right-0 top-1a mt-2 mr-3 text-gray-500">
//                                 <FaSearch />
//                             </button>
//                             {search && searchResults.length > 0 && (
//                                 <div className="absolute top-12 w-full bg-white rounded-md shadow-lg z-10">
//                                     <ul>
//                                         {searchResults.map((result) => (
//                                             <li key={result.id}>
//                                                 <button
//                                                     onClick={() => handleResultClick(result.link)}
//                                                     className="block w-full text-left px-4 py-2 text-black hover:bg-blue-600 hover:text-white"
//                                                 >
//                                                     {result.name}
//                                                 </button>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     <div className="relative flex flex-wrap space-x-8 items-center">
//                         {!token && (
//                             <Link to="/signin" className="text-black hover:text-blue-600">
//                                 SignIn
//                             </Link>
//                         )}

//                         {role === "user" && (
//                             <Link to="/feedback" className="text-black hover:text-blue-600">
//                                 Feedback
//                             </Link>
//                         )}
//                         {role === "user" && (
//                             <Link to="/aboutus" className="text-black hover:text-blue-600">
//                                 About Us
//                             </Link>
//                         )}
//                         {role === "user" && (
//                             <Link to="/complaint" className="text-black hover:text-blue-600">
//                                 Complaint
//                             </Link>
//                         )}

//                         {token && (
//                             <Link to="/profile" className="text-black hover:text-blue-600">
//                                 <FaUser size={24} className="ml-4 hover:scale-110 transition duration-300" />
//                             </Link>
//                         )}
//                     </div>
//                 </div>
//             </nav>
//         </div>
//     );
// }

// export default Header;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../Images/Logo.jpg";
// import { FaSearch, FaUser, FaBars, FaTimes } from "react-icons/fa";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";

// function Header() {
//   const token = localStorage.getItem("AccessToken") || Cookies.get("AccessToken");
//   const [search, setSearch] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle
//   const navigate = useNavigate();

//   let role = null;
//   if (token) {
//     try {
//       const decodedToken = jwtDecode(token);
//       role = decodedToken.role;
//     } catch (error) {
//       console.error("Error decoding token:", error);
//     }
//   }

//   const items = [
//     { id: 1, name: "Loans", link: "/loans" },
//     { id: 2, name: "Insurances", link: "/insurance" },
//     { id: 3, name: "Cards", link: "/cards" },
//     { id: 4, name: "Deposit/Withdrawal", link: "/deposits" },
//     { id: 5, name: "Payment/Transfer", link: "/paymentsTransfer" },
//     { id: 6, name: "Account Dashboard", link: "/bankaccntdash" },
//     { id: 7, name: "Request", link: "/request" },
//     { id: 8, name: "View Staff", link: "/view-staff" },
//     { id: 9, name: "Add Staff", link: "/add-staff" },
//     { id: 10, name: "Account Opening Request", link: "/accountrequests" },
//     { id: 11, name: "View Users", link: "/view-users" },
//     { id: 12, name: "Complaints", link: "/complaints" },
//     { id: 13, name: "Feedbacks", link: "/feedbacks" },
//     { id: 14, name: "Add Manager", link: "/add-manager" },
//   ];

//   const filteredItems = items.filter((item) => {
//     switch (role) {
//       case "user":
//         return ["Loans", "Insurances", "Cards", "Deposit/Withdrawal", "Payment/Transfer", "Account Dashboard"].includes(
//           item.name
//         );
//       case "manager":
//         return ["Request", "View Staff", "Add Staff"].includes(item.name);
//       case "staff":
//         return ["Account Opening Request", "Request"].includes(item.name);
//       case "admin":
//         return ["View Users", "Complaints", "Feedbacks", "Add Manager"].includes(item.name);
//       default:
//         return false;
//     }
//   });

//   const handleSearchChange = (e) => {
//     const query = e.target.value;
//     setSearch(query);
//     if (query) {
//       const filteredResults = filteredItems.filter((item) =>
//         item.name.toLowerCase().includes(query.toLowerCase())
//       );
//       setSearchResults(filteredResults);
//     } else {
//       setSearchResults([]);
//     }
//   };

//   const handleResultClick = (link) => {
//     setSearch("");
//     setSearchResults([]);
//     navigate(link);
//   };

//   const handleLogoClick = () => {
//     if (role === "manager") navigate("/mngerdash");
//     else if (role === "admin") navigate("/admindash");
//     else if (role === "staff") navigate("/staffdash");
//     else navigate("/");
//   };

//   const toggleMenu = () => setIsMenuOpen((prev) => !prev);

//   return (
//     <nav className="bg-white shadow-md border-b border-gray-200">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <button onClick={handleLogoClick} className="flex-shrink-0">
//             <img
//               src={logo}
//               alt="UnityPointLOGO"
//               className="w-12 h-12 rounded-full transition-transform duration-300 hover:scale-105"
//             />
//           </button>

//           {/* Search Bar (Hidden on mobile, shown on md+) */}
//           <div className="hidden md:flex flex-grow justify-center mx-4 relative">
//             <input
//               type="text"
//               value={search}
//               onChange={handleSearchChange}
//               placeholder="Search..."
//               className="w-full max-w-md px-4 py-2 rounded-lg border border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300"
//             />
//             <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//             {search && searchResults.length > 0 && (
//               <div className="absolute top-full mt-2 w-full max-w-md bg-white rounded-md shadow-lg z-10">
//                 <ul>
//                   {searchResults.map((result) => (
//                     <li key={result.id}>
//                       <button
//                         onClick={() => handleResultClick(result.link)}
//                         className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-600 hover:text-white transition-colors"
//                       >
//                         {result.name}
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>

//           {/* Desktop Navigation Links */}
//           <div className="hidden md:flex items-center space-x-6">
//             {!token && (
//               <Link to="/signin" className="text-gray-800 hover:text-blue-600 transition-colors">
//                 Sign In
//               </Link>
//             )}
//             {role === "user" && (
//               <>
//                 <Link to="/feedback" className="text-gray-800 hover:text-blue-600 transition-colors">
//                   Feedback
//                 </Link>
//                 <Link to="/aboutus" className="text-gray-800 hover:text-blue-600 transition-colors">
//                   About Us
//                 </Link>
//                 <Link to="/complaint" className="text-gray-800 hover:text-blue-600 transition-colors">
//                   Complaint
//                 </Link>
//               </>
//             )}
//             {token && (
//               <Link to="/profile">
//                 <FaUser className="text-gray-800 w-6 h-6 hover:text-blue-600 transition-transform hover:scale-110" />
//               </Link>
//             )}
//           </div>

//           {/* Mobile Menu Toggle */}
//           <button onClick={toggleMenu} className="md:hidden text-gray-800 focus:outline-none">
//             {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//           </button>
//         </div>

//         {/* Mobile Menu (Shown when toggled) */}
//         {isMenuOpen && (
//           <div className={`md:hidden mt-4 space-y-4 overflow-hidden transform transition-all duration-300 ease-in-out ${
//             isMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
//           } origin-top`}>
//             {/* Mobile Search Bar */}
//             <div className="relative">
//               <input
//                 type="text"
//                 value={search}
//                 onChange={handleSearchChange}
//                 placeholder="Search..."
//                 className="w-full px-4 py-2 rounded-lg border border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300"
//               />
//               <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//               {search && searchResults.length > 0 && (
//                 <div className="absolute top-full mt-2 w-full bg-white rounded-md shadow-lg z-10">
//                   <ul>
//                     {searchResults.map((result) => (
//                       <li key={result.id}>
//                         <button
//                           onClick={() => handleResultClick(result.link)}
//                           className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-600 hover:text-white transition-colors"
//                         >
//                           {result.name}
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>

//             {/* Mobile Navigation Links */}
//             <div className="flex flex-col space-y-3">
//               {!token && (
//                 <Link
//                   to="/signin"
//                   className="text-gray-800 hover:text-blue-600 transition-colors"
//                   onClick={toggleMenu}
//                 >
//                   Sign In
//                 </Link>
//               )}
//               {role === "user" && (
//                 <>
//                   <Link
//                     to="/feedback"
//                     className="text-gray-800 hover:text-blue-600 transition-colors"
//                     onClick={toggleMenu}
//                   >
//                     Feedback
//                   </Link>
//                   <Link
//                     to="/aboutus"
//                     className="text-gray-800 hover:text-blue-600 transition-colors"
//                     onClick={toggleMenu}
//                   >
//                     About Us
//                   </Link>
//                   <Link
//                     to="/complaint"
//                     className="text-gray-800 hover:text-blue-600 transition-colors"
//                     onClick={toggleMenu}
//                   >
//                     Complaint
//                   </Link>
//                 </>
//               )}
//               {token && (
//                 <Link to="/profile" onClick={toggleMenu}>
//                   <div className="flex items-center space-x-2">
//                     <FaUser className="text-gray-800 w-6 h-6 hover:text-blue-600 transition-transform hover:scale-110" />
//                     <span className="text-gray-800 hover:text-blue-600">Profile</span>
//                   </div>
//                 </Link>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Header;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Images/Logo.jpg";
import { FaSearch, FaUser, FaBars, FaTimes } from "react-icons/fa";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function Header() {
    const token = localStorage.getItem("AccessToken") || Cookies.get("AccessToken");
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Changed to isSidebarOpen
    const navigate = useNavigate();

    let role = null;
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            role = decodedToken.role;
        } catch (error) {
            console.error("Error decoding token:", error);
        }
    }

    const items = [
        { id: 1, name: "Loans", link: "/loans" },
        { id: 2, name: "Insurances", link: "/insurance" },
        { id: 3, name: "Cards", link: "/cards" },
        { id: 4, name: "Deposit/Withdrawal", link: "/deposits" },
        { id: 5, name: "Payment/Transfer", link: "/paymentsTransfer" },
        { id: 6, name: "Account Dashboard", link: "/bankaccntdash" },
        { id: 7, name: "Request", link: "/request" },
        { id: 8, name: "View Staff", link: "/view-staff" },
        { id: 9, name: "Add Staff", link: "/add-staff" },
        { id: 10, name: "Account Opening Request", link: "/accountrequests" },
        { id: 11, name: "View Users", link: "/view-users" },
        { id: 12, name: "Complaints", link: "/complaints" },
        { id: 13, name: "Feedbacks", link: "/feedbacks" },
        { id: 14, name: "Add Manager", link: "/add-manager" },
    ];

    const filteredItems = items.filter((item) => {
        switch (role) {
            case "user":
                return [
                    "Loans",
                    "Insurances",
                    "Cards",
                    "Deposit/Withdrawal",
                    "Payment/Transfer",
                    "Account Dashboard",
                ].includes(item.name);
            case "manager":
                return ["Request", "View Staff", "Add Staff"].includes(item.name);
            case "staff":
                return ["Account Opening Request", "Request"].includes(item.name);
            case "admin":
                return ["View Users", "Complaints", "Feedbacks", "Add Manager"].includes(item.name);
            default:
                return false;
        }
    });

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearch(query);
        if (query) {
            const filteredResults = filteredItems.filter((item) =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(filteredResults);
        } else {
            setSearchResults([]);
        }
    };

    const handleResultClick = (link) => {
        setSearch("");
        setSearchResults([]);
        setIsSidebarOpen(false); // Close sidebar on selection
        navigate(link);
    };

    const handleLogoClick = () => {
        if (role === "manager") navigate("/mngerdash");
        else if (role === "admin") navigate("/admindash");
        else if (role === "staff") navigate("/staffdash");
        else navigate("/");
    };

    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    return (
        <nav className="bg-white shadow-md border-b border-gray-200">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <button onClick={handleLogoClick} className="flex-shrink-0">
                        <img
                            src={logo}
                            alt="UnityPointLOGO"
                            className="w-12 h-12 rounded-full transition-transform duration-300 hover:scale-105"
                        />
                    </button>

                    {/* Search Bar (Hidden on mobile, shown on md+) */}
                    <div className="hidden md:flex flex-grow justify-center mx-4 relative">
                        <input
                            type="text"
                            value={search}
                            onChange={handleSearchChange}
                            placeholder="Search..."
                            className="w-full max-w-md px-4 py-2 rounded-lg border border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300"
                        />
                        <FaSearch className="absolute right-3 md:hidden top-1/2 transform -translate-y-1/2 text-gray-500" />
                        {search && searchResults.length > 0 && (
                            <div className="absolute top-full mt-2 w-full max-w-md bg-white rounded-md shadow-lg z-10">
                                <ul>
                                    {searchResults.map((result) => (
                                        <li key={result.id}>
                                            <button
                                                onClick={() => handleResultClick(result.link)}
                                                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-600 hover:text-white transition-colors"
                                            >
                                                {result.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-6">
                        {!token && (
                            <Link to="/signin" className="text-gray-800 no-underline hover:text-blue-600 transition-colors">
                                Sign In
                            </Link>
                        )}
                        {role === "user" && (
                            <>
                                <Link to="/feedback" className="text-gray-800 no-underline hover:text-blue-600 transition-colors">
                                    Feedback
                                </Link>
                                <Link to="/aboutus" className="text-gray-800 no-underline hover:text-blue-600 transition-colors">
                                    About Us
                                </Link>
                                <Link to="/complaint" className="text-gray-800 no-underline hover:text-blue-600 transition-colors">
                                    Complaint
                                </Link>
                            </>
                        )}
                        {token && (
                            <Link to="/profile">
                                <FaUser className="text-gray-800 no-underline w-6 h-6 hover:text-blue-600 transition-transform hover:scale-110" />
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button onClick={toggleSidebar} className="md:hidden text-gray-800 no-underline focus:outline-none">
                        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-20 md:hidden ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="p-4">
                    {/* Sidebar Header */}
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xl font-bold text-gray-800 no-underline">Menu</span>
                        <button onClick={toggleSidebar} className="text-gray-800 no-underline">
                            <FaTimes size={20} />
                        </button>
                    </div>

                    {/* Mobile Search Bar */}
                    <div className="relative mb-4">
                        <input
                            type="text"
                            value={search}
                            onChange={handleSearchChange}
                            placeholder="Search..."
                            className="w-full px-4 py-2 rounded-lg border border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300"
                        />
                        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        {search && searchResults.length > 0 && (
                            <div className="absolute top-full mt-2 w-full bg-white rounded-md shadow-lg z-10">
                                <ul>
                                    {searchResults.map((result) => (
                                        <li key={result.id}>
                                            <button
                                                onClick={() => handleResultClick(result.link)}
                                                className="block w-full text-left px-4 py-2 text-gray-800 no-underline hover:bg-blue-600 hover:text-white transition-colors"
                                            >
                                                {result.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Navigation Links */}
                    <div className="flex flex-col space-y-3">
                        {!token && (
                            <Link
                                to="/signin"
                                className="text-gray-800 no-underline hover:text-blue-600 transition-colors"
                                onClick={toggleSidebar}
                            >
                                Sign In
                            </Link>
                        )}
                        {role === "user" && (
                            <>
                                <Link
                                    to="/feedback"
                                    className="text-gray-800 no-underline hover:text-blue-600 transition-colors"
                                    onClick={toggleSidebar}
                                >
                                    Feedback
                                </Link>
                                <Link
                                    to="/aboutus"
                                    className="text-gray-800 no-underline hover:text-blue-600 transition-colors"
                                    onClick={toggleSidebar}
                                >
                                    About Us
                                </Link>
                                <Link
                                    to="/complaint"
                                    className="text-gray-800 no-underline hover:text-blue-600 transition-colors"
                                    onClick={toggleSidebar}
                                >
                                    Complaint
                                </Link>
                            </>
                        )}
                        {token && (
                            <Link to="/profile" onClick={toggleSidebar}>
                                <div className="flex items-center space-x-2">
                                    <FaUser className="text-gray-800 no-underline w-6 h-6 hover:text-blue-600 transition-transform hover:scale-110" />
                                    <span className="text-gray-800 no-underline hover:text-blue-600">Profile</span>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Overlay for closing sidebar when clicking outside */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden" onClick={toggleSidebar}></div>
            )}
        </nav>
    );
}

export default Header;

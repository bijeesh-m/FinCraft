import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode";

export default function NotFoundPage() {
    const token = Cookies.get("AccessToken") || Cookies.get("adminAuthToken");
    console.log(token);
    let user;
    let homeUrl = "/";
    console.log(token);
    if (token) {
        user = jwtDecode(token);
    }

    if (user.role === "user") {
        homeUrl = "/";
    } else if (user.role === "manager") {
        homeUrl = "/manager";
    } else {
        homeUrl = "/admin";
    }

    console.log(user);

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className=" p-10 rounded-2xl  text-center"
            >
                <motion.h1
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-6xl font-bold text-blue-600"
                >
                    404
                </motion.h1>
                <p className="text-gray-600 text-lg mt-2">Oops! Page not found.</p>
                <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    src="https://cdn-icons-png.flaticon.com/512/2921/2921822.png"
                    alt="Bank Not Found"
                    className="w-40 mx-auto mt-6"
                />
                <Link to={homeUrl} className="inline-block  mt-6  transition">
                    Go Back Home
                </Link>
            </motion.div>
        </div>
    );
}

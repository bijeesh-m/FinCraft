import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import Cookies from "js-cookie";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
const ManagerProfile = () => {
    const [manager, setManager] = useState({});

    const navigate = useNavigate()

    useEffect(() => {
        axiosInstance
            .get("/Manager/getUser")
            .then((res) => {
                setManager(res.data.user);
            })
            .catch((err) => {
                console.log(err);
            });
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
        <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
            <div className="w-full  bg-white  p-6">
                {/* Profile Header */}
                <div className="flex flex-col items-center">
                    <img
                        src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                        alt="Manager Avatar"
                        className="w-28 h-28 rounded-full  border-blue-500"
                    />
                    <h2 className="mt-4 text-2xl font-bold text-gray-800">
                        {manager.firstname} {manager.lastname}
                    </h2>
                    <p className="text-gray-600">{manager.position}</p>
                </div>

                {/* Profile Details */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <p className="text-gray-500">Email</p>
                        <p className="text-gray-900 font-semibold">{manager.email}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <p className="text-gray-500">Phone</p>
                        <p className="text-gray-900 font-semibold">{manager.phone}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm col-span-2">
                        <p className="text-gray-500">User ID</p>
                        <p className="text-gray-900 font-semibold">{manager.userId || "N/A"}</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-center gap-4">
                    <button onClick={handleLogout} className="flex w-full items-center px-4 py-2 hover:bg-gray-100">
                        <LogOut size={16} className="mr-2" /> Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManagerProfile;

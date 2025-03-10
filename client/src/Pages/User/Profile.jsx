

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import userIcon from "../../Images/user.jpg";
import axiosInstance from "../../axiosConfig";
import Cookies from "js-cookie";

function Profile() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleNavigate = () => navigate("/chngpass");

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

    const handleEdit = (data) => {
        const formData = new FormData();
        formData.append("username", data.username);
        formData.append("email", data.email);
        formData.append("phone", data.phone);
        formData.append("address", data.address);
        if (data.profilePic && data.profilePic[0]) {
            formData.append("avatar", data.profilePic[0]);
        }

        axiosInstance
            .put("/User/EditProfile", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                if (res.status === 200) {
                    setIsModalOpen(false);
                    navigate(0);
                }
            })
            .catch((error) => console.error("Error updating profile", error));
    };

    const toggleModal = () => setIsModalOpen((prev) => !prev);

    useEffect(() => {
        const token = localStorage.getItem("AccessToken") || Cookies.get("AccessToken");
        if (!token) {
            setError("No access token found. Please log in again.");
            setLoading(false);
            return;
        }

        axiosInstance
            .get("/User/Profile")
            .then((response) => {
                setUser(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(
                    error.response?.status === 403
                        ? "No linked bank account found."
                        : "Error fetching profile. Please try again later."
                );
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center py-10 text-gray-500">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
    if (!user) return <div className="text-center py-10 text-gray-500">No user data available.</div>;

    return (
        <div className="container mx-auto px-4 py-8 ">
            <div className="bg-white  p-6 md:p-8">
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row  items-center    space-y-4 md:space-y-0 md:space-x-6 border-b pb-6">
                    <img
                        src={user.avatar || userIcon}
                        alt="Profile"
                        className="w-24 h-24 md:w-32 md:h-32 bg-cover bg-center  rounded-full  border-4 border-gray-100"
                    />
                    <div className=" flex flex-col items-center md:items-start">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{user.username}</h1>
                        <p className="text-gray-600 mt-1">{user.email}</p>
                    </div>
                    <div className=" w-full  flex md:justify-end justify-center ">
                        <Link
                            className="  font-bold hover:rotate-3  shadow-md  px-3 py-2 no-underline text-black rounded"
                            to={"/bankaccntdash"}
                        >
                            View Bank Account Dashboard
                        </Link>
                    </div>
                </div>

                {/* Profile Content */}
                <div className="mt-6 space-y-8">
                    {/* Contact Information */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Contact Information</h2>
                        <div className="space-y-2 text-gray-600">
                            <p>
                                <span className="font-medium">Phone:</span> {user.phone}
                            </p>
                            <p>
                                <span className="font-medium">Address:</span> {user.address}
                            </p>
                        </div>
                    </div>

                    {/* Account Settings */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Account Settings</h2>
                        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
                            <button
                                onClick={toggleModal}
                                className="w-full font-bold hover:-rotate-3  shadow-md sm:w-auto bg-yellow-100 text-yellow-800 px-5 py-2.5 rounded-full hover:bg-yellow-200 transition duration-200"
                            >
                                Edit Profile
                            </button>
                            <button
                                onClick={handleNavigate}
                                className="w-full font-bold hover:rotate-3  shadow-md sm:w-auto bg-blue-100 text-blue-800 px-5 py-2.5 rounded-full hover:bg-blue-200 transition duration-200"
                            >
                                Change Password
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full font-bold hover:-rotate-3  shadow-md sm:w-auto bg-red-100 text-red-800 px-5 py-2.5 rounded-full hover:bg-red-200 transition duration-200"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Edit Profile Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">
                            <button
                                onClick={toggleModal}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>

                            <form onSubmit={handleSubmit(handleEdit)} className="space-y-5">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Name</label>
                                    <input
                                        {...register("username", { required: true })}
                                        defaultValue={user.username}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Email</label>
                                    <input
                                        {...register("email")}
                                        defaultValue={user.email}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        type="email"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Phone</label>
                                    <input
                                        {...register("phone")}
                                        defaultValue={user.phone}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Address</label>
                                    <input
                                        {...register("address")}
                                        defaultValue={user.address}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Profile Photo</label>
                                    <input
                                        {...register("profilePic")}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        type="file"
                                    />
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        onClick={toggleModal}
                                        className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition duration-200"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;

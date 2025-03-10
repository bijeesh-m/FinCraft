import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import axios from "../axiosConfig";

import { Link, useNavigate } from "react-router-dom";

function Signin() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            const response = await axios.post("/User/Login", data);
            if (response.status === 200) {
                const { token, userId, role } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("userid", userId);

                // Redirect based on role
                if (role === "manager") {
                    navigate("/manager");
                } else if (role === "staff") {
                    navigate("/staffdash");
                } else if (role === "user") {
                    navigate("/");
                } else {
                    navigate("/"); // Default or unauthorized role fallback
                }
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Failed to login.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 border-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Sign In to your Account</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                        Email:
                    </label>
                    <input
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: "Enter a valid email address",
                            },
                        })}
                        // name="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        id="email"
                        placeholder="Enter your Mail"
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                    <label className="block text-gray-700 font-medium mb-2 mt-6" htmlFor="password">
                        Password:
                    </label>
                    <input
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters long",
                            },
                            maxLength: {
                                value: 20,
                                message: "Password cannot exceed 20 characters",
                            },
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                        type="password"
                        id="password"
                        // onChange={handleChange}
                        placeholder="Enter your Password"
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                    <div className="text-sm">
                        <Link to="/chngpass" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Forgot password?
                        </Link>
                    </div>
                    <button className="w-full bg-zinc-800 text-white py-2 rounded-md hover:bg-zinc-950 transition duration-300 mt-8">
                        SignIn
                    </button>
                </form>
                <p class="text-sm text-center text-gray-600 mt-4">
                    Don't have an account? <Link to="/signup">SignUp</Link>
                </p>
            </div>
        </div>
    );
}

export default Signin;

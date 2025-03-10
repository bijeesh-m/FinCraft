import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../axiosConfig";

function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  const onSubmit = (data) => {
    axios
      .post("/User/Register", data)
      .then((res) => {
        if (res.status === 200) {
          navigate("/signin");
        }
        // console.log("success");
      })
      .catch((err) => {
        // console.log(err);

        if (err.response.status === 409) {
          setError("email", { message: err.response.data.message });
        }
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 border-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create new Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="username"
          >
            Username:
          </label>
          <input
            {...register("username", { required: "Username required" })}
            // required
            // name="username"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            id="username"
            placeholder="Enter your Username"
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}

          <label
            className="block text-gray-700 font-medium mb-2 mt-6"
            htmlFor="email"
          >
            E-mail:
          </label>
          <input
            // required
            // name="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Enter a valid email address",
              },
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            id="email"
            placeholder="Enter your Mail"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <label
            className="block text-gray-700 font-medium mb-2 mt-6"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            // required
            // name="password"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            id="password"
            placeholder="Enter your Password"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <label
            className="block text-gray-700 font-medium mb-2 mt-6"
            htmlFor="confirm-password"
          >
            Confirm Password:
          </label>
          <input
            // required
            // name="confirmPassword"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            id="confirm-password"
            placeholder="Re-type your Password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}

          {/* Profile Picture Upload */}
           {/* <label
            className="block text-gray-700 font-medium mb-2 mt-6"
            htmlFor="profilePic"
          >
            Photo:
          </label>
          <input
            required
            name="profilePic"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            type="file"
            id="profilePic"
            accept="image/*"
          />  */}

          <button className="w-full bg-zinc-800 text-white py-2 rounded-md hover:bg-zinc-950 transition duration-300 mt-8">
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

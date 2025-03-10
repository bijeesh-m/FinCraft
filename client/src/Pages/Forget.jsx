import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import the cookies library

function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Handle the form submission
  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const token = Cookies.get("AccessToken"); // Get the token from cookies

      if (!token) {
        setErrorMessage("Authentication token is missing.");
        setIsLoading(false);
        return;
      }

      console.log("Sending data:", data); // Log the request data
      console.log("Using token:", token); // Log the token

      const response = await axios.put("/User/changePassword", data, {
        headers: {
          Authorization: `Bearer ${token}`, // Use the token from cookies
        },
      });

      console.log("Response from server:", response); // Log the server response

      if (response.status === 200) {
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error response:", error.response);
      console.error("Error message:", error.message);

      if (error.response) {
        setErrorMessage(error.response.data.message || "Something went wrong");
      } else {
        setErrorMessage(error.message || "Network error, please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">FinCraft</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-semibold mb-4">Change Your Password</h1>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 text-red-500">{errorMessage}</div>
        )}

        {/* Old Password Input */}
        <div className="mb-4">
          <label
            htmlFor="oldPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Old Password:
          </label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            {...register("oldPassword", {
              required: "Old password is required",
            })}
          />
          {errors.oldPassword && (
            <p className="text-red-500">{errors.oldPassword.message}</p>
          )}
        </div>

        {/* New Password Input */}
        <div className="mb-4">
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700"
          >
            New Password:
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          {errors.newPassword && (
            <p className="text-red-500">{errors.newPassword.message}</p>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm New Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            {...register("confirmPassword", {
              required: "Please confirm your new password",
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-zinc-800 text-white py-2 rounded-md font-medium text-center hover:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isLoading ? "Updating..." : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;

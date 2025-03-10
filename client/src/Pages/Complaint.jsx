import React from "react";
import { useForm } from "react-hook-form";
import axios from "../axiosConfig";

const ComplaintPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("Complaint Data:", data);

      // Await the axios response
      const response = await axios.post("/User/SendComplaints", data);

      console.log("Response Data:", response.data);

      // Check if the response contains a status key and its value
      if (response.data?.status === "pending") {
        alert("Complaint submitted successfully. Status: Pending");
      } else {
        alert("Failed to submit complaint. Please try aagain.");
      }

      // Reset the form
      reset();
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Failed to submit complaint. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white  rounded-lg p-8  w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-red-500">
          Submit a Complaint
        </h1>
        <p className="text-gray-700 text-center mb-6">
          We value your feedback. Please let us know how we can improve our
          services.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
              className={`w-full p-3 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className={`w-full p-3 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Complaint Field */}
          <div>
            <label
              htmlFor="complaint"
              className="block text-sm font-medium text-gray-700"
            >
              Complaint
            </label>
            <textarea
              id="complaint"
              rows="4"
              {...register("complaint", {
                required: "Please describe your complaint",
              })}
              className={`w-full p-3 border ${
                errors.complaint ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
            ></textarea>
            {errors.complaint && (
              <p className="text-red-500 text-sm mt-1">
                {errors.complaint.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
          >
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComplaintPage;

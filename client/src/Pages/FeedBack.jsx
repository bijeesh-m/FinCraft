import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../axiosConfig";

const FeedbackPage = () => {
  

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("Feedback Data:", data);
      const response = await axios.post("/User/SendFeedbacks", data);
      console.log("Response Data:", response.data);
      alert("FeedBack Submitted Successfully.Thank You");
      reset();
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Failed to submit complaint. Please try again.");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white  p-8 w-full"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          Help Us Improve
        </h2>

        {/* Name Field */}
        <div className="mb-6">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Name is required" })}
            className={`w-full p-4 border rounded-lg  focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-6">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="email"
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
            className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
          )}
        </div>

        {/* Feedback Field */}
        <div className="mb-6">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="feedback"
          >
            Feedback
          </label>
          <textarea
            id="feedback"
            rows="4"
            {...register("feedback", { required: "Feedback is required" })}
            className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ${
              errors.feedback ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.feedback && (
            <p className="text-red-500 text-sm mt-2">
              {errors.feedback.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-4 rounded-full hover:bg-indigo-700 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackPage;

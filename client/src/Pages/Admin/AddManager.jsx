import React from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../axiosConfig";
import { toast } from "react-toastify";

function AddManager() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data",data);
    
    try {
      // Sending the form data to the server
      const response = await axiosInstance.post("/Admin/AddManager", data);
      
      if (response.status === 201) {
        toast("Manager added successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="  p-8 border ">
      <h2 className="text-center text-2xl font-bold mb-6">Add a New Manager</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* First Name */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">First Name</label>
          <input
            {...register("firstname", { required: "First name is required" })}
            type="text"
            className="w-full p-2 border rounded"
          />
          {errors.firstname && <p className="text-red-500">{errors.firstname.message}</p>}
        </div>

        {/* Last Name */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Last Name</label>
          <input
            {...register("lastname", { required: "Last name is required" })}
            type="text"
            className="w-full p-2 border rounded"
          />
          {errors.lastname && <p className="text-red-500">{errors.lastname.message}</p>}
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Enter a valid email address",
              },
            })}
            type="email"
            className="w-full p-2 border rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        {/* Phone Number */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Phone Number</label>
          <input
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Please enter a valid phone number",
              },
            })}
            type="tel"
            className="w-full p-2 border rounded"
          />
          {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
        </div>

        {/* Position */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Position</label>
          <input
            {...register("position", { required: "Position is required" })}
            type="text"
            className="w-full p-2 border rounded"
          />
          {errors.position && <p className="text-red-500">{errors.position.message}</p>}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            className="w-full p-2 border rounded"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="mb-6">
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Manager
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddManager;

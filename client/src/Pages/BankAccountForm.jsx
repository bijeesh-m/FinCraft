import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";

function BankAccountForm() {
  const [requestStatus, setRequestStatus] = useState(null); // State for request status
  const [formError, setFormError] = useState(null); // State for any error messages
  const [currentSection, setCurrentSection] = useState(1); // Track the current section
  
  const validateDOB = (value) => {
    const today = new Date();
    const dob = new Date(value);
    const age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < dob.getDate())
    ) {
      return age - 1;
    }
    return age >= 18;
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/User/BankAccReg", data);
      console.log(response);

      if (response.status === 201) {
        setRequestStatus(response.data.status);
        setFormError(null);
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 409) {
          setError("accounttype", { message: err.response.data.message });
        } else {
          setFormError("An error occurred. Please try again."); // General error message
        }
      } else {
        setFormError("Network Error. Please check your connection.");
      }
    }
  };

  const nextSection = () => {
    setCurrentSection((prevSection) => prevSection + 1);
  };

  const prevSection = () => {
    setCurrentSection((prevSection) => prevSection - 1);
  };

  return (
    <div className="max-w-xl mx-auto p-8 border rounded shadow-lg">
      <h2 className="text-center text-2xl font-bold mb-6">Request a Bank Account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {currentSection === 1 && (
          <div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">First name</label>
              <input
                {...register("firstname", { required: "First name required" })}
                type="text"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Last name</label>
              <input
                {...register("lastname", { required: "Last name required" })}
                type="text"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Date of birth</label>
              <input
                type="date"
                {...register("dateofbirth", {
                  required: "Date of birth is required",
                  validate: {
                    isValidAge: (value) =>
                      validateDOB(value) || "You must be at least 18 years old",
                  },
                })}
                className="w-full p-2 border rounded"
              />
              {errors.dateofbirth && (
                <p className="text-red-500 mt-1">{errors.dateofbirth.message}</p>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">E-mail</label>
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
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Phone number</label>
              <input
                type="tel"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value:
                      /^(?!0{10})[\d]{10}|^\(\d{3}\) \d{3}-\d{4}|^\d{3}-\d{3}-\d{4}$/,
                    message:
                      "Please enter a valid phone number (e.g., (123) 456-7890 or 123-456-7890)",
                  },
                })}
                className="w-full p-2 border rounded"
              />
              {errors.phone && (
                <p className="text-red-500 mt-1">{errors.phone.message}</p>
              )}
            </div>
            <button
              type="button"
              onClick={nextSection}
              className=" p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        )}

        {currentSection === 2 && (
          <div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Address</label>
              <input
                {...register("address", { required: "Address is required" })}
                type="text"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">City</label>
              <input
                {...register("city", { required: "City is required" })}
                type="text"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">State</label>
              <input
                {...register("state", { required: "State is required" })}
                type="text"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Postal code</label>
              <input
                {...register("postalcode", { required: "Postal code is required" })}
                type="text"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2"> Branch</label>
              <input
                {...register("branch", { required: " branch is required" })}
                type="text"
                className="w-full p-2 border rounded"
              />
              {errors.branch && (
                <p className="text-red-500 mt-1">{errors.branch.message}</p>
              )}
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevSection}
                className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Previous
              </button>
              <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Submit Request
              </button>
            </div>
          </div>
        )}
      </form>

      {requestStatus && (
        <div className="mt-6 bg-yellow-100 p-4 rounded">
          <p className="text-yellow-800 font-bold">
            Request submitted successfully! Current status: {requestStatus}
          </p>
        </div>
      )}
      {formError && (
        <div className="mt-6 bg-red-100 p-4 rounded">
          <p className="text-red-800">{formError}</p>
        </div>
      )}
    </div>
  );
}

export default BankAccountForm;

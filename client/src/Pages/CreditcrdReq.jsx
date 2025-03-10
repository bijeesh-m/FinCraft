import React from "react";
import { useForm } from "react-hook-form";
import axios from "../axiosConfig";

function CreditcrdReq() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);

      // Wait for the response from the server
      const response = await axios.post("/User/CardRequest", data);

      console.log("Server Response:", response);

      // Check if the status is "Pending"
      if (response.data.status === "Pending") {
        alert("Success");
      } else {
        alert("Failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Submission failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-4 border rounded-md shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        Credit Card Application Form
      </h2>

      {/* Requester Information */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <input
          type="text"
          {...register("fullName", { required: "Full name is required" })}
          className="w-full p-2 border rounded-md"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          className="w-full p-2 border rounded-md"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          type="tel"
          {...register("phone", { required: "Phone number is required" })}
          className="w-full p-2 border rounded-md"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Address</label>
        <input
          type="text"
          {...register("address", { required: "Address is required" })}
          className="w-full p-2 border rounded-md"
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
        )}
      </div>

      {/* Existing Bank Account Details */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Bank Account Number
        </label>
        <input
          type="text"
          {...register("bankAccountNumber", {
            required: "Bank account number is required",
          })}
          className="w-full p-2 border rounded-md"
        />
        {errors.bankAccountNumber && (
          <p className="text-red-500 text-sm mt-1">
            {errors.bankAccountNumber.message}
          </p>
        )}
      </div>

      {/* Credit Card Type Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Credit Card Type
        </label>
        <select
          {...register("cardType", { required: "Please select a card type" })}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select Card Type</option>
          <option value="Standard">Standard Credit Card</option>
          <option value="Gold">Gold Credit Card</option>
          <option value="Platinum">Platinum Credit Card</option>
        </select>
        {errors.cardType && (
          <p className="text-red-500 text-sm mt-1">{errors.cardType.message}</p>
        )}
      </div>

      {/* Employment Status */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Employment Status
        </label>
        <select
          {...register("employmentStatus", {
            required: "Employment status is required",
          })}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select Employment Status</option>
          <option value="Employed">Employed</option>
          <option value="Self-Employed">Self-Employed</option>
          <option value="Unemployed">Unemployed</option>
          <option value="Student">Student</option>
        </select>
        {errors.employmentStatus && (
          <p className="text-red-500 text-sm mt-1">
            {errors.employmentStatus.message}
          </p>
        )}
      </div>

      {/* Annual Income */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Annual Income (INR)
        </label>
        <input
          type="number"
          {...register("annualIncome", {
            required: "Annual income is required",
            min: 0,
          })}
          className="w-full p-2 border rounded-md"
        />
        {errors.annualIncome && (
          <p className="text-red-500 text-sm mt-1">
            {errors.annualIncome.message}
          </p>
        )}
      </div>

      {/* Document Uploads */}
      {/* <h3 className="font-medium text-lg mt-4 mb-2">
        Upload Required Documents
      </h3>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Proof of Identity
        </label>
        <input
          type="file"
          {...register("identityProof", {
            required: "Identity proof is required",
          })}
          className="w-full p-2 border rounded-md"
        />
        {errors.identityProof && (
          <p className="text-red-500 text-sm mt-1">
            {errors.identityProof.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Proof of Address
        </label>
        <input
          type="file"
          {...register("addressProof", {
            required: "Address proof is required",
          })}
          className="w-full p-2 border rounded-md"
        />
        {errors.addressProof && (
          <p className="text-red-500 text-sm mt-1">
            {errors.addressProof.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Proof of Income
        </label>
        <input
          type="file"
          {...register("incomeProof", { required: "Income proof is required" })}
          className="w-full p-2 border rounded-md"
        />
        {errors.incomeProof && (
          <p className="text-red-500 text-sm mt-1">
            {errors.incomeProof.message}
          </p>
        )}
      </div> */}

      {/* Submit Button */}
      <div className="mt-4 text-center">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Submit Application
        </button>
      </div>
    </form>
  );
}

export default CreditcrdReq;

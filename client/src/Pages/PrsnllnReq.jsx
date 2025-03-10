import React, { useState } from "react";
import { useForm } from "react-hook-form";

function PrsnllnReq() {
  const [step, setStep] = useState(1); // To handle step navigation
  const [loanPurpose, setLoanPurpose] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
    // You can send data to the backend API here using axios or fetch
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-4 border rounded-md shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        Personal Loan Request Form
      </h2>

      {/* Step 1: Personal & Loan Details */}
      {step === 1 && (
        <>
          {/* Personal Information */}
          <div className="mb-4">
            <label htmlFor="fullname" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              {...register("fullname", { required: "Full Name is required" })}
              className="w-full p-2 border rounded-md"
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm mt-1">{errors.fullname.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="dob" className="block text-sm font-medium mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              {...register("dob", { required: "Date of Birth is required" })}
              className="w-full p-2 border rounded-md"
            />
            {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="gender" className="block text-sm font-medium mb-1">
              Gender
            </label>
            <select
              id="gender"
              {...register("gender", { required: "Gender is required" })}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              {...register("phone", {
                required: "Phone Number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be 10 digits",
                },
              })}
              className="w-full p-2 border rounded-md"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Loan Request Details */}
          <div className="mb-4">
            <label htmlFor="loanAmount" className="block text-sm font-medium mb-1">
              Loan Amount Requested (in INR)
            </label>
            <input
              type="number"
              id="loanAmount"
              {...register("loanAmount", {
                required: "Loan amount is required",
                min: { value: 1000, message: "Loan amount must be at least 1000 INR" },
              })}
              className="w-full p-2 border rounded-md"
            />
            {errors.loanAmount && (
              <p className="text-red-500 text-sm mt-1">{errors.loanAmount.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="loanPurpose" className="block text-sm font-medium mb-1">
              Loan Purpose
            </label>
            <select
              id="loanPurpose"
              {...register("loanPurpose", { required: "Loan purpose is required" })}
              onChange={(e) => setLoanPurpose(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Loan Purpose</option>
              <option value="Medical">Medical</option>
              <option value="Home Renovation">Home Renovation</option>
              <option value="Education">Education</option>
              <option value="Debt Consolidation">Debt Consolidation</option>
              <option value="Other">Other</option>
            </select>
            {errors.loanPurpose && (
              <p className="text-red-500 text-sm mt-1">{errors.loanPurpose.message}</p>
            )}
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Step 2: Document Uploads & Terms */}
      {step === 2 && (
        <>
          {/* Supporting Documents */}
          <div className="mb-4">
            <label htmlFor="identityProof" className="block text-sm font-medium mb-1">
              Upload Proof of Identity
            </label>
            <input
              type="file"
              id="identityProof"
              {...register("identityProof", { required: "Proof of Identity is required" })}
              className="w-full p-2 border rounded-md"
            />
            {errors.identityProof && (
              <p className="text-red-500 text-sm mt-1">{errors.identityProof.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="incomeProof" className="block text-sm font-medium mb-1">
              Upload Proof of Income
            </label>
            <input
              type="file"
              id="incomeProof"
              {...register("incomeProof", { required: "Proof of Income is required" })}
              className="w-full p-2 border rounded-md"
            />
            {errors.incomeProof && (
              <p className="text-red-500 text-sm mt-1">{errors.incomeProof.message}</p>
            )}
          </div>

          {/* Terms & Conditions */}
          

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="bg-gray-500 text-white p-2 rounded-md"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Submit Application
            </button>
          </div>
        </>
      )}
    </form>
  );
}

export default PrsnllnReq;

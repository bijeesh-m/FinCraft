import React, { useState } from "react";
import { useForm } from "react-hook-form";

function EdulnReq() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [step, setStep] = useState(1); // Step state to handle form navigation

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Education Loan Form Data:", data);
    // Send data to backend API here if needed
  };

  return (
    <div className="max-w-lg mx-auto p-4 border rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Education Loan Application</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        
        {step === 1 && (
          <>
            {/* Personal and Education Details */}
            <h3 className="text-xl font-semibold mb-4">Personal Details</h3>

            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                id="fullName"
                {...register("fullName", { required: "Full Name is required" })}
                className="w-full p-2 border rounded-md"
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email is required", pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}₹/ })}
                className="w-full p-2 border rounded-md"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <h3 className="text-xl font-semibold mb-4">Education Details</h3>

            <div className="mb-4">
              <label htmlFor="institutionName" className="block text-sm font-medium mb-1">Institution Name</label>
              <input
                type="text"
                id="institutionName"
                {...register("institutionName", { required: "Institution Name is required" })}
                className="w-full p-2 border rounded-md"
              />
              {errors.institutionName && <p className="text-red-500 text-sm mt-1">{errors.institutionName.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="courseName" className="block text-sm font-medium mb-1">Course Name</label>
              <input
                type="text"
                id="courseName"
                {...register("courseName", { required: "Course Name is required" })}
                className="w-full p-2 border rounded-md"
              />
              {errors.courseName && <p className="text-red-500 text-sm mt-1">{errors.courseName.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="loanAmount" className="block text-sm font-medium mb-1">Loan Amount (₹)</label>
              <input
                type="number"
                id="loanAmount"
                {...register("loanAmount", { required: "Loan Amount is required" })}
                className="w-full p-2 border rounded-md"
              />
              {errors.loanAmount && <p className="text-red-500 text-sm mt-1">{errors.loanAmount.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="duration" className="block text-sm font-medium mb-1">Course Duration (years)</label>
              <input
                type="number"
                id="duration"
                {...register("duration", { required: "Course Duration is required", min: 1 })}
                className="w-full p-2 border rounded-md"
              />
              {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>}
            </div>

            {/* Next Button */}
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-blue-500 text-white p-2 rounded-md"
                onClick={() => setStep(2)}
              >
                Next
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            {/* Supporting Documents Upload */}
            <h3 className="text-xl font-semibold mb-4">Supporting Documents</h3>

            <div className="mb-4">
              <label htmlFor="identityProof" className="block text-sm font-medium mb-1">Upload Proof of Identity</label>
              <input
                type="file"
                id="identityProof"
                {...register("identityProof", { required: "Proof of Identity is required" })}
                className="w-full p-2 border rounded-md"
              />
              {errors.identityProof && <p className="text-red-500 text-sm mt-1">{errors.identityProof.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="admissionLetter" className="block text-sm font-medium mb-1">Upload Admission Letter</label>
              <input
                type="file"
                id="admissionLetter"
                {...register("admissionLetter", { required: "Admission Letter is required" })}
                className="w-full p-2 border rounded-md"
              />
              {errors.admissionLetter && <p className="text-red-500 text-sm mt-1">{errors.admissionLetter.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="incomeProof" className="block text-sm font-medium mb-1">Upload Proof of Income</label>
              <input
                type="file"
                id="incomeProof"
                {...register("incomeProof", { required: "Proof of Income is required" })}
                className="w-full p-2 border rounded-md"
              />
              {errors.incomeProof && <p className="text-red-500 text-sm mt-1">{errors.incomeProof.message}</p>}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-gray-500 text-white p-2 rounded-md"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default EdulnReq;

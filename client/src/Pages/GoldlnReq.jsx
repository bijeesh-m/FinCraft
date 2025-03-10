import React, { useState } from "react";
import { useForm } from "react-hook-form";

function GoldlnReq() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [step, setStep] = useState(1);

  const onSubmit = (data) => {
    console.log("Gold Loan Application Data:", data);
    // Handle form data submission, e.g., send to API
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="max-w-lg mx-auto p-4 border rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Gold Loan Application</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
          <>
            {/* Personal Details */}
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

            {/* Gold Details */}
            <h3 className="text-xl font-semibold mb-4">Gold Details</h3>

            <div className="mb-4">
              <label htmlFor="goldWeight" className="block text-sm font-medium mb-1">Gold Weight (grams)</label>
              <input
                type="number"
                id="goldWeight"
                {...register("goldWeight", { required: "Gold Weight is required", min: 1 })}
                className="w-full p-2 border rounded-md"
              />
              {errors.goldWeight && <p className="text-red-500 text-sm mt-1">{errors.goldWeight.message}</p>}
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

            <button type="button" onClick={nextStep} className="bg-blue-500 text-white p-2 rounded-md w-full mt-4">
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
            {/* Document Uploads */}
            <h3 className="text-xl font-semibold mb-4">Upload Mandatory Documents</h3>

            <div className="mb-4">
              <label htmlFor="identityProof" className="block text-sm font-medium mb-1">Proof of Identity</label>
              <input
                type="file"
                id="identityProof"
                {...register("identityProof", { required: "Proof of Identity is required" })}
                className="w-full p-2 border rounded-md"
              />
              {errors.identityProof && <p className="text-red-500 text-sm mt-1">{errors.identityProof.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="addressProof" className="block text-sm font-medium mb-1">Proof of Address</label>
              <input
                type="file"
                id="addressProof"
                {...register("addressProof", { required: "Proof of Address is required" })}
                className="w-full p-2 border rounded-md"
              />
              {errors.addressProof && <p className="text-red-500 text-sm mt-1">{errors.addressProof.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="incomeProof" className="block text-sm font-medium mb-1">Proof of Income (optional)</label>
              <input
                type="file"
                id="incomeProof"
                {...register("incomeProof")}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="flex justify-between mt-4">
              <button type="button" onClick={prevStep} className="bg-gray-500 text-white p-2 rounded-md">
                Back
              </button>
              <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                Submit Application
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default GoldlnReq;

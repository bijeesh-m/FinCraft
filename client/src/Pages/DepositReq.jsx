import React, { useState } from "react";
import { useForm } from "react-hook-form";

function DepositReq() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const depositType = watch("depositType"); // Watching the selected deposit type
  const [step, setStep] = useState(1); // To track current step (1 or 2)

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Deposit application submitted!");
  };

  // Deposit-specific fields
  const depositFields = {
    FD: ["Deposit Amount", "Deposit Term (Months)"],
    RD: ["Monthly Deposit Amount", "Deposit Term (Months)"],
    Millionaire: ["Monthly Contribution", "Investment Period (Years)"],
    "Tax Saving": ["Deposit Amount", "Lock-in Period (Years)"],
  };

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 border rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Deposit Application Form</h2>

      {/* Deposit Type Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Deposit Type</label>
        <select
          {...register("depositType", { required: "Please select a deposit type" })}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select Deposit Type</option>
          <option value="FD">Fixed Deposit</option>
          <option value="RD">Recurring Deposit</option>
          <option value="Millionaire">Millionaire Scheme</option>
          <option value="Tax Saving">Tax Saving Deposit</option>
        </select>
        {errors.depositType && <p className="text-red-500 text-sm mt-1">{errors.depositType.message}</p>}
      </div>

      {/* Part 1: Investor Details */}
      {step === 1 && (
        <>
          <h3 className="font-medium text-lg mb-4">Investor Information</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              {...register("fullName", { required: "Full name is required" })}
              className="w-full p-2 border rounded-md"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border rounded-md"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              {...register("phone", { required: "Phone number is required" })}
              className="w-full p-2 border rounded-md"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              {...register("address", { required: "Address is required" })}
              className="w-full p-2 border rounded-md"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
          </div>

          {/* Next Button */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Part 2: Deposit-Specific Fields & Document Uploads */}
      {step === 2 && (
        <>
          {/* Deposit-Specific Fields */}
          {depositType && (
            <>
              <h3 className="font-medium text-lg mt-4 mb-2">{depositType} Details</h3>
              {depositFields[depositType].map((field, index) => (
                <div className="mb-4" key={index}>
                  <label className="block text-sm font-medium mb-1">{field}</label>
                  <input
                    type="number"
                    {...register(`depositDetails.${field.replace(/\s+/g, '').toLowerCase()}`, { required: `${field} is required`, min: 1 })}
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.depositDetails && errors.depositDetails[field.replace(/\s+/g, '').toLowerCase()] && (
                    <p className="text-red-500 text-sm mt-1">{errors.depositDetails[field.replace(/\s+/g, '').toLowerCase()].message}</p>
                  )}
                </div>
              ))}
            </>
          )}

          {/* Document Uploads */}
          {depositType && (
            <>
              <h3 className="font-medium text-lg mt-4 mb-2">Upload Required Documents</h3>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Proof of Identity</label>
                <input
                  type="file"
                  {...register("identityProof", { required: "Proof of identity is required" })}
                  className="w-full p-2 border rounded-md"
                />
                {errors.identityProof && <p className="text-red-500 text-sm mt-1">{errors.identityProof.message}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Proof of Address</label>
                <input
                  type="file"
                  {...register("addressProof", { required: "Proof of address is required" })}
                  className="w-full p-2 border rounded-md"
                />
                {errors.addressProof && <p className="text-red-500 text-sm mt-1">{errors.addressProof.message}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">PAN Card</label>
                <input
                  type="file"
                  {...register("panCard", { required: "PAN card is required" })}
                  className="w-full p-2 border rounded-md"
                />
                {errors.panCard && <p className="text-red-500 text-sm mt-1">{errors.panCard.message}</p>}
              </div>

              {depositType === "Millionaire" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Proof of Income (Optional)</label>
                  <input
                    type="file"
                    {...register("incomeProof")}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              )}
            </>
          )}

          {/* Back and Submit Buttons */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Submit Application
            </button>
          </div>
        </>
      )}
    </form>
  );
}

export default DepositReq;

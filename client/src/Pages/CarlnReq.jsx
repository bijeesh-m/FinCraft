import React, { useState } from "react";
import { useForm } from "react-hook-form";

function CarlnReq() {
  const [step, setStep] = useState(1); // Track form step (1 or 2)
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Car Loan Form Data:", data);
  };

  return (
    <div className="max-w-lg mx-auto p-4 border rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Car Loan Application</h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Part 1: Personal Details, Car Details, Loan Details */}
        {step === 1 && (
          <>
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

            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                {...register("phoneNumber", { required: "Phone Number is required" })}
                className="w-full p-2 border rounded-md"
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
            </div>

            <h3 className="text-xl font-semibold mb-4">Car Details</h3>

            <div className="mb-4">
              <label htmlFor="carMake" className="block text-sm font-medium mb-1">Car Make</label>
              <input
                type="text"
                id="carMake"
                {...register("carMake", { required: "Car Make is required" })}
                className="w-full p-2 border rounded-md"
              />
              {errors.carMake && <p className="text-red-500 text-sm mt-1">{errors.carMake.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="carModel" className="block text-sm font-medium mb-1">Car Model</label>
              <input
                type="text"
                id="carModel"
                {...register("carModel", { required: "Car Model is required" })}
                className="w-full p-2 border rounded-md"
              />
              {errors.carModel && <p className="text-red-500 text-sm mt-1">{errors.carModel.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="carYear" className="block text-sm font-medium mb-1">Car Year</label>
              <input
                type="number"
                id="carYear"
                {...register("carYear", { required: "Car Year is required" })}
                className="w-full p-2 border rounded-md"
              />
              {errors.carYear && <p className="text-red-500 text-sm mt-1">{errors.carYear.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="carPrice" className="block text-sm font-medium mb-1">Car Price (₹)</label>
              <input
                type="number"
                id="carPrice"
                {...register("carPrice", { required: "Car Price is required", min: 5000 })}
                className="w-full p-2 border rounded-md"
              />
              {errors.carPrice && <p className="text-red-500 text-sm mt-1">{errors.carPrice.message}</p>}
            </div>

            <h3 className="text-xl font-semibold mb-4">Loan Details</h3>

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
              <label htmlFor="loanTerm" className="block text-sm font-medium mb-1">Loan Term (Years)</label>
              <input
                type="number"
                id="loanTerm"
                {...register("loanTerm", { required: "Loan Term is required", min: 1 })}
                className="w-full p-2 border rounded-md"
              />
              {errors.loanTerm && <p className="text-red-500 text-sm mt-1">{errors.loanTerm.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="income" className="block text-sm font-medium mb-1">Monthly Income (₹)</label>
              <input
                type="number"
                id="income"
                {...register("income", { required: "Income is required" })}
                className="w-full p-2 border rounded-md"
              />
              {errors.income && <p className="text-red-500 text-sm mt-1">{errors.income.message}</p>}
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

        {/* Part 2: Document Uploads */}
        {step === 2 && (
          <>
            <h3 className="text-xl font-semibold mb-4">Upload Documents</h3>

            <div className="mb-4">
              <label htmlFor="carRegistration" className="block text-sm font-medium mb-1">Car Registration Document</label>
              <input
                type="file"
                id="carRegistration"
                {...register("carRegistration", { required: "Car Registration is required" })}
                className="w-full p-2 border rounded-md"
              />
              {errors.carRegistration && <p className="text-red-500 text-sm mt-1">{errors.carRegistration.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="carInsurance" className="block text-sm font-medium mb-1">Car Insurance Document</label>
              <input
                type="file"
                id="carInsurance"
                {...register("carInsurance", { required: "Car Insurance is required" })}
                className="w-full p-2 border rounded-md"
              />
              {errors.carInsurance && <p className="text-red-500 text-sm mt-1">{errors.carInsurance.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="incomeProof" className="block text-sm font-medium mb-1">Income Proof (e.g., Salary Slip, Bank Statement)</label>
              <input
                type="file"
                id="incomeProof"
                {...register("incomeProof", { required: "Income Proof is required" })}
                className="w-full p-2 border rounded-md"
              />
              {errors.incomeProof && <p className="text-red-500 text-sm mt-1">{errors.incomeProof.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="identityProof" className="block text-sm font-medium mb-1">Identity Proof (e.g., Aadhar Card, Passport)</label>
              <input
                type="file"
                id="identityProof"
                {...register("identityProof", { required: "Identity Proof is required" })}
                className="w-full p-2 border rounded-md"
              />
              {errors.identityProof && <p className="text-red-500 text-sm mt-1">{errors.identityProof.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="addressProof" className="block text-sm font-medium mb-1">Address Proof (e.g., Utility Bill, Aadhar Card)</label>
              <input
                type="file"
                id="addressProof"
                {...register("addressProof", { required: "Address Proof is required" })}
                className="w-full p-2 border rounded-md"
              />
              {errors.addressProof && <p className="text-red-500 text-sm mt-1">{errors.addressProof.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="photograph" className="block text-sm font-medium mb-1">Photograph</label>
              <input
                type="file"
                id="photograph"
                {...register("photograph", { required: "Photograph is required" })}
                className="w-full p-2 border rounded-md"
              />
              {errors.photograph && <p className="text-red-500 text-sm mt-1">{errors.photograph.message}</p>}
            </div>

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
                Submit Car Loan Application
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default CarlnReq;

import React from "react";
import { useForm } from "react-hook-form";

function DebitCardApplication() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Debit card application submitted!");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-4 border rounded-md shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        Debit Card Application Form
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
          {" "}
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

      {/* Debit Card Type Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Card Type</label>
        <select
          {...register("cardType", { required: "Please select a card type" })}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select Card Type</option>
          <option value="Standard">Standard Debit Card</option>
          <option value="Gold">Gold Debit Card</option>
          <option value="Platinum">Platinum Debit Card</option>
        </select>
        {errors.cardType && (
          <p className="text-red-500 text-sm mt-1">{errors.cardType.message}</p>
        )}
      </div>

      {/* International Usage Option */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Do you want an international usage option?
        </label>
        <select
          {...register("internationalUsage", {
            required: "Please choose an option",
          })}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select Option</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.internationalUsage && (
          <p className="text-red-500 text-sm mt-1">
            {errors.internationalUsage.message}
          </p>
        )}
      </div>

      {/* Document Uploads */}
      <h3 className="font-medium text-lg mt-4 mb-2">
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
      </div>

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

export default DebitCardApplication;

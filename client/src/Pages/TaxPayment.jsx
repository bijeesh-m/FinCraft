import axios from "../axiosConfig";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function TaxPayment() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const paymentMethod = watch("paymentMethod", "bank"); // Default: Bank Transfer
  const taxPeriodType = watch("taxPeriodType", "monthly"); // Default: Monthly

  const taxTypes = ["Income Tax", "Property Tax", "Sales Tax", "Other"];
  const taxPeriodOptions = ["monthly", "quarterly", "yearly"];

  // Handle form submission
  const onSubmit = (data) => {
    axios.post("/User/TaxPayment", data).then((res) => {
      if (res.status === 200) {
        toast("Tax Payment Success");
        navigate("/paymentsTransfer");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" mx-auto p-4   my-10 "
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Tax Payment Form</h2>

      {/* Tax Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Tax Type</label>
        <select
          {...register("taxtype", { required: "Tax type is required" })}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select Tax Type</option>
          {taxTypes.map((taxType, index) => (
            <option key={index} value={taxType}>
              {taxType}
            </option>
          ))}
        </select>
        {errors.taxtype && <p className="text-red-500 text-sm mt-1">{errors.taxtype.message}</p>}
      </div>

      {/* Tax Amount */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Tax Amount</label>
        <input
          type="number"
          {...register("taxamount", {
            required: "Tax amount is required",
            min: { value: 1, message: "Amount must be at least 1" },
          })}
          className="w-full p-2 border rounded-md"
        />
        {errors.taxamount && <p className="text-red-500 text-sm mt-1">{errors.taxamount.message}</p>}
      </div>

      {/* Tax Period Type (Dropdown) */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Tax Period Type</label>
        <select
          {...register("taxPeriodType")}
          className="w-full p-2 border rounded-md"
        >
          {taxPeriodOptions.map((option, index) => (
            <option key={index} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)} {/* Capitalizes first letter */}
            </option>
          ))}
        </select>
      </div>

      {/* Dynamic Tax Period Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Tax Period</label>
        {taxPeriodType === "monthly" && (
          <input
            type="month"
            {...register("taxperiod", { required: "Tax period is required" })}
            className="w-full p-2 border rounded-md"
          />
        )}
        {taxPeriodType === "quarterly" && (
          <select
            {...register("taxperiod", { required: "Tax period is required" })}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Quarter</option>
            <option value="Q1">Q1 (Jan - Mar)</option>
            <option value="Q2">Q2 (Apr - Jun)</option>
            <option value="Q3">Q3 (Jul - Sep)</option>
            <option value="Q4">Q4 (Oct - Dec)</option>
          </select>
        )}
        {taxPeriodType === "yearly" && (
          <input
            type="text"
            placeholder="Enter Financial Year (e.g., 2024-25)"
            {...register("taxperiod", { required: "Tax period is required" })}
            className="w-full p-2 border rounded-md"
          />
        )}
        {errors.taxperiod && <p className="text-red-500 text-sm mt-1">{errors.taxperiod.message}</p>}
      </div>

      {/* Payment Method */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Payment Method</label>
        <select
          {...register("paymentMethod")}
          className="w-full p-2 border rounded-md"
        >
          <option value="bank">Bank Transfer</option>
          <option value="creditCard">Credit Card</option>
        </select>
      </div>

      {/* Credit Card Details (Only If Credit Card is Selected) */}
      {paymentMethod === "creditCard" && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Card Number</label>
            <input
              type="text"
              {...register("cardNumber", { required: "Card number is required" })}
              className="w-full p-2 border rounded-md"
            />
            {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">CVV</label>
            <input
              type="text"
              {...register("cvv", { required: "CVV is required" })}
              className="w-full p-2 border rounded-md"
            />
            {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Expiry Date (MM/YY)</label>
            <input
              type="text"
              {...register("expiryDate", { required: "Expiry date is required" })}
              className="w-full p-2 border rounded-md"
            />
            {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate.message}</p>}
          </div>
        </>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md font-semibold hover:bg-blue-600 transition duration-200"
      >
        Submit Tax Payment
      </button>
    </form>
  );
}

export default TaxPayment;

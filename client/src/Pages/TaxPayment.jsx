import axios from "../axiosConfig";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function TaxPayment() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate()

  // Options for tax types
  const taxTypes = ["Income Tax", "Property Tax", "Sales Tax", "Other"];

  // Handle form submission
  const onSubmit = (data) => {
    axios.post("/User/TaxPayment", data).then((res) => {
      if (res.status === 200) {
        alert("Tax Payment Success");
        navigate('/paymentsTransfer')
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-4 border rounded-md shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Tax Payment Form</h2>

      {/* Tax Type */}
      <div className="mb-4">
        <label htmlFor="taxtype" className="block text-sm font-medium mb-1">
          Tax Type
        </label>
        <select
          id="taxtype"
          {...register("taxtype", {
            required: "Tax type is required",
          })}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select Tax Type</option>
          {taxTypes.map((taxType, index) => (
            <option key={index} value={taxType}>
              {taxType}
            </option>
          ))}
        </select>
        {errors.taxtype && (
          <p className="text-red-500 text-sm mt-1">{errors.taxtype.message}</p>
        )}
      </div>

      {/* Tax Amount */}
      <div className="mb-4">
        <label htmlFor="taxamount" className="block text-sm font-medium mb-1">
          Tax Amount
        </label>
        <input
          type="number"
          id="taxamount"
          {...register("taxamount", {
            required: "Tax amount is required",
            min: { value: 1, message: "Amount must be at least 1" },
          })}
          className="w-full p-2 border rounded-md"
        />
        {errors.taxamount && (
          <p className="text-red-500 text-sm mt-1">
            {errors.taxamount.message}
          </p>
        )}
      </div>

      {/* Tax Period */}
      <div className="mb-4">
        <label htmlFor="taxperiod" className="block text-sm font-medium mb-1">
          Tax Period
        </label>
        <input
          type="text"
          id="taxperiod"
          {...register("taxperiod", {
            required: "Tax period is required",
          })}
          className="w-full p-2 border rounded-md"
        />
        {errors.taxperiod && (
          <p className="text-red-500 text-sm mt-1">
            {errors.taxperiod.message}
          </p>
        )}
      </div>

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

import axios from "../axiosConfig";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function BillPayment() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  // Options for bill categories
  const billCategories = ["Water", "Electricity", "Internet", "Phone", "Other"];

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
    axios.post("/User/BillPayment", data).then((res) => {
      //   console.log("data recieved", res);
      if (res.status === 200) {
        alert("bill Payment Success");
        navigate("/paymentsTransfer");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-4 border rounded-md shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Bill Payment Form</h2>

      {/* Biller Name */}
      <div className="mb-4">
        <label htmlFor="billername" className="block text-sm font-medium mb-1">
          Biller Name
        </label>
        <input
          type="text"
          id="billername"
          {...register("billername", { required: "Biller name is required" })}
          className="w-full p-2 border rounded-md"
        />
        {errors.billername && (
          <p className="text-red-500 text-sm mt-1">
            {errors.billername.message}
          </p>
        )}
      </div>

      {/* Bill Category */}
      <div className="mb-4">
        <label
          htmlFor="billcategory"
          className="block text-sm font-medium mb-1"
        >
          Bill Category
        </label>
        <select
          id="billcategory"
          {...register("billcategory", {
            required: "Bill category is required",
          })}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select Category</option>
          {billCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.billcategory && (
          <p className="text-red-500 text-sm mt-1">
            {errors.billcategory.message}
          </p>
        )}
      </div>

      {/* Account Number */}
      <div className="mb-4">
        <label
          htmlFor="accountnumber"
          className="block text-sm font-medium mb-1"
        >
          Account Number
        </label>
        <input
          type="text"
          id="accountnumber"
          {...register("accountnumber", {
            required: "Account number is required",
          })}
          className="w-full p-2 border rounded-md"
        />
        {errors.accountnumber && (
          <p className="text-red-500 text-sm mt-1">
            {errors.accountnumber.message}
          </p>
        )}
      </div>

      {/* Amount */}
      <div className="mb-4">
        <label htmlFor="amount" className="block text-sm font-medium mb-1">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          {...register("amount", {
            required: "Amount is required",
            min: { value: 1, message: "Amount must be at least 1" },
          })}
          className="w-full p-2 border rounded-md"
        />
        {errors.amount && (
          <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md font-semibold hover:bg-blue-600 transition duration-200"
      >
        Submit Payment
      </button>
    </form>
  );
}

export default BillPayment;

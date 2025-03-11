import axios from "../axiosConfig";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function BillPayment() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState("bank"); // Default to bank account

    // Options for bill categories
    const billCategories = ["Water", "Electricity", "Internet", "Phone", "Other"];

    // Handle form submission
    const onSubmit = (data) => {
        console.log("Form Data Submitted:", {...data,paymentMethod:paymentMethod});
        axios
            .post("/User/BillPayment", {...data,paymentMethod})
            .then((res) => {
                if (res.status === 200) {
                    toast("Bill Payment Success");
                    navigate("/paymentsTransfer");
                }
            })
            .catch((err) => {
                toast.error("Payment Failed");
                console.error("Payment Error:", err);
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto p-4 border rounded-md min-h-screen ring shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Bill Payment Form</h2>

            {/* Biller Name */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Biller Name</label>
                <input
                    type="text"
                    {...register("billername", { required: "Biller name is required" })}
                    className="w-full p-2 border rounded-md"
                />
                {errors.billername && <p className="text-red-500 text-sm">{errors.billername.message}</p>}
            </div>

            {/* Bill Category */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Bill Category</label>
                <select
                    {...register("billcategory", { required: "Bill category is required" })}
                    className="w-full p-2 border rounded-md"
                >
                    <option value="">Select Category</option>
                    {billCategories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                {errors.billcategory && <p className="text-red-500 text-sm">{errors.billcategory.message}</p>}
            </div>

            {/* Payment Method Selection */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Payment Method</label>
                <select onChange={(e) => setPaymentMethod(e.target.value)} className="w-full p-2 border rounded-md">
                    <option value="bank">Bank Account</option>
                    <option value="card">Credit Card</option>
                </select>
            </div>

            {/* Account Number (Shown if paying via bank) */}
            {paymentMethod === "bank" && (
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Account Number</label>
                    <input
                        type="text"
                        {...register("accountnumber", { required: "Account number is required" })}
                        className="w-full p-2 border rounded-md"
                    />
                    {errors.accountnumber && <p className="text-red-500 text-sm">{errors.accountnumber.message}</p>}
                </div>
            )}

            {/* Credit Card Details (Shown if paying via card) */}
            {paymentMethod === "card" && (
                <>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Card Number</label>
                        <input
                            type="text"
                            {...register("cardNumber", { required: "Card number is required" })}
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">CVV</label>
                        <input
                            type="text"
                            {...register("cvv", { required: "CVV is required" })}
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Expiry Date (MM/YY)</label>
                        <input
                            type="text"
                            {...register("expiryDate", { required: "Expiry date is required" })}
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate.message}</p>}
                    </div>
                </>
            )}

            {/* Amount */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Amount</label>
                <input
                    type="number"
                    {...register("amount", {
                        required: "Amount is required",
                        min: { value: 1, message: "Amount must be at least 1" },
                    })}
                    className="w-full p-2 border rounded-md"
                />
                {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
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

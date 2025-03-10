import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../axiosConfig"; // Adjust based on your setup
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function LoanRequest() {
    const [loanType, setLoanType] = useState("");
    const [documents, setDocuments] = useState([]); // Array to hold uploaded files
    const [step, setStep] = useState(1); // Multi-step form tracking

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Handle file selection
    const handleFileChange = (e) => {
        setDocuments([...documents, ...e.target.files]);
    };

    // Handle form submission
    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            // Append form fields
            for (const key in data) {
                formData.append(key, data[key]);
            }

            formData.append("loanType", loanType); // Append loan type separately

            // Append documents
            documents.forEach((file) => formData.append("documents", file));

            console.log("Data to be Submitted:", formData);

            // Make the POST request
            const response = await axios.post("/User/LoanRequest", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 201) {
                toast("Loan request submitted successfully!");
                navigate("/loan-dashboard");
            }
        } catch (error) {
            console.error("Error submitting loan request:", error);
            toast("Failed to submit loan request.");
        }
    };

    const documentSuggestions = {
        Car: ["Car Registration Document", "Car Insurance", "Income Proof"],
        House: ["Property Ownership Proof", "Income Proof", "Identity Proof"],
        Gold: ["Gold Valuation Report", "Identity Proof", "Address Proof"],
        Education: ["Admission Proof", "Identity Proof", "Income Proof"],
        Personal: ["Income Proof", "Identity Proof", "Address Proof"],
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className=" p-4 border  shadow-md ">
            <h2 className="text-2xl font-bold mb-4 text-center">Loan Request Form</h2>

            {/* Step 1: Requester Information */}
            {step === 1 && (
                <>
                    <h3 className="font-medium text-lg mb-4">Requester Information</h3>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            {...register("name", { required: "Name is required" })}
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Address</label>
                        <input
                            type="text"
                            {...register("address", { required: "Address is required" })}
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Phone</label>
                        <input
                            type="tel"
                            {...register("phone", { required: "Phone number is required" })}
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>

                    <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md"
                    >
                        Next
                    </button>
                </>
            )}

            {/* Step 2: Loan Details & Documents */}
            {step === 2 && (
                <>
                    <h3 className="font-medium text-lg mb-4">Loan Details</h3>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Loan Type</label>
                        <select
                            value={loanType}
                            onChange={(e) => setLoanType(e.target.value)}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="">Select Loan Type</option>
                            <option value="Personal">Personal Loan</option>
                            <option value="Gold">Gold Loan</option>
                            <option value="Car">Car Loan</option>
                            <option value="House">House Loan</option>
                            <option value="Education">Education Loan</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Loan Amount</label>
                        <input
                            type="number"
                            {...register("loanAmount", { required: "Loan amount is required", min: 1 })}
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.loanAmount && <p className="text-red-500 text-sm">{errors.loanAmount.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Loan Term (Months)</label>
                        <input
                            type="number"
                            {...register("loanTerm", { required: "Loan term is required", min: 1 })}
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.loanTerm && <p className="text-red-500 text-sm">{errors.loanTerm.message}</p>}
                    </div>

                    {/* Loan-specific Document Uploads */}
                    {loanType && (
                        <>
                            <h3 className="font-medium text-lg mt-4 mb-2">Upload Required Documents</h3>
                            {documentSuggestions[loanType].map((doc, index) => (
                                <div className="mb-4" key={index}>
                                    <label className="block text-sm font-medium mb-1">{doc}</label>
                                    <input
                                        type="file"
                                        className="w-full p-2 border rounded-md"
                                        multiple
                                        onChange={handleFileChange}
                                    />
                                </div>
                            ))}
                        </>
                    )}

                    <div className="flex justify-between mt-4">
                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="bg-gray-500 text-white py-2 px-4 rounded-md"
                        >
                            Back
                        </button>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
                            Submit Loan Request
                        </button>
                    </div>
                </>
            )}
        </form>
    );
}

export default LoanRequest;

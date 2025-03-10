import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../axiosConfig";
import { toast } from "react-toastify";

function CardApplication() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [cardApplicationType, setCardApplicationType] = useState("Debit");
    const [documents, setDocuments] = useState({}); // Store documents by type

    // Define required documents for each card type
    const requiredDocuments = {
        Debit: ["Identity Proof", "Address Proof"],
        Credit: ["Identity Proof", "Address Proof", "Income Proof"],
    };

    const handleFileChange = (e, docName) => {
        setDocuments({ ...documents, [docName]: e.target.files[0] });
    };

    const onSubmit = async (data) => {
        const formData = new FormData();

        // Append form text fields
        formData.append("fullName", data.fullName);
        formData.append("email", data.email);
        formData.append("phone", data.phone);
        formData.append("address", data.address);
        formData.append("cardType", cardApplicationType);

        if (cardApplicationType === "Credit") {
            formData.append("employmentStatus", data.employmentStatus);
        }

        // Append document files and names
        const docNames = requiredDocuments[cardApplicationType];
        docNames.forEach((docName) => {
            if (documents[docName]) {
                formData.append("documents", documents[docName]);
                formData.append("documentNames", docName); // Send document names as an array
            }
        });

        // Check if all required documents are uploaded
        const missingDocs = docNames.filter((doc) => !documents[doc]);
        if (missingDocs.length > 0) {
            toast.error(`Please upload: ${missingDocs.join(", ")}`);
            return;
        }

        try {
            const response = await axios.post("/User/CardRequest", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 200) {
                toast("Card application submitted successfully!");
            }
        } catch (error) {
            console.error("Error submitting form:", error.response?.data || error.message);
            toast.error("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto p-5 border rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center"> Debit / Credit Card Application Form</h2>

            {/* Card Type Selection */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Application Type</label>
                <select
                    value={cardApplicationType}
                    onChange={(e) => setCardApplicationType(e.target.value)}
                    className="w-full outline-none p-2 border rounded-md"
                >
                    <option value="Debit">Debit Card</option>
                    <option value="Credit">Credit Card</option>
                </select>
            </div>

            {/* Form Fields */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                    type="text"
                    {...register("fullName", { required: "Full name is required" })}
                    className="w-full outline-none p-2 border rounded-md"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="w-full outline-none p-2 border rounded-md"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                    type="tel"
                    {...register("phone", { required: "Phone number is required" })}
                    className="w-full outline-none p-2 border rounded-md"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Address</label>
                <input
                    type="text"
                    {...register("address", { required: "Address is required" })}
                    className="w-full outline-none p-2 border rounded-md"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
            </div>

            {/* Employment Status for Credit Card */}
            {cardApplicationType === "Credit" && (
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Employment Status</label>
                    <select
                        {...register("employmentStatus", { required: "Employment status is required" })}
                        className="w-full outline-none p-2 border rounded-md"
                    >
                        <option value="">Select Employment Status</option>
                        <option value="Employed">Employed</option>
                        <option value="Self-Employed">Self-Employed</option>
                        <option value="Unemployed">Unemployed</option>
                        <option value="Student">Student</option>
                    </select>
                    {errors.employmentStatus && (
                        <p className="text-red-500 text-sm mt-1">{errors.employmentStatus.message}</p>
                    )}
                </div>
            )}

            {/* Document Upload Section */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Required Documents</label>
                {requiredDocuments[cardApplicationType].map((docName) => (
                    <div key={docName} className="mt-2">
                        <label className="block text-sm text-gray-600">{docName}</label>
                        <input
                            type="file"
                            name={docName}
                            onChange={(e) => handleFileChange(e, docName)}
                            className="mt-1 px-4 py-2 border outline-blue-400 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            accept=".pdf,.jpg,.jpeg,.png"
                            required
                        />
                    </div>
                ))}
                <p className="mt-1 text-xs text-gray-500">Accepted formats: PDF, JPG, PNG</p>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
                Submit Application
            </button>
        </form>
    );
}

export default CardApplication;

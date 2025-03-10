import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "../../axiosConfig";

const InsuranceApplicationForm = () => {
    const [formData, setFormData] = useState({
        insuranceType: "health",
        coverageAmount: "",
        fullName: "",
        dateOfBirth: "",
        address: "",
        phone: "",
    });
    const [documents, setDocuments] = useState({}); // Object to store files by document type

    // Define required documents for each insurance type
    const requiredDocuments = {
        health: ["ID Proof", "Medical History"],
        life: ["ID Proof", "Income Proof"],
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e, docName) => {
        setDocuments({ ...documents, [docName]: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        // Append form fields
        data.append("insuranceType", formData.insuranceType);
        data.append("coverageAmount", Number(formData.coverageAmount));
        data.append("fullName", formData.fullName);
        data.append("dateOfBirth", formData.dateOfBirth);
        data.append("address", formData.address);
        data.append("phone", formData.phone);

        // Append document names and files
        const docNames = requiredDocuments[formData.insuranceType];
        docNames.forEach((docName) => {
            if (documents[docName]) {
                data.append("documents", documents[docName]);
                data.append("documentNames", docName); // Send document names as an array
            }
        });

        // Check if all required documents are uploaded
        const missingDocs = docNames.filter((doc) => !documents[doc]);
        if (missingDocs.length > 0) {
            toast.error(`Please upload: ${missingDocs.join(", ")}`);
            return;
        }

        try {
            const res = await axiosInstance.post("/User/InsuranceRequest", data);
            toast("Application submitted successfully!");
            window.location.replace("/");
        } catch (error) {
            console.log(error);
            toast.error("Error submitting application: " + error.response?.data?.error || error.message);
        }
    };

    return (
        <div className=" mx-auto p-10 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Apply for Insurance</h2>
            <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Insurance Type</label>
                    <select
                        name="insuranceType"
                        value={formData.insuranceType}
                        onChange={handleChange}
                        className="mt-1 px-4 py-2.5 border outline-blue-400 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="health">Health</option>
                        <option value="life">Life</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Coverage Amount</label>
                    <input
                        type="number"
                        name="coverageAmount"
                        value={formData.coverageAmount}
                        onChange={handleChange}
                        className="mt-1 px-4 py-2.5 border outline-blue-400 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="mt-1 px-4 py-2.5 border outline-blue-400 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="mt-1 px-4 py-2.5 border outline-blue-400 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-1 px-4 py-2.5 border outline-blue-400 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 px-4 py-2.5 border outline-blue-400 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Required Documents</label>
                    {requiredDocuments[formData.insuranceType].map((docName) => (
                        <div key={docName} className="mt-2">
                            <label className="block text-sm text-gray-600">{docName}</label>
                            <input
                                type="file"
                                name={docName}
                                onChange={(e) => handleFileChange(e, docName)}
                                className="mt-1 px-4 py-2.5 border outline-blue-400 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                accept=".pdf,.jpg,.jpeg,.png"
                                required
                            />
                        </div>
                    ))}
                    <p className="mt-1 text-xs text-gray-500">Accepted formats: PDF, JPG, PNG</p>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                    Submit Application
                </button>
            </form>
        </div>
    );
};

export default InsuranceApplicationForm;

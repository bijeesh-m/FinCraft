

import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";

const InsuranceRequests = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await axiosInstance.get("/Manager/insurance-requests");
                setApplications(res.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchApplications();
    }, []);

    const handleReview = async (id, status) => {
        try {
            const res = await axiosInstance.put(`/Manager/insurance-requests/${id}`, { status });
            setApplications(applications.map((app) => (app._id === id ? res.data.data : app)));
        } catch (error) {
            console.error(error);
        }
    };

    const docs = {
        health: ["ID Proof", "Medical History"],
        life: ["ID Proof", "Income Proof"],
    };


    return (
        <div className="container mx-auto p-6 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-center">Review Insurance Applications</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {applications.map((app) => (
                    <div key={app._id} className="bg-white p-4 rounded-lg shadow-md">
                        <p>
                            <strong>Type:</strong> {app.insuranceType}
                        </p>
                        <p>
                            <strong>Coverage:</strong> ${app.coverageAmount}
                        </p>
                        <p>
                            <strong>Premium:</strong> ${app.monthlyPremium}
                        </p>
                        <p>
                            <strong>Name:</strong> {app.personalInfo.fullName}
                        </p>
                        <p>
                            <strong>Status:</strong> {app.status}
                        </p>
                        {/* Documents Section */}
                        {app.documents && app.documents.length > 0 && (
                            <div className="mt-4">
                                <p>
                                    <strong>Documents:</strong>
                                </p>
                                <ul className="list-disc pl-5 space-y-1">
                                    {app.documents.map((doc, index) => (
                                        <li key={index}>
                                            <a
                                                href={`http://localhost:4000${doc.url}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-indigo-600 hover:underline"
                                            >
                                                {app.insuranceType==="life"&& <p> {docs.life[index]}</p>}
                                                {app.insuranceType==="health"&& <p> {docs.health[index]}</p>}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {app.status === "pending" ? (
                            <div className="mt-4 space-x-2">
                                <button
                                    onClick={() => handleReview(app._id, "approved")}
                                    className="py-1 px-3 bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleReview(app._id, "rejected")}
                                    className="py-1 px-3 bg-red-600 text-white rounded-md hover:bg-red-700"
                                >
                                    Reject
                                </button>
                            </div>
                        ):<p className=" rounded-full bg-yellow-200 w-fit px-4 py-1 capitalize">{app.status}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InsuranceRequests;

import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { toast } from "react-toastify";

const InsuranceDashboard = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paymentLoading, setPaymentLoading] = useState({});

    const docs = {
        health: ["ID Proof", "Medical History"],
        life: ["ID Proof", "Income Proof"],
    };

    useEffect(() => {
        const fetchUserInsurance = async () => {
            try {
                const res = await axiosInstance.get("/User/insurance");
                setApplications(res.data.data);
            } catch (error) {
                console.error("Error fetching insurance applications:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserInsurance();
    }, []);

    const handleBankPayment = async (id, premium) => {
        setPaymentLoading((prev) => ({ ...prev, [id]: true }));
        try {
            const res = await axiosInstance.post(`/User/insurance/${id}/pay-from-bank`);
            setApplications(applications.map((app) => (app._id === id ? res.data.application : app)));
            toast(`Payment of $${premium} successfully deducted! Next due: ${new Date(res.data.nextDueDate).toLocaleDateString()}`);
        } catch (error) {
            console.error("Error processing payment:", error);
            toast.error("Payment failed: " + (error.response?.data?.error || error.message));
        } finally {
            setPaymentLoading((prev) => ({ ...prev, [id]: false }));
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">Your Insurance Dashboard</h2>

            {loading ? (
                <div className="text-center text-gray-600">Loading your insurance details...</div>
            ) : applications.length === 0 ? (
                <div className="text-center text-gray-600">No insurance applications found.</div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 ">
                    {applications.map((app) => (
                        <div
                            key={app._id}
                            className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <h3 className="text-lg font-semibold text-indigo-600 capitalize">
                                {app.insuranceType} Insurance
                            </h3>
                            <div className="mt-3 space-y-2">
                                <p>
                                    <strong>Coverage:</strong> ₹{app.coverageAmount.toLocaleString()}
                                </p>
                                <p>
                                    <strong>Monthly Premium:</strong> ₹{app.monthlyPremium.toLocaleString()}
                                </p>
                                <p>
                                    <strong>Application Status:</strong>{" "}
                                    <span
                                        className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                                            app.status === "approved"
                                                ? "bg-green-100 text-green-800"
                                                : app.status === "rejected"
                                                ? "bg-red-100 text-red-800"
                                                : "bg-yellow-100 text-yellow-800"
                                        }`}
                                    >
                                        {app.status}
                                    </span>
                                </p>
                                <p>
                                    <strong>Next Due Date:</strong>{" "}
                                    {app.nextDueDate
                                        ? new Date(app.nextDueDate).toLocaleDateString()
                                        : "Not set"}
                                </p>
                                <p>
                                    <strong>Applied On:</strong> {new Date(app.applicationDate).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>Name:</strong> {app.personalInfo.fullName}
                                </p>
                            </div>

                            {/* Documents Section */}
                            {app.documents && app.documents.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-gray-700">Documents:</p>
                                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                                        {app.documents.map((doc, index) => (
                                            <li key={index}>
                                                <a
                                                    href={`http://localhost:4000${doc.url}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-indigo-600 hover:underline"
                                                >
                                                    {app.insuranceType === "life" && <p> {docs.life[index]}</p>}
                                                    {app.insuranceType === "health" && <p> {docs.health[index]}</p>}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Payment Option */}
                            {app.status === "approved" && (
                                <div className="mt-4">
                                    <button
                                        onClick={() => handleBankPayment(app._id, app.monthlyPremium)}
                                        disabled={paymentLoading[app._id]}
                                        className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors duration-200 ${
                                            paymentLoading[app._id]
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-blue-600 hover:bg-blue-700"
                                        }`}
                                    >
                                        {paymentLoading[app._id]
                                            ? "Processing..."
                                            : `Pay ₹${app.monthlyPremium} from Bank`}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InsuranceDashboard;

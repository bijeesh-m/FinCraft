import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import { hover, motion } from "framer-motion";

const LoanDashboard = () => {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDropdown, setOpenDropdown] = useState(null); // Track open dropdown

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserLoans = async () => {
            try {
                const res = await axiosInstance.get("/User/loan-status");
                setLoans(res.data);
            } catch (error) {
                console.error("Error fetching loans:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserLoans();
    }, []);

    return (
        <div className="container mx-auto p-6 min-h-screen">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
                Your Loan Dashboard
            </h2>

            {loading ? (
                <div className="text-center text-gray-600">Loading your loans...</div>
            ) : loans.length === 0 ? (
                <div className="text-center text-gray-600">No active loans found.</div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                    {loans.map((loan) => (
                        <div
                            key={loan._id}
                            className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <h3 className="text-lg font-semibold text-indigo-600 capitalize">
                                {loan.loanType} Loan
                            </h3>
                            <div className="mt-3 space-y-2">
                                <p><strong>Loan Amount:</strong> ₹{loan.loanAmount.toLocaleString()}</p>
                                <p><strong>Loan Term:</strong> {loan.loanTerm} months</p>
                                <p><strong>Loan Paid:</strong> ₹{loan.loanPaid.toLocaleString()}</p>
                                <p><strong>Outstanding Amount:</strong> ₹{(loan.loanAmount - loan.loanPaid).toLocaleString()}</p>
                                <p>
                                    <strong>Loan Status:</strong>{" "}
                                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                                        loan.status === "approved"
                                            ? "bg-green-100 text-green-800"
                                            : loan.status === "rejected"
                                            ? "bg-red-100 text-red-800"
                                            : "bg-yellow-100 text-yellow-800"
                                    }`}>
                                        {loan.status}
                                    </span>
                                </p>
                                <p><strong>Created On:</strong> {new Date(loan.createdAt).toLocaleDateString()}</p>
                                <p><strong>Borrower:</strong> {loan.name}</p>
                            </div>

                            {/* Documents Section */}
                            {loan.documents && loan.documents.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-gray-700">Documents:</p>
                                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                                        {loan.documents.map((doc, index) => (
                                            <li key={index}>
                                                <a
                                                    href={`http://localhost:4000/${doc.filePath}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-indigo-600 hover:underline"
                                                >
                                                    {doc.docType}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Payment Details Dropdown */}
                            {loan.transactions && loan.transactions.length > 0 ? (
                                <div className="mt-4">
                                    <button
                                        onClick={() =>
                                            setOpenDropdown(openDropdown === loan._id ? null : loan._id)
                                        }
                                        className="text-indigo-600  flex items-center"
                                    >
                                        Payment Details
                                        <span className={`ml-2 transform transition-transform  ${
                                            openDropdown === loan._id ? "rotate-180"  : "rotate-0"
                                        }`}>
                                            ▼
                                        </span>
                                    </button>

                                    {openDropdown === loan._id && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "250px" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="bg-gray-100 p-3 rounded-md  overflow-y-auto mt-2"
                                        >
                                            {loan.transactions
                                                .sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate))
                                                .map((transaction, i) => (
                                                    <div key={i} className="border-b py-2">
                                                        <p><strong>Date:</strong> {new Date(transaction.transactionDate).toLocaleString()}</p>
                                                        <p><strong>Amount Paid:</strong> ₹{transaction.transactionAmount.toLocaleString()}</p>
                                                    </div>
                                                ))}
                                        </motion.div>
                                    )}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">No payments made yet.</p>
                            )}

                            {/* Payment Option */}
                            {loan.status === "approved" && (
                                <div className="mt-4">
                                    <button
                                        className="bg-blue-100 text-blue-800 px-4 py-1 rounded-md hover:rotate-2 hover:bg-blue-200"
                                        onClick={() => navigate("/pay-loan")}
                                    >
                                        {`Pay ₹${loan.loanAmount - loan.loanPaid} Now`}
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

export default LoanDashboard;

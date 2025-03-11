import React, { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const UserBankAccountDashboard = () => {
    const [userAccount, setUserAccount] = useState(null);
    const [loanStatus, setLoanStatus] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [creditCard, setCreditCard] = useState({});
    const navigate = useNavigate(); // Initialize navigate hook

    useEffect(() => {
        const fetchAccountDetails = async () => {
            try {
                setLoading(true);

                // Fetch user account details
                const accountResponse = await axios.get("/User/GetBankAcc");
                setUserAccount(accountResponse.data);

                // Fetch loan status
                const loanResponse = await axios.get("/User/loan-status");
                console.log(loanResponse);
                setLoanStatus(loanResponse.data);

                // Fetch loan status
                const creditCard = await axios.get("/User/credit-card");
                console.log(creditCard);
                setCreditCard(creditCard.data.card);

                // Fetch transaction status
                const transactions = await axios.get("/User/transactions");
                setTransactions(transactions.data.transactions);
            } catch (error) {
                console.error("Error fetching account details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAccountDetails();
    }, []);

    const handleNewAccountRequest = () => {
        navigate("/bankaccntreg"); // Navigate to the new account request page
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-lg">Loading...</div>;
    }

    // console.log(userAccount);
    console.log("transations :", transactions);

    return (
        <div className="min-h-screen bg-slate-100 pb-32 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800">Account Dashboard</h1>
                    <div className="flex flex-col md:flex-row justify-center gap-2">
                        <button
                            onClick={() => navigate("/loan-dashboard")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md"
                        >
                            Loan Dashboard
                        </button>
                        <button
                            onClick={() => navigate("/insurance-dashboard")}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md"
                        >
                            Insurance Dashboard
                        </button>

                        <button
                            onClick={() => navigate("/card-dashboard")}
                            className="bg-rose-100 hover:bg-rose-200 text-rose-800 px-4 py-2 rounded-lg shadow-md"
                        >
                            Card Management
                        </button>
                    </div>
                </div>

                {/* User Details */}
                <div className="bg-white p-6 rounded ">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Account Details</h2>
                    {userAccount ? (
                        userAccount.status === "rejected" ? (
                            <div className="text-center p-4 bg-red-100 rounded-md">
                                <p className="text-red-600 text-lg font-semibold">
                                    Your account request has been rejected for some reason.
                                </p>
                                <p className="text-gray-600 mt-2">
                                    Please contact customer support for more information or{" "}
                                    <button
                                        onClick={handleNewAccountRequest}
                                        className="text-blue-600 hover:underline font-semibold"
                                    >
                                        create a new account request
                                    </button>
                                    .
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-lg">
                                <p>
                                    <strong>Name:</strong> {userAccount.firstname} {userAccount.lastname}
                                </p>
                                <p>
                                    <strong>Email:</strong> {userAccount.email}
                                </p>
                                <p>
                                    <strong>Phone:</strong> {userAccount.phone}
                                </p>
                                <p>
                                    <strong>Branch:</strong> {userAccount.branch}
                                </p>
                                <p>
                                    <strong>Account No:</strong> {userAccount.accountnumber}
                                </p>
                                <p>
                                    <strong>Status:</strong>{" "}
                                    <span
                                        className={`font-semibold capitalize ${
                                            userAccount.status === "active" ? "text-green-600" : "text-red-600"
                                        }`}
                                    >
                                        {userAccount.status}
                                    </span>
                                </p>
                            </div>
                        )
                    ) : (
                        <p className="text-gray-500">No account details available.</p>
                    )}
                </div>

                {/* Account Overview - Only shown if status is not rejected */}
                {userAccount?.status !== "rejected" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white  p-6 rounded shadow-md">
                            <h2 className="text-lg font-semibold text-gray-700">Current Balance</h2>
                            <p className="text-3xl font-bold text-green-600 mt-2">
                                ₹{userAccount?.balance.toLocaleString() || 0}
                            </p>
                        </div>
                        <div className="bg-white p-6  rounded shadow-md">
                            <h2 className="text-lg font-semibold text-gray-700">Credit Card</h2>
                            <p className="text-3xl font-bold text-red-600 mt-2">
                                ₹{creditCard.availableCredit?.toLocaleString()}
                            </p>
                        </div>
                    </div>
                )}

                {/* Loan Status - Only shown if status is not rejected */}
                {userAccount?.status !== "rejected" && loanStatus.length > 0 && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold text-gray-700 mb-4">Loan Details</h2>
                        {loanStatus.map((loan, index) => (
                            <div
                                onClick={() => navigate("/loan-dashboard")}
                                key={index}
                                className="border-b  p-5 bg-fuchsia-50 my-2 rounded-lg"
                            >
                                <p>
                                    <strong>Loan Type:</strong> {loan.loanType}
                                </p>
                                <p>
                                    <strong>Amount:</strong> ₹{loan.loanAmount.toLocaleString()}
                                </p>
                                <p>
                                    <strong>Outstanding Amount :</strong> ₹
                                    {(loan.loanAmount - loan.loanPaid).toLocaleString()}
                                </p>
                                <p>
                                    <strong>Status:</strong>{" "}
                                    <span
                                        className={`font-semibold capitalize ${
                                            loan.status === "approved" ? "text-green-600" : "text-yellow-600"
                                        }`}
                                    >
                                        {loan.status}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Recent Transactions - Only shown if status is not rejected */}
                {userAccount?.status !== "rejected" && (
                    <div className="bg-white p-6 rounded-lg shadow-md max-h-screen overflow-y-auto">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Transactions</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left">
                                <thead>
                                    <tr className="border-b">
                                        <th className="py-2 text-gray-600">Date</th>
                                        <th className="py-2 text-gray-600">Description</th>
                                        <th className="py-2 text-gray-600">Amount</th>
                                        <th className="py-2 text-gray-600">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.length > 0 ? (
                                        transactions.map((transaction, index) => (
                                            <tr key={index} className="border-b  hover:bg-gray-50">
                                                <td className="py-3 text-gray-700">
                                                    {new Date(transaction.transactionDate).toLocaleString()}
                                                </td>
                                                <td className="py-3 text-gray-700">
                                                    {transaction.transactionDescription}
                                                </td>
                                                <td
                                                    className={`py-3 ${
                                                        transaction.transactionStatus === "Credited"
                                                            ? "text-green-600"
                                                            : "text-red-600"
                                                    }`}
                                                >
                                                    {transaction.transactionStatus === "Credited"
                                                        ? `+${transaction.transactionAmount.toLocaleString()}`
                                                        : `-${transaction.transactionAmount.toLocaleString()}`}
                                                </td>
                                                <td className={`font-thin`}>
                                                    <p
                                                        className={` mb-0 w-fit text-green-800 rounded-full px-4 py-1  bg-green-200`}
                                                    >
                                                        Completed
                                                    </p>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-3 text-gray-500">
                                                No transactions available.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserBankAccountDashboard;

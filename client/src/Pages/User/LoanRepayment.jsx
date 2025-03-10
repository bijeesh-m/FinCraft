import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoanRepayment = () => {
    const [loans, setLoans] = useState([]);
    const [selectedLoan, setSelectedLoan] = useState(null);
    const [amount, setAmount] = useState("");
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance
            .get(`/User/loan-status`)
            .then((res) => {
                setLoans(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleRepay = async () => {
        if (!selectedLoan || !amount) return;
        try {
            const response = await axiosInstance.post(`/User/repay/${selectedLoan._id}`, {
                amount: Number(amount),
            });
            toast(response.data.message);
            setLoans((prevLoans) =>
                prevLoans.map((loan) =>
                    loan._id === selectedLoan._id ? { ...loan, loanPaid: loan.loanPaid + Number(amount) } : loan
                )
            );
            setShowModal(false);
            setAmount("");
            navigate("/loan-dashboard");
        } catch (error) {
            toast.error(error.response?.data?.error || "Repayment failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
            <div className="w-full max-w-2xl bg-white bg-opacity-10 backdrop-blur-lg shadow-xl rounded-xl p-6">
                <h2 className="text-2xl font-semibold text-white text-center mb-6">Loan Repayment</h2>

                <div className="mb-4">
                    <label className="text-white block mb-2">Select a Loan</label>
                    <select
                        onChange={(e) => setSelectedLoan(loans.find((loan) => loan._id === e.target.value))}
                        className="w-full p-3 bg-fuchsia-800 outline-none bg-transparent border bg-opacity-20 text-white border-none rounded-lg focus:ring-2 focus:ring-blue-300"
                    >
                        <option value="">Select a Loan</option>
                        {loans.map((loan) => (
                            <option key={loan._id} value={loan._id} className="text-black">
                                {loan.loanType} - ${loan.loanAmount} (Paid: ${loan.loanPaid})
                            </option>
                        ))}
                    </select>
                </div>

                {selectedLoan && (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setShowModal(true);
                        }}
                        className="mt-4 text-white"
                    >
                        <p className="text-lg">
                            Amount Due:{" "}
                            <span className="font-semibold">${selectedLoan.loanAmount - selectedLoan.loanPaid}</span>
                        </p>

                        <input
                            type="number"
                            placeholder="Enter Repayment Amount"
                            required
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-3 mt-2 bg-fuchsia-800 outline-none bg-opacity-20 text-white border-none rounded-lg focus:ring-2 focus:ring-blue-300 placeholder-white"
                        />

                        <button
                            type="submit"
                            className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition-transform transform hover:scale-105"
                        >
                            Repay Loan
                        </button>
                    </form>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
                        <h3 className="text-xl font-semibold">Confirm Payment</h3>
                        <p className="text-gray-600 mt-2">
                            Are you sure you want to repay <strong>${amount}</strong> from your bank account?
                        </p>
                        <div className="mt-4 flex justify-center gap-4">
                            <button
                                onClick={handleRepay}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoanRepayment;

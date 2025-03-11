import { useState } from "react";
import axiosInstance from "../../axiosConfig";
import { toast } from "react-toastify";

const BankTransfer = () => {
    const [formData, setFormData] = useState({
        senderAccount: "",
        receiverAccount: "",
        amount: "",
        description: "",
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.senderAccount) newErrors.senderAccount = "Sender account is required";
        if (!formData.receiverAccount) newErrors.receiverAccount = "Receiver account is required";
        if (!formData.amount) {
            newErrors.amount = "Amount is required";
        } else if (Number(formData.amount) <= 0) {
            newErrors.amount = "Amount must be greater than 0";
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleTransfer = async (e) => {
        e.preventDefault();
        setMessage("");

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsLoading(true);
        try {
            const response = await axiosInstance.post("User/transfer", {
                senderAccount: formData.senderAccount,
                receiverAccount: formData.receiverAccount,
                amount: Number(formData.amount),
                description: formData.description,
            });

            setMessage(response.data.message);
            toast("Transfer success");
            setFormData({
                senderAccount: "",
                receiverAccount: "",
                amount: "",
                description: "",
            });

            window.location.replace('/')
        } catch (error) {
            setMessage(error.response?.data?.message || "Transfer failed");
            toast.error(error.response?.data?.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full  bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Bank Transfer</h2>

                {message && (
                    <div
                        className={`mb-4 p-3 rounded-lg text-center ${
                            message.includes("failed") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                        }`}
                    >
                        {message}
                    </div>
                )}

                <form onSubmit={handleTransfer} className="space-y-5">
                    <div>
                        <input
                            type="text"
                            name="senderAccount"
                            placeholder="Sender Account Number"
                            className={`w-full px-4 py-3 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                                errors.senderAccount ? "border-red-500" : "border-gray-300"
                            }`}
                            value={formData.senderAccount}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                        {errors.senderAccount && <p className="mt-1 text-sm text-red-500">{errors.senderAccount}</p>}
                    </div>

                    <div>
                        <input
                            type="text"
                            name="receiverAccount"
                            placeholder="Receiver Account Number"
                            className={`w-full px-4 py-3 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                                errors.receiverAccount ? "border-red-500" : "border-gray-300"
                            }`}
                            value={formData.receiverAccount}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                        {errors.receiverAccount && (
                            <p className="mt-1 text-sm text-red-500">{errors.receiverAccount}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="number"
                            name="amount"
                            placeholder="Amount"
                            step="0.01"
                            min="0"
                            className={`w-full px-4 py-3 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                                errors.amount ? "border-red-500" : "border-gray-300"
                            }`}
                            value={formData.amount}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                        {errors.amount && <p className="mt-1 text-sm text-red-500">{errors.amount}</p>}
                    </div>

                    <div>
                        <input
                            type="text"
                            name="description"
                            placeholder="Description (Optional)"
                            className="w-full px-4 py-3 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition border-gray-300"
                            value={formData.description}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                Processing...
                            </>
                        ) : (
                            "Transfer"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BankTransfer;

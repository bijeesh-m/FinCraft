const mongoose = require("mongoose");

const loanRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    name: { type: String, trim: true },
    address: { type: String, trim: true },
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/.+@.+\..+/, "Invalid email"],
    },
    phone: {
        type: String,
        required: true,
        match: [/^\d{10}$/, "Invalid phone number"],
    },
    loanType: {
        type: String,
        enum: ["Personal", "Gold", "Car", "House", "Education"],
    },
    loanAmount: { type: Number, required: true, min: 1 },
    loanPaid: {
        type: Number,
        required: true,
        default: 0,
    },
    loanTerm: { type: Number, min: 1 },
    documents: [
        {
            docType: { type: String, required: true },
            filePath: { type: String, required: true },
        },
    ],
    createdAt: { type: Date, default: () => Date.now() },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"], // Allowed values for status
        default: "pending", // Default to "pending"
    },
    transactions: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Transaction",
    },
});

const loanModel = mongoose.model("LoanRequest", loanRequestSchema);
module.exports = loanModel;

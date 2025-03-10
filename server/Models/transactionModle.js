const mongoose = require("mongoose");

const transactionModel = new mongoose.Schema({
    transactionNo: {
        type: Number,
        default: () => Date.now(),
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    bankId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bankaccount",
        required: true,
    },
    transactionType: {
        type: String,
        enum: ["Loan", "Bank transfer", "Bill", "Tax"],
    },
    transactionDescription: {
        type: String,
        required: true,
    },
    transactionAmount: {
        type: Number,
        required: true,
    },
    transactionDate: {
        type: Date,
        default: () => new Date(),
    },
    transactionStatus: {
        type: String,
        enum: ["Debited", "Credited"],
        required: true,
    },
});

const Transaction = mongoose.model("Transaction", transactionModel);
module.exports = Transaction;

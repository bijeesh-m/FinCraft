const mongoose = require("mongoose");

const bnkAccSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        dateofbirth: {
            type: Date,
            required: true,
        },
        email: {
            type: String,
            required: true, // Email is still required
        },
        phone: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        postalcode: {
            type: Number,
            required: true,
        },
        balance: {
            type: Number,
            default: 0, // Default balance starts at 0
        },
        accountnumber: {
            type: String,
            default: "Not Provided Yet",
        },
        branch: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        status: {
            type: String,
            enum: ["pending", "active", "blocked", "rejected"], // Allowed values for status
            default: "pending", // Default to "pending"
        },
    },
    { timestamps: true }
);

const bAcc = mongoose.model("bankaccount", bnkAccSchema);
module.exports = bAcc;

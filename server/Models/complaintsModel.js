const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email address"],
        },
        complaint: {
            type: String,
            required: [true, "Complaint description is required"],
            trim: true,
        },
        status: {
            type: String,
            enum: ["Pending", "Resolved", "Rejected"],
            default: "Pending",
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
    }
);

const complaintModel = mongoose.model("Complaint", complaintSchema);
module.exports = complaintModel;

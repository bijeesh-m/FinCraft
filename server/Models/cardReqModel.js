const mongoose = require("mongoose");

const cardRequestSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        fullName: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        phone: { type: String, required: true, trim: true, match: /^\d{10}$/ },
        address: { type: String, required: true, trim: true },
        cardType: { type: String, required: true, enum: ["Credit", "Debit"] },
        status: {
            type: String,
            default: "Pending",
            enum: ["Pending", "Approved", "Rejected"],
        },
        documents: [
            {
                name: { type: String, required: true },
                url: { type: String, required: true },
                uploadedAt: { type: Date, default: Date.now },
            },
        ],
        requestDate: { type: Date, default: Date.now },
        approvalDate: { type: Date },
    },
    { timestamps: true }
);

const cardRequestModel = mongoose.model("CardRequest", cardRequestSchema);
module.exports = cardRequestModel;

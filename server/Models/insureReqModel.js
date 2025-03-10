const mongoose = require("mongoose");

const insuranceApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    insuranceType: {
      type: String,
      enum: ["health", "life"],
      required: true,
    },
    coverageAmount: {
      type: Number,
      required: true,
      min: 1000,
    },
    monthlyPremium: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    paymentHistory: [
      {
        month: { type: String, required: true }, // e.g., "March 2025"
        amount: { type: Number, required: true },
        paymentDate: { type: Date, default: Date.now },
      },
    ],
    nextDueDate: {
      type: Date,
      required: true,
      
    },
    personalInfo: {
      fullName: { type: String, required: true },
      dateOfBirth: { type: Date, required: true },
      address: { type: String, required: true },
      phone: { type: String, required: true },
    },
    documents: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const InsuranceModel = mongoose.model("InsuranceApplication", insuranceApplicationSchema);
module.exports = InsuranceModel;

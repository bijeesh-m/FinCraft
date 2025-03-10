const mongoose = require("mongoose");

const taxPaymentSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  }, // Reference to the user making the payment

  taxtype: {
    type: String,
    enum: ["Income Tax", "Property Tax", "Sales Tax", "Other"],
    required: true,
  }, // Type of tax being paid

  taxamount: {
    type: Number,
    required: true,
  }, // Amount of tax to be paid

  taxperiod: {
    type: String,
    required: true,
  }, // The tax period, e.g., "2024 Q1" or "2023 Annual"

  paymentstatus: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  }, // Status of the payment

  paymentsate: {
    type: Date,
    default: Date.now,
  }, // Date and time of the payment

  transactionId: {
    type: String,
    unique: true,
  }, // Unique transaction ID for tracking

});

module.exports = mongoose.model("TaxPayment", taxPaymentSchema);

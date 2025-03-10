const mongoose = require("mongoose");

const loanPaymentSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  }, // Reference to the user making the payment

  loanid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "loan", // Reference to the loan for which payment is being made
    required: true,
  }, // The loan associated with the payment

  amount: {
    type: Number,
    required: true,
  }, // Amount being paid

  paymentdate: {
    type: Date,
    default: Date.now,
  }, // Date of payment

  paymentstatus: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  }, // Status of the payment

  transactionid: {
    type: String,
    unique: true,
  }, // Unique identifier for the payment transaction (can use uuid or similar)
});

module.exports = mongoose.model("LoanPayment", loanPaymentSchema);

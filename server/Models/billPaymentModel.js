const mongoose = require("mongoose");

const billPaymentSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    // required: true,
  }, // Reference to the user who made the payment

  billername: {
    type: String,
    required: true,
  }, // Name of the service provider (e.g., "Electricity", "Water", "Internet")

  billercategory: {
    type: String,
    enum: ["Electricity", "Water", "Internet", "Phone", "Credit Card", "Other"],
    // required: true,
  }, // Category of the bill

  accountnumber: {
    type: String,
    required: true,
  }, // Account or bill number associated with the biller

  amount: {
    type: Number,
    required: true,
  }, // Amount to be paid
  paymentstatus: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  }, // Status of the payment

  paymentdate: {
    type: Date,
    default: Date.now,
  }, // Date and time of the payment

  transactionid: {
    type: String,
    unique: true,
  }, // Unique identifier for tracking the transaction

  // Optional notes or remarks on the payment
});

module.exports = mongoose.model("BillPayment", billPaymentSchema);

const mongoose = require("mongoose");

const verifiedBnkAccSchema = new mongoose.Schema({
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
    required: true,
  },
  phone: {
    type: String, // Changed from Number to String
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
    type: String, // Changed from Number to String
    required: true,
  },
  balance: {
    type: Number,
    default: 0, // Default balance starts at 0
  },
  accountnumber: {
    type: String,
    required: true,
    unique: true, // Ensure account numbers are unique
    sparse: true, // Allow multiple "not approved yet" entries
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  
  approvedAt: {
    type: Date,
    default: Date.now, // Timestamp of approval
  },
});

const VerifiedBankAccount = mongoose.model(
  "verifiedbankaccount",
  verifiedBnkAccSchema
);

module.exports = VerifiedBankAccount;

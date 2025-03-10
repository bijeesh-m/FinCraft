const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    cardNumber: { type: String, required: true, unique: true },
    cvv: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cardType: { type: String, enum: ["Credit", "Debit"], required: true },
    status: { type: String, enum: ["Inactive", "Active", "Blocked"], default: "Inactive" },
    creditLimit: {
        type: Number,
        required: function () {
            return this.cardType === "Credit";
        },
        default: 50000,
    },
    availableCredit: {
        type: Number,
        required: function () {
            return this.cardType === "Credit";
        },
    },
    billingCycle: {
        type: Date,
        required: function () {
            return this.cardType === "Credit";
        },
    }, // Monthly cycle
    
});

const cardModel = mongoose.model("Card", cardSchema);
module.exports = cardModel;

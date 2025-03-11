const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
        default: "user",
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    isBlocked: { type: Boolean, default: false }, // Added field
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

const Umodel = mongoose.model("user", userSchema);
module.exports = Umodel;

const mongoose = require("mongoose");

const managerSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        position: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true, // No need to hash this since the password is already hashed in the userModel
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    },
    {
        timestamps: true,
    }
);

const Manager = mongoose.model("manager", managerSchema);

module.exports = Manager;

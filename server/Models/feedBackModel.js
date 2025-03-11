const mongoose = require("mongoose");

// Define the schema for feedback
const feedbackSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email address"],
        },
        feedback: {
            type: String,
            required: true,
            trim: true,
        },
        isAcknowledge: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true, // automatically adds createdAt and updatedAt fields
    }
);

// Create a model based on the schema
const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;

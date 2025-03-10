const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const complaintModel = require("../Models/complaintsModel");
const feedbackModel = require("../Models/feedBackModel");
const userModel = require("../Models/userModel");
const bankAccountModel = require("../Models/bankAccModel");
const ManagerModel = require("../Models/managerModel");
const Admin = require("../Models/adminModel");

//////////////////////// LOGIN ////////////////////////////

module.exports.login = async (req, res) => {
    console.log(req.body);
    try {
        const admin = await Admin.findOne({ email: req.body.email });
        if (admin) {
            const auth = await bcrypt.compare(req.body.password, admin.password);
            if (auth) {
                const token = jwt.sign({ username: admin.username, id: admin._id }, process.env.SEC_KEY, {
                    expiresIn: "2hr",
                });
                res.cookie("adminAuthToken", token, { maxAge: 60 * 60 * 1000 });
                res.status(200).json({ message: "Login success", admin });
            } else {
                res.status(400).json({ message: "Invalid password" });
            }
        } else {
            res.status(404).json({ message: "admin not found!" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.ViewComplaints = async (req, res) => {
    try {
        const complaints = await complaintModel.find();
        res.status(200).json({
            message: "All Complaints",
            complaints,
        });
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: "Error fetching complaints",
            error: err.message,
        });
    }
};
module.exports.ViewFeedbacks = async (req, res) => {
    try {
        const feedbacks = await feedbackModel.find();
        res.status(200).json({
            message: "All Feedbacks",
            feedbacks,
        });
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: "Error fetching feedbacks",
            error: err.message,
        });
    }
};
module.exports.ViewUsers = async (req, res) => {
    try {
        const users = await userModel.find({ role: "user" });
        if (!users || users.length === 0) {
            res.status(404).json({ message: "No users found", users: [] });
        } else {
            res.status(200).json({ message: "All Users", users });
        }
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: "Error fetching users",
            error: err.message,
        });
    }
};
module.exports.GetBankDetails = async (req, res) => {
    const { userId } = req.body; // Extract userId from request body

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }
    try {
        const bankDetails = await bankAccountModel.findOne({ user: userId });
        if (!bankDetails) {
            return res.status(404).json({ message: "No bank account found" });
        }
        res.status(200).json({ bankDetails });
    } catch (err) {
        res.status(500).json({ message: "Error fetching bank details", error: err.message });
    }
};

module.exports.AddManagers = async (req, res) => {
    try {
        const { firstname, lastname, email, phone, position, password } = req.body;

        // Log the request body to debug
        console.log("Request Body:", req.body);

        // Validate that all required fields are present
        if (!firstname || !lastname || !email || !phone || !position || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the email already exists in the User model
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Create a new user with role as 'manager' (password will be hashed in the user model before saving)
        const newUser = new userModel({
            username: firstname,
            email,
            password, // Pass the raw password, hashing is done in the user model
            role: "manager", // Set the role to 'manager'
        });

        // Save the new user to the User model (the password will be hashed automatically)
        await newUser.save();

        // Create a new manager and associate it with the newly created user
        const newManager = new ManagerModel({
            firstname,
            lastname,
            email,
            phone,
            position,
            password, // Pass the hashed password from the user model
            userId: newUser._id, // Associate the manager with the user
        });

        // Log the new manager before saving to check the data
        console.log("New Manager Data:", newManager);

        // Save the new manager to the Manager model
        await newManager.save();

        // Send a success response
        return res.status(201).json({ message: "Manager added successfully" });
    } catch (error) {
        console.error("Error adding manager:", error); // Log detailed error
        return res.status(500).json({
            message: "An error occurred while adding the manager",
            error: error.message,
        });
    }
};

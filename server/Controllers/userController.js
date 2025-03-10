const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const userModel = require("../Models/userModel");
const bnkAccntModel = require("../Models/bankAccModel");
const LoanReqModel = require("../Models/loanModel");
const transactionModel = require("../Models/transactionModle");
const BillPModel = require("../Models/billPaymentModel");
const TaxPModel = require("../Models/taxPaymentModel");
const LoanPModel = require("../Models/loanPaymentModel");
const cardReqModel = require("../Models/cardReqModel");
const InsuranceRequestModel = require("../Models/insureReqModel");
const complaintModel = require("../Models/complaintsModel");
const feedbackModel = require("../Models/feedBackModel");

const jwt = require("jsonwebtoken");
const loanModel = require("../Models/loanModel");
const Transation = require("../Models/transactionModle");
const insuranceModel = require("../Models/insureReqModel");
const cardModel = require("../Models/cardModel");

module.exports.Register = async (req, res) => {
    try {
        const isExist = await userModel.findOne({ email: req.body.email });
        if (isExist) {
            res.status(409).json({ message: "User Already Exist" });
        } else {
            const newUser = new userModel(req.body);
            await newUser.save();
            res.status(200).json({ message: "User Registration Success", newUser });
        }
    } catch (error) {
        res.status(408).json({ message: "Something Went Wrong", Error: error.message });
    }
};
module.exports.Login = async (req, res) => {
    console.log(req.body);

    try {
        const isExist = await userModel.findOne({ email: req.body.email });
        if (isExist) {
            const isMatch = await bcrypt.compare(req.body.password, isExist.password);
            if (isMatch) {
                const token = jwt.sign(
                    { username: isExist.username, role: isExist.role, id: isExist._id },
                    process.env.SEC_KEY,
                    { expiresIn: "2hr" }
                );
                res.cookie("AccessToken", token, { maxAge: 60 * 60 * 1000 });
                jwt.verify(token, process.env.SEC_KEY, (err, user) => {
                    if (!err) {
                        res.status(200).json({
                            message: "LogIn Success",
                            token: token,
                            userId: user.id,
                            role: isExist.role,
                        });
                    }
                });
            } else {
                res.status(401).json({ message: "Incorrect password" });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(400).json({ message: "Something Went Wrong", Error: error.message });
    }
};

module.exports.Logout = (req, res) => {
    try {
        res.clearCookie("AccessToken");
        res.status(200).json({ message: "Logout Success" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", Error: error.message });
    }
};

module.exports.Profile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const bankAccount = await bnkAccntModel.findOne({ email: user.email });
        const response = {
            ...user.toObject(),
            hasBankAccount: !!bankAccount,
        };

        console.log(response);

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", Error: error.message });
    }
};

module.exports.EditProfile = async (req, res) => {
    try {
        console.log("asdkfjl");
        // const updatedUser = await userModel.findByIdAndUpdate(req.user.id, req.body, {
        //     new: true,
        //     runValidators: true,
        // });

        // if (!updatedUser) {
        //     return res.status(404).json({ message: "User not found" });
        // }

        // res.status(200).json({ message: "Profile Updated", user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
module.exports.ChangePassword = async (req, res) => {
    console.log("sddsghs");

    try {
        const { oldPassword, newPassword } = req.body;

        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect old password" });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
module.exports.SendComplaints = async (req, res) => {
    console.log(req.body);

    try {
        const { name, email, complaint } = req.body;

        const newComplaint = new complaintModel({ name, email, complaint });

        await newComplaint.save();

        res.status(200).json({
            status: "pending",
            message: "Complaint submitted successfully",
            data: newComplaint,
        });
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: "Error submitting complaint",
            error: err.message,
        });
    }
};
module.exports.SendFeedbacks = async (req, res) => {
    try {
        const { name, email, feedback } = req.body;

        const newfeedback = new feedbackModel({
            name,
            email,
            feedback,
        });

        await newfeedback.save();

        res.status(200).json({
            message: "Feedback submitted successfully",
            data: newfeedback,
        });
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: "Error submitting feedback",
            error: err.message,
        });
    }
};

module.exports.BankAccReg = async (req, res) => {
    console.log(req.user);

    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not Found" });
        }

        const newAccountRequest = new bnkAccntModel({
            ...req.body,
            user: user._id,
            balance: req.body.initialdeposit || 0,
            status: "pending",
        });

        await newAccountRequest.save();

        return res.status(201).json({
            message: "Bank Account Request Submitted Successfully",
            requestId: newAccountRequest._id,
            status: newAccountRequest.status,
        });
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(503).json({ message: "Something Went Wrong", error: error.message });
    }
};
module.exports.getAccount = async (req, res) => {
    const userId = req.user.id;

    try {
        const accountDetails = await bnkAccntModel.find({ user: userId }).sort({ createdAt: -1 }).limit(1).exec();

        const newestAccount = accountDetails[0];

        console.log(accountDetails);

        if (!newestAccount) {
            return res.status(404).json({ message: "User account not found" });
        }

        res.status(200).json(newestAccount);
    } catch (error) {
        console.error("Error fetching account details:", error);
        res.status(500).json({ message: "Failed to fetch account details", error });
    }
};

module.exports.BankAccRequets = async (req, res) => {
    console.log("hello from account requests");
    try {
        const requests = await bnkAccntModel.find({ status: "pending" }).populate("firstname");
        res.status(200).json({ message: "All Bank Account Opening Requests", requests });
    } catch (error) {
        console.error("Error fetching requests:", error);
        res.status(500).send("Server Error");
    }
};

module.exports.BankAccVerify = async (req, res) => {
    try {
        const AccntHolderId = req.user.id;
        const bankAccount = await bnkAccntModel.findOne({ user: AccntHolderId });
        // console.log(bankAccount);

        if (!bankAccount) {
            return res.status(404).json({ message: "No bank account found for this user." });
        }

        res.status(200).json({ hasBankAccount: true, bankAccount });
    } catch (error) {
        console.error("Error checking bank account status:", error);
        res.status(500).json({ error: "Failed to check bank account status." });
    }
};

module.exports.BillPayment = async (req, res) => {
    // console.log(req.user);

    try {
        const { billername, billercategory, accountnumber, amount } = req.body;

        const ishaveAccount = await bnkAccntModel.findOne({ accountnumber });
        if (!ishaveAccount) {
            return res.status(404).json({ message: "Biller doesn't have an account" });
        }

        const newPayment = new BillPModel({
            userid: req.user.id,
            billername,
            billercategory,
            accountnumber,
            amount,
            paymentstatus: "Completed",
            transactionid: uuidv4(),
        });

        await newPayment.save();

        res.status(200).json({ message: "Bill Payment Success", newPayment });
    } catch (error) {
        console.error("Error creating bill payment:", error);
        res.status(500).json({ error: "Failed to create bill payment." });
    }
};

module.exports.TaxPayment = async (req, res) => {
    try {
        const { taxtype, taxamount, taxperiod } = req.body;

        const newTaxPayment = new TaxPModel({
            userid: req.user.id,
            taxtype,
            taxamount,
            taxperiod,
            paymentstatus: "Completed",
            transactionId: uuidv4(),
        });

        await newTaxPayment.save();

        res.status(200).json({ message: "Tax Payment Success", newTaxPayment });
    } catch (error) {
        console.error("Error creating tax payment:", error);
        res.status(500).json({ error: "Failed to create tax payment." });
    }
};

module.exports.cardRequest = async (req, res) => {
    console.log(req.body);
    console.log(req.files);

    try {
        const { fullName, email, phone, address, cardType } = req.body;

        if (!fullName || !email || !phone || !address || !cardType) {
            return res.status(400).json({ error: "All fields are required." });
        }

        if (!["Credit", "Debit"].includes(cardType)) {
            return res.status(400).json({ error: "Invalid card type selected." });
        }

        const documents = req.files.map((file) => ({
            name: file.originalname,
            url: `/uploads/${file.filename}`, // Adjust based on your storage solution
        }));

        const newCardRequest = new cardReqModel({
            customerId: req.user.id,
            fullName,
            email,
            phone,
            address,
            cardType,
            status: "Pending",
            requestDate: Date.now(),
            documents,
        });

        await newCardRequest.save();

        res.status(200).json({
            message: "Credit card request submitted successfully.",
            cardRequest: newCardRequest,
        });
    } catch (error) {
        console.error("Error creating credit card request:", error.message);
        res.status(500).json({ error: "Failed to submit credit card request." });
    }
};

module.exports.cardsStatus = async (req, res) => {
    try {
        const cards = await cardModel.find({ customerId: req.user.id }).populate("customerId");
        res.status(200).json({ message: "fetched Success", cards });
    } catch (error) {
        console.error("Error fetching card detaile:", error.message);
        res.status(500).json({ error: "Failed to submit fetch card request." });
    }
};

module.exports.updateCardStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedCard = await cardModel.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedCard) {
            return res.status(404).json({ message: "Card not found" });
        }

        res.status(200).json(updatedCard);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating card status", error });
    }
};

module.exports.InsuranceRequest = async (req, res) => {
    console.log(req.body);

    try {
        const { insuranceType, coverageAmount, fullName, dateOfBirth, address, phone } = req.body;

        const monthlyPremium = coverageAmount * 0.005;

        // Map uploaded files to document objects
        const documents = req.files.map((file) => ({
            name: file.originalname,
            url: `/uploads/${file.filename}`, // Adjust based on your storage solution
        }));

        const application = new InsuranceRequestModel({
            userId: req.user.id,
            insuranceType,
            coverageAmount,
            monthlyPremium,
            personalInfo: { fullName, dateOfBirth, address, phone },
            documents,
        });

        await application.save();
        res.status(201).json({ success: true, data: application });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

///////////////////// Insurance premium pay ////////////////////////////

module.exports.makeBankPayment = async (req, res) => {
    try {
        const application = await insuranceModel.findById(req.params.id);
        if (!application || application.userId.toString() !== req.user.id.toString()) {
            return res.status(404).json({ success: false, error: "Application not found" });
        }
        if (application.status !== "approved") {
            return res.status(400).json({ success: false, error: "Payment not allowed" });
        }

        // Find user's bank account
        const bankAccount = await bnkAccntModel.findOne({ userId: req.user._id });
        if (!bankAccount) {
            return res.status(404).json({ success: false, error: "Bank account not found" });
        }

        // Check sufficient balance
        if (bankAccount.balance < application.monthlyPremium) {
            return res.status(400).json({ success: false, error: "Insufficient balance" });
        }

        // Get current month (e.g., "March 2025")
        const currentMonth = new Date().toLocaleString("default", { month: "long", year: "numeric" });

        // Check if the payment for the current month has already been made
        const isAlreadyPaid = application.paymentHistory.some((payment) => payment.month === currentMonth);

        if (isAlreadyPaid) {
            return res.status(400).json({ success: false, error: "This month's payment has already been made" });
        }

        // Deduct premium from bank account
        bankAccount.balance -= application.monthlyPremium;
        await bankAccount.save();

        // Create transaction record
        const transaction = new transactionModel({
            userId: req.user.id,
            bankId: bankAccount._id,
            transactionType: "Bill", // Assuming insurance premium is a bill
            transactionDescription: `Insurance Premium Payment for ${application.insuranceType} (ID: ${application._id})`,
            transactionAmount: application.monthlyPremium,
            transactionStatus: "Debited",
        });
        await transaction.save();

        // Add payment record to history
        application.paymentHistory.push({
            month: currentMonth,
            amount: application.monthlyPremium,
            paymentDate: new Date(),
        });

        // Update next due date (one month ahead)
        let nextDueDate = application.nextDueDate ? new Date(application.nextDueDate) : new Date();
        nextDueDate.setMonth(nextDueDate.getMonth() + 1);

        console.log(nextDueDate);

        application.nextDueDate = nextDueDate;

        await application.save();

        res.status(200).json({ success: true, message: "Payment successful", nextDueDate, application });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, error: error.message });
    }
};

module.exports.processLoanRequest = async (req, res) => {
    try {
        const { name, address, email, phone, loanAmount, loanType, loanTerm } = req.body;

        // Validate required fields
        if (!loanAmount || !loanType || !loanTerm || !name || !address || !email || !phone) {
            return res.status(400).json({
                message: "Missing required fields: name, address, email, phone, loanAmount, loanType, or loanTerm",
            });
        }

        // Extract documents from req.files
        // const documents = Object.entries(req.files).flatMap(([fieldName, files]) =>
        //     files.map((file) => ({
        //         docType: fieldName, // Use the field name as the document type
        //         filePath: file.path,
        //     }))
        // );

        let documents = [];

        for (const file of req.files) {
            documents.push({
                docType: file.fieldname,
                filePath: file.path,
            });
        }

        // Create loan request
        const loanRequest = new LoanReqModel({
            userId: req.user.id,
            name,
            address,
            email,
            phone,
            loanType,
            loanAmount,
            loanTerm,
            documents,
        });

        // Save to database
        await loanRequest.save();

        res.status(201).json({ message: "Loan request submitted successfully", loanRequest });
    } catch (error) {
        console.error("Error creating loan request:", error);
        res.status(500).json({ message: "Failed to submit loan request", error });
    }
};

module.exports.getUserApplications = async (req, res) => {
    try {
        const applications = await insuranceModel.find({ userId: req.user.id });
        res.status(200).json({ success: true, data: applications });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

module.exports.loanStatus = async (req, res) => {
    try {
        const userId = req.user.id;
        const loans = await loanModel.find({ userId: userId }).populate("transactions");
        res.status(200).json(loans);
    } catch (error) {
        console.error("Error getting loan status:", error);
        res.status(500).json({ message: "Failed to get loan status", error });
    }
};
module.exports.loanRepay = async (req, res) => {
    const { amount } = req.body;
    const loanId = req.params.id;

    try {
        const loan = await loanModel.findById(loanId);
        const account = await bnkAccntModel.findOne({ user: req.user.id });
        if (!loan) return res.status(404).json({ error: "Loan not found" });

        if (loan.loanPaid + amount > loan.loanAmount) {
            return res.status(400).json({ error: "Amount exceeds loan balance" });
        }

        if (account.balance < amount) {
            return res.status(400).json({ error: "Insufficient balance!" });
        }

        loan.loanPaid += amount;
        account.balance -= amount;
        await account.save();

        const transactions = await Transation.create({
            bankId: account._id,
            userId: req.user.id,
            transactionType: "Loan",
            transactionAmount: amount,
            transactionDescription: "Loan paid",
            transactionStatus: "Debited",
        });

        loan.transactions.push(transactions._id);
        await loan.save();

        res.json({ message: "Repayment successful", loan });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

////////////////////////////////// Account transactions /////////////////////////

module.exports.transactions = async (req, res) => {
    try {
        const userId = req.user.id;
        const transactions = await transactionModel.find({ userId: userId }).sort({ transactionDate: -1 }).exec();
        res.status(200).json({ message: "Transactions fetched successfully", transactions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

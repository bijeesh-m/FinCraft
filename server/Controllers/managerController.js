const bnkAccntModel = require("../Models/bankAccModel");
const loanModel = require("../Models/loanModel");
const userModel = require("../Models/userModel");
const transactionModel = require("../Models/transactionModle");
const InsuranceRequest = require("../Models/insureReqModel");
const cardModel = require("../Models/cardModel");
const cardRequestModel = require("../Models/cardReqModel");
const Manager = require("../Models/managerModel");

module.exports.updateAccountStatus = async (req, res) => {
    const { id } = req.params;
    const status = req.body.status;
    try {
        const pendingRequest = await bnkAccntModel.findById(id);

        console.log(pendingRequest);
        if (!pendingRequest) {
            return res.status(404).json({ message: "Bank account request not found" });
        }

        if (pendingRequest.status !== "pending") {
            return res.status(400).json({
                message: `Request is already ${pendingRequest.status}.`,
            });
        }

        let accountnumber;

        if (status === "active") {
            let isUnique = false;
            while (!isUnique) {
                accountnumber = `BA-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
                const existingAccount = await bnkAccntModel.findOne({ accountnumber });
                if (!existingAccount) {
                    isUnique = true;
                }
            }
        }

        pendingRequest.accountnumber = accountnumber;
        pendingRequest.status = status;
        await pendingRequest.save();

        return res.status(200).json({
            message: "Bank account status updated successfully.",
            pendingRequest,
        });
    } catch (error) {
        console.error("Error approving bank account request:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports.loanRequests = async (req, res) => {
    try {
        const loans = await loanModel.find();
        res.status(200).json(loans);
    } catch (error) {
        res.status(500).json({ message: "Error fetching loans", error });
    }
};
module.exports.updateLoanStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const updatedLoan = await loanModel.findByIdAndUpdate(req.params.id, { status }, { new: true });

        if (!updatedLoan) {
            return res.status(404).json({ message: "Loan request not found" });
        }

        if (status === "approved") {
            // Find user's active bank account
            const userAccount = await bnkAccntModel.findOne({
                user: updatedLoan.userId,
                status: "active",
            });

            if (!userAccount) {
                return res.status(400).json({ message: "User's bank account not found" });
            }

            // Update user account balance
            userAccount.balance += updatedLoan.loanAmount;
            await userAccount.save();

            // Create a transaction record for loan credit
            const newTransaction = new transactionModel({
                userId: updatedLoan.userId,
                bankId: userAccount._id,
                transactionType: "Loan",
                transactionDescription: "Loan credited to account",
                transactionAmount: updatedLoan.loanAmount,
                transactionStatus: "Credited",
            });

            await newTransaction.save();
        }

        res.status(200).json({ message: "Loan status updated", loan: updatedLoan });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating loan status", error });
    }
};

module.exports.insuranceReq = async (req, res) => {
    try {
        const applications = await InsuranceRequest.find().populate("userId", "email");
        res.status(200).json({ success: true, data: applications });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
module.exports.updateInsuranceStatus = async (req, res) => {
    console.log("dsakflk");
    try {
        const { status } = req.body;
        const application = await InsuranceRequest.findById(req.params.id);

        if (!application) {
            return res.status(404).json({ success: false, error: "Application not found" });
        }

        application.status = status;
        application.reviewDate = Date.now();

        await application.save();
        res.status(200).json({ success: true, data: application });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

module.exports.cardRequests = async (req, res) => {
    try {
        const applications = await cardRequestModel.find({ status: "Pending" }).populate("customerId", "email");
        res.status(200).json({ success: true, data: applications });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

module.exports.updateCardStatus = async (req, res) => {
    try {
        const request = await cardRequestModel.findById(req.params.id);
        if (!request) return res.status(404).json({ error: "Request not found" });

        // Generate Card
        if (req.params.status === "approve") {
            let newCardData;
            if (request.cardType === "Credit") {
                newCardData = {
                    customerId: request.customerId,
                    cardNumber: Math.random().toString().slice(2, 18),
                    cvv: Math.random().toString().slice(2, 5),
                    expiryDate: "12/28",
                    cardType: request.cardType,
                    status: "Inactive",
                    availableCredit: 50000,
                    billingCycle: new Date(),
                };
            } else {
                newCardData = {
                    customerId: request.customerId,
                    cardNumber: Math.random().toString().slice(2, 18),
                    cvv: Math.random().toString().slice(2, 5),
                    expiryDate: "12/28",
                    cardType: request.cardType,
                    status: "Inactive",
                };
            }

            const newCard = new cardModel(newCardData);
            await newCard.save();
            request.status = "Approved";
            await request.save();

            res.json({ message: "Card approved and issued", card: newCard });
        } else {
            request.status = "Rejected";
            await request.save();
            res.status(500).json({ message: "Card rejected for some reason." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

module.exports.getUser = async (req, res) => {
    try {
        const user = await Manager.findOne({ userId: req.user.id });
        console.log(user);
        res.status(200).json({ message: "success", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "failed", error: error.message });
    }
};



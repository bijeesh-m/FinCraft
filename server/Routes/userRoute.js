const express = require("express");
const router = express.Router();
const { uploadMiddleware, singleFileUploadMiddleware, uploads } = require("../Middlewares/Multer");
const userController = require("../Controllers/userController");
const verifyToken = require("../Middlewares/verifyToken");
const checkRole = require("../Middlewares/checkRole");

router.post("/Register", userController.Register);
router.post("/Login", userController.Login);
router.get("/Profile", verifyToken, userController.Profile);
router.put("/EditProfile", verifyToken, singleFileUploadMiddleware, userController.EditProfile);
router.put("/changePassword", verifyToken, userController.ChangePassword);
router.get("/Logout", userController.Logout);
router.post("/BankAccReg", verifyToken, checkRole(["user"]), userController.BankAccReg);
router.get("/GetBankAcc", verifyToken, checkRole(["user"]), userController.getAccount);
router.get("/BankAccRequets", userController.BankAccRequets);
router.get("/BankAccVerify", verifyToken, checkRole(["user"]), userController.BankAccVerify);
router.post("/BillPayment", verifyToken, checkRole(["user"]), userController.BillPayment);
router.post("/TaxPayment", verifyToken, checkRole(["user"]), userController.TaxPayment);

router.post("/CardRequest", verifyToken, checkRole(["user"]), uploads.any("documents"), userController.cardRequest);
router.get("/cards", verifyToken, checkRole(["user"]), userController.cardsStatus);
router.patch("/cards/:id", verifyToken, checkRole(["user"]), userController.updateCardStatus);

router.post(
    "/InsuranceRequest",
    verifyToken,
    checkRole(["user"]),
    uploads.any("documents"),
    userController.InsuranceRequest
);
router.post(
    "/LoanRequest",
    verifyToken,
    uploads.any("documents"), // Apply multer middleware
    userController.processLoanRequest
);

router.get("/insurance", verifyToken, userController.getUserApplications);
router.post("/insurance/:id/pay-from-bank", verifyToken, userController.makeBankPayment);

router.get("/loan-status", verifyToken, userController.loanStatus);
router.post("/repay/:id", verifyToken, userController.loanRepay);
router.post("/SendComplaints", userController.SendComplaints);
router.post("/SendFeedbacks", userController.SendFeedbacks);
router.get("/transactions", verifyToken, userController.transactions);

module.exports = router;

const checkRole = require("../Middlewares/checkRole");
const adminController = require("../Controllers/adminController");
const express = require("express");
const adminAuth = require("../Middlewares/adminAuth");



const router = express.Router();

router.post("/login", adminController.login);
router.get("/ViewComplaints", adminController.ViewComplaints);
router.get("/ViewFeedbacks", adminController.ViewFeedbacks);
router.get("/ViewUsers", adminAuth, adminController.ViewUsers);
router.post("/GetBankAcc", adminController.GetBankDetails);
router.post("/AddManager", adminController.AddManagers);

module.exports = router;

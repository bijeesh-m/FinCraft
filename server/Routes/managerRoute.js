const express = require("express");
const router = express.Router();
const managerController = require("../Controllers/managerController");
const verifyToken = require("../Middlewares/verifyToken");
const checkRole = require("../Middlewares/checkRole");

router.put("/accounts/:id", verifyToken, managerController.updateAccountStatus);
router.get("/loan-requests", verifyToken, managerController.loanRequests);
router.get("/insurance-requests", verifyToken, managerController.insuranceReq);
router.put("/loan-requests/:id", verifyToken, managerController.updateLoanStatus);
router.put("/insurance-requests/:id", verifyToken, managerController.updateInsuranceStatus);
router.get("/card-requests", verifyToken, managerController.cardRequests);
router.patch("/card-requests/:id/:status", verifyToken, managerController.updateCardStatus);

module.exports = router;

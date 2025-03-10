const express = require("express");
const router = express.Router();
const staffController = require("../Controllers/staffController");
const verifyToken = require("../Middlewares/verifyToken");
const checkRole = require("../Middlewares/checkRole");

router.put(
  "/VerifiyBankAccnts",
  staffController.verifyBankAccount
);
router.post(
  "/FwdVrfdAccRequests",
  staffController.ForwardVerifiedRequests
);
module.exports = router;

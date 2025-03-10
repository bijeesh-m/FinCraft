const bnkAccntModel = require("../Models/bankAccModel");
const VrfdBnkAccModel = require("../Models/vrfdAccsModel");

module.exports.verifyBankAccount = async (req, res) => {
  try {
    const { requestId, status } = req.body;

    if (!requestId || !status) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updatedRequest = await bnkAccntModel.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({
      message: "Bank account request verified successfully",
      request: updatedRequest,
    });
  } catch (error) {
    console.error("Error verifying bank account request:", error);
    res
      .status(500)
      .json({ message: "Failed to verify bank account request", error });
  }
};

module.exports.ForwardVerifiedRequests = async (req, res) => {
  console.log("Data from frontend: ", req.body);

  try {
    const verifiedRequests = await bnkAccntModel.find({ status: "verified" });

    if (verifiedRequests.length === 0) {
      return res.status(404).json({ message: "No verified requests found" });
    }

    // Loop through each verified request and save to the 'verifiedacnts' model
    const forwardPromises = verifiedRequests.map(async (request) => {
      const {
        firstname,
        lastname,
        dateofbirth,
        email,
        phone,
        address,
        city,
        state,
        postalcode,
        initialdeposit,
        balance,
        user,
        verifiedBy,
      } = request;

      // Check if account already exists (for example, by checking email or user)
      const existingAccount = await VrfdBnkAccModel.findOne({ email });
      if (existingAccount) {
        console.log(
          `Account for ${email} already exists in verified accounts.`
        );
        return; // Skip saving if account already exists
      }

      try {
        const newVerifiedAccnt = new VrfdBnkAccModel({
          firstname,
          lastname,
          email,
          dateofbirth,
          phone,
          address,
          city,
          state,
          postalcode,
          initialdeposit,
          balance,
          user,
          verifiedBy,
          accountnumber: "not approved yet", // Account number not approved yet
        });

        // Save the new verified account to the 'verifiedacnts' model
        await newVerifiedAccnt.save();
      } catch (error) {
        console.error("Error saving verified account:", error);
      }
    });

    // Wait for all the requests to be forwarded
    await Promise.all(forwardPromises);

    // Optionally, update or delete the original requests after forwarding if needed
    await bnkAccntModel.updateMany(
      { status: "verified" },
      { $set: { status: "forwarded" } }
    );

    res.status(200).json({
      message:
        "Verified requests forwarded successfully to verified accounts model",
    });
  } catch (error) {
    console.error("Error forwarding verified requests: ", error);
    res.status(500).json({
      message: "Failed to forward verified requests",
      error: error.message || error,
    });
  }
};

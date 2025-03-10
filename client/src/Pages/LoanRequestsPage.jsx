import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";

const LoanRequestsPage = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  const [selectedLoanRequest, setSelectedLoanRequest] = useState(null); // Store the selected loan request for viewing
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  useEffect(() => {
    const fetchLoanRequests = async () => {
      try {
        const response = await axios.get("/Staff/ViewLoanReq"); // Update endpoint to fetch loan requests
        if (response.data && Array.isArray(response.data.requests)) {
          setLoanRequests(response.data.requests);
          console.log("Loan Reqs", loanRequests);
        } else {
          setLoanRequests([]);
        }
      } catch (error) {
        setLoanRequests([]);
      }
    };

    fetchLoanRequests();
  }, []);

  const handleVerify = async (loanRequestId) => {
    try {
      const data = { loanRequestId, status: "verified" };
      await axios.put("/Staff/VerifyLoanRequests", data); // Adjust API endpoint
      alert("Loan request verified successfully");

      setLoanRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === loanRequestId
            ? { ...request, status: "verified" }
            : request
        )
      );
    } catch (error) {
      alert("Failed to verify the loan request. Please try again.");
    }
  };

  const handleForward = async (loanRequestId) => {
    try {
      const loanRequest = loanRequests.find(
        (request) => request._id === loanRequestId
      );

      if (!loanRequest) {
        alert("Loan request not found.");
        return;
      }

      if (!loanRequest.status || loanRequest.status !== "verified") {
        alert("Only verified loan requests can be forwarded.");
        return;
      }

      const data = {
        slNo: loanRequest._id,
        firstname: loanRequest.firstname,
        lastname: loanRequest.lastname,
        email: loanRequest.email,
        phone: loanRequest.phone,
        amount: loanRequest.amount, // Assuming loan amount
        loanTerm: loanRequest.loanTerm, // Assuming loan term
        status: "forwarded", // Mark as forwarded to the manager
        user: loanRequest.user,
      };

      const response = await axios.post(
        "/Staff/ForwardVerifiedLoanRequests",
        data
      );

      if (response.status === 200) {
        alert("Loan request forwarded successfully");

        setLoanRequests(
          (prevRequests) =>
            prevRequests.filter((request) => request._id !== loanRequestId) // Remove the forwarded request
        );
      } else {
        alert("Failed to forward the loan request. Please try again.");
      }
    } catch (error) {
      alert("Failed to forward the loan request. Please try again.");
    }
  };

  const openModal = (loanRequest) => {
    setSelectedLoanRequest(loanRequest); // Set the selected loan request
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setSelectedLoanRequest(null); // Reset the selected loan request
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="loan-requests-page">
      <h1 className="text-center">Loan Requests</h1>
      {loanRequests.length === 0 ? (
        <p>No loan requests to display.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Request ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Loan Amount</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loanRequests.map((loanRequest) => (
              <tr key={loanRequest._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {loanRequest._id || "Not Assigned"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {loanRequest.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {loanRequest.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {loanRequest.phone}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {loanRequest.loanAmount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {loanRequest.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => openModal(loanRequest)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mx-1"
                  >
                    View
                  </button>

                  {loanRequest.status !== "verified" &&
                    loanRequest.status !== "forwarded" && (
                      <button
                        onClick={() => handleVerify(loanRequest._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded mx-1"
                      >
                        Verify
                      </button>
                    )}

                  {loanRequest.status === "verified" && (
                    <button
                      onClick={() => handleForward(loanRequest._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mx-1"
                    >
                      Forward
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for viewing loan request details */}
      {isModalOpen && selectedLoanRequest && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded shadow-lg w-1/2 p-5">
            <h2 className="text-xl font-bold mb-4">Loan Request Details</h2>
            <p>
              <strong>User ID:</strong>{" "}
              {selectedLoanRequest._id || "Not Assigned"}
            </p>
            <p>
              <strong>Name:</strong> {selectedLoanRequest.name}{" "}
            </p>
            <p>
              <strong>Email:</strong> {selectedLoanRequest.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedLoanRequest.phone}
            </p>
            <p>
              <strong>Loan Amount:</strong> {selectedLoanRequest.loanAmount}
            </p>
            <p>
              <strong>Status:</strong> {selectedLoanRequest.status}
            </p>
            <p>
              <strong>Loan Term:</strong> {selectedLoanRequest.loanTerm}
            </p>

            {/* File View Section */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Attached Files</h3>
              {selectedLoanRequest.documents &&
              selectedLoanRequest.documents.length > 0 ? (
                selectedLoanRequest.documents.map((file, index) => (
                  <div key={index} className="mt-2">
                    <a
                      href={`/${file.filePath}`} // The file path is being stored in `filePath`
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      {file.docType || `Document ${index + 1}`}{" "}
                      {/* Display docType or a fallback text */}
                    </a>
                  </div>
                ))
              ) : (
                <p>No files attached.</p>
              )}
            </div>

            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanRequestsPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../axiosConfig";

const LoanRequests = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchLoanRequests();
  }, []);

  const fetchLoanRequests = async () => {
    try {
      const response = await axiosInstance.get("/Manager/loan-requests");
      setLoanRequests(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch loan requests.");
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosInstance.put(`/Manager/loan-requests/${id}`, { status: newStatus });
      setLoanRequests((prev) =>
        prev.map((loan) => (loan._id === id ? { ...loan, status: newStatus } : loan))
      );
    } catch (err) {
      setError("Failed to update status.");
    }
  };

  const openDocumentModal = (documents) => {
    setSelectedDocuments(documents);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Loan Requests</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading loan requests...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow-md">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Loan Type</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loanRequests.map((loan) => (
                <tr key={loan._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{loan.name}</td>
                  <td className="p-3">{loan.email}</td>
                  <td className="p-3">{loan.phone}</td>
                  <td className="p-3">{loan.loanType}</td>
                  <td className="p-3">${loan.loanAmount.toLocaleString()}</td>
                  <td className={`p-3 font-semibold ${loan.status === "approved" ? "text-green-500" : loan.status === "rejected" ? "text-red-500" : "text-yellow-500"}`}>
                    {loan.status}
                  </td>
                  <td className="p-3 flex flex-wrap justify-center space-x-2">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      onClick={() => openDocumentModal(loan.documents)}
                    >
                      View Documents
                    </button>
                    {loan.status === "pending" && (
                      <>
                        <button
                          className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                          onClick={() => handleStatusChange(loan._id, "approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                          onClick={() => handleStatusChange(loan._id, "rejected")}
                        >
                          Reject
                        </button>
                      </>
                    )}
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Viewing Documents */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Loan Documents</h3>
            {selectedDocuments.length > 0 ? (
              <ul className="space-y-2">
                {selectedDocuments.map((doc, index) => (
                  <li key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                    <span>{doc.docType}</span>
                    <a
                      href={`http://localhost:4000/${doc.filePath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No documents available.</p>
            )}
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanRequests;

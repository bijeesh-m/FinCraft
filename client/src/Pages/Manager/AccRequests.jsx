// import React, { useState, useEffect } from "react";
// import axios from "../axiosConfig";
// import { toast } from "react-toastify";

// const RequestsPage = () => {
//   const [requests, setRequests] = useState([]);
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const response = await axios.get("/User/BankAccRequets");
//         if (response.data && Array.isArray(response.data.requests)) {
//           setRequests(response.data.requests);
//         } else {
//           setRequests([]);
//         }
//       } catch (error) {
//         setRequests([]);
//       }
//     };

//     fetchRequests();
//   }, []);

//   const handleApprove = async (requestId) => {
//     try {
//       await axios.put("/Manager/ApproveBankAccnt", { requestId, status: "approved" });
//       toast.success("Request approved successfully");
//       setRequests((prevRequests) =>
//         prevRequests.map((request) =>
//           request._id === requestId ? { ...request, status: "approved" } : request
//         )
//       );
//     } catch (error) {
//       toast.error("Failed to approve request. Please try again.");
//     }
//   };

//   const openModal = (request) => {
//     setSelectedRequest(request);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setSelectedRequest(null);
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="requests-page">
//       <h1 className="text-center">Requests</h1>
//       {requests.length === 0 ? (
//         <p>No requests to display.</p>
//       ) : (
//         <table className=" table  w-1/3 overflow-auto border-collapse border border-gray-300">
//           <thead className="">
//             <tr>
//               <th className="border border-gray-300 px-4 py-2">Request ID</th>
//               <th className="border border-gray-300 px-4 py-2">Name</th>
//               <th className="border border-gray-300 px-4 py-2">Email</th>
//               <th className="border border-gray-300 px-4 py-2">Phone</th>
//               <th className="border border-gray-300 px-4 py-2">Balance</th>
//               <th className="border border-gray-300 px-4 py-2">Status</th>
//               <th className="border border-gray-300 px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requests.map((request) => (
//               <tr key={request._id}>
//                 <td className="border border-gray-300 px-4 py-2">{request._id || "Not Assigned"}</td>
//                 <td className="border border-gray-300 px-4 py-2">{request.firstname} {request.lastname}</td>
//                 <td className="border border-gray-300 px-4 py-2">{request.email}</td>
//                 <td className="border border-gray-300 px-4 py-2">{request.phone}</td>
//                 <td className="border border-gray-300 px-4 py-2">{request.balance}</td>
//                 <td className="border border-gray-300 px-4 py-2">{request.status}</td>
//                 <td className="border border-gray-300 px-4 py-2">
//                   <button onClick={() => openModal(request)} className="bg-yellow-500 text-white px-3 py-1 rounded mx-1">View</button>
//                   {request.status !== "approved" && (
//                     <button onClick={() => handleApprove(request._id)} className="bg-green-500 text-white px-3 py-1 rounded mx-1">Approve</button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {isModalOpen && selectedRequest && (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white rounded shadow-lg w-1/2 p-5">
//             <h2 className="text-xl font-bold mb-4">Request Details</h2>
//             <p><strong>SL No:</strong> {selectedRequest._id || "Not Assigned"}</p>
//             <p><strong>Name:</strong> {selectedRequest.firstname} {selectedRequest.lastname}</p>
//             <p><strong>Email:</strong> {selectedRequest.email}</p>
//             <p><strong>Phone:</strong> {selectedRequest.phone}</p>
//             <p><strong>Balance:</strong> {selectedRequest.balance}</p>
//             <p><strong>Status:</strong> {selectedRequest.status}</p>
//             <p><strong>Address:</strong> {selectedRequest.address}</p>
//             <p><strong>City:</strong> {selectedRequest.city}</p>
//             <p><strong>State:</strong> {selectedRequest.state}</p>
//             <p><strong>Postal Code:</strong> {selectedRequest.postalcode}</p>
//             <p><strong>Date of Birth:</strong> {selectedRequest.dateofbirth}</p>
//             <button onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded mt-4">Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RequestsPage;

import { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import { FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const AccountOpeningRqts = () => {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        axios
            .get("/User/BankAccRequets")
            .then((response) => {
                console.log(response);
                setAccounts(response.data.requests);
            })
            .catch((error) => console.error("Error fetching accounts:", error));
    }, []);

    const handleStatusUpdate = (id, status) => {
        axios
            .put(`/Manager/accounts/${id}`, { status })
            .then((res) => {
                toast(res.data.message)
                setAccounts((prev) => prev.filter((acc) => acc._id !== id));
            })
            .catch((error) => console.error("Error updating status:", error));
    };

    console.log(accounts);

    return (
        <div className="p-4  mx-auto min-h-screen">
            <h2 className="text-2xl font-semibold mb-4">Pending Account Requests</h2>
            {accounts.length > 0 ? (
                <div className="grid gap-4">
                    {accounts.map((acc) => (
                        <div key={acc._id} className="p-4 bg-white  rounded border-gray-500 shadow-inner ring-4 ring-gray-200 shadow-gray-200  border">
                            <div>
                                <p className="text-lg font-medium">
                                    {acc.firstname} {acc.lastname}
                                </p>
                                <p className="text-gray-600">Email: {acc.email}</p>
                                <p className="text-gray-600">Phone: {acc.phone}</p>
                                <p className="text-gray-600">Branch: {acc.branch}</p>
                                <div className="flex gap-4 mt-4">
                                    <button
                                        className="bg-green-100 hover:bg-green-200 text-green-800 font-extrabold px-4 py-2 rounded flex items-center gap-2"
                                        onClick={() => handleStatusUpdate(acc._id, "active")}
                                    >
                                        <FaCheck /> Approve
                                    </button>
                                    <button
                                        className="bg-red-100 hover:bg-red-200 text-red-800 font-extrabold px-4 py-2 rounded flex items-center gap-2"
                                        onClick={() => handleStatusUpdate(acc._id, "rejected")}
                                    >
                                        <FaTimes /> Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No pending requests.</p>
            )}
        </div>
    );
};

export default AccountOpeningRqts;

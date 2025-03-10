import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { toast } from "react-toastify";

const CardRequests = () => {
    const [requests, setRequests] = useState([]);
    const [selectedDocuments, setSelectedDocuments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axiosInstance
            .get("/Manager/card-requests")
            .then((res) => {
                setRequests(res.data.data);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleApproval = async (id, status) => {
        try {
            await axiosInstance.patch(`Manager/card-requests/${id}/${status}`);
            setRequests(requests.filter((req) => req._id !== id));
            toast(`Card request ${status}!`);
        } catch (err) {
            console.error(err);
            toast.error("Error updating status");
        }
    };

    const openDocumentModal = (documents) => {
        setSelectedDocuments(documents);
        setIsModalOpen(true);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-4">Card Approvals</h2>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Customer</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Phone</th>
                            <th className="border p-2">Card Type</th>
                            <th className="border p-2">Documents</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.length > 0 ? (
                            requests.map((req) => (
                                <tr key={req._id} className="hover:bg-gray-50">
                                    <td className="border p-2">{req.fullName}</td>
                                    <td className="border p-2">{req.email}</td>
                                    <td className="border p-2">{req.phone}</td>
                                    <td className="border p-2">{req.cardType}</td>

                                    {/* Document View Button */}
                                    <td className="border p-2 text-center">
                                        {req.documents.length > 0 ? (
                                            <button
                                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                                onClick={() => openDocumentModal(req.documents)}
                                            >
                                                View Documents ({req.documents.length})
                                            </button>
                                        ) : (
                                            "No Documents"
                                        )}
                                    </td>

                                    <td className="border p-2 flex gap-2 justify-center">
                                        <button
                                            onClick={() => handleApproval(req._id, "approve")}
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleApproval(req._id, "reject")}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center p-4">
                                    No pending requests
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal for viewing documents */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-5 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-3">Uploaded Documents</h3>
                        <ul className="space-y-2">
                            {selectedDocuments.map((doc, index) => (
                                <li
                                    key={index}
                                    className="border p-2 rounded bg-gray-100 flex justify-between items-center"
                                >
                                    <span>{doc.name}</span>
                                    <a
                                        href={`http://localhost:4000${doc.url}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        View
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <button
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardRequests;

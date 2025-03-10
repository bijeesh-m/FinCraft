import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FiEye, FiTrash2, FiUserX, FiUserCheck } from "react-icons/fi";
import axios from "../../axiosConfig";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [bankDetails, setBankDetails] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Pagination limit

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/Admin/ViewUsers");
        if (response.data && Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        } else {
          setUsers([]);
        }
      } catch (error) {
        setUsers([]);
        if (error.status === 401) {
          toast.error("Session timeout!");
          window.location.replace("/admin");
        }
      }
    };
    fetchUsers();
  }, []);

  const fetchBankDetails = async (userId) => {
    try {
      const response = await axios.post("/Admin/GetBankAcc", { userId });
      setBankDetails(response.data.bankDetails || null);
    } catch (error) {
      console.error("Error fetching bank details:", error);
      setBankDetails(null);
    }
  };

  const openModal = async (user) => {
    setSelectedUser(user);
    await fetchBankDetails(user._id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setBankDetails(null);
    setIsModalOpen(false);
  };

  const handleBlockUnblock = (userId, isBlocked) => {
    // API call to block/unblock user
    toast.success(isBlocked ? "User unblocked!" : "User blocked!");
  };

  const handleDelete = (userId) => {
    // API call to delete user
    toast.success("User deleted!");
  };

  // Pagination logic
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().startsWith(searchTerm.toLowerCase())
  );
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Manage Users</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by username..."
          className="p-2 border rounded w-full md:w-1/3"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-4 text-left">User ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4">{user._id || "N/A"}</td>
                <td className="py-3 px-4">{user.username}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4 flex gap-2">
                  <button
                    onClick={() => openModal(user)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FiEye size={18} />
                  </button>
                  <button
                    onClick={() => handleBlockUnblock(user._id, user.isBlocked)}
                    className={`${
                      user.isBlocked ? "text-green-500" : "text-yellow-500"
                    } hover:text-gray-700`}
                  >
                    {user.isBlocked ? <FiUserCheck size={18} /> : <FiUserX size={18} />}
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`mx-1 px-3 py-1 border ${
                currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white text-gray-700"
              } rounded`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* User Details Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 md:w-2/3 lg:w-1/2">
            <h2 className="text-xl font-bold">User Details</h2>
            <p><strong>User ID:</strong> {selectedUser._id || "N/A"}</p>
            <p><strong>Name:</strong> {selectedUser.username}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>

            <h3 className="text-lg font-bold mt-4">Bank Account Details</h3>
            {bankDetails ? (
              <>
                <p><strong>Account Number:</strong> {bankDetails.accountnumber}</p>
                <p><strong>Status:</strong> {bankDetails.status}</p>
                <p><strong>Branch:</strong> {bankDetails.branch}</p>
              </>
            ) : (
              <p>No bank account details available.</p>
            )}

            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewUsers;

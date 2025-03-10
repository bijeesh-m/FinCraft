import React, { useState, useEffect } from "react";
import axios from "../../axiosConfig";

function Complaints() {
  const [complaints, setComplaints] = useState([]);

  // Fetch complaints inside useEffect to avoid re-renders
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("/Admin/ViewComplaints");
        setComplaints(response.data.complaints); // Access complaints from the response object
        console.log("stored in State", complaints);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Complaints</h2>
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="py-2 px-4">#</th>
            <th className="py-2 px-4">User Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Complaint Details</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {complaints.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-2 px-4 text-center">
                No complaints found.
              </td>
            </tr>
          ) : (
            complaints.map((complaint, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{complaint.name}</td>
                <td className="py-2 px-4">{complaint.email}</td>
                <td className="py-2 px-4">{complaint.complaint}</td>
                <td className="py-2 px-4 flex gap-4">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Resolve
                  </button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                    Reject
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Complaints;

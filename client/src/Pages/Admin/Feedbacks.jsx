import React, { useState, useEffect } from "react";
import axios from "../../axiosConfig";

function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch feedbacks inside useEffect to avoid re-renders
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("/Admin/ViewFeedbacks");
        setFeedbacks(response.data.feedbacks); // Access feedbacks from the response object
        console.log("stored in State", response.data.feedbacks); // Log the fetched feedbacks
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []); // Empty dependency array means this effect will run only once on mount

  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Feedbacks</h2>
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="py-2 px-4">#</th>
            <th className="py-2 px-4">User Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Feedback</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-2 px-4 text-center">
                No feedback found.
              </td>
            </tr>
          ) : (
            feedbacks.map((feedback, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{feedback.name}</td>
                <td className="py-2 px-4">{feedback.email}</td>
                <td className="py-2 px-4">{feedback.feedback}</td>
                <td className="py-2 px-4 flex gap-4">
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                    Acknowledge
                  </button>
                  <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                    Ignore
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

export default Feedbacks;

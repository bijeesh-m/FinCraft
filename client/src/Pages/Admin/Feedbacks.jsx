import React, { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import axiosInstance from "../../axiosConfig";
import { toast } from "react-toastify";

function Feedbacks() {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get("/Admin/ViewFeedbacks");
                setFeedbacks(response.data.feedbacks);
                console.log("stored in State", response.data.feedbacks);
            } catch (error) {
                console.error("Error fetching feedbacks:", error);
            }
        };

        fetchFeedbacks();
    }, []);

    const handleAknowledge = (id) => {
        axiosInstance
            .post(`/Admin/feedback-status/${id}`)
            .then((res) => {
                toast("feedback aknowledged");
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="mb-10  p-3">
            <h2 className="text-xl font-semibold mb-4">Feedbacks</h2>

            {/* Responsive Table Wrapper */}
            <div className="overflow-x-auto p-2 md:p-5 rounded-sm ">
                <table className="w-full text-sm  bg-white">
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
                                <tr key={index} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} border-b`}>
                                    <td className="py-2 px-4">{index + 1}</td>
                                    <td className="py-2 px-4">{feedback.name}</td>
                                    <td className="py-2 px-4 ">{feedback.email}</td>
                                    <td className="py-2 px-4">{feedback.feedback}</td>
                                    <td className="py-2 px-4 flex flex-wrap gap-2 items-center">
                                        {feedback.isAcknowledge ? (
                                            <p className=" mb-0 bg-green-100 text-green-800 rounded-sm px-3 text-sm py-1">
                                                Aknowledged
                                            </p>
                                        ) : (
                                            <div className=" gap-2 flex">
                                                <button
                                                    onClick={() => handleAknowledge(feedback._id)}
                                                    className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
                                                >
                                                    Acknowledge
                                                </button>
                                                <button className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm">
                                                    Ignore
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Feedbacks;

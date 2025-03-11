import { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig";
import Card from "../../components/User/DebitCard";

const CardDashboard = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await axiosInstance.get("/User/cards"); // Replace with your actual API
                setCards(response.data.cards);
                console.log(response);
            } catch (error) {
                console.error("Error fetching cards:", error);
            }
        };
        fetchCards();
    }, []);

    const handleStatusChange = async (cardId, newStatus) => {
        try {
            await axiosInstance.patch(`/User/cards/${cardId}`, { status: newStatus });
            setCards((prevCards) =>
                prevCards.map((card) => (card._id === cardId ? { ...card, status: newStatus } : card))
            );
        } catch (error) {
            console.error("Error updating card status:", error);
        }
    };

    return (
        <div className=" w-full min-h-screen  p-6">
            <h2 className="text-2xl font-semibold mb-4 text-center">My Cards</h2>
            <div className="flex flex-col gap-4 w-full">
                {cards.length > 0 ? (
                    cards.map((card) => (
                        <div
                            key={card._id}
                            className="p-4 bg-white w-full gap-40   shadow-md rounded-lg border border-gray-200 md:flex  items-center "
                        >
                            <Card card={card} />

                            <div className="bg-white/10 backdrop-blur-md  rounded-2xl p-5  border-gray-200 dark:border-gray-700 transition transform ">
                                <h3 className="text-lg font-semibold text-gray-900 ">{card.cardType} Card</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    •••• •••• •••• {card.cardNumber.slice(-4)}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Expires: {card.expiryDate}</p>

                                <p
                                    className={`text-sm font-medium mt-3 p-1 px-3 w-fit rounded-lg text-white ${
                                        card.status === "Active"
                                            ? "bg-green-500"
                                            : card.status === "Blocked"
                                            ? "bg-red-500"
                                            : "bg-yellow-500"
                                    }`}
                                >
                                    {card.status}
                                </p>

                                <div className="mt-4 flex gap-3">
                                    {card.status !== "Active" && (
                                        <button
                                            onClick={() => handleStatusChange(card._id, "Active")}
                                            className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg shadow-md hover:shadow-lg transition"
                                        >
                                            Activate
                                        </button>
                                    )}
                                    {card.status !== "Blocked" && (
                                        <button
                                            onClick={() => handleStatusChange(card._id, "Blocked")}
                                            className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-red-400 to-red-600 text-white rounded-lg shadow-md hover:shadow-lg transition"
                                        >
                                            Block
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No cards found</p>
                )}
            </div>
        </div>
    );
};

export default CardDashboard;

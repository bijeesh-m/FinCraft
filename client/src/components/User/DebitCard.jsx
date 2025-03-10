// DebitCard.jsx
import React from "react";

const Card = ({ card }) => {
    // Sample card data - you can modify this with props or real data

    return (
        <div className="  w-full md:w-96 md:h-60 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-6 text-white transform transition-all hover:scale-105">
            {/* Bank Name and Chip */}
            <div className="flex justify-between items-center mb-8">
                <div className="text-xl font-bold">finCraft</div>
                <div className="w-12 h-8 bg-yellow-300 rounded-sm opacity-75"></div>
            </div>

            {/* Card Number */}
            <div className="text-2xl tracking-wider font-mono mb-8">{card.cardNumber}</div>

            {/* Card Holder and Expiry */}
            <div className="flex justify-between items-center">
                <div>
                    <div className="text-xs uppercase opacity-75">Card Holder</div>
                    <div className="text-lg font-semibold">{card.customerId.username}</div>
                </div>
                <div>
                    <div className="text-xs uppercase opacity-75">Expires</div>
                    <div className="text-lg font-semibold">{card.expiryDate}</div>
                </div>
            </div>

            {/* Optional: Contactless Symbol */}
            <div className="absolute bottom-4 right-4">
                <svg className="w-6 h-6 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4a8 8 0 018 8m-8-8a8 8 0 00-8 8m8-8v16m-4-4a4 4 0 014-4m0 0a4 4 0 014 4"
                    />
                </svg>
            </div>
        </div>
    );
};

export default Card;

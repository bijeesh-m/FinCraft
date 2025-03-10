import React from "react";
import { Link } from "react-router-dom";

import CardsBg from "../Images/Cards/crd.gif";
import debit from "../Images/Cards/debit.jpg";
import credit from "../Images/Cards/credit.jpg";
import drcrLogo from "../Images/Cards/debit-credit.jpg";

function Cards() {
    return (
        <div className="min-h-screen py-10 bg-cover bg-center" style={{ backgroundImage: `url(${CardsBg})` }}>
            <h2 className="text-center text-xl font-bold mb-4">Cards</h2>
            <img src={drcrLogo} alt="" className="block mx-auto" />
            <h2 className="text-center  font-bold mt-7"> Select Your Card Options</h2>
            <h3 className="text-center text-xl font-bold mb-8 mt-8">
                Select your desired insurance type from the options below to discover the best solutions tailored to
                your financial needs.
            </h3>
            <h3 className="text-center text-xl font-bold mb-8 mt-8">Click to Know More</h3>

            <div className="flex flex-wrap justify-center gap-8 mt-4">
                <Link to="/debitcard">
                    <div className="border w-64 h-80 flex flex-col items-center justify-center p-4 rounded-md hover:shadow-lg transition-shadow">
                        <img
                            src={debit}
                            alt="Gold Insurance"
                            className="w-42 h-32 rounded- transition-transform transform hover:scale-105"
                        />
                        <h2 className="mt-2 mb-4 text-center text-xl font-semibold">Debit Card</h2>
                    </div>
                </Link>
                <Link to="/creditcard">
                    <div className="border w-64 h-80 flex flex-col items-center justify-center p-4 rounded-md hover:shadow-lg transition-shadow">
                        <img
                            src={credit}
                            alt="Gold Insurance"
                            className="w-42 h-32 rounded- transition-transform transform hover:scale-105"
                        />
                        <h2 className="mt-2 mb-4 text-center text-xl font-semibold">Credit Card</h2>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Cards;

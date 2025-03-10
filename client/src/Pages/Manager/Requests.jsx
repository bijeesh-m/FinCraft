import React from "react";
import { Link } from "react-router-dom";

import accountOpeningImg from "../../Images/createaccount.jpg";
import loanRequestImg from "../../Images/Loans/loan.jpg";
import insuranceRequestImg from "../../Images/Insurance/insure.jpg";
import cardRequestImg from "../../Images/Cards/debit.jpg";

function Requests() {
  return (
    <div>
      <h2 className="text-center text-xl font-bold mb-4">Requests</h2>

      {/* Flex container with responsive behavior */}
      <div className="flex flex-wrap justify-center gap-8 mt-4">
        {/* Account Opening Request Card */}
        <Link to="/manager/bankaccountrequests" className="text-black">
          <div className="border w-64 h-80 flex flex-col items-center justify-center p-4 rounded-md hover:shadow-lg transition-shadow">
            <img
              src={accountOpeningImg}
              alt="Account Opening Request"
              className="w-32 h-32 rounded-full transition-transform transform hover:scale-105"
            />
            <h2 className="mt-2 mb-4 text-center text-lg font-semibold">
              Account Opening Requests
            </h2>
          </div>
        </Link>

        {/* Loan Request Card */}
        <Link to="/manager/loan-requests" className="text-black">
          <div className="border w-64 h-80 flex flex-col items-center justify-center p-4 rounded-md hover:shadow-lg transition-shadow">
            <img
              src={loanRequestImg}
              alt="Loan Request"
              className="w-32 h-32 rounded-full transition-transform transform hover:scale-105"
            />
            <h2 className="mt-2 mb-4 text-center text-lg font-semibold">
              Loan Requests
            </h2>
          </div>
        </Link>

        {/* Insurance Request Card */}
        <Link to="/manager/insurance-requests" className="text-black">
          <div className="border w-64 h-80 flex flex-col items-center justify-center p-4 rounded-md hover:shadow-lg transition-shadow">
            <img
              src={insuranceRequestImg}
              alt="Insurance Request"
              className="w-32 h-32 rounded-full transition-transform transform hover:scale-105"
            />
            <h2 className="mt-2 mb-4 text-center text-lg font-semibold">
              Insurance Requests
            </h2>
          </div>
        </Link>

        {/* Card Request Card */}
        <Link to="/manager/card-requests" className="text-black">
          <div className="border w-64 h-80 flex flex-col items-center justify-center p-4 rounded-md hover:shadow-lg transition-shadow">
            <img
              src={cardRequestImg}
              alt="Card Request"
              className="w-32 h-32 rounded-full transition-transform transform hover:scale-105"
            />
            <h2 className="mt-2 mb-4 text-center text-lg font-semibold">
              Card Requests
            </h2>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Requests;

import React from "react";
import { Link } from "react-router-dom"; 
import benefitsImage from "../Images/Cards/crcrd.gif"; 
import payBillsImage from "../Images/Cards/paybill.jpg"; 
import apply from "../Images/Cards/apply.jpg"; 

function CreditCards() {
  return (
    <div className="min-h-screen py-10">
      <div className="block items-center justify-center">
        <h2 className="text-center font-bold mb-4">Credit Cards</h2>

        <img
          src={benefitsImage}
          alt="Credit Card Benefits"
          className="mx-auto h-70 w-80"
        />
        <h4 className="text-center mt-5">
          Welcome to FinCraft's Credit Card section! Our credit cards are
          designed to offer flexible spending, rewards, and secure payment
          options for all your needs.
        </h4>
        <ul className="list-disc pl-5 text-left text-lg mt-5">
          <li className="mb-4 ml-4">
            <h5>1. Rewards and Cash Back</h5>
            Earn points, cash back, or travel rewards with every purchase.
          </li>
          <li className="mb-4 ml-4">
            <h5>2. Build Credit History</h5>
            Regular, responsible use can improve your credit score and open up
            more financial opportunities.
          </li>
          <li className="mb-4 ml-4">
            <h5>3. Purchase Protection</h5>
            Enjoy fraud protection and extended warranties on certain purchases.
          </li>
        </ul>

        <h2 className=" font-bold mb-4 mt-8">
          Eligibility Requirements
        </h2>
        <ul className="list-disc pl-5 text-left text-lg">
          <div className="mb-4">
            <h5 className="mb-2">1. Age Requirement</h5>
            <ul>
              <li className="mb-2">Minimum Age: 18 years.</li>
            </ul>
          </div>
          <div className="mb-4">
            <h5 className="mb-2">2. Income Requirement</h5>
            <ul>
              <li className="mb-2">
                A steady income source is typically required to qualify for a
                credit card.
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h5 className="mb-2">3. Credit History</h5>
            <ul>
              <li className="mb-2">
                A good credit score is preferred, though some cards are
                available for those building or rebuilding credit.
              </li>
            </ul>
          </div>
        </ul>
      </div>

      <div className="flex justify-center mt-8">
        <Link to="/paybills" className="mr-5">
          <div className="border w-64 h-80 flex flex-col items-center justify-center p-4 rounded-md hover:shadow-lg transition-shadow">
            <img
              src={payBillsImage}
              alt="Pay Credit Bills"
              className="w-32 h-32 rounded-full transition-transform transform hover:scale-105"
            />
            <h2 className="mt-2 mb-4 text-center text-lg font-semibold">
              Pay Credit Bills
            </h2>
          </div>
        </Link>
        <Link to="/cardrequest">
          <div className="border w-64 h-80 flex flex-col items-center justify-center p-4 rounded-md hover:shadow-lg transition-shadow">
            <img
              src={apply}
              alt="Apply Online"
              className="w-32 h-32 rounded-full transition-transform transform hover:scale-105"
            />
            <h2 className="mt-2 mb-4 text-center text-lg font-semibold">
              Apply Online
            </h2>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default CreditCards;

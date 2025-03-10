import React from "react";
import { Link } from "react-router-dom";
import DepositBG from "../Images/Deposits/invstgif.gif";
import Deposit from "../Images/Deposits/deposit.jpg";
import FD from "../Images/Deposits/cash save.jpg";
import RD from "../Images/Deposits/RD.jpg";
import MD from "../Images/Deposits/MD.jpg";
import Tax from "../Images/Deposits/tax.jpg";

function Deposits() {
  return (
    <div
      className="min-h-screen bg-cover py-5 bg-center"
      style={{ backgroundImage: `url(${DepositBG})` }}
    >
      {/* <h2 className="text-center text-xl font-bold mb-4">DEPOSITS</h2> */}
      {/* <img src={Deposit} alt="" className="block mx-auto " /> */}
      <h2 className="text-center font-bold mt-7">
        Explore Your Deposit Options
      </h2>
      <h3 className="text-center text-xl font-bold mb-8 mt-8">
        Please select your preferred deposit type from the options below to
        discover the ideal solution for your financial needs.
      </h3>
      <h3 className="text-center text-xl font-bold mb-8 mt-8">
        Click to Apply
      </h3>

      {/* Flex container with responsive behavior */}
      <div className="flex flex-wrap justify-center gap-8 mt-4 ">
        {/* Personal Deposit Card */}
        <Link to="/depositreq" className="text-black" >
          <div className="border w-64 h-80 flex flex-col items-center justify-center p-4 rounded-md hover:shadow-lg transition-shadow">
            <img
              src={FD}
              alt="Personal Deposit"
              className="w-32 h-32 rounded-full transition-transform transform hover:scale-105"
            />
            <h2 className="mt-2 mb-4 text-center text-lg font-semibold">
              Fixed Deposit
            </h2>
            <ul className="list-disc pl-5 text-left text-sm">
              <li>Invest a one-time amount for a fixed tenure.</li>
              <li>
                Interest rates generally range from 5% to 8% per annum,
                depending on the tenure.
              </li>
            </ul>
          </div>
        </Link>

        {/* Gold Deposit Card */}
        <Link to="/depositreq" className="text-black" >
          <div className="border w-64 h-80 flex flex-col items-center justify-center p-4 rounded-md hover:shadow-lg transition-shadow">
            <img
              src={RD}
              alt="Gold Deposit"
              className="w-32 h-32 rounded-full transition-transform transform hover:scale-105"
            />
            <h2 className="mt-2 mb-4 text-center text-lg font-semibold">
              Recurring Deposit
            </h2>
            <ul className="list-disc pl-5 text-left text-sm">
              <li>Invest a fixed amount monthly to build savings over time.</li>
              <li>
                Earn interest at rates averaging around 5% to 7% per annum.
              </li>
            </ul>
          </div>
        </Link>

        {/* Car Deposit Card */}
        <Link to="/depositreq" className="text-black" >
          <div className="border w-64 h-80 flex flex-col items-center justify-center p-4 rounded-md hover:shadow-lg transition-shadow">
            <img
              src={MD}
              alt="Car Deposit"
              className="w-32 h-32 rounded-full transition-transform transform hover:scale-105"
            />
            <h2 className="mt-2 mb-4 text-center text-lg font-semibold">
              Millionaire Deposit
            </h2>
            <ul className="list-disc pl-5 text-left text-sm">
              <li>
                Tailored for individuals aiming to build significant wealth over
                time.
              </li>
              <li>Average interest rates around 6% to 9% per annum.</li>
            </ul>
          </div>
        </Link>

        {/* House Deposit Card */}
        <Link to="/depositreq" className="text-black" >
          <div className="border w-64 h-80 flex flex-col items-center justify-center p-4 rounded-md hover:shadow-lg transition-shadow">
            <img
              src={Tax}
              alt="House Deposit"
              className="w-32 h-32 rounded-full transition-transform transform hover:scale-105"
            />
            <h2 className="mt-2 mb-4 text-center text-lg font-semibold">
              Tax Saving Deposit
            </h2>
            <ul className="list-disc pl-5 text-left text-sm">
              <li>
                Eligible for deductions under Section 80C of the Income Tax Act,
                up to ₹1.5 lakh.
              </li>
              <li>
                Interest rates range from 5% to 7% per annum, offering
                guaranteed returns.
              </li>
            </ul>
          </div>
        </Link>
        {/* <Link to="/depositreq" className="text-black" >
          <div className="border w-64 h-80 flex flex-col items-center justify-center p-4 rounded-md hover:shadow-lg transition-shadow">
            <img
              src={Tax}
              alt="House Deposit"
              className="w-32 h-32 rounded-full transition-transform transform hover:scale-105"
            />
            <h2 className="mt-2 mb-4 text-center text-lg font-semibold">
             Withdrawals
            </h2>
            <ul className="list-disc pl-5 text-left text-sm">
              <li>
                Eligible for deductions under Section 80C of the Income Tax Act,
                up to ₹1.5 lakh.
              </li>
              <li>
                Interest rates range from 5% to 7% per annum, offering
                guaranteed returns.
              </li>
            </ul>
          </div>
        </Link> */}
      </div>
    </div>
  );
}

export default Deposits;

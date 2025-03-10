import React from "react";
import { Link } from "react-router-dom";

import loanBG from "../Images/Loans/loanBGG.gif";
import loan2 from "../Images/Loans/loan5.jpg";
import prsnlloan from "../Images/Loans/prsnlloan.jpg";
import goldloan from "../Images/Loans/goldloan.jpg";
import carloan from "../Images/Loans/carloan.avif";
import houseloan from "../Images/Loans/houseloan.jpg";
import educationloan from "../Images/Loans/eduloan.jpg";

function Loan() {
  return (
    // <div   className="min-h-screen bg-cover bg-center"
    // style={{ backgroundImage: `url(${loanBG})` }} >
    <div>
      <h2 className="text-center text-xl font-bold mb-4">Loans</h2>
      <img src={loan2} alt="" className="block mx-auto" />
      <h2 className="text-center  font-bold mt-7">
        {" "}
        Explore Your Loan Options
      </h2>
      <h3 className="text-center text-xl font-bold mb-8 mt-8">
        Select your desired loan type from the options below to find the best
        solution for your financial needs.
      </h3>
      <h3 className="text-center text-xl font-bold mb-8 mt-8">
        Click to Know More
      </h3>

      {/* Flex container with responsive behavior */}
      <div className="flex flex-wrap justify-center gap-8 mt-4">
        {/* Personal Loan Card */}
        <Link to="/personalloan" className="text-black">
          <div className="border w-64 h-80 flex flex-col items-center justify-center p-4 rounded-md hover:shadow-lg transition-shadow">
            <img
              src={prsnlloan}
              alt="Personal Loan"
              className="w-32 h-32 rounded-full transition-transform transform hover:scale-105"
            />
            <h2 className="mt-2 mb-4 text-center text-lg font-semibold">
              Personal Loan
            </h2>
            <ul className="list-disc pl-5 text-left text-sm">
              <li>
                Covers personal expenses like debt consolidation, home projects,
                or medical bills.
              </li>
              <li>Borrow $1,000 to $50,000, depending on credit.</li>
            </ul>
          </div>
        </Link>

        {/* Gold Loan Card */}
        <Link to="/goldloan" className="text-black">
          <div className="border w-64 h-80 flex flex-col items-center justify-center p-4 rounded-md hover:shadow-lg transition-shadow">
            <img
              src={goldloan}
              alt="Gold Loan"
              className="w-32 h-32 rounded-full transition-transform transform hover:scale-105"
            />
            <h2 className="mt-2 mb-4 text-center text-lg font-semibold">
              Gold Loan
            </h2>
            <ul className="list-disc pl-5 text-left text-sm">
              <li>Secured loan using gold jewelry or coins as collateral.</li>
              <li>Borrow up to 75-90% of the gold's market value.</li>
            </ul>
          </div>
        </Link>

        {/* Car Loan Card */}
        <Link to="/carloan" className="text-black">
          <div className="border w-64 h-80 flex flex-col items-center justify-center p-4 rounded-md hover:shadow-lg transition-shadow">
            <img
              src={carloan}
              alt="Car Loan"
              className="w-32 h-32 rounded-full transition-transform transform hover:scale-105"
            />
            <h2 className="mt-2 mb-4 text-center text-lg font-semibold">
              Car Loan
            </h2>
            <ul className="list-disc pl-5 text-left text-sm">
              <li>Financing the purchase of a new or used vehicle.</li>
              <li>Typically ranges from $5,000 to $100,000 or more.</li>
            </ul>
          </div>
        </Link>

        {/* House Loan Card */}
        <Link to="/houseloan" className="text-black">
          <div className="border w-64 h-80 flex flex-col items-center justify-center p-4 rounded-md hover:shadow-lg transition-shadow">
            <img
              src={houseloan}
              alt="House Loan"
              className="w-32 h-32 rounded-full transition-transform transform hover:scale-105"
            />
            <h2 className="mt-2 mb-4 text-center text-lg font-semibold">
              House Loan
            </h2>
            <ul className="list-disc pl-5 text-left text-sm">
              <li>Financing the purchase of a home or property.</li>
              <li>
                Usually ranges from $50,000 to several million dollars, based on
                property value.
              </li>
            </ul>
          </div>
        </Link>

        {/* Educational Loan Card */}
        <Link to="/educationloan" className="text-black">
          <div className="border w-64 h-80 flex flex-col items-center justify-center p-4 rounded-md hover:shadow-lg transition-shadow">
            <img
              src={educationloan}
              alt="Educational Loan"
              className="w-32 h-32 rounded-full transition-transform transform hover:scale-105"
            />
            <h2 className="mt-2 mb-4 text-center text-lg font-semibold">
              Educational Loan
            </h2>
            <ul className="list-disc pl-5 text-left text-sm">
              <li>
                Funding higher education expenses, including tuition, books, and
                living costs.
              </li>
              <li>
                Usually $1,000 to $100,000 or more, depending on the institution
                and program.
              </li>
            </ul>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Loan;

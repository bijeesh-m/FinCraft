import React from "react";
import image1 from "../Images/Loans/img1.jpg";
import { Link } from "react-router-dom";
import docs from "../Images/Accounts/docs.gif";
import apply from "../Images/Loans/apply.jpg";

function PrsnlLoan() {
  return (
    <div className=" min-h-screen py-10">
      <div className="block items-center justify-center">
        <h2 className="text-center font-bold mb-4">Personal Loan</h2>
        <img src={image1} alt="Personal Loan" className="mx-auto h-70 w-80" />
        <ul className="list-disc pl-5 text-left text-lg mt-5">
          <li className="mb-4 ml-4">
            <h4>Loan Amount</h4>
            Typically ranges from a few hundred to tens of thousands of dollars,
            depending on the lender and the borrower’s credit profile
          </li>
          <li className="mb-4 ml-4">
            <h4>Repayment Period</h4>
            Generally ranges from one to seven years. A longer term means lower
            monthly payments but more interest over time.
          </li>
          <li className="mb-4 ml-4">
            <h4>Interest Rates</h4>
            Fixed or variable rates, often determined by credit score, loan
            amount, and loan term. Fixed rates mean the payment remains the same
            throughout, while variable rates might change.
          </li>
          <h2 className="mb-4">Eligibility Requirements</h2>
          <div className="mb-4">
            <h5 className="mb-2">1.Credit Score</h5>
            <ul>
              <li className="mb-2">
                Lenders often prefer applicants with good to excellent credit,
                though some loans cater to those with lower scores.
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h5 className="mb-2">2.Income</h5>
            <ul>
              <li className="mb-2">
                Verifiable income is typically required to ensure you can make
                regular payments.
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h5 className="mb-2">3.Debt-to-Income Ratio</h5>
            <ul>
              <li className="mb-2">
                Lenders assess your existing debt obligations relative to your
                income to determine affordability.
              </li>
            </ul>
          </div>
        </ul>
      </div>
      <div className="flex justify-center">
        {/* <Link to="/docsneeded" className="mr-5">
          <div className="border w-64 h-80 flex flex-col items-center justify-center p-4 rounded-md hover:shadow-lg transition-shadow">
            <img
              src={docs}
              alt="Personal Loan"
              className="w-32 h-32 rounded-full transition-transform transform hover:scale-105"
            />
            <h2 className="mt-2 mb-4 text-center text-lg font-semibold">
              Documents Needed
            </h2>
          </div>
        </Link> */}
        <Link to="/loanreq">
          <div className="border w-64 h-80 flex flex-col items-center justify-center p-4 rounded-md hover:shadow-lg transition-shadow">
            <img
              src={apply}
              alt="Personal Loan"
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

export default PrsnlLoan;

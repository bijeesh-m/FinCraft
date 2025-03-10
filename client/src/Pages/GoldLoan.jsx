import React from "react";
import image1 from "../Images/Loans/gl.jpg";
import { Link } from "react-router-dom";
import docs from "../Images/Accounts/docs.gif";
import apply from "../Images/Loans/apply.jpg";

function GoldLoan() {
  return (
    <div>
      <div className="block items-center justify-center">
        <h2 className="text-center font-bold mb-4">Gold Loan</h2>
        <img src={image1} alt="Personal Loan" className="mx-auto h-70 w-80" />
        <ul className="list-disc pl-5 text-left text-lg mt-5">
          <li className="mb-4 ml-4">
            <h4>Loan Amount</h4>
            Based on the value and purity of the pledged gold. Most lenders
            offer a loan-to-value (LTV) ratio of 75-90% of the gold’s current
            market value.
          </li>
          <li className="mb-4 ml-4">
            <h4>Repayment Tenure</h4>
            Flexible, often ranging from a few months to a few years. Many
            lenders offer short-term gold loans, making them suitable for
            temporary financial needs.
          </li>
          <li className="mb-4 ml-4">
            <h4>Interest Rates</h4>
            Typically lower than unsecured loans since the gold collateral
            reduces risk for the lender. Rates vary, but they’re generally lower
            than personal loans.
          </li>
          <h2 className="mb-4">Eligibility Requirements</h2>
          <div className="mb-4">
            <h5 className="mb-2">1. Age Requirement</h5>
            <ul>
              <li className="mb-2">
                Minimum Age: 18 years (in some cases, 21 years).
              </li>
              <li className="mb-2">
                Maximum Age: Generally up to 65 or 70 years, depending on the
                lender.
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h5 className="mb-2"> 2.Gold Purity and Type</h5>
            <ul>
              <li className="mb-2">
                Gold Purity: Most lenders require gold of at least 18 carats or
                higher, with better loan amounts for 22-24 carat gold.
              </li>
              <li className="mb-2">
                Accepted Gold: Typically, gold jewelry and ornaments are
                accepted, while some lenders may accept gold coins up to a
                certain weight (e.g., 50 grams).
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h5 className="mb-2">3.Nationality</h5>
            <ul>
              <li className="mb-2">
                Indian Resident: Most gold loans are offered to Indian residents
                only.
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h5 className="mb-2">3.Gold Ownership</h5>
            <ul>
              <li className="mb-2">
                Self-owned Gold: The gold pledged as collateral should be owned
                by the borrower. Some lenders may allow family-owned gold (e.g.,
                from immediate family members), but this varies by institution.
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

export default GoldLoan;

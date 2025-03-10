import React from "react";
import image1 from "../Images/Loans/eduln.jpg"; 
import { Link } from "react-router-dom";
import docs from "../Images/Accounts/docs.gif";
import apply from "../Images/Loans/apply.jpg";

function EducationLoan() {
  return (
    <div>
      <div className="block items-center justify-center">
        <h2 className="text-center font-bold mb-4">Education Loan</h2>

        <img src={image1} alt="Education Loan" className="mx-auto h-70 w-80" />
        <h4 className="text-center mt-5">
          Welcome to UnityPoint’s Education Loan section! We are committed to
          helping you turn your educational aspirations into reality. Our
          education loan products are designed to support students at various
          levels, whether you’re pursuing undergraduate, graduate, or
          professional studies.
        </h4>
        <ul className="list-disc pl-5 text-left text-lg mt-5">
          <li className="mb-4 ml-4">
            <h5>Loan Amount</h5>
            Avail up to 100% financing for tuition, books, and living expenses,
            subject to the total cost of education.
          </li>
          <li className="mb-4 ml-4">
            <h5>Repayment Tenure</h5>
            Choose a repayment tenure ranging from 5 to 15 years, with a grace
            period that allows you to start repayments after graduation.
          </li>
          <li className="mb-4 ml-4">
            <h5>Interest Rates</h5>
            Enjoy attractive interest rates with both fixed and floating options
            to suit your repayment preference.
          </li>
          <li className="mb-4 ml-4">
            <h5>Down Payment</h5>
            Typically, no down payment is required, making it easier for you to
            secure financing for your education.
          </li>
          <h2 className="mb-4">Eligibility Requirements</h2>
          <div className="mb-4">
            <h5 className="mb-2">1. Age Requirement</h5>
            <ul>
              <li className="mb-2">Minimum Age: 18 years.</li>
              <li className="mb-2">
                Maximum Age: Generally up to 35 years for postgraduate studies.
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h5 className="mb-2">2. Educational Qualification</h5>
            <ul>
              <li className="mb-2">
                Applicants must have secured admission to a recognized
                institution or course of study.
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h5 className="mb-2">3. Income Requirement</h5>
            <ul>
              <li className="mb-2">
                Co-applicants may be required to provide proof of income,
                typically starting from $30,000 annually.
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h5 className="mb-2">4. Credit Score</h5>
            <ul>
              <li className="mb-2">
                A good credit score is preferred, but we consider applicants
                with a co-signer who has a strong credit history.
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h5 className="mb-2">5. Loan Processing Fee</h5>
            <ul>
              <li className="mb-2">
                A nominal processing fee may be applicable, usually around 1-2%
                of the loan amount.
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
              alt="Documents Needed"
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

export default EducationLoan;

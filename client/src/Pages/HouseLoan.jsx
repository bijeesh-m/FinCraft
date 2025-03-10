import React from "react";
import image1 from "../Images/Loans/hmln.jpg";
import { Link } from "react-router-dom";
import docs from "../Images/Accounts/docs.gif";
import apply from "../Images/Loans/apply.jpg";

function HouseLoan() {
  return (
    <div>
      <div className="block items-center justify-center">
        <h2 className="text-center font-bold mb-4">House Loan</h2>

        <img src={image1} alt="Personal Loan" className="mx-auto h-70 w-80" />
        <h4 className="text-center mt-5">
          {" "}
          Welcome to UnityPoint’s Home Loan section! We are committed to helping
          you turn your dream of homeownership into reality. Our home loan
          products are designed to suit various needs, whether you’re buying
          your first home, constructing a new property, or renovating your
          existing home.
        </h4>
        <ul className="list-disc pl-5 text-left text-lg mt-5">
          <li className="mb-4 ml-4">
            <h5>Loan Amount</h5>
            Avail up to 90% of your property’s value with flexible options
            tailored to your financial profile.
          </li>
          <li className="mb-4 ml-4">
            <h5>Repayment Tenure</h5>
            Choose a repayment tenure ranging from 10 to 30 years, allowing for
            manageable monthly payments.
          </li>
          <li className="mb-4 ml-4">
            <h5>Interest Rates</h5>
            Enjoy attractive interest rates with both fixed and floating options
            to suit your repayment preference.
          </li>
          <li className="mb-4 ml-4">
            <h5>Down Payment</h5>A down payment of only 10-25% of the property
            value is typically required, depending on the loan amount and
            property type.
          </li>
          <h2 className="mb-4">Eligibility Requirements</h2>
          <div className="mb-4">
            <h5 className="mb-2">1.Age Requirement</h5>
            <ul>
              <li className="mb-2">
                Minimum Age: 18 years (in some cases, 21 years).
              </li>
              <li className="mb-2">
                Maximum Age: Usually up to 60-70 years for salaried applicants,
                and up to 65-70 for self-employed applicants.
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h5 className="mb-2"> 2.Employment Status</h5>
            <ul>
              <li className="mb-2">
                Salaried Individuals: Minimum of one year of stable employment.
              </li>
              <li className="mb-2">
                Self-Employed Individuals: Must demonstrate consistent income
                with a minimum of three years in business.
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h5 className="mb-2">3.Income Requirement</h5>
            <ul>
              <li className="mb-2">
                Minimum monthly income varies by loan amount, typically starting
                from $2,000.
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h5 className="mb-2">4.Credit Score</h5>
            <ul>
              <li className="mb-2">
                Preferred score: 650 or higher for better interest rates.
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h5 className="mb-2">4.Property Requirements</h5>
            <ul>
              <li className="mb-2">
                The property must have clear titles and legal approvals. We
                conduct thorough checks to ensure compliance.
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

export default HouseLoan;

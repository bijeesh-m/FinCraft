import React from "react";
import lifeImage from "../../Images/Insurance/lifeinsur.jpg";
import { Link } from "react-router-dom";
import docs from "../../Images/Accounts/docs.gif";
import apply from "../../Images/Insurance/apply.jpg";

function LifeInsurance() {
  return (
    <div className="block items-center min-h-screen py-5 justify-center">
      <h2 className="text-center font-bold mb-4">Life Insurance</h2>

      <img src={lifeImage} alt="Life Insurance" className="mx-auto h-70 w-80" />
      <h4 className="text-center mt-5">
        Protect your family's future with FinCraft’s Life Insurance policies.
        Our life insurance plans offer financial security and peace of mind,
        ensuring your loved ones are safeguarded even in your absence.
      </h4>
      <ul className="list-disc pl-5 text-left text-lg mt-5">
        <li className="mb-4 ml-4">
          <h5>Coverage Amount</h5>
          Get substantial coverage for life insurance to secure your family’s
          financial needs.
        </li>
        <li className="mb-4 ml-4">
          <h5>Flexible Term Options</h5>
          Choose from a range of terms to suit your financial plans, including
          whole life, term life, and endowment options.
        </li>
        <li className="mb-4 ml-4">
          <h5>Premium Benefits</h5>
          Avail of premium benefits such as tax savings and flexible payment
          schedules.
        </li>
        <li className="mb-4 ml-4">
          <h5>Loan Facility</h5>
          Borrow against your policy in case of emergencies, subject to policy
          terms.
        </li>
      </ul>

      <div className="flex justify-center mt-5">
        {/* <Link to="/docsneeded" className="mr-5">
          <div className="border w-64 h-80 flex flex-col items-center justify-center p-4 rounded-md hover:shadow-lg transition-shadow">
            <img src={docs} alt="Documents Needed" className="w-32 h-32 rounded-full transition-transform transform hover:scale-105" />
            <h2 className="mt-2 mb-4 text-center text-lg font-semibold">Documents Needed</h2>
          </div>
        </Link> */}
        <Link to="/insurancereq" className="text-black">
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

export default LifeInsurance;

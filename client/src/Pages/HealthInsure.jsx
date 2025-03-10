import React from "react";
import image1 from "../Images/Insurance/hlthinsur.jpg";
import { Link } from "react-router-dom";
import docs from "../Images/Accounts/docs.gif";
import apply from "../Images/Insurance/apply.jpg";

function HealthInsurance() {
  return (
    <div>
      <div className="block items-center justify-center">
        <h2 className="text-center font-bold mb-4">Health Insurance</h2>

        <img src={image1} alt="Health Insurance" className="mx-auto h-70 w-80" />
        <h4 className="text-center mt-5">
          Welcome to UnityPoint’s Health Insurance section! We are dedicated to helping
          you protect your health and finances. Our health insurance plans provide coverage
          for a wide range of medical expenses, ensuring peace of mind and financial security.
        </h4>
        <ul className="list-disc pl-5 text-left text-lg mt-5">
          <li className="mb-4 ml-4">
            <h5>Coverage Amount</h5>
            Get coverage for hospitalization, doctor visits, prescription medications,
            and other medical expenses, tailored to your needs.
          </li>
          <li className="mb-4 ml-4">
            <h5>Flexible Premium Options</h5>
            Choose a plan with premiums that suit your budget, offering flexibility for
            individuals and families.
          </li>
          <li className="mb-4 ml-4">
            <h5>Network Hospitals</h5>
            Access a vast network of hospitals and clinics for cashless treatment
            and convenient healthcare services.
          </li>
          <li className="mb-4 ml-4">
            <h5>No-Claim Bonus</h5>
            Enjoy premium discounts or increased coverage for each claim-free year,
            rewarding you for staying healthy.
          </li>
          <h2 className="mb-4">Eligibility Requirements</h2>
          <div className="mb-4">
            <h5 className="mb-2">1. Age Requirement</h5>
            <ul>
              <li className="mb-2">
                Entry age typically ranges from 18 to 65 years, with coverage options
                available for children and senior citizens.
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h5 className="mb-2">2. Pre-Existing Conditions</h5>
            <ul>
              <li className="mb-2">
                Coverage for pre-existing conditions may be subject to a waiting period,
                depending on the policy terms.
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h5 className="mb-2">3. Medical History</h5>
            <ul>
              <li className="mb-2">
                Applicants may need to disclose their medical history and undergo health
                assessments based on the chosen plan.
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h5 className="mb-2">4. Income Proof</h5>
            <ul>
              <li className="mb-2">
                Proof of income may be required to determine premium affordability and eligibility.
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
        <Link  to="/insurancereq" className="text-black">
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

export default HealthInsurance;

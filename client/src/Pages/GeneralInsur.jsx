import React from "react";
import generalImage from "../Images/Insurance/geninsur.jpg";
import { Link } from "react-router-dom";
import docs from "../Images/Accounts/docs.gif";
import apply from "../Images/Insurance/apply.jpg";

function GeneralInsurance() {
  return (
    <div className="block items-center justify-center">
      <h2 className="text-center font-bold mb-4">General Insurance</h2>

      <img
        src={generalImage}
        alt="General Insurance"
        className="mx-auto h-70 w-80"
      />
      <h4 className="text-center mt-5">
        UnityPoint’s General Insurance offers coverage for various aspects of
        daily life, including auto, home, and travel insurance, helping you
        protect what matters most.
      </h4>
      <ul className="list-disc pl-5 text-left text-lg mt-5">
        <li className="mb-4 ml-4">
          <h5>Home Insurance</h5>
          Protect your home and belongings against natural disasters, theft, and
          accidents.
        </li>
        <li className="mb-4 ml-4">
          <h5>Auto Insurance</h5>
          Comprehensive coverage for vehicle damage, theft, and third-party
          liability.
        </li>
        <li className="mb-4 ml-4">
          <h5>Travel Insurance</h5>
          Stay secure while traveling with coverage for trip cancellations,
          medical expenses, and lost baggage.
        </li>
        <li className="mb-4 ml-4">
          <h5>Personal Accident Coverage</h5>
          Protect yourself against accidental injury and disability.
        </li>
      </ul>

      <div className="flex justify-center mt-5">
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

export default GeneralInsurance;

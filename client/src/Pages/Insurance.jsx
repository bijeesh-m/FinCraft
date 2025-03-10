import React from "react";
import { Link } from "react-router-dom";

import insurance from "../Images/Insurance/insurance2.jpg";
import geninsurance from "../Images/Insurance/generalinsurance.jpg";
import lifeinsurance from "../Images/Insurance/lifeinsurance.jpg";
import hlthinsurance from "../Images/Insurance/healthinsurance.jpg";
import onlinetrd from "../Images/Insurance/onlinetrade.jpg";

function Insurance() {
  return (
    <div className=" min-h-screen py-5">
      <h2 className="text-center text-xl font-bold mb-4">Insurances</h2>
      <img src={insurance} alt="" className="block mx-auto" />
      <h2 className="text-center  font-bold mt-7">
        {" "}
        Explore Your Insurance Options
      </h2>
      <h3 className="text-center text-xl font-bold mb-8 mt-8">
        Select your desired insurance type from the options below to discover
        the best solutions tailored to your financial needs.
      </h3>
      <h3 className="text-center text-xl font-bold mb-8 mt-8">
        Click to Know More
      </h3>

      <div className="flex flex-wrap justify-center gap-8 mt-4">
        <Link to="/lifeInsurance" className="text-black">
          <div className="border w-64 h-80 flex flex-col items-center justify-center p-4 rounded-md hover:shadow-lg transition-shadow">
            <img
              src={lifeinsurance}
              alt="Gold Insurance"
              className="w-32 h-32 rounded-full transition-transform transform hover:scale-105"
            />
            <h2 className="mt-2 mb-4 text-center text-lg font-semibold">
              Life Insurance
            </h2>
            <ul className="list-disc pl-5 text-left text-sm">
              <li>
                {" "}
                Provides financial security to beneficiaries upon the
                policyholder's death.
              </li>
              <li>
                $20 - $50 per month for a $500,000 policy (for a healthy
                30-year-old).
              </li>
            </ul>
          </div>
        </Link>

        <Link to="/healthInsurance" className="text-black">
          <div className="border w-64 h-80 flex flex-col items-center justify-center p-4 rounded-md hover:shadow-lg transition-shadow">
            <img
              src={hlthinsurance}
              alt="Car Insurance"
              className="w-32 h-32 rounded-full transition-transform transform hover:scale-105"
            />
            <h2 className="mt-2 mb-4 text-center text-lg font-semibold">
              Health Insurance
            </h2>
            <ul className="list-disc pl-5 text-left text-black text-sm">
              <li>
                {" "}
                Covers medical expenses for illness, injury, or preventive care.
              </li>
              <li>
                $300 - $700 per month, depending on coverage levels and
                deductibles.
              </li>
            </ul>
          </div>
        </Link>

        <Link to="/generalInsurance" className="text-black">
          <div className="border w-64 h-80 flex flex-col items-center justify-center p-4 rounded-md hover:shadow-lg transition-shadow">
            <img
              src={geninsurance}
              alt="House Insurance"
              className="w-32 h-32 rounded-full transition-transform transform hover:scale-105"
            />
            <h2 className="mt-2 mb-4 text-center text-lg font-semibold">
              General Insurance
            </h2>
            <ul className="list-disc pl-5 text-left text-sm">
              <li>Protects against financial losses from various risks</li>
              <li>$1,000 - $2,500 per year for full coverage.</li>
            </ul>
          </div>
        </Link>

        {/* <Link to="/onlinetrading">
          <div className="border w-64 h-80 flex flex-col items-center justify-center p-4 rounded-md hover:shadow-lg transition-shadow">
            <img
              src={onlinetrd}
              alt="Educational Insurance"
              className="w-32 h-32 rounded-full transition-transform transform hover:scale-105"
            />
            <h2 className="mt-2 mb-4 text-center text-lg font-semibold">
              Online Trading
            </h2>
            <ul className="list-disc pl-5 text-left text-sm">
              <li>
                Buying and selling financial instruments through internet-based
                platforms.
              </li>
              <li>
                $0 - $10 per trade on most platforms; many offer commission-free
                trading.
              </li>
            </ul>
          </div>
        </Link> */}
      </div>
    </div>
  );
}

export default Insurance;

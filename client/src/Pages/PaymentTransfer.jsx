import React from "react";
import { Link } from "react-router-dom";
import P from "../Images/P.jpg";
import billPaymentImg from "../Images/billP.jpg";
import taxPaymentImg from "../Images/taxP.jpg";
import bankTransferImg from "../Images/bankT.jpg";
import loanPayment from "../Images/loanP.jpg";

function PaymentTransfer() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-center text-2xl font-bold mb-4">
        Payments & Transfers
      </h2>
      <img src={P} alt="Payments Banner" className="block mx-auto mb-6" />

      <h2 className="text-center font-bold mt-7">
        Explore Your Payment & Transfer Options
      </h2>
      <h3 className="text-center text-lg font-semibold mb-8 mt-4">
        Select your desired payment or transfer type from the options below to
        manage your finances effectively.
      </h3>
      <h3 className="text-center text-lg font-semibold mb-8 mt-4">
        Click to Know More
      </h3>

      {/* Flex container with responsive behavior */}
      <div className="flex flex-wrap justify-center gap-8 mt-4">
        {/* Bill Payment Card */}
        <Link to="/billpayment" className="text-black">
          <div className="border w-64 h-80 flex flex-col items-center justify-center p-4 rounded-md hover:shadow-lg transition-shadow">
            <img
              src={billPaymentImg}
              alt="Bill Payment"
              className="w-32 h-32 rounded-full transition-transform transform hover:scale-105"
            />
            <h2 className="mt-2 mb-4 text-center text-lg font-semibold">
              Bill Payment
            </h2>
            <ul className="list-disc pl-5 text-left text-sm">
              <li>Pay utility bills like electricity, water, and internet.</li>
              <li>Manage multiple billers from one platform.</li>
            </ul>
          </div>
        </Link>

        {/* Tax Payment Card */}
        <Link to="/taxpayment" className="text-black">
          <div className="border w-64 h-80 flex flex-col items-center justify-center p-4 rounded-md hover:shadow-lg transition-shadow">
            <img
              src={taxPaymentImg}
              alt="Tax Payment"
              className="w-32 h-32 rounded-full transition-transform transform hover:scale-105"
            />
            <h2 className="mt-2 mb-4 text-center text-lg font-semibold">
              Tax Payment
            </h2>
            <ul className="list-disc pl-5 text-left text-sm">
              <li>Pay your federal, state, and local taxes securely.</li>
              <li>Schedule payments to avoid late fees.</li>
            </ul>
          </div>
        </Link>

        {/* Loan Payment Card */}
        <Link to="/pay-loan" className="text-black">
          <div className="border w-64 h-80 flex flex-col items-center justify-center p-4 rounded-md hover:shadow-lg transition-shadow">
            <img
              src={loanPayment}
              alt="Loan Payment"
              className="w-32 h-32 rounded-full transition-transform transform hover:scale-105"
            />
            <h2 className="mt-2 mb-4 text-center text-lg font-semibold">
              Loan Payment
            </h2>
            <ul className="list-disc pl-5 text-left text-sm">
              <li>Manage payments for personal, auto, and home loans.</li>
              <li>Track your loan balance and payment history.</li>
            </ul>
          </div>
        </Link>

        {/* Bank Transfer Card */}
        <Link to="/transfer" className="text-black">
          <div className="border w-64 h-80 flex flex-col items-center justify-center p-4 rounded-md hover:shadow-lg transition-shadow">
            <img
              src={bankTransferImg}
              alt="Bank Transfer"
              className="w-32 h-32 rounded-full transition-transform transform hover:scale-105"
            />
            <h2 className="mt-2 mb-4 text-center text-lg font-semibold">
              Bank Transfer
            </h2>
            <ul className="list-disc pl-5 text-left text-sm">
              <li>Transfer funds between your accounts or to others.</li>
              <li>
                Use internal or external transfer options for flexibility.
              </li>
            </ul>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default PaymentTransfer;

import React from 'react'
import { Link } from 'react-router-dom' 

import debitBG from "../Images/Cards/debitBG.gif" 
import debit from "../Images/Cards/debitgif.gif" 
import docs from "../Images/Cards/docs.gif" 
import apply from "../Images/Cards/apply.jpg" 
import eligibilityImage from "../Images/Cards/debitgif.gif" 

function DebitCards() {
  return (
    <div className=' py-5 px-5' >
      <div className="block items-center justify-center">
        <h2 className="text-center font-bold mb-4">Debit Card </h2>

        <img src={debit} alt="Debit Card Benefits" className="mx-auto h-70 w-80" />
        <h4 className="text-center mt-5">
          Welcome to UnityPoint’s Debit Card section! Our debit cards are designed to provide convenient, secure, and accessible banking solutions for everyday use.
        </h4>
        <ul className="list-disc pl-5 text-left text-lg mt-5">
          <li className="mb-4 ml-4">
            <h5>1. Convenience</h5>
            Easily make purchases and access cash through ATMs, anywhere debit cards are accepted.
          </li>
          <li className="mb-4 ml-4">
            <h5>2. Budget Control</h5>
            Debit cards help manage spending as they’re directly linked to your bank account, preventing you from overspending.
          </li>
          <li className="mb-4 ml-4">
            <h5>3. Security</h5>
            Benefit from PIN protection and fraud monitoring, offering peace of mind when you use your card.
          </li>
        </ul>

        <h2 className=" font-bold mb-4 mt-8">Eligibility Requirements</h2>
        <ul className="list-disc pl-5 text-left text-lg">
          <div className="mb-4">
            <h5 className="mb-2">1. Age Requirement</h5>
            <ul>
              <li className="mb-2">Minimum Age: 18 years.</li>
              <li className="mb-2">Minors may be eligible with parental consent for joint accounts.</li>
            </ul>
          </div>
          <div className="mb-4">
            <h5 className="mb-2">2. Account Ownership</h5>
            <ul>
              <li className="mb-2">
                An active checking or savings account with UnityPoint Bank is required.
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h5 className="mb-2">3. Identity Verification</h5>
            <ul>
              <li className="mb-2">
                Valid identification and proof of address are required to ensure compliance with bank policies.
              </li>
            </ul>
          </div>
        </ul>
      </div>

      <div className="flex justify-center mt-8">
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
        <Link to="/cardrequest">
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
  )
}

export default DebitCards

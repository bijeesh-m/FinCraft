import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex  justify-center">
      <div className=" rounded-lg p-8 ">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-500">
          About Us
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Welcome to <strong>FinCraft Bank</strong>, where trust meets financial expertise. 
          Our mission is to empower individuals, businesses, and communities by offering reliable, 
          innovative, and secure banking solutions tailored to your unique needs.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Established in <strong>2024</strong>, FinCraft Bank is committed to building lasting 
          relationships through transparency, professionalism, and a customer-first approach. 
          From everyday banking to personalized financial planning, we are here to guide you toward 
          achieving your goals.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed">
          Thank you for choosing FinCraft Bank as your financial partner. Together, 
          we’re building a future where your aspirations become achievements. 
          <strong> Let’s grow together!</strong>
        </p>

        <div className="mt-6 ">
          <Link
            to="/feedback"
            className="bg-blue-500 text-white py-2 px-4 no-underline rounded-lg hover:bg-blue-600 transition"
          >
           Send Feedback
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

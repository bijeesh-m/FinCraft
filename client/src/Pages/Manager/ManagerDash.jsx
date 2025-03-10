import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import image1 from "../../Images/mngr1.gif";
import image2 from "../../Images/mngr2.gif";
import image3 from "../../Images/mngr3.gif";
import req from "../../Images/req.jpg";
import add from "../../Images/addmngr.jpg";
import feebback from "../../Images/feedback.jpg";
import compalint from "../../Images/cmplnt.jpg";

import backgroundImage from "../../Images/BGGif2.gif";

const carouselImages = [image1, image2, image3];

function ManagerDash() {
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  return (
    <div>
      <div className="flex justify-center">
        <div className="w-full">
          <Carousel className="" interval={3000} pause="hover">
            {carouselImages.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  src={image}
                  className="d-block  w-100"
                  alt={`Slide ${index + 1}`}
                  style={{ height: "500px", objectFit: "cover" }}
                />
                <Carousel.Caption>
                  <h3 className="text-bold">Welcome </h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
      <div className="relative min-h-screen ">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-black opacity-10" />

        <div className="container mx-auto py-10 relative z-10 ">
          <h2 className="text-center ">Unity Point Bank</h2>
          <p className="text-center ">Your Banking partner</p>
          {/* Add introductory text here */}
          {/* <h5 className="mb-8 mt-5  ">
            At UnityPoint Bank, we are dedicated to empowering individuals and
            businesses to achieve their financial goals. With a legacy of trust
            and innovation, we offer a comprehensive range of banking services
            designed to meet your unique needs. From personal banking solutions
            to robust business financial services, our experienced team is here
            to guide you every step of the way.
          </h5> */}
          {/* <h5 className="mb-5  ">
            Our commitment to exceptional customer service means we prioritize
            your satisfaction, providing personalized support and expert advice
            tailored to your financial aspirations. Whether you’re looking to
            open an account, apply for a loan, or manage your investments,
            UnityPoint Bank is here to help you navigate your financial journey
            with confidence.
          </h5> */}
          {/* <h5 className="mb-5  ">
            Join us today and experience the difference that a customer-focused
            bank can make. Together, let’s build a brighter financial future!
          </h5>
          <h4 className="mb-5">Explore Our Services</h4> */}
          <div className="flex justify-center space-x-8 text-white">
            <Link to="/manager/requests">
              <img
                src={req}
                className="block mx-auto w-60 h-60 mt-6"
                alt="Loans"
              />
              <h4 className="text-center text-black">Requests</h4>
            </Link>
            <Link to="/addstaff">
              <img
                src={add}
                className="block mx-auto w-60 h-60 mt-6"
                alt="Insurances"
              />
              <h4 className="text-center text-black">View Staffs</h4>
            </Link>
            <Link to="/addstaff">
              <img
                src={add}
                className="block mx-auto w-60 h-60 mt-6"
                alt="Insurances"
              />
              <h4 className="text-center text-black">Add Staff</h4>
            </Link>
            
            {/* <Link to="/deposits">
            //   <img
            //     src={depowdrw}
            //     className="block mx-auto w-60 h-60 mt-6"
            //     alt="Deposits"
            //   />
            //   <h4 className="text-center text-black">Deposits</h4>
            // </Link>
            // <Link to="/paymentsTransfer">
            //   <img
            //     src={payment}
            //     className="block mx-auto w-60 h-60 mt-6"
            //     alt="Deposits"
            //   />
            //   <h4 className="text-center text-black">Payment / Transfer</h4>
            // </Link> */}
            {/* Conditionally render Account Dashboard or Create Account */}
            {/* {hasBankAccount ? (
              <Link to="/bankaccntdash">
                <img
                  src={accntdash}
                  className="block mx-auto w-60 h-60 mt-6"
                  alt="Account Dashboard"
                />
                <h4 className="text-center text-black">Account Dashboard</h4>
              </Link>
            ) : (
              <Link to="/bankaccntreg">
                <img
                  src={crtaccnt}
                  className="block mx-auto w-60 h-60 mt-6"
                  alt="Create Account"
                />
                <h4 className="text-center text-black">Create Account</h4>
              </Link>
            )} */}
          </div>

          {/* Display search results if any */}
          {search && searchResults.length > 0 && (
            <div className="mt-4">
              <h4 className="text-white">Search Results:</h4>
              <ul className="bg-white rounded-lg shadow-lg">
                {searchResults.map((result) => (
                  <li key={result.id}>
                    <Link
                      to={result.link}
                      className="block px-4 py-2 text-black hover:bg-blue-600 hover:text-white"
                    >
                      {result.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManagerDash;

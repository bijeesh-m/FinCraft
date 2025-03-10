import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import image1 from "../Images/staff1.gif";
import image2 from "../Images/staff2.gif";
import image3 from "../Images/staff3.jpg";
import loanReqImage from "../Images/loan1.jpg";
import accountReqImage from "../Images/createaccount.jpg";
import viewUsersImage from "../Images/user.jpg";

import backgroundImage from "../Images/BGGif2.gif";

const carouselImages = [image1, image2, image3];

function StaffDash() {
  return (
    <div>
      <div className="flex justify-center">
        <div className="w-3/4">
          <Carousel className="" interval={3000} pause="hover">
            {carouselImages.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  src={image}
                  className="d-block w-100"
                  alt={`Slide ${index + 1}`}
                  style={{ height: "500px", objectFit: "cover" }}
                />
                <Carousel.Caption>
                  <h3 className="text-bold">Welcome Staff</h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
      <div className="relative min-h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-black opacity-10" />

        <div className="container mx-auto mt-10 relative z-10">
          <h2 className="text-center">Unity Point Bank</h2>
          <p className="text-center">Empowering Your Banking Needs</p>

          <div className="flex justify-center space-x-8 text-white mt-10">
            <Link to="/loanrequests">
              <img
                src={loanReqImage}
                className="block mx-auto w-60 h-60 mt-6"
                alt="Loan Requests"
              />
              <h4 className="text-center text-black">Loan Requests</h4>
            </Link>
            <Link to="/accountrequests">
              <img
                src={accountReqImage}
                className="block mx-auto w-60 h-60 mt-6"
                alt="Account Opening Requests"
              />
              <h4 className="text-center text-black">
                Account Opening Requests
              </h4>
            </Link>
            <Link to="/viewusers">
              <img
                src={viewUsersImage}
                className="block mx-auto w-60 h-60 mt-6"
                alt="View Users"
              />
              <h4 className="text-center text-black">View Users</h4>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffDash;

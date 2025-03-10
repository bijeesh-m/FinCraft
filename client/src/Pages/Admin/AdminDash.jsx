import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import image1 from "../../Images/mngr1.gif";
import image2 from "../../Images/mngr2.gif";
import image3 from "../../Images/mngr3.gif";
import feedbackImage from "../../Images/feedback.jpg";
import complaintImage from "../../Images/cmplnt.jpg";
import viewUsersImage from "../../Images/user.jpg";
import addManagerImage from "../../Images/addmngr.jpg";

import backgroundImage from "../../Images/BGGif2.gif";

const carouselImages = [image1, image2, image3];

function AdminDash() {
  return (
    <div>
      <div className="flex justify-center">
        <div className=" w-full">
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
                  <h3 className="text-bold">Welcome Admin</h3>
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
          <p className="text-center">Your Trusted Banking Partner</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center space-x-8 text-white mt-10">
            <Link to="/admin/feedbacks">
              <img
                src={feedbackImage}
                className="block mx-auto w-60 h-60 mt-6"
                alt="Feedbacks"
              />
              <h4 className="text-center text-black">Feedbacks</h4>
            </Link>
            <Link to="/admin/complaints">
              <img
                src={complaintImage}
                className="block mx-auto w-60 h-60 mt-6"
                alt="Complaints"
              />
              <h4 className="text-center text-black">Complaints</h4>
            </Link>
            <Link to="/admin/users">
              <img
                src={viewUsersImage}
                className="block mx-auto w-60 h-60 mt-6"
                alt="View Users"
              />
              <h4 className="text-center text-black">View Users</h4>
            </Link>
            <Link to="/admin/addmanager">
              <img
                src={addManagerImage}
                className="block mx-auto w-60 h-60 mt-6"
                alt="Add Manager"
              />
              <h4 className="text-center text-black">Add Manager</h4>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDash;

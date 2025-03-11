import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import image1 from "../../Images/mngr1.gif";
import image2 from "../../Images/mngr2.gif";
import image3 from "../../Images/mngr3.gif";
import req from "../../Images/req.jpg";
import add from "../../Images/addmngr.jpg";


import backgroundImage from "../../Images/BGGif2.gif";
import { toast } from "react-toastify";

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
                    <h2 className="text-center ">FinCraft Bank</h2>
                    <p className="text-center ">Your Banking partner</p>

                    <div className=" justify-center space-x-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-white">
                        <Link to="/manager/requests">
                            <img src={req} className="block mx-auto w-60 h-60 mt-6" alt="Loans" />
                            <h4 className="text-center text-black">Requests</h4>
                        </Link>
                        <Link onClick={()=>toast.warning("This feature is not yet implemented!")}>
                            <img src={add} className="block mx-auto w-60 h-60 mt-6" alt="Insurances" />
                            <h4 className="text-center text-black">View Staffs</h4>
                        </Link>
                        <Link onClick={()=>toast.warning("This feature is not yet implemented!")}>
                            <img src={add} className="block mx-auto w-60 h-60 mt-6" alt="Insurances" />
                            <h4 className="text-center text-black">Add Staff</h4>
                        </Link>
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

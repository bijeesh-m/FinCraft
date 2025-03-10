import React, { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import image1 from "../../Images/BGGif.gif";
import image2 from "../../Images/BGgif3.gif";
import image3 from "../../Images/BGGif1.gif";
import crtaccnt from "../../Images/createaccount.jpg";
import accntdash from "../../Images/accntdash.jpg";
import loan from "../../Images/Loans/loan.jpg";
import insurance from "../../Images/Insurance/insure.jpg";
import cards from "../../Images/cards.jpg";
import depowdrw from "../../Images/depowidrw.jpg";
import payment from "../../Images/payment.jpg";
import backgroundImage from "../../Images/BGGif2.gif";

const carouselImages = [image1, image2, image3];

const Home = () => {
    const [hasBankAccount, setHasBankAccount] = useState(false);

    useEffect(() => {
        axios
            .get("/User/BankAccVerify")
            .then((res) => {
                if (res.data.hasBankAccount) {
                    setHasBankAccount(true);
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    setHasBankAccount(false);
                } else {
                    console.error("An error occurred:", error.message);
                }
            });
    }, []);

    return (
        <div>
            <div className="flex justify-center">
                <div className="w-full h-full">
                    <Carousel interval={3000} pause="hover">
                        {carouselImages.map((image, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    src={image}
                                    className="d-block w-100"
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
                    <h2 className="text-center ">FinCraft</h2>
                    <p className="text-center ">Your Banking partner</p>
                    <h5 className="mb-8 mt-5  ">
                        At FinCraft Bank, we are dedicated to empowering individuals and businesses to achieve their
                        financial goals. With a legacy of trust and innovation, we offer a comprehensive range of
                        banking services designed to meet your unique needs. From personal banking solutions to robust
                        business financial services, our experienced team is here to guide you every step of the way.
                    </h5>
                    <h5 className="mb-5  ">
                        Our commitment to exceptional customer service means we prioritize your satisfaction, providing
                        personalized support and expert advice tailored to your financial aspirations. Whether you’re
                        looking to open an account, apply for a loan, or manage your investments, UnityPoint Bank is
                        here to help you navigate your financial journey with confidence.
                    </h5>
                    <h5 className="mb-5  ">
                        Join us today and experience the difference that a customer-focused bank can make. Together,
                        let’s build a brighter financial future!
                    </h5>
                    <h4 className="mb-5">Explore Our Services</h4>
                    <div className="flex justify-center space-x-8 flex-wrap text-white">
                        <Link to="/loans">
                            <img src={loan} className="block mx-auto w-60 h-60 mt-6" alt="Loans" />
                            <h4 className="text-center text-black">Loans</h4>
                        </Link>
                        <Link to="/insurance">
                            <img src={insurance} className="block mx-auto w-60 h-60 mt-6" alt="Insurances" />
                            <h4 className="text-center text-black">Insurances</h4>
                        </Link>
                        <Link to="/cards">
                            <img src={cards} className="block mx-auto w-60 h-60 mt-6" alt="Cards" />
                            <h4 className="text-center text-black">Cards</h4>
                        </Link>
                        <Link to="/deposits">
                            <img src={depowdrw} className="block mx-auto w-60 h-60 mt-6" alt="Deposits" />
                            <h4 className="text-center text-black">Deposits / withdrawal</h4>
                        </Link>
                        <Link to="/paymentsTransfer">
                            <img src={payment} className="block mx-auto w-60 h-60 mt-6" alt="Deposits" />
                            <h4 className="text-center text-black">Payment / Transfer</h4>
                        </Link>

                        {hasBankAccount ? (
                            <Link to="/bankaccntdash">
                                <img src={accntdash} className="block mx-auto w-60 h-60 mt-6" alt="Account Dashboard" />
                                <h4 className="text-center text-black">Account Dashboard</h4>
                            </Link>
                        ) : (
                            <Link to="/bankaccntreg">
                                <img src={crtaccnt} className="block mx-auto w-60 h-60 mt-6" alt="Create Account" />
                                <h4 className="text-center text-black">Create Account</h4>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

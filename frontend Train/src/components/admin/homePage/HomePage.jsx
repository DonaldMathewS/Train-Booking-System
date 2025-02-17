import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css"; // Importing the CSS file

const HomePage = () => {
    const navigate = useNavigate();


    return (
        <div className="homepage-container">
            <header className="homepage-header">
                <h1 className="homepage-title">Welcome to the Train Booking System</h1>
            </header>

            <main className="homepage-main">
                <div className="homepage-message-container">
                    <p className="Admin">Hi! Admin</p>
                    <p className="homepage-message">
                        Manage train bookings and all train-related activities here. Use
                        the dashboard to control train schedules, compartments, and more.
                    </p>
                </div>

                <div className="homepage-button-container">
                    {/* Additional Links */}
                    <div className="homepage-links">
                        <Link to="/addTrain" className="homepage-link" > <button> Create Train</button></Link>
                        <Link to="/TrainList" className="homepage-link" > <button> Train List</button></Link>
                        <Link to="/compartments" className="homepage-link" > <button> Compartments</button></Link>
                        <Link to="/userDetails" className="homepage-link" > <button> User Details</button></Link>
                        <Link to="/UserLoginDetails" className="homepage-link" > <button> Login Details</button></Link>
                        <Link to="/stations" className="homepage-link" > <button>Create Station</button></Link>
                        <Link to="/Feedback" className="homepage-link" > <button>User FeedBack</button></Link>
                        <Link to="/UserBooking" className="homepage-link" > <button>User Booking</button></Link>
                        <Link to="/UserPayment" className="homepage-link" > <button>User Payment</button></Link>
                    </div>
                </div>
            </main>

            <footer className="homepage-footer">
                <p>&copy; 2025 Train Booking System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;

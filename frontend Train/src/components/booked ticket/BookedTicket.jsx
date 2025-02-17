import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../axiosIntance/axiosInstance';
import { StoreContext } from '../Storecontext/StoreContext';
import { Link } from "react-router-dom";

import { toast } from 'react-toastify';
import "./BookedTicket.css";

const BookedTicket = () => {
    const { token } = useContext(StoreContext); // Assuming you're using context for token management
    const [bookings, setBookings] = useState([]);
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        if (token) {
            getUserBookings();
            getUserPayments();
        }
    }, [token]);

    // Fetch User's Bookings
    const getUserBookings = async () => {
        try {
            const res = await axiosInstance.get("/getbooking", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBookings(res.data.data); // Assuming the response has 'data' key with bookings
        } catch (error) {
            toast.error("Error fetching bookings.", {
                position: "bottom-right",
            });
            console.error("Error fetching bookings:", error);
        }
    };

    // Fetch User's Payments
    const getUserPayments = async () => {
        try {
            const res = await axiosInstance.get("/getuserpayment", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPayments(res.data.data.payments); // Assuming payments are under 'data.payments' key
        } catch (error) {
            toast.error("Error fetching payments.", {
                position: "bottom-right",
            });
            console.error("Error fetching payments:", error);
        }
    };

    return (
        <div className="booked-ticket-page">
            <h1>Your Booked Tickets & Payment Details  </h1>
            <p><Link to="/">--back--</Link></p>
            {/* Booking Details Section */}
            <div className="bookings-section">
                <h2>Your Bookings</h2>
                {bookings.length === 0 ? (
                    <p className="no-data">No bookings found.</p>
                ) : (
                    <table className="table booked-table">
                        <thead>
                            <tr>
                                <th>Train Name</th>
                                <th>Compartment Type</th>
                                <th>Price</th>
                                <th>Booking Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td>{booking.trainId?.name}</td>
                                    <td>{booking.compartmentId.type}</td>
                                    <td>${booking.compartmentId.price}</td>
                                    <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Payment Details Section */}
            <div className="payments-section">
                <h2>Your Payments</h2>
                {payments.length === 0 ? (
                    <p className="no-data">No payments found.</p>
                ) : (
                    <table className="table payment-table">
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => (
                                <tr key={payment._id}>
                                    <td>{payment.bookingId}</td>
                                    <td>${payment.amount}</td>
                                    <td>{payment.status}</td>
                                    <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

        </div>
    );
};

export default BookedTicket;

import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import "./UserBooking.css";
import axiosInstance from '../../../axiosIntance/axiosInstance';
import { Link } from 'react-router-dom';

const UserBooking = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {

        getAllBookings();

    }, []);


    const getAllBookings = async () => {
        try {
            const res = await axiosInstance.get("/allBookings"
            );
            setBookings(res.data.data);
        } catch (error) {
            toast.error("Error fetching all bookings.", {
                position: "bottom-right",
            });
            console.error("Error fetching all bookings:", error);
        }
    };

    return (
        <div className="user-booking-page">
            <h1>All Bookings</h1>

            <div className="bookings-section">
                {bookings.length === 0 ? (
                    <p className="no-data">No bookings found.</p>
                ) : (
                    <table className="table user-booking-table">
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
            <div className="back-to-home">
                <Link to="/admin">
                    <p>--- Back ---</p>
                </Link>
            </div>
        </div>
    );
};

export default UserBooking;

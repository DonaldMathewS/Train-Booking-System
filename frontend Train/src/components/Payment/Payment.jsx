import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../Storecontext/StoreContext";
import "./Payment.css";
import axiosInstance from "../axiosIntance/axiosInstance";

const Payment = () => {
    const { token, bookingData } = useContext(StoreContext);
    const navigate = useNavigate();
    const [paymentStatus, setPaymentStatus] = useState("Pending");
    const [paymentId, setPaymentId] = useState("");

    if (!bookingData) {
        return <h2>No booking details found.</h2>;
    }

    const { bookingDetails, bookingId } = bookingData;

    const handlePayment = async () => {
        try {
            const response = await axiosInstance.post(
                "/payment",
                {
                    bookingId: String(bookingId),
                    amount: bookingDetails.totalPrice,
                    status: "Completed",
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                setPaymentStatus("Completed");
                setPaymentId(response.data.data.payment._id);
                toast.success("Payment successful!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                });
                navigate("/success", { state: { paymentId: response.data.data.payment._id } });
            } else {
                alert("Payment failed. Please try again.");
            }
        } catch (error) {
            console.error("Payment error:", error);
            toast.error(error.response.data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        }
    };

    return (
        <div className="payment-container">
            <h1>Confirm Payment</h1>

            <div className="payment-details">
                <h3>Booking Summary</h3>
                <p><strong>Train:</strong> {bookingDetails.trainName}</p>
                <p><strong>Compartment:</strong> {bookingDetails.compartmentType}</p>
                <p><strong>Passengers:</strong> {bookingDetails.numPassengers}</p>
                <p><strong>Total Price:</strong> ${bookingDetails.totalPrice}</p>
            </div>

            <div className="payment-status">
                <p><strong>Payment Status:</strong> {paymentStatus}</p>
                {paymentId && <p><strong>Payment ID:</strong> {paymentId}</p>}
            </div>

            <button className="pay-button" onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default Payment;

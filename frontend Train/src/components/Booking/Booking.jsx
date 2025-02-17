import React, { useContext, useEffect, useState } from "react";
import "./Booking.css";
import { useNavigate, useParams } from "react-router-dom";
import { StoreContext } from "../Storecontext/StoreContext";
import axiosInstance from "../axiosIntance/axiosInstance";
import { toast } from "react-toastify";

const Booking = () => {
    const { token } = useContext(StoreContext);
    const [trainDetails, setTrainDetails] = useState({});
    const [trainType, setTrainType] = useState("");
    const [numPassengers, setNumPassengers] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [bookingId, setBookingId] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState("");
    const { id } = useParams();
    const nav = useNavigate()

    useEffect(() => {
        const fetchTrainDetails = async () => {
            try {
                const response = await axiosInstance.get(`/trainInfo/${id}`);
                if (response.data.success) {
                    setTrainDetails(response.data.data);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.error("Error fetching train details:", error);
                toast.error("Failed to fetch train details.");
            }
        };
        fetchTrainDetails();
    }, [id]);

    useEffect(() => {
        if (trainType) {
            const selectedCompartment = trainDetails.compartments?.find(comp => comp.type === trainType);
            if (selectedCompartment) {
                setTotalPrice(selectedCompartment.price * numPassengers);
            }
        }
    }, [trainType, numPassengers, trainDetails]);

    const handleBooking = async () => {
        if (!trainType || numPassengers <= 0) {
            toast.warning("Please select a compartment type and a valid number of passengers.");
            return;
        }

        const selectedCompartment = trainDetails.compartments?.find(comp => comp.type === trainType);
        if (!selectedCompartment) {
            toast.error("Invalid compartment selection.");
            return;
        }

        const bookingDetails = {
            trainId: trainDetails._id,
            trainName: trainDetails.name,
            compartmentId: selectedCompartment._id,
            compartmentType: trainType,
            numPassengers,
            totalPrice,
        };

        try {
            const response = await axiosInstance.post("/booking", bookingDetails, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.success) {
                setBookingId(response.data.data.bookingId);
                setPaymentStatus(response.data.data.paymentStatus);
                toast.success("Booking successful!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                });
            } else {
                toast.error("Booking failed. Please try again.");
            }
        } catch (error) {
            console.error("Booking error:", error);
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

    const handlePayment = async () => {
        if (!bookingId) {
            toast.error("Booking ID is missing.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            return;
        }

        const paymentDetails = {
            bookingId: bookingId,
            amount: totalPrice,
            status: "Pending",
        };

        try {
            const response = await axiosInstance.post("/payment", paymentDetails, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.success) {
                setPaymentStatus("Pending");
                toast.success("Payment created successfully! Awaiting confirmation!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                });
                setTimeout(() => {

                }, 5000);
                nav("/")
            } else {
                setPaymentStatus("Failed");

                toast.error("Payment creation failed. Please try again.");
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
            setPaymentStatus("Failed");
            toast.error("Payment failed. Please try again.");
        }
    };

    return (
        <div className="container">
            <h1>Booking Ticket</h1>

            <div className="train-details">
                <h3>{trainDetails.name}</h3>
                <p>From: {trainDetails.departureStation?.name}</p>
                <p>To: {trainDetails.arrivalStation?.name}</p>
                <hr />
                <label htmlFor="trainType">Compartment Type:</label>
                <select id="trainType" value={trainType} onChange={(e) => setTrainType(e.target.value)}>
                    <option value="" disabled>Select compartment type</option>
                    {trainDetails.compartments?.map((comp, index) => (
                        <option key={index} value={comp.type}>
                            {comp.type} - ${comp.price} per passenger
                        </option>
                    ))}
                </select>
            </div>

            <div className="passenger-details">
                <label htmlFor="numPassengers">Number of Passengers:</label>
                <input type="number" id="numPassengers" min="1" value={numPassengers} onChange={(e) => setNumPassengers(Number(e.target.value))} />
                <p><strong>Total Price: ${totalPrice}</strong></p>
            </div>

            {/* Conditionally render the booking button */}
            {!bookingId && (
                <div className="bookingButton">
                    <button type="button" onClick={handleBooking}>Book Ticket</button>
                </div>
            )}

            {bookingId && (
                <div className="booking-confirmation">
                    <h2>Booking Confirmed</h2>
                    <p><strong>Booking ID:</strong> {bookingId}</p>
                    <p><strong>Train:</strong> {trainDetails.name}</p>
                    <p><strong>Compartment:</strong> {trainType}</p>
                    <p><strong>Passengers:</strong> {numPassengers}</p>
                    <p><strong>Total Price:</strong> ${totalPrice}</p>
                    <p><strong>Payment Status:</strong> {paymentStatus}</p>

                    {/* Conditionally render payment button */}
                    {paymentStatus === "Pending" && (
                        <div className="bookingButton">
                            <button type="button" onClick={handlePayment}>Pay Now</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Booking;

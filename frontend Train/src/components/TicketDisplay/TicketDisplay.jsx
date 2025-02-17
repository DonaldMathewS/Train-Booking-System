import React from "react";
import "./TicketDisplay.css";
import { Link, useNavigate } from "react-router-dom";

const TicketDisplay = ({ id, name, type, departureStation, arrivalStationge, capacity, status, days, trainId, compartment, arrivaltime, departuretime }) => {
    const allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const validDays = Array.isArray(days) ? days : [];
    const nav = useNavigate()
    const hasCompartments = compartment && Array.isArray(compartment) && compartment.length > 0;

    console.log("...", compartment)
    const handleBookingNavigation = (id) => {
        nav(`/Booking/${id}`);
    };

    return (
        <div className="TrainItem">
            <div className="ticketName">
                <h3>{name}</h3>
                <h4>{type}</h4>
            </div>

            <div className="depatureTimePlace">
                <h3>{departuretime}</h3>
                <p>{departureStation}</p>
            </div>

            <div className="arrivaltime">
                <h3>{arrivaltime}</h3>
                <p>{arrivalStationge}</p>
            </div>

            <div className="farePrice">
                <div>

                    {hasCompartments ? (
                        compartment.map((compartments) => (
                            <div key={compartments._id} className="acompartment">
                                <p>{compartments.type}</p>
                                <p>Available Seats: {compartments.availableSeats}</p>
                            </div>
                        ))
                    ) : (
                        null
                    )}
                </div>

            </div>

            <div className="seatsAvailable">
                <p className="days">
                    Days:
                    {allDays.map((day, index) => (
                        <span
                            key={index}
                            style={{
                                color: validDays.includes(day) ? "green" : "red",
                                margin: "0 5px",
                                fontWeight: "bold",
                            }}
                        >
                            {day[0]}
                        </span>
                    ))}
                </p>


                <button onClick={() => handleBookingNavigation(id)}>Book Ticket</button>

            </div>
        </div>
    );
};

export default TicketDisplay;

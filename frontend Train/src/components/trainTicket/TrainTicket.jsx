import React, { useEffect, useState } from "react";
import "./TrainTicket.css";
import TicketDisplay from "../TicketDisplay/TicketDisplay";
import axiosInstance from "../axiosIntance/axiosInstance";

const TrainTicket = () => {
    const [Train_category, setTrain_category] = useState([]);
    const [departureFilter, setDepartureFilter] = useState("");
    const [arrivalFilter, setArrivalFilter] = useState("");

    useEffect(() => {
        getTrain();
    }, []);

    const getTrain = async () => {
        try {
            const response = await axiosInstance.get("/getTrains");
            setTrain_category(response.data.data);
        } catch (error) {
            console.error("Error getting trains:", error);
        }
    };

    // Get unique station names for dropdowns
    const uniqueDepartureStations = [
        ...new Set(Train_category.map((train) => train.departureStation?.name)),
    ];
    const uniqueArrivalStations = [
        ...new Set(Train_category.map((train) => train.arrivalStation?.name)),
    ];

    // Filter Trains based on selected departure and arrival stations
    const filteredTrains = Train_category.filter((train) => {
        return (
            (!departureFilter || train.departureStation?.name === departureFilter) &&
            (!arrivalFilter || train.arrivalStation?.name === arrivalFilter)
        );
    });

    return (
        <div className="trainTicket" id="trainTicket">
            <h2>Book Your Tickets :</h2>

            {/* Filter Section */}
            <div className="filter-container">
                <select onChange={(e) => setDepartureFilter(e.target.value)}>
                    <option value="">Select Departure Station</option>
                    {uniqueDepartureStations.map((station, index) => (
                        <option key={index} value={station}>
                            {station}
                        </option>
                    ))}
                </select>

                <select onChange={(e) => setArrivalFilter(e.target.value)}>
                    <option value="">Select Arrival Station</option>
                    {uniqueArrivalStations.map((station, index) => (
                        <option key={index} value={station}>
                            {station}
                        </option>
                    ))}
                </select>
            </div>

            {/* Table Header */}
            <div className="trainItemHeader">
                <div className="Departure">
                    <h3>Name</h3>
                </div>
                <div className="Duration">
                    <h3>Departure</h3>
                </div>
                <div className="Arrival">
                    <h3>Arrival</h3>
                </div>
                <div className="SeatsAvailable">
                    <h3>Seats Available</h3>
                </div>
                <div className="Fare">
                    <h3>Booking</h3>
                </div>
            </div>

            {/* Filtered Train Display */}
            <div className="foodDisplayList">
                {filteredTrains.map((item, index) => (
                    <TicketDisplay
                        key={index}
                        id={item._id}
                        name={item.name}
                        type={item.type}
                        departureStation={item.departureStation?.name}
                        arrivalStationge={item.arrivalStation?.name}
                        capacity={item.capacity}
                        status={item.status}
                        days={item.runningDays}
                        arrivaltime={item.endTime}
                        departuretime={item.startTime}
                        compartment={item.compartments}
                    />
                ))}
            </div>
        </div>
    );
};

export default TrainTicket;

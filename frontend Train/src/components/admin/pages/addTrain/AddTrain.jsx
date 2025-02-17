import React, { useState, useEffect } from "react";
import "./AddTrain.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../axiosIntance/AxiosInstance";

const AddTrain = () => {
    const [trainData, setTrainData] = useState({
        trainId: "",
        name: "",
        type: "",
        departureStation: "",
        arrivalStation: "",
        startTime: "",
        endTime: "",
        status: "On Time",
        runningDays: [],
        compartments: [],
        upcomingDates: [], // Store upcoming dates here
    });

    const [stations, setStations] = useState([]);
    const [compartments, setCompartments] = useState([]);
    const [errors, setErrors] = useState({});
    const [newUpcomingDate, setNewUpcomingDate] = useState(""); // New date input
    const [upcomingDateError, setUpcomingDateError] = useState("");

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const stationResponse = await axiosInstance.get("allStations");
                setStations(stationResponse.data.data);
            } catch (error) {
                console.error("Error fetching stations", error);
            }
        };

        const fetchCompartments = async () => {
            try {
                const compartmentResponse = await axiosInstance.get("findComp");
                setCompartments(compartmentResponse.data.data);
            } catch (error) {
                console.error("Error fetching compartments", error);
            }
        };

        fetchStations();
        fetchCompartments();
    }, []);

    // Handle upcoming date input change
    const handleUpcomingDateChange = (e) => {
        setNewUpcomingDate(e.target.value);
    };

    // Add upcoming date to trainData
    const handleAddUpcomingDate = () => {
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;  // Validate date format YYYY-MM-DD
        const today = new Date();
        const enteredDate = new Date(newUpcomingDate);

        if (datePattern.test(newUpcomingDate)) {
            if (enteredDate > today) {
                setTrainData({
                    ...trainData,
                    upcomingDates: [...trainData.upcomingDates, newUpcomingDate],
                });
                setNewUpcomingDate("");
                setUpcomingDateError("");
            } else {
                setUpcomingDateError("The date must be in the future.");
            }
        } else {
            setUpcomingDateError("Please enter a valid date in the format YYYY-MM-DD.");
        }
    };

    // Validate the form before submission
    const validateForm = () => {
        const errors = {};

        if (!trainData.trainId.trim()) {
            errors.trainId = "Train ID is required.";
        }

        if (!trainData.name.trim()) {
            errors.name = "Train Name is required.";
        }

        if (!trainData.type) {
            errors.type = "Train Type is required.";
        }

        if (!trainData.departureStation) {
            errors.departureStation = "Departure Station is required.";
        }

        if (!trainData.arrivalStation) {
            errors.arrivalStation = "Arrival Station is required.";
        } else if (trainData.departureStation === trainData.arrivalStation) {
            errors.arrivalStation = "Arrival Station cannot be the same as Departure Station.";
        }

        const timePattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!trainData.startTime.trim()) {
            errors.startTime = "Start Time is required.";
        } else if (!timePattern.test(trainData.startTime)) {
            errors.startTime = "Start Time must be in HH:MM format.";
        }

        if (!trainData.endTime.trim()) {
            errors.endTime = "End Time is required.";
        } else if (!timePattern.test(trainData.endTime)) {
            errors.endTime = "End Time must be in HH:MM format.";
        }

        if (trainData.runningDays.length === 0) {
            errors.runningDays = "At least one Running Day must be selected.";
        }

        if (trainData.compartments.length === 0) {
            errors.compartments = "At least one Compartment must be selected.";
        }

        if (trainData.upcomingDates.length === 0) {
            errors.upcomingDates = "At least one upcoming date must be added.";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await axiosInstance.post("/createTrain", trainData);
            setTrainData({
                trainId: "",
                name: "",
                type: "",
                departureStation: "",
                arrivalStation: "",
                startTime: "",
                endTime: "",
                status: "On Time",
                runningDays: [],
                compartments: [],
                upcomingDates: [],
            });

            toast.success("Train created successfully!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            console.log("Train created successfully:", response.data);
        } catch (error) {
            console.error("Error creating train:", error);
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

    // Handle input changes for form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTrainData({ ...trainData, [name]: value });
    };

    // Handle running days change
    const handleRunningDaysChange = (day) => {
        const selectedDays = trainData.runningDays.includes(day)
            ? trainData.runningDays.filter((d) => d !== day)
            : [...trainData.runningDays, day];
        setTrainData({ ...trainData, runningDays: selectedDays });
    };

    return (
        <div>
            <div className="addTrainTitle">
                <h1>Create a New Train</h1>
                <p>Fill out the form below to add a new train to the system.</p>
            </div>


            <form className="add-train-form" onSubmit={handleSubmit}>
                {/* Train ID */}
                <div className="form-group">
                    <label className="form-label">Train ID:</label>
                    <input
                        className="form-input"
                        type="text"
                        name="trainId"
                        value={trainData.trainId}
                        onChange={handleChange}
                        required
                    />
                    {errors.trainId && <p className="error-message">{errors.trainId}</p>}
                </div>

                {/* Train Name */}
                <div className="form-group">
                    <label className="form-label">Train Name:</label>
                    <input
                        className="form-input"
                        type="text"
                        name="name"
                        value={trainData.name}
                        onChange={handleChange}
                        required
                    />
                    {errors.name && <p className="error-message">{errors.name}</p>}
                </div>

                {/* Train Type */}
                <div className="form-group">
                    <label className="form-label">Type:</label>
                    <select
                        className="form-select"
                        name="type"
                        value={trainData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Train Type</option>
                        {[
                            "Express",
                            "High-Speed",
                            "Luxury",
                            "Intercity",
                            "Regional",
                            "Commuter",
                            "Night",
                            "Tourist",
                        ].map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    {errors.type && <p className="error-message">{errors.type}</p>}
                </div>

                {/* Departure Station */}
                <div className="form-group">
                    <label className="form-label">Departure Station:</label>
                    <select
                        className="form-select"
                        name="departureStation"
                        value={trainData.departureStation}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Departure Station</option>
                        {stations.map((station) => (
                            <option key={station._id} value={station._id}>
                                {station.name}
                            </option>
                        ))}
                    </select>
                    {errors.departureStation && <p className="error-message">{errors.departureStation}</p>}
                </div>

                {/* Arrival Station */}
                <div className="form-group">
                    <label className="form-label">Arrival Station:</label>
                    <select
                        className="form-select"
                        name="arrivalStation"
                        value={trainData.arrivalStation}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Arrival Station</option>
                        {stations.map((station) => (
                            <option key={station._id} value={station._id}>
                                {station.name}
                            </option>
                        ))}
                    </select>
                    {errors.arrivalStation && <p className="error-message">{errors.arrivalStation}</p>}
                </div>

                {/* Start Time */}
                <div className="form-group">
                    <label className="form-label">Start Time:</label>
                    <input
                        className="form-input"
                        type="text"
                        name="startTime"
                        value={trainData.startTime}
                        onChange={handleChange}
                        placeholder="HH:MM"
                        required
                    />
                    {errors.startTime && <p className="error-message">{errors.startTime}</p>}
                </div>

                {/* End Time */}
                <div className="form-group">
                    <label className="form-label">End Time:</label>
                    <input
                        className="form-input"
                        type="text"
                        name="endTime"
                        value={trainData.endTime}
                        onChange={handleChange}
                        placeholder="HH:MM"
                        required
                    />
                    {errors.endTime && <p className="error-message">{errors.endTime}</p>}
                </div>

                {/* Running Days */}
                <div className="form-group">
                    <label className="form-label">Running Days:</label>
                    <div>
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                            (day) => (
                                <label key={day}>
                                    <input
                                        type="checkbox"
                                        value={day}
                                        checked={trainData.runningDays.includes(day)}
                                        onChange={() => handleRunningDaysChange(day)}
                                    />
                                    {day}
                                </label>
                            )
                        )}
                    </div>
                    {errors.runningDays && <p className="error-message">{errors.runningDays}</p>}
                </div>

                {/* Compartments */}
                <div className="form-group">
                    <label className="form-label">Compartments:</label>
                    <div>
                        {compartments.map((compartment) => (
                            <label key={compartment._id}>
                                <input
                                    type="checkbox"
                                    value={compartment._id}
                                    checked={trainData.compartments.includes(compartment._id)}
                                    onChange={() =>
                                        setTrainData((prevState) => ({
                                            ...prevState,
                                            compartments: prevState.compartments.includes(compartment._id)
                                                ? prevState.compartments.filter(
                                                    (id) => id !== compartment._id
                                                )
                                                : [...prevState.compartments, compartment._id],
                                        }))
                                    }
                                />
                                {compartment.type}
                            </label>
                        ))}
                    </div>
                    {errors.compartments && <p className="error-message">{errors.compartments}</p>}
                </div>

                {/* Upcoming Dates */}
                <div className="form-group">
                    <label className="form-label">Upcoming Dates:</label>
                    <input
                        className="form-input"
                        type="text"
                        value={newUpcomingDate}
                        onChange={handleUpcomingDateChange}
                        placeholder="YYYY-MM-DD"
                    />
                    <button
                        type="button"
                        className="form-button"
                        onClick={handleAddUpcomingDate}
                    >
                        Add Date
                    </button>
                    {upcomingDateError && <p className="error-message">{upcomingDateError}</p>}
                    <ul>
                        {trainData.upcomingDates.map((date, index) => (
                            <li key={index}>{date}</li>
                        ))}
                    </ul>
                    {errors.upcomingDates && <p className="error-message">{errors.upcomingDates}</p>}
                </div>

                <div className="form-group">
                    <button className="form-button" type="submit">
                        Create Train
                    </button>
                </div>
            </form>
            <div className="back-to-home">
                <Link to="/admin">
                    <p>--- Back ---</p>
                </Link>
            </div>
        </div>
    );
};

export default AddTrain;

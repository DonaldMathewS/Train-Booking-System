import React, { useState, useEffect } from "react";
import "./EditTrain.css"
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../axiosIntance/AxiosInstance";

const EditTrain = () => {
    const { trainId } = useParams(); // Fetch train ID from URL parameters
    const navigate = useNavigate();
    const { id } = useParams()
    console.log('$$$..id', id)
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
    });
    console.log("##trainData", trainData)
    const [stations, setStations] = useState([]);
    const [compartments, setCompartments] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const stationResponse = await axiosInstance.get("allStations");
                setStations(stationResponse.data.data);

                const compartmentResponse = await axiosInstance.get("findComp");
                setCompartments(compartmentResponse.data.data);

                const getTrain = await axiosInstance.get(`/trainInfo/${id}`)
                console.log("trainData", getTrain.data.data)
                setTrainData(getTrain.data.data)

            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("An error occurred while loading train details.");
                navigate("/TrainList");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate, id]);

    const validateForm = () => {
        const errors = {};

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

        // Regex pattern for validating time in HH:MM 24-hour format
        const timePattern = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;

        if (!trainData.startTime.trim()) {
            errors.startTime = "Start Time is required.";
        } else if (!timePattern.test(trainData.startTime)) {
            errors.startTime = "Start Time must be in HH:MM (24-hour) format.";
        }

        if (!trainData.endTime.trim()) {
            errors.endTime = "End Time is required.";
        } else if (!timePattern.test(trainData.endTime)) {
            errors.endTime = "End Time must be in HH:MM (24-hour) format.";
        } else if (trainData.startTime >= trainData.endTime) {
            errors.endTime = "End Time must be after Start Time.";
        }

        if (trainData.runningDays.length === 0) {
            errors.runningDays = "At least one Running Day must be selected.";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await axiosInstance.put(`/update/${id}`, trainData); // Use PUT for update
            if (response.data.success) {
                toast.success("Train updated successfully!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                });
                navigate("/TrainList"); // Redirect to train list
            } else {
                toast.error("Failed to update train.");
            }
        } catch (error) {
            console.error("Error updating train:", error);
            toast.error("An error occurred while updating the train. Please try again.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTrainData({ ...trainData, [name]: value });
    };

    const handleRunningDaysChange = (day) => {
        const selectedDays = trainData.runningDays.includes(day)
            ? trainData.runningDays.filter((d) => d !== day)
            : [...trainData.runningDays, day];
        setTrainData({ ...trainData, runningDays: selectedDays });
    };

    if (loading) {
        return <div>Loading train details...</div>;
    }

    return (
        <>
            <div className="edit-train-header">
                <h1>Edit Train Details</h1>
                <p>Update the details of the selected train below:</p>
            </div>



            <form className="add-train-form" onSubmit={handleSubmit}>
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
                        {["Express", "High-Speed", "Luxury", "Intercity", "Regional", "Commuter", "Night", "Tourist"].map((type) => (
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

                {/* Status */}
                <div className="form-group">
                    <label className="form-label">Status:</label>
                    <select
                        className="form-select"
                        name="status"
                        value={trainData.status}
                        onChange={handleChange}
                    >
                        {["On Time", "Delayed", "Cancelled", "Departed", "Arrived"].map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Running Days */}
                <div className="form-group">
                    <label className="form-label">Running Days:</label>
                    <div className="checkbox-group">
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                            <label key={day} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="runningDays"
                                    value={day}
                                    checked={trainData.runningDays.includes(day)}
                                    onChange={() => handleRunningDaysChange(day)}
                                />
                                {day}
                            </label>
                        ))}
                    </div>
                    {errors.runningDays && <p className="error-message">{errors.runningDays}</p>}
                </div>




                {/* Submit Button */}
                <button className="form-button" type="submit">
                    Update Train
                </button>
            </form>
            <div className="back-to-home pl-2">
                <Link to="/admin">
                    <p>-- Back --</p>
                </Link>
                <Link to="/TrainList">
                    <button className="edit-btn">Cancel</button>
                </Link>
            </div>
        </>
    );
};

export default EditTrain;

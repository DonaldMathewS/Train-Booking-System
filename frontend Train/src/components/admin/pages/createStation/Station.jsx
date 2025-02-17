import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./Station.css"; // Import the CSS file
import { Link } from "react-router-dom";
import axiosInstance from "../../../axiosIntance/AxiosInstance";

const CreateStation = () => {
    const [stations, setStations] = useState([]);
    const [stationData, setStationData] = useState({
        name: "",
        code: "",
        address: "",
        status: "active",
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchStations();
    }, []);

    const fetchStations = async () => {
        try {
            const response = await axiosInstance.get("/allStations");
            setStations(response.data.data);
        } catch (error) {
            console.error("Error fetching stations:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStationData({ ...stationData, [name]: value });
    };

    const validateForm = () => {
        let errors = {};
        if (!stationData.name.trim()) errors.name = "Station name is required";
        if (!stationData.code.trim()) errors.code = "Station code is required";
        if (!stationData.address.trim()) errors.address = "Address is required";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await axiosInstance.post("/createStation", stationData);
            setStations([...stations, response.data.data]);
            toast.success("Station created successfully!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            setStationData({
                name: "",
                code: "",
                address: "",
                status: "active",
            });
            setErrors({});
        } catch (error) {
            console.error("Error creating station:", error);
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
        <div className="station-container">
            <h2 className="main-heading">Create New Train Station</h2>
            <div className="form-box">
                <form onSubmit={handleSubmit} className="station-form">
                    <div className="form-group">
                        <label className="form-label">Station Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={stationData.name}
                            onChange={handleChange}
                            className="input-field"
                        />
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Station Code:</label>
                        <input
                            type="text"
                            name="code"
                            value={stationData.code}
                            onChange={handleChange}
                            className="input-field"
                        />
                        {errors.code && <p className="error">{errors.code}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Address:</label>
                        <input
                            type="text"
                            name="address"
                            value={stationData.address}
                            onChange={handleChange}
                            className="input-field"
                        />
                        {errors.address && <p className="error">{errors.address}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Status:</label>
                        <select
                            name="status"
                            value={stationData.status}
                            onChange={handleChange}
                            className="select-field"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="under construction">Under Construction</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>

                    <button type="submit" className="submit-button">Create Station</button>
                </form>
            </div>

            <h3 className="heading">All Train Stations</h3>
            <table className="station-table">
                <thead>
                    <tr>
                        <th>Station Name</th>
                        <th>Code</th>
                        <th>Address</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {stations.map((station) => (
                        <tr key={station._id}>
                            <td>{station.name}</td>
                            <td>{station.code}</td>
                            <td>{station.address}</td>
                            <td>{station.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="back-to-home">
                <Link to="/admin">
                    <p>--- Back ---</p>
                </Link>
            </div>
        </div>
    );
};

export default CreateStation;

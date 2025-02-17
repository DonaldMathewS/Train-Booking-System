import React, { useState, useEffect } from "react";
import axiosInstance from "../../../axiosIntance/AxiosInstance";
import "./Compartment.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const CreateCompartments = () => {
    const [compartments, setCompartments] = useState([]);
    const [newCompartment, setNewCompartment] = useState({
        type: "",
        capacity: "",
        price: "",
    });

    useEffect(() => {
        fetchCompartments();
    }, []);

    const fetchCompartments = async () => {
        try {
            const response = await axiosInstance.get("/findComp");
            setCompartments(response.data.data);
        } catch (error) {
            console.error("Error fetching compartments:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCompartment((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddCompartment = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("/compartment", newCompartment);
            setCompartments((prev) => [...prev, response.data.data]);
            setNewCompartment({ type: "", capacity: "", price: "" });
            toast.success(" compartment added", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        } catch (error) {
            console.error("Error adding compartment:", error);
            toast.error("Error adding compartment" || "Something went wrong", {
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

    const handleDeleteCompartment = async (id) => {
        try {
            await axiosInstance.delete(`/delete/${id}`);
            setCompartments((prev) => prev.filter((compartment) => compartment._id !== id));
        } catch (error) {
            console.error("Error deleting compartment:", error);
        }
    };

    return (
        <div className="compartment-container">
            <h1 className="title">Compartment Management</h1>

            <form onSubmit={handleAddCompartment} className="form-container">
                <div className="form-group">
                    <label className="form-label">Type</label>
                    <select
                        name="type"
                        value={newCompartment.type}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="Sleeper">Sleeper</option>
                        <option value="AC First Class">AC First Class</option>
                        <option value="AC Second Class">AC Second Class</option>
                        <option value="AC Third Class">AC Third Class</option>
                        <option value="General">General</option>
                        <option value="Chair Car">Chair Car</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Capacity</label>
                    <input
                        type="number"
                        name="capacity"
                        value={newCompartment.capacity}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                        min="0"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={newCompartment.price}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                        min="0"
                    />
                </div>

                <button
                    type="submit"
                    className="form-button"
                >
                    Add Compartment
                </button>
            </form>

            <h2 className="subtitle">Existing Compartments</h2>
            <table className="compartment-table">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Capacity</th>
                        <th>Price</th>
                        <th>Booked Seats</th>
                        <th>Available Seats</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {compartments.map((compartment) => (
                        <tr key={compartment._id}>
                            <td>{compartment.type}</td>
                            <td>{compartment.capacity}</td>
                            <td>${compartment.price}</td>
                            <td>{compartment.bookedSeats}</td>
                            <td>{compartment.availableSeats}</td>
                            <td>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDeleteCompartment(compartment._id)}
                                >
                                    Delete
                                </button>
                            </td>
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

export default CreateCompartments;

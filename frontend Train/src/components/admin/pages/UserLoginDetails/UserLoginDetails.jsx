import React, { useState, useEffect } from "react";
import "./UserLoginDetails.css"
import { Link } from "react-router-dom";
import axiosInstance from "../../../axiosIntance/AxiosInstance";
const UserLoginDetails = () => {
    const [loginDetails, setLoginDetails] = useState([]);
    console.log("detatils", loginDetails)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLoginDetails = async () => {
            try {
                const response = await axiosInstance.get("/finduser");
                setLoginDetails(response.data.data);
            } catch (err) {
                setError("Failed to fetch login details");
            } finally {
                setLoading(false);
            }
        };

        fetchLoginDetails();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2 className="headuserpro">User Login Details</h2>

            <table border="1" className="user-login-details-table">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Ticket Booked</th>
                    </tr>
                </thead>
                <tbody>
                    {loginDetails.map((detail) => (
                        <tr key={detail._id}>
                            <td>{detail.userName}</td>
                            <td>{detail.email}</td>
                            <td>
                                {detail.ticketData.bookingId ? detail.ticketData.bookingId : "No Tickets"}
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

export default UserLoginDetails;

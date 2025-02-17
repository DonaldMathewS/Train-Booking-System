import React, { useState, useEffect } from "react";
import "./UserDetails.css"
import { Link } from "react-router-dom";
import axiosInstance from "../../../axiosIntance/AxiosInstance";
const AdminProfileTable = () => {
    const [profiles, setProfiles] = useState([]);
    console.log("%%Profile", profiles)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await axiosInstance.get("/allProfile");
                setProfiles(response.data.data);
            } catch (error) {
                console.error("Error fetching profiles:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfiles();
    }, []);

    if (loading) {
        return <div>Loading profiles...</div>;
    }

    return (
        <div>
            <h2 className="headuserpro">User Profiles</h2>

            <table border="1" className="admin-profile-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Birthday</th>
                        <th>Gender</th>
                        <th>Marital Status</th>
                        <th>Address</th>
                        <th>Pincode</th>
                        <th>State</th>
                        <th>Nationality</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {profiles.map((profile) => (
                        <tr key={profile._id}>
                            <td>{profile.name}</td>
                            <td>{new Date(profile.birthday).toLocaleDateString()}</td>
                            <td>{profile.gender}</td>
                            <td>{profile.maritalStatus}</td>
                            <td>{profile.address}</td>
                            <td>{profile.pincode}</td>
                            <td>{profile.state}</td>
                            <td>{profile.nationality}</td>
                            <td>{profile.phone}</td>
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

export default AdminProfileTable;

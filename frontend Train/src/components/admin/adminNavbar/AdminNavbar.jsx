import React from "react";
import "./AdminNavbar.css";
import { assets } from "../../../assets/assets";
import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
    const navigate = useNavigate();

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token
        localStorage.removeItem("user");  // Remove user info
        navigate("/login"); // Redirect to login page
    };

    return (
        <>
            <div className="AdminNavbar">
                <div className="alogo">
                    <h3>Admin Dashboard</h3>
                </div>
                <div className="navIcons">
                    <Link to="">
                        <img src={assets.profile_image} alt="Profile" className="adminprofile" />
                    </Link>
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default AdminNavbar;

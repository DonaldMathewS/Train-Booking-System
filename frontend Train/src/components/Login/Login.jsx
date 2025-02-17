import React, { useContext, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../Storecontext/StoreContext";
import { toast } from "react-toastify";
import axiosInstance from "../axiosIntance/axiosInstance";

export default function Login() {
    const navigate = useNavigate();
    const { setToken } = useContext(StoreContext);
    const admin = localStorage.getItem("user")
    const [loginData, setLoginData] = useState({
        userName: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    // Handle input changes and update state
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    // Validate inputs
    const validate = () => {
        const newErrors = {};

        if (!loginData.userName) {
            newErrors.userName = "Username is required";
        } else if (!/^[a-zA-Z0-9]/.test(loginData.userName)) {
            newErrors.userName = "Username can only contain letters and numbers";
        }

        if (!loginData.password) {
            newErrors.password = "Password is required";
        } else if (loginData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        } else if (!/[A-Z]/.test(loginData.password)) {
            newErrors.password = "Password must contain at least one uppercase letter";
        } else if (!/[a-z]/.test(loginData.password)) {
            newErrors.password = "Password must contain at least one lowercase letter";
        } else if (!/[0-9]/.test(loginData.password)) {
            newErrors.password = "Password must contain at least one number";
        }

        return newErrors;
    };

    // Handle form submission
    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});

        try {
            const res = await axiosInstance.post("/login", loginData);
            if (res.data.success) {
                setToken(res.data.token);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", res.data.data?.userName);

                const updatedAdmin = res.data.data?.userName; // Fix admin retrieval

                toast.success("Login successfully", { position: "top-center" });

                navigate(updatedAdmin === "admin1" ? "/admin" : "/");
            } else {
                toast.error(res.data.message || "Login failed", { position: "top-center" });
            }
        } catch (error) {
            console.error("Login Error:", error);
            toast.error(error.response?.data?.message || "Something went wrong", {
                position: "top-center",
            });
        }
    };


    return (
        <div className="login-container" id="loginPage">
            <div className="form-container">
                <form onSubmit={handleLoginSubmit}>
                    <h1 className="lh1 text-black">Login</h1>

                    {/* Username input */}
                    <div className="mb-3">
                        <label htmlFor="userName" className="form-label">
                            Username
                        </label>
                        <input
                            type="text"
                            name="userName"
                            className={`form-control ${errors.userName ? "is-invalid" : ""}`}
                            value={loginData.userName}
                            onChange={handleInputChange}
                            placeholder="Enter username"
                        />
                        {errors.userName && (
                            <div className="invalid-feedback">{errors.userName}</div>
                        )}
                    </div>

                    {/* Password input */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                            value={loginData.password}
                            onChange={handleInputChange}
                            placeholder="Enter password"
                        />
                        {errors.password && (
                            <div className="invalid-feedback">{errors.password}</div>
                        )}
                    </div>

                    {/* Submit button */}
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>

                    {/* Register link */}
                    <p className="mt-3 q text-black">
                        Create your account? <Link to="/Register">Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

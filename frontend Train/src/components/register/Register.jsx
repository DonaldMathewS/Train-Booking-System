import React, { useContext, useState } from 'react';
import axiosInstance from '../axiosIntance/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import { StoreContext } from '../Storecontext/StoreContext';
import { toast } from 'react-toastify';

export default function Register() {
    const nav = useNavigate();
    const { setToken } = useContext(StoreContext);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const eventHandle = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/;
        return regex.test(password);
    };


    const validateUserName = (userName) => {
        const regex = /^[a-zA-Z0-9_]/;
        return regex.test(userName);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");  // Reset the error message before starting validation

        // Basic validation
        if (!user.userName || !user.email || !user.password || !user.confirmPassword) {
            setError('All fields are required');
            return;
        }

        // Username validation
        if (!validateUserName(user.userName)) {
            setError('Username must be at least 3 characters long and can only contain letters, numbers, and underscores');
            return;
        }

        // Email validation
        if (!validateEmail(user.email)) {
            setError('Please enter a valid email address');
            return;
        }

        // Password validation
        if (!validatePassword(user.password)) {
            setError('Password must be at least 8 characters, include a number and an uppercase letter');
            return;
        }

        // Password match validation
        if (user.password !== user.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const res = await axiosInstance.post('/createUser', user);
            console.log('####', res.data);
            const id = res.data.data._id;
            setToken(res.data.token);

            if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                toast.success("Registered successfully", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                });
            }
            nav("/");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            setError(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h1 className="rh1 text-black">Register</h1>
                    <div className="mb-3">
                        <label htmlFor="exampleInputUsername" className="form-label">Username</label>
                        <input
                            type="text" name="userName"
                            className="form-control"
                            id="exampleInputUsername"
                            value={user.userName}
                            onChange={eventHandle}
                            placeholder="Enter username"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input
                            type="email" name="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Enter E-mail"
                            value={user.email}
                            onChange={eventHandle}
                        />
                        <div id="emailHelp" className="form-text text-light">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input
                            type="password" name="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Create password"
                            value={user.password}
                            onChange={eventHandle}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputConfirmPassword" className="form-label">Confirm Password</label>
                        <input
                            type="password" name="confirmPassword"
                            className="form-control"
                            id="exampleInputConfirmPassword"
                            placeholder="Confirm your password"
                            value={user.confirmPassword}
                            onChange={eventHandle}
                        />
                    </div>
                    {error && <div className="error-message" style={{ color: 'red', fontSize: '14px', marginTop: '10px' }}>{error}</div>}
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                    <p className="mt-3 text-black">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

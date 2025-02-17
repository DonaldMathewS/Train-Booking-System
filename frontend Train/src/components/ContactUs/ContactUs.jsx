import React, { useState } from "react";
import axios from "axios";
import "./ContactUs.css";
import axiosInstance from "../axiosIntance/axiosInstance";
import { toast } from "react-toastify";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post("/contact", formData);

            if (response.data.success) {
                setFormData({ name: "", email: "", message: "" });
                toast.success("Message sent successfully!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                });
            }
        } catch (error) {
            toast.error("Failed to send message. Please try again.", {
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
        <div className="contact-container">
            <div className="contact-content">
                <h1 className="contact-title">Contact Us</h1>
                <p className="contact-description">
                    We'd love to hear from you! Whether you have a question about our
                    services, pricing, or anything else, our team is ready to answer all
                    your inquiries.
                </p>


                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-input"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-input"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            className="form-textarea"
                            placeholder="Write your message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="form-button">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;

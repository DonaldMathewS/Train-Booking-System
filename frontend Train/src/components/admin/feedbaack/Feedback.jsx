import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosIntance/AxiosInstance";
import "./FeedBack.css";
import { Link } from "react-router-dom";

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axiosInstance.get("/getContact");
                setFeedbacks(response.data.data);
                setLoading(false);
            } catch (error) {
                setError("Failed to load feedback messages.");
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    return (
        <div className="feedback-container">
            <h1 className="feedback-title">User Feedback</h1>

            {loading && <p className="loading-message">Loading feedback...</p>}
            {error && <p className="error-message">{error}</p>}

            <div className="feedback-list">
                {feedbacks.length > 0 ? (
                    feedbacks.map((feedback) => (
                        <div key={feedback._id} className="feedback-card">
                            <h3 className="feedback-name">{feedback.name}</h3>
                            <p className="feedback-email">{feedback.email}</p>
                            <p className="feedback-text">{feedback.message}</p>
                        </div>
                    ))
                ) : (
                    <p className="no-feedback">No feedback messages available.</p>
                )}
            </div>
            <div className="back-to-home">
                <Link to="/admin">
                    <p>--- Back ---</p>
                </Link>
            </div>
        </div>
    );
};

export default Feedback;

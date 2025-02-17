import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import './UserPayment.css';
import axiosInstance from '../../../axiosIntance/axiosInstance';
import { StoreContext } from '../../../Storecontext/StoreContext';
import { Link } from 'react-router-dom';

const UserPayment = () => {
    const { token } = useContext(StoreContext); // Get the token from context
    const [payments, setPayments] = useState([]);
    const [status, setStatus] = useState('');  // The new status to update
    const [selectedPayment, setSelectedPayment] = useState(null); // Track the selected payment for status update

    useEffect(() => {
        if (token) {
            getUserPayments();  // Fetch user payments when the component is mounted
        }
    }, [token]);

    // Fetch the user's payments
    const getUserPayments = async () => {
        try {
            const res = await axiosInstance.get('/getuserpayment', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPayments(res.data.data.payments);  // Set the payments data
        } catch (error) {
            toast.error('Error fetching payments.', { position: 'bottom-right' });
            console.error('Error fetching payments:', error);
        }
    };

    // Handle status change for a specific payment
    const handleStatusChange = (event, paymentId) => {
        const newStatus = event.target.value;
        setStatus(newStatus); // Update global status state
        setSelectedPayment(paymentId); // Track which payment was selected
    };

    // Handle form submission to update payment status
    const handleUpdateStatus = async (paymentId) => {
        if (!status || status === '') {
            toast.error('Please select a status.', { position: 'bottom-right' });
            return;
        }

        try {
            const res = await axiosInstance.put(
                `/ubdateUserpayment`,  // Ensure this endpoint is correct
                { paymentId, status },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            toast.success('Payment status updated successfully!', { position: 'bottom-right' });
            getUserPayments(); // Refresh the payment list after the update
        } catch (error) {
            toast.error('Error updating payment status.', { position: 'bottom-right' });
            console.error('Error updating payment status:', error);
        }
    };

    return (
        <div className="user-payment-page">
            <h1>Update Payment Status</h1>

            {/* Payment Table */}
            <div className="payments-table">
                <h2>Your Payments</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Action</th> {/* Add a column for the action button */}
                        </tr>
                    </thead>
                    <tbody>
                        {payments.length === 0 ? (
                            <tr>
                                <td colSpan="5">No payments found.</td>
                            </tr>
                        ) : (
                            payments.map((payment) => (
                                <tr key={payment._id}>
                                    <td>{payment.bookingId}</td>
                                    <td>${payment.amount}</td>
                                    <td>
                                        {/* Dropdown inside table */}
                                        <select
                                            value={payment._id === selectedPayment ? status : payment.status}
                                            onChange={(e) => handleStatusChange(e, payment._id)}
                                        >
                                            <option value="Completed">Completed</option>
                                            <option value="Refunded">Refunded</option>
                                        </select>
                                    </td>
                                    <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <button
                                            onClick={() => handleUpdateStatus(payment._id)}
                                            disabled={status === payment.status || !status}
                                        >
                                            Update Status
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="back-to-home">
                <Link to="/admin">
                    <p>--- Back ---</p>
                </Link>
            </div>
        </div>
    );
};

export default UserPayment;

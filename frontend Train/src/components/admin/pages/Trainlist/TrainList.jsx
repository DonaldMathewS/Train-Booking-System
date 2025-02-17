import React, { useState, useEffect } from 'react';
import './TrainList.css';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../axiosIntance/AxiosInstance';

const TrainList = () => {
    const [trains, setTrains] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log("###trains", trains);
    const nav = useNavigate()
    useEffect(() => {
        const fetchTrains = async () => {
            try {
                const res = await axiosInstance.get('/getTrains');

                if (res.data.success) {
                    setTrains(res.data.data);
                } else {
                    setError(res.data.message);
                }
            } catch (err) {
                setError("Failed to fetch train details");
            } finally {
                setLoading(false);
            }
        };

        fetchTrains();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleEdit = (id) => {
        nav(`/EditTrain/${id}`)
    };

    const handleDelete = async (id) => {
        try {
            const res = await axiosInstance.delete(`/delete/${id}`);
            setTrains(trains.filter(train => train._id !== id))

        } catch (err) {
            setError("Error deleting the train");
        }
    };

    return (
        <>

            <div className="train-list-header">
                <h1>Train Management</h1>
                <p>Manage all the train details below. You can edit or delete any train record.</p>
            </div>



            <div>
                <h2 className='train_heading'></h2>
                <table className="train-table">
                    <thead>
                        <tr>
                            <th>Train ID</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Departure Station</th>
                            <th>Arrival Station</th>
                            <th>Running Days</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trains.map(train => (
                            <tr key={train._id}>
                                <td>{train.trainId}</td>
                                <td>{train.name}</td>
                                <td>{train.type}</td>
                                <td>{train.departureStation?.name}</td>
                                <td>{train.arrivalStation?.name}</td>
                                <td>{train.runningDays?.join(', ')}</td>
                                <td>{train.status}</td>
                                <td className="actions">
                                    <button className="edit-btn" onClick={() => handleEdit(train._id)}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(train._id)}>Delete</button>
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
        </>
    );
};

export default TrainList;

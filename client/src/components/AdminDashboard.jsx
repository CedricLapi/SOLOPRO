import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/users')
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleDeleteUser = (_id) => {
        axios.delete(`http://localhost:8000/api/users/delete/${_id}`)
            .then(res => {
                // Remove the deleted user from the state
                setUsers(prevUsers => prevUsers.filter(user => user._id !== _id));
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <h3>All Registered Users</h3>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        <p>Name: {user.firstName} {user.lastName}</p>
                        <p>Email: {user.email}</p>
                        <p>Admin: {user.isAdmin ? 'Yes' : 'No'}</p>
                        <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                        <hr></hr>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;

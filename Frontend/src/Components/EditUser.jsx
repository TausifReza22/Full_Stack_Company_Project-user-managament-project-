// src/components/EditUser.js

import React, { useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../Context/UserContext';
import './Edit.css'; // Import the CSS file


const EditUser = () => {
    const { editingUser, closeEditModal } = useUserContext(); // Access editingUser and closeEditModal from context
    const [name, setName] = useState(editingUser.name);
    const [email, setEmail] = useState(editingUser.email);
    const [password, setPassword] = useState(''); // Change age to password

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            await axios.put(`http://localhost:5000/api/users/${editingUser._id}`, {
                name,
                email,
                password, // Send password instead of age
            }, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });
            closeEditModal(); // Close the modal after update
        } catch (error) {
            alert(`Error updating user: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <form onSubmit={handleUpdate}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <input
                        type="password" // Change input type to password
                        value={password} // Use password state variable
                        onChange={(e) => setPassword(e.target.value)} // Update password on change
                        placeholder="Password" // Change placeholder to Password
                    />
                    <button type="submit">Update</button>
                    <button type="button" onClick={closeEditModal}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditUser;

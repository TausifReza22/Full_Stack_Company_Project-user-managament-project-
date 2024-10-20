import React, { useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../../Context/UserContext';
import './Edit.css'; // Import the CSS file

const EditUser = () => {
    const { editingUser, closeEditModal } = useUserContext(); // Access editingUser and closeEditModal from context
    const [name, setName] = useState(editingUser.name);
    const [email, setEmail] = useState(editingUser.email);
    const [password, setPassword] = useState(''); // Password state
    const [mobile, setMobile] = useState(editingUser.mobile); // Add mobile state

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            await axios.put(`http://localhost:8080/api/users/update/${editingUser._id}`, {
                name,
                email,
                password,
                mobile, // Include mobile in the request
            }, {
                token:token
            });
            alert(`Updating user data: ${response.data.message}`);
            closeEditModal(); 
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
                        required
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password" // Input type for password
                        value={password} // Use password state variable
                        onChange={(e) => setPassword(e.target.value)} // Update password on change
                        placeholder="Password" // Change placeholder to Password
                        required
                    />
                    <input
                        type="tel" // Input type for mobile number
                        value={mobile} // Use mobile state variable
                        onChange={(e) => setMobile(e.target.value)} // Update mobile on change
                        placeholder="Mobile" // Change placeholder to Mobile
                        required
                    />
                    <button type="submit">Update</button>
                    <button type="button" onClick={closeEditModal}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditUser;
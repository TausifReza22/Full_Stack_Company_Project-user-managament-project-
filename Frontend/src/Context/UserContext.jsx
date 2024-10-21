import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';  // Import Toastify
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify CSS

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/users/find/all');
            setUsers(response.data);
        } catch (error) {
            toast.error(`${error.response?.data?.message || error.message}`);
        }
    };

    const handleDelete = async (userId) => {
        const token = localStorage.getItem('token'); // Make sure this line is present

        // Log the token to see if it's retrieved correctly
        console.log("Token for delete:", token);

        if (!token) {
            toast.error('No token found, please log in again.', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return; // Prevent further execution if token is missing
        }

        try {
            await axios.delete(`http://localhost:8080/api/users/delete/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token here
                },
            });
            setUsers(users.filter(user => user._id !== userId));
            toast.success('User deleted successfully');
        } catch (error) {
            toast.error(`${error.response?.data?.message || error.message}`);
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
    };

    const closeEditModal = () => {
        setEditingUser(null);
        fetchUsers();
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <UserContext.Provider value={{ users, editingUser, handleDelete, handleEdit, closeEditModal }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};

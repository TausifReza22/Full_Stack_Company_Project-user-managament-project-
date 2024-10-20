// src/context/UserContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/users/find/all', {
            });
            setUsers(response.data);
        } catch (error) {
            alert(`Error fetching users: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleDelete = async (userId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:8080/api/users/find/all/${userId}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            alert(`Error deleting user: ${error.response?.data?.message || error.message}`);
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

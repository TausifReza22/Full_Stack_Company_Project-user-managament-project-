// src/components/UserList.js

import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useUserContext } from '../../Context/UserContext'; // Import useUserContext
import EditUser from '../EditUser/EditUser'; // Importing the EditUser component
import './UserList.css'; // Import the CSS file

const UserList = () => {
  const { users, editingUser, handleDelete, handleEdit, closeEditModal } = useUserContext(); // Destructure context values

  return (
    <div className="user-list-container">
      <h2 className="user-list-title">User List</h2>
      <div className="user-cards">
        {users.map((user) => (
          <div className="user-card" key={user._id}>
            <div className="user-info">
              <h3 className="user-name">{user.name}</h3>
              <p className="user-email">Email: {user.email}</p>
              <p className="user-email">Mobile: {user.mobile}</p>
            </div>
            <div className="user-actions">
              <FaEdit 
                className="edit-icon" 
                onClick={() => handleEdit(user)} // Edit user on icon click
                title="Edit User"
              />
              <FaTrash 
                className="delete-icon" 
                onClick={() => handleDelete(user._id)} 
                title="Delete User"
              />
            </div>
          </div>
        ))}
      </div>
      {editingUser && (
        <EditUser 
          user={editingUser} 
          onClose={() => {
            closeEditModal();
          }} 
        />
      )}
    </div>
  );
};

export default UserList;

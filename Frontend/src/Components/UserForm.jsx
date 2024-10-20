// src/components/Register.js

import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Import the CSS file for styling

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        name,
        email,
        password,
      });
      alert(`Registration successful: ${response.data.token}`);
    } catch (error) {
      alert(`Registration failed: ${error.response.data.message}`);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card"> {/* Added a wrapper for the card effect */}
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleRegister} className="register-form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="register-input"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
            required
          />
          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;

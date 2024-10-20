import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Import the CSS file for styling
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState(''); // State for mobile number
  const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/register', {
        name,
        email,
        password,
        mobile,
      });
      alert(`Registration successful! Welcome, ${response.data.user.name}.`);
      // Reset the form after successful registration
      setName('');
      setEmail('');
      setPassword('');
      setMobile('');
    } catch (error) {
      alert(`Registration failed: ${error.response?.data?.message || 'An error occurred'}`);
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
          <div className="password-container"> {/* Wrapper for password input */}
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="register-input"
              required
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password"
              role="button"
              tabIndex={0} // Make it keyboard accessible
              onKeyDown={(e) => e.key === 'Enter' && setShowPassword(!showPassword)} // Handle Enter key
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </div>
          </div>
          <input
            type="tel"
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
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
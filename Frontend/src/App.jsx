// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Register from './Components/UserForm/UserForm';
import Login from './Components/Login/Login';
import UserList from './Components/UserList/UserList';
import { UserProvider } from './Context/UserContext'; 
import Home from './Components/Home/Home';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <UserProvider> 
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<UserList/>} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </UserProvider>
  );
};

export default App;

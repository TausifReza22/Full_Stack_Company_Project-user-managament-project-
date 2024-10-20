// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './Components/UserForm';
import Login from './Components/Login';
import UserList from './Components/UserList';
import { UserProvider } from './Context/UserContext'; 
import Home from './Components/Home';

const App = () => {
  return (
    <UserProvider> 
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;

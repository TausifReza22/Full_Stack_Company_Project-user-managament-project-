import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { createToken } from '../middleware/authMiddleware.js';

// Register User
const registerUser = async (req, res) => {
  const { name, email, password, mobile } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, mobile });
    await user.save();
    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      res.status(400).json("Invalid Email. Please check..")
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user)
      res.cookie('token', token)
      res.status(200).json({ message: "user login successfully..", user, token })
    } else {
      res.status(400).json("invalid password..")
    }
  } catch (err) {
    res.status(500).json({ message: 'Error logging in' });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Update user
const updateUser = async (req, res) => {
  const { name, email, password, mobile } = req.body;
  try {
    // Find the existing user by ID
    const existingUser = await User.findById(req.params.id);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields
    if (name) existingUser.name = name;
    if (email) existingUser.email = email;
    if (mobile) existingUser.mobile = mobile;
    if (password) {
      // Hash the password if provided
      existingUser.password = await bcrypt.hash(password, 10);
    }

    // Save the updated user
    const updatedUser = await existingUser.save();

    // Send back the updated user data
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ message: 'Error updating user' });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};

export { registerUser, loginUser, getAllUsers, updateUser, deleteUser };
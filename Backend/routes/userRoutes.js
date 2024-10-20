import express from 'express';
import { registerUser, loginUser, getAllUsers, updateUser, deleteUser } from '../controllers/userController.js';
import {verifyToken} from '../middleware/authenticate.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', verifyToken, getAllUsers);
router.put('/users/:id', verifyToken, updateUser);
router.delete('/users/:id', verifyToken, deleteUser);

export default router;
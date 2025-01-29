import express from 'express';
import {register, login, changeUsername, getUserDetails, refreshToken} from '../controllers/authController.js';
import { protect } from '../middleware/protect.js';

const router = express.Router();

// Route for user registration
router.post('/register', register);

// Route for user login
router.post('/login', login);

// Route for changing the username of the logged-in user
router.put('/change-username', protect, changeUsername);

router.get('/user-details', protect, getUserDetails);

//Route for refresh token
router.get('/refresh-token',protect, refreshToken)

export default router;
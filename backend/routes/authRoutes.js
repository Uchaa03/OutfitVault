import express from 'express';
import { register, login, changeUsername, getUserDetails } from '../controllers/authController.js';
import { protect } from '../middleware/protect.js';

const router = express.Router();

/**
 * @route POST /register
 * @description Registers a new user in the system.
 * @access Public
 * @param {string} email - User's email address.
 * @param {string} password - User's password.
 * @param {string} username - User's desired username.
 * @returns {Object} 201 - Successful registration response with user info.
 * @returns {Object} 400 - Bad request (e.g., missing fields, invalid input).
 */
router.post('/register', register);

/**
 * @route POST /login
 * @description Authenticates a user and returns a JWT token.
 * @access Public
 * @param {string} email - User's email address.
 * @param {string} password - User's password.
 * @returns {Object} 200 - Successful login response with JWT token.
 * @returns {Object} 401 - Unauthorized (e.g., incorrect credentials).
 */
router.post('/login', login);

/**
 * @route PUT /change-username
 * @description Allows the logged-in user to change their username.
 * @access Private
 * @middleware protect - Protects the route, ensuring only authenticated users can access it.
 * @param {string} username - New username for the user.
 * @returns {Object} 200 - Successful response with updated user info.
 * @returns {Object} 400 - Bad request (e.g., invalid username).
 * @returns {Object} 401 - Unauthorized (e.g., invalid or expired JWT).
 */
router.put('/change-username', protect, changeUsername);

/**
 * @route GET /user-details
 * @description Retrieves the details of the currently authenticated user.
 * @access Private
 * @middleware protect - Protects the route, ensuring only authenticated users can access it.
 * @returns {Object} 200 - Successful response with user details.
 * @returns {Object} 401 - Unauthorized (e.g., invalid or expired JWT).
 */
router.get('/user-details', protect, getUserDetails);

export default router;

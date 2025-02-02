import express from 'express';
import {register, login, changeUsername, getUserDetails, refreshToken} from '../controllers/authController.js';
import { protect } from '../middleware/protect.js';

const router = express.Router();

/**
 * @route POST /auth/register
 * @baseUrl https://outfitvault-.onrender.com
 * @localUrl http://localhost:5000
 * @description Registers a new user
 * @access Public
 * 
 * @body {String} email - User's email
 * @body {String} password - User's password
 * @body {String} username - User's username
 * 
 * @example
 * // Request
 * POST /auth/register
 * {
 *   "email": "user@example.com",
 *   "password": "password123",
 *   "username": "username123"
 * }
 * 
 * // Success Response - 201
 * {
 *   "success": true,
 *   "message": "User registered successfully",
 *   "token": "jwt_token_here"
 * }
 * 
 * // Error Response - 400
 * {
 *   "success": false,
 *   "message": "Email already in use"
 * }
 */
router.post('/register', register);

/**
 * @route POST /auth/login
 * @baseUrl https://outfitvault-.onrender.com
 * @localUrl http://localhost:5000
 * @description Authenticates a user
 * @access Public
 * 
 * @body {String} username - User's username
 * @body {String} password - User's password
 * 
 * @example
 * // Request
 * POST /auth/login
 * {
 *   "username": "username123",
 *   "password": "password123"
 * }
 * 
 * // Success Response - 200
 * {
 *   "success": true,
 *   "token": "jwt_token_here"
 * }
 * 
 * // Error Response - 400
 * {
 *   "success": false,
 *   "message": "Invalid credentials"
 * }
 */
router.post('/login', login);

/**
 * @route PUT /auth/change-username
 * @baseUrl https://outfitvault-.onrender.com
 * @localUrl http://localhost:5000
 * @description Changes user's username
 * @access Private
 * 
 * @header {String} Authorization - Bearer token
 * @body {String} newUsername - New username
 * 
 * @example
 * // Request
 * PUT /auth/change-username
 * Authorization: Bearer <token>
 * {
 *   "newUsername": "newUsername123"
 * }
 * 
 * // Success Response - 200
 * {
 *   "success": true,
 *   "message": "Username updated successfully"
 * }
 * 
 * // Error Response - 400
 * {
 *   "success": false,
 *   "message": "Username already in use"
 * }
 */
router.put('/change-username', protect, changeUsername);

/**
 * @route GET /auth/user-details
 * @baseUrl https://outfitvault-.onrender.com
 * @localUrl http://localhost:5000
 * @description Gets authenticated user details
 * @access Private
 * 
 * @header {String} Authorization - Bearer token
 * 
 * @example
 * // Request
 * GET /auth/user-details
 * Authorization: Bearer <token>
 * 
 * // Success Response - 200
 * {
 *   "success": true,
 *   "user": {
 *     "username": "username123",
 *     "email": "user@example.com"
 *   }
 * }
 * 
 * // Error Response - 401
 * {
 *   "success": false,
 *   "message": "Not authorized"
 * }
 */
router.get('/user-details', protect, getUserDetails);

/**
 * @route GET /auth/refresh-token
 * @baseUrl https://outfitvault-.onrender.com
 * @localUrl http://localhost:5000
 * @description Refreshes JWT token
 * @access Private
 * 
 * @header {String} Authorization - Bearer token
 * 
 * @example
 * // Request
 * GET /auth/refresh-token
 * Authorization: Bearer <token>
 * 
 * // Success Response - 200
 * {
 *   "success": true,
 *   "token": "new_jwt_token_here"
 * }
 * 
 * // Error Response - 401
 * {
 *   "success": false,
 *   "message": "Token expired"
 * }
 */
router.get('/refresh-token', protect, refreshToken);

export default router;
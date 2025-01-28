import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import cloudinary from 'cloudinary';
import { protect } from './middleware/protect.js';
import clothRoutes from './routes/clothRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { connectDB } from './config/db.js';
import logger from './middleware/logger.js';

// Load environment variables from ..env.local file
dotenv.config({ path: '../backend/..env.local' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

/**
 * Express application setup.
 *
 * Sets up middlewares such as body parsers, CORS, and a logger for request handling.
 * Defines the authentication and cloth routes, with cloth routes being protected by the
 * `protect` middleware. Establishes a connection to MongoDB and starts the server.
 *
 * @function
 * @returns {void}
 */
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Use the logger middleware
app.use(logger);

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api/cloths', protect, clothRoutes); // Protected routes for cloths

// Connect to the database
connectDB();

/**
 * Starts the Express server on the specified port.
 *
 * If no port is specified in the environment variable, defaults to port 5000.
 *
 * @function
 * @returns {void}
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

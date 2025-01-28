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

// Load environment variables from .env file
dotenv.config({ path: '../backend/.env' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

// Middleware
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

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
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
import compression from 'compression';

// Load environment variables from .env file
dotenv.config({ path: '../.env.local' });

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

app.use(compression());

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

app.get('/sitemap.xml', (req, res) => {
  const baseUrl = 'https://outfitvault-1.onrender.com';
  const today = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}/</loc>
        <lastmod>${today}</lastmod>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${baseUrl}/contact</loc>
        <lastmod>${today}</lastmod>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>${baseUrl}/prompt</loc>
        <lastmod>${today}</lastmod>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>${baseUrl}/about</loc>
        <lastmod>${today}</lastmod>
        <priority>0.6</priority>
      </url>
    </urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(sitemap);
});


// Luego, configura el middleware para servir archivos estáticos del build del frontend
app.use(express.static('build'));

// Y un catch-all para redirigir otras rutas al index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve('build', 'index.html'));
});

import express from 'express';
import { createCloth, recommendOutfit } from '../controllers/clothController.js';
import { protect } from '../middleware/protect.js';
import { upload } from '../controllers/clothController.js';  // Importamos el middleware de multer desde el controlador
import { getCloths } from '../controllers/clothController.js';
import { deleteCloth } from '../controllers/clothController.js';
import { getClothById } from '../controllers/clothController.js';
import { saveClothToUser } from '../controllers/clothController.js';
import { getAvailableFilters } from '../controllers/clothController.js';
import { filterCloths } from '../controllers/clothController.js';

const router = express.Router();

/**
 * @route POST /cloth
 * @baseUrl https://outfitvault-.onrender.com
 * @localUrl http://localhost:5000
 * @description Creates a new clothing item and uploads an image
 * @access Private
 * 
 * @header {String} Authorization - Bearer token
 * @body {File} image - The clothing image file (multipart/form-data)
 * 
 * @example
 * // Request
 * POST /cloth
 * Authorization: Bearer <token>
 * Content-Type: multipart/form-data
 * 
 * // Success Response - 201
 * {
 *   "success": true,
 *   "cloth": {
 *     "_id": "123",
 *     "name": "Blue T-Shirt",
 *     "color": "blue",
 *     "category": "Torso",
 *     "style": "casual",
 *     "imageUrl": "https://..."
 *   }
 * }
 * 
 * // Error Response - 400
 * {
 *   "success": false,
 *   "message": "Image is required"
 * }
 */
router.post('/', protect, upload, createCloth);

/**
 * @route GET /cloth
 * @baseUrl https://outfitvault-.onrender.com
 * @localUrl http://localhost:5000
 * @description Fetches all clothing items for the authenticated user
 * @access Private
 * 
 * @header {String} Authorization - Bearer token
 * 
 * @example
 * // Request
 * GET /cloth
 * Authorization: Bearer <token>
 * 
 * // Success Response - 200
 * {
 *   "success": true,
 *   "cloths": [{
 *     "_id": "123",
 *     "name": "Blue T-Shirt",
 *     "color": "blue",
 *     "category": "Torso"
 *   }]
 * }
 * 
 * // Error Response - 401
 * {
 *   "success": false,
 *   "message": "Not authorized"
 * }
 */
router.get('/', protect, getCloths);

/**
 * @route POST /cloth/recommend-outfit
 * @baseUrl https://outfitvault-.onrender.com
 * @localUrl http://localhost:5000
 * @description Recommends an outfit based on user preferences
 * @access Private
 * 
 * @header {String} Authorization - Bearer token
 * @body {String} userPrompt - Style preferences description
 * 
 * @example
 * // Request
 * POST /cloth/recommend-outfit
 * Authorization: Bearer <token>
 * {
 *   "userPrompt": "casual summer outfit"
 * }
 * 
 * // Success Response - 200
 * {
 *   "success": true,
 *   "outfit": {
 *     "Superior": {...},
 *     "Torso": {...},
 *     "Pantalon": {...},
 *     "Calzado": {...}
 *   }
 * }
 * 
 * // Error Response - 400
 * {
 *   "success": false,
 *   "message": "User prompt not provided"
 * }
 */
router.post('/recommend-outfit', protect, recommendOutfit);


/**
 * @route GET /cloth/filters
 * @baseUrl https://outfitvault-.onrender.com
 * @localUrl http://localhost:5000
 * @description Fetches available filters for clothing items
 * @access Private
 * 
 * @header {String} Authorization - Bearer token
 * 
 * @example
 * // Request
 * GET /cloth/filters
 * Authorization: Bearer <token>
 * 
 * // Success Response - 200
 * {
 *   "success": true,
 *   "filters": {
 *     "categories": ["Superior", "Torso", "Pantalon", "Calzado"],
 *     "colors": ["blue", "red", "black"],
 *     "styles": ["casual", "formal"]
 *   }
 * }
 * 
 * // Error Response - 401
 * {
 *   "success": false,
 *   "message": "Not authorized"
 * }
 */
router.get('/filters', protect, getAvailableFilters);

/**
 * @route GET /cloth/filter
 * @baseUrl https://outfitvault-.onrender.com
 * @localUrl http://localhost:5000
 * @description Filters clothing items by category, color, or style
 * @access Private
 * 
 * @header {String} Authorization - Bearer token
 * @query {String} category - Category filter
 * @query {String} color - Color filter
 * @query {String} style - Style filter
 * 
 * @example
 * // Request
 * GET /cloth/filter?category=Torso&color=blue
 * Authorization: Bearer <token>
 * 
 * // Success Response - 200
 * {
 *   "success": true,
 *   "cloths": [{
 *     "_id": "123",
 *     "name": "Blue T-Shirt",
 *     "color": "blue",
 *     "category": "Torso"
 *   }]
 * }
 * 
 * // Error Response - 400
 * {
 *   "success": false,
 *   "message": "Invalid filter parameters"
 * }
 */
router.get('/filter', protect, filterCloths);

/**
 * @route POST /cloth/save
 * @baseUrl https://outfitvault-.onrender.com
 * @localUrl http://localhost:5000
 * @description Saves a clothing item to user's wardrobe
 * @access Private
 * 
 * @header {String} Authorization - Bearer token
 * @body {String} clothId - ID of the cloth to save
 * 
 * @example
 * // Request
 * POST /cloth/save
 * Authorization: Bearer <token>
 * {
 *   "clothId": "123"
 * }
 * 
 * // Success Response - 200
 * {
 *   "success": true,
 *   "message": "Cloth saved successfully"
 * }
 * 
 * // Error Response - 404
 * {
 *   "success": false,
 *   "message": "Cloth not found"
 * }
 */
router.post('/save', protect, saveClothToUser);

/**
 * @route GET /cloth/:id
 * @baseUrl https://outfitvault-.onrender.com
 * @localUrl http://localhost:5000
 * @description Fetches a specific clothing item by ID
 * @access Private
 * 
 * @header {String} Authorization - Bearer token
 * @param {String} id - Cloth ID
 * 
 * @example
 * // Request
 * GET /cloth/123
 * Authorization: Bearer <token>
 * 
 * // Success Response - 200
 * {
 *   "success": true,
 *   "cloth": {
 *     "_id": "123",
 *     "name": "Blue T-Shirt",
 *     "color": "blue",
 *     "category": "Torso"
 *   }
 * }
 * 
 * // Error Response - 404
 * {
 *   "success": false,
 *   "message": "Cloth not found"
 * }
 */
router.get('/:id', protect, getClothById);

/**
 * @route DELETE /cloth/:id
 * @baseUrl https://outfitvault-.onrender.com
 * @localUrl http://localhost:5000
 * @description Deletes a specific clothing item
 * @access Private
 * 
 * @header {String} Authorization - Bearer token
 * @param {String} id - Cloth ID
 * 
 * @example
 * // Request
 * DELETE /cloth/123
 * Authorization: Bearer <token>
 * 
 * // Success Response - 200
 * {
 *   "success": true,
 *   "message": "Cloth deleted successfully"
 * }
 * 
 * // Error Response - 404
 * {
 *   "success": false,
 *   "message": "Cloth not found"
 * }
 */
router.delete('/:id', protect, deleteCloth);

export default router;

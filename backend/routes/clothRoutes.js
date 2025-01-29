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
 * @description Creates a new clothing item and uploads an image (requires authentication).
 * @access Private
 * @middleware protect - Protects the route, ensuring only authenticated users can access it.
 * @param {File} image - The clothing image (handled by multer).
 * @param {Object} body - Contains the clothing item details (e.g., name, category, etc.).
 * @returns {Object} 201 - Successful creation of the clothing item with details.
 * @returns {Object} 400 - Bad request (e.g., invalid clothing details or image).
 */
router.post('/', protect, upload, createCloth);

/**
 * @route GET /cloth
 * @description Fetches a list of all clothing items for the authenticated user.
 * @access Private
 * @middleware protect - Protects the route, ensuring only authenticated users can access it.
 * @returns {Array} 200 - List of clothing items.
 * @returns {Object} 401 - Unauthorized (e.g., invalid or expired JWT).
 */
router.get('/', protect, getCloths);

/**
 * @route POST /cloth/save
 * @description Saves a clothing item to the authenticated user's profile.
 * @access Private
 * @middleware protect - Protects the route, ensuring only authenticated users can access it.
 * @param {string} clothId - ID of the clothing item to save.
 * @returns {Object} 200 - Successful response indicating the item was saved.
 * @returns {Object} 404 - Not found (e.g., clothing item does not exist).
 */
router.post('/save', protect, saveClothToUser);

/**
 * @route POST /cloth/recommend-outfit
 * @description Recommends an outfit based on the user's selected clothes.
 * @access Private
 * @middleware protect - Protects the route, ensuring only authenticated users can access it.
 * @param {Array} clothsJson - List of clothing items to be considered for outfit recommendation.
 * @param {string} userPrompt - The user's style preferences for the outfit.
 * @returns {Object} 200 - JSON response with recommended outfit (e.g., clothing categories and IDs).
 * @returns {Object} 400 - Bad request (e.g., invalid clothes data or user prompt).
 */
router.post('/recommend-outfit', protect, recommendOutfit);

/**
 * @route GET /cloth/filters
 * @description Fetches available filters for the clothing items (e.g., by category, color).
 * @access Private
 * @middleware protect - Protects the route, ensuring only authenticated users can access it.
 * @returns {Object} 200 - List of available filters.
 */
router.get('/filters', protect, getAvailableFilters);

/**
 * @route GET /cloth/filter
 * @description Filters clothing items based on specific criteria (e.g., category, color).
 * @access Private
 * @middleware protect - Protects the route, ensuring only authenticated users can access it.
 * @param {Object} query - Query parameters for filtering (e.g., category, color).
 * @returns {Array} 200 - List of filtered clothing items.
 * @returns {Object} 400 - Bad request (e.g., invalid filter parameters).
 */
router.get('/filter', protect, filterCloths);

/**
 * @route GET /cloth/:id
 * @description Fetches a specific clothing item by its ID.
 * @access Private
 * @middleware protect - Protects the route, ensuring only authenticated users can access it.
 * @param {string} id - The ID of the clothing item.
 * @returns {Object} 200 - Clothing item details.
 * @returns {Object} 404 - Not found (e.g., clothing item with the given ID doesn't exist).
 */
router.get('/:id', protect, getClothById);

/**
 * @route DELETE /cloth/:id
 * @description Deletes a specific clothing item by its ID.
 * @access Private
 * @middleware protect - Protects the route, ensuring only authenticated users can access it.
 * @param {string} id - The ID of the clothing item to delete.
 * @returns {Object} 200 - Successful deletion of the clothing item.
 * @returns {Object} 404 - Not found (e.g., clothing item with the given ID doesn't exist).
 */
router.delete('/:id', protect, deleteCloth);

export default router;

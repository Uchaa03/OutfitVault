// routes/clothRoutes.js
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

// Ruta protegida que requiere autenticación y carga de imagen para crear una prenda
router.post('/', protect, upload, createCloth);
router.get('/', protect, getCloths);
router.post('/save', protect, saveClothToUser);
router.post('/recommend-outfit', protect, recommendOutfit);
router.get('/filters', protect, getAvailableFilters);
router.get('/filter', protect, filterCloths);
router.get('/:id', protect, getClothById);
router.delete('/:id', protect, deleteCloth);

export default router;

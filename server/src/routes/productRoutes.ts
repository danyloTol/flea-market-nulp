import { Router } from 'express';
import { getProductById } from '../controllers/productController.js';

const router = Router();

// GET /api/products/:id
router.get('/:id', getProductById);

export default router;
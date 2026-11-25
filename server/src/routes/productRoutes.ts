import { Router } from 'express';
import { getProducts, getProductById } from '../controllers/productController';

const router = Router();

// GET /api/products — список товарів з фільтрами
router.get('/', getProducts);

// GET /api/products/:id — деталі конкретного товару
router.get('/:id', getProductById);

export default router;
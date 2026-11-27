import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProductStatus,
  deleteProduct,
} from '../controllers/productController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// Публічні маршрути
router.get('/', getProducts);
router.get('/:id', getProductById);

// Захищені маршрути (тільки для авторизованих студентів)
router.post('/', authenticateToken, createProduct);
router.patch('/:id/status', authenticateToken, updateProductStatus);
router.delete('/:id', authenticateToken, deleteProduct);

export default router;
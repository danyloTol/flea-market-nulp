import { Router } from 'express';
import { register, login, getMe } from '../controllers/authController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// Публічні роути
router.post('/register', register);
router.post('/login', login);

// Захищений роут (потрібен Bearer token)
router.get('/me', authenticateToken, getMe);

export default router;
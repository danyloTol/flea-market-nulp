import { Router } from 'express';
import multer from 'multer';
import { uploadImage } from '../controllers/uploadController';

const router = Router();

// Зберігаємо файл тимчасово в пам'яті (memoryStorage), ліміт 5 МБ
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

// POST /api/upload
router.post('/', upload.single('image'), uploadImage);

export default router;
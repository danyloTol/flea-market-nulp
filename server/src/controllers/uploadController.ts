import { Request, Response } from 'express';
import cloudinary from '../config/cloudinary';

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'Файл зображення не надано' });
      return;
    }

    // Перевірка формату файлу (тільки зображення)
    if (!req.file.mimetype.startsWith('image/')) {
      res.status(400).json({
        message: 'Дозволено завантажувати тільки зображення (JPEG, PNG, WEBP тощо)',
      });
      return;
    }

    // Завантаження файлу через потік прямо в Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'fleamarket-nulp', // окрема папка на Cloudinary
        transformation: [
          { width: 1200, height: 1200, crop: 'limit' }, // оптимізація розміру
          { quality: 'auto' }, // автокомпресія якості
        ],
      },
      (error, result) => {
        if (error || !result) {
          console.error('Помилка Cloudinary:', error);
          res.status(500).json({ message: 'Помилка завантаження фотографії в хмару' });
          return;
        }

        // Повертаємо готове посилання на картинку
        res.status(200).json({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    // Відправляємо буфер файлу в потік
    uploadStream.end(req.file.buffer);
  } catch (error) {
    console.error('Помилка обробника uploadImage:', error);
    res.status(500).json({ message: 'Внутрішня помилка сервера при завантаженні файлу' });
  }
};
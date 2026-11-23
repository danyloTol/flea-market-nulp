import { Request, Response } from 'express';
import prisma from '../prisma.js'; // або '../prisma' залежно від налаштувань модулів

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Валідація: переконуємося, що id це рядок
    if (typeof id !== 'string') {
      res.status(400).json({ message: 'Некоректний ідентифікатор товару' });
      return;
    }

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            telegram: true,
            institute: true,
            createdAt: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    if (!product) {
      res.status(404).json({
        message: `Товар з ID ${id} не знайдено`,
      });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Помилка при отриманні товару:', error);
    res.status(500).json({
      message: 'Внутрішня помилка сервера при отриманні деталей товару',
    });
  }
};
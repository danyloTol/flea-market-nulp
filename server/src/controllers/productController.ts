import { Request, Response } from 'express';
import { Prisma, ProductStatus } from '@prisma/client';
import prisma from '../prisma';
import { AuthRequest } from '../middleware/authMiddleware';

// 1. Отримання списку товарів (Публічний роут)
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      search,
      categoryId,
      location,
      minPrice,
      maxPrice,
      sortBy = 'createdAt',
      order = 'desc',
      page = '1',
      limit = '12',
    } = req.query;

    const where: Prisma.ProductWhereInput = {
      status: ProductStatus.ACTIVE,
    };

    if (typeof search === 'string' && search.trim() !== '') {
      where.OR = [
        { title: { contains: search.trim(), mode: 'insensitive' } },
        { description: { contains: search.trim(), mode: 'insensitive' } },
      ];
    }

    if (typeof categoryId === 'string' && categoryId.trim() !== '') {
      where.categoryId = categoryId.trim();
    }

    if (typeof location === 'string' && location.trim() !== '') {
      where.location = { contains: location.trim(), mode: 'insensitive' };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined && !isNaN(Number(minPrice))) {
        where.price.gte = Number(minPrice);
      }
      if (maxPrice !== undefined && !isNaN(Number(maxPrice))) {
        where.price.lte = Number(maxPrice);
      }
    }

    const pageNum = Math.max(1, Number(page) || 1);
    const take = Math.min(50, Math.max(1, Number(limit) || 12));
    const skip = (pageNum - 1) * take;

    const validSortFields = ['createdAt', 'price'];
    const sortField = validSortFields.includes(String(sortBy)) ? String(sortBy) : 'createdAt';
    const sortOrder: Prisma.SortOrder = String(order).toLowerCase() === 'asc' ? 'asc' : 'desc';

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take,
        orderBy: {
          [sortField]: sortOrder,
        },
        include: {
          category: {
            select: { id: true, name: true, slug: true },
          },
          user: {
            select: { id: true, name: true, telegram: true, institute: true },
          },
        },
      }),
      prisma.product.count({ where }),
    ]);

    res.status(200).json({
      data: products,
      pagination: {
        total: totalCount,
        page: pageNum,
        limit: take,
        totalPages: Math.ceil(totalCount / take),
      },
    });
  } catch (error) {
    console.error('Помилка при отриманні списку товарів:', error);
    res.status(500).json({ message: 'Помилка сервера при отриманні товарів' });
  }
};

// 2. Отримання деталей товару за ID (Публічний роут)
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

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
          select: { id: true, name: true, slug: true },
        },
      },
    });

    if (!product) {
      res.status(404).json({ message: `Товар не знайдено` });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Помилка при отриманні товару:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
};

// 3. Створення нового товару (Захищений роут: POST /api/products)
export const createProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ message: 'Неавторизовано' });
      return;
    }

    const { title, description, price, images, location, categoryId } = req.body;

    // Валідація обов'язкових полів
    if (!title || !description || !location || !categoryId) {
      res.status(400).json({
        message: "Обов'язкові поля: title, description, location, categoryId",
      });
      return;
    }

    // Перевірка існування категорії
    const categoryExists = await prisma.category.findUnique({
      where: { id: String(categoryId) },
    });

    if (!categoryExists) {
      res.status(400).json({ message: 'Вказана категорія не існує' });
      return;
    }

    const newProduct = await prisma.product.create({
      data: {
        title: String(title).trim(),
        description: String(description).trim(),
        price: Number(price) >= 0 ? Number(price) : 0,
        images: Array.isArray(images) ? images : [],
        location: String(location).trim(),
        status: ProductStatus.ACTIVE,
        userId,
        categoryId: String(categoryId),
      },
      include: {
        category: true,
        user: {
          select: { id: true, name: true, telegram: true, institute: true },
        },
      },
    });

    res.status(201).json({
      message: 'Оголошення успішно створено',
      product: newProduct,
    });
  } catch (error) {
    console.error('Помилка створення товару:', error);
    res.status(500).json({ message: 'Помилка сервера при створенні оголошення' });
  }
};

// 4. Оновлення статусу товару (Захищений роут: PATCH /api/products/:id/status)
export const updateProductStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { status } = req.body;

    if (!userId) {
      res.status(401).json({ message: 'Неавторизовано' });
      return;
    }

    // Перевірка чи валідний статус
    if (!status || !Object.values(ProductStatus).includes(status)) {
      res.status(400).json({
        message: `Некоректний статус. Дозволені: ${Object.values(ProductStatus).join(', ')}`,
      });
      return;
    }

    // Перевірка існування товару та авторства
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      res.status(404).json({ message: 'Товар не знайдено' });
      return;
    }

    if (product.userId !== userId) {
      res.status(403).json({ message: 'Ви можете змінювати статус тільки своїх оголошень' });
      return;
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { status },
    });

    res.status(200).json({
      message: 'Статус оголошення успішно оновлено',
      product: updatedProduct,
    });
  } catch (error) {
    console.error('Помилка оновлення статусу:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
};

// 5. Видалення товару (Захищений роут: DELETE /api/products/:id)
export const deleteProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    if (!userId) {
      res.status(401).json({ message: 'Неавторизовано' });
      return;
    }

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      res.status(404).json({ message: 'Товар не знайдено' });
      return;
    }

    // Перевірка прав (тільки автор може видалити)
    if (product.userId !== userId) {
      res.status(403).json({ message: 'Ви можете видаляти тільки свої оголошення' });
      return;
    }

    await prisma.product.delete({
      where: { id },
    });

    res.status(200).json({ message: 'Оголошення успішно видалено' });
  } catch (error) {
    console.error('Помилка видалення товару:', error);
    res.status(500).json({ message: 'Помилка сервера при видаленні оголошення' });
  }
};
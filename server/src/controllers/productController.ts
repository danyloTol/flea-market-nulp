import { Request, Response } from 'express';
import { Prisma, ProductStatus } from '@prisma/client';
import prisma from '../prisma';

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

    // Базовий фільтр: показуємо тільки активні оголошення
    const where: Prisma.ProductWhereInput = {
      status: ProductStatus.ACTIVE,
    };

    // 1. Пошук за ключовими словами у назві або описі (case-insensitive)
    if (typeof search === 'string' && search.trim() !== '') {
      where.OR = [
        { title: { contains: search.trim(), mode: 'insensitive' } },
        { description: { contains: search.trim(), mode: 'insensitive' } },
      ];
    }

    // 2. Фільтрація за категорією
    if (typeof categoryId === 'string' && categoryId.trim() !== '') {
      where.categoryId = categoryId.trim();
    }

    // 3. Фільтрація за локацією (корпус/гуртожиток)
    if (typeof location === 'string' && location.trim() !== '') {
      where.location = { contains: location.trim(), mode: 'insensitive' };
    }

    // 4. Фільтрація за діапазоном цін (minPrice, maxPrice)
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined && !isNaN(Number(minPrice))) {
        where.price.gte = Number(minPrice);
      }
      if (maxPrice !== undefined && !isNaN(Number(maxPrice))) {
        where.price.lte = Number(maxPrice);
      }
    }

    // 5. Пагінація
    const pageNum = Math.max(1, Number(page) || 1);
    const take = Math.min(50, Math.max(1, Number(limit) || 12));
    const skip = (pageNum - 1) * take;

    // 6. Сортування
    const validSortFields = ['createdAt', 'price'];
    const sortField = validSortFields.includes(String(sortBy)) ? String(sortBy) : 'createdAt';
    const sortOrder: Prisma.SortOrder = String(order).toLowerCase() === 'asc' ? 'asc' : 'desc';

    // Запит до бази
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
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              telegram: true,
              institute: true,
            },
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
    console.error('Помилка при отриманні каталогу товарів:', error);
    res.status(500).json({
      message: 'Внутрішня помилка сервера при отриманні списку товарів',
    });
  }
};
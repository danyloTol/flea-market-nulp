import { Request, Response } from 'express';
import { Prisma, ProductStatus } from '@prisma/client';
import prisma from '../prisma';

// 1. Отримання списку товарів з фільтрами, пошуком та пагінацією
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

// 2. Отримання деталей конкретного товару за ID
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
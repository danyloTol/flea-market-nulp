import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';
import { AuthRequest } from '../middleware/authMiddleware';

const SALT_ROUNDS = 10;
const JWT_EXPIRES_IN = '7d';

// Генератор токена
const generateToken = (userId: string, email: string): string => {
  const secret = process.env.JWT_SECRET || 'fallback_secret_key';
  return jwt.sign({ userId, email }, secret, { expiresIn: JWT_EXPIRES_IN });
};

// 1. Реєстрація нового студента (POST /api/auth/register)
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name, telegram, institute } = req.body;

    // Валідація обов'язкових полів
    if (!email || !password || !name) {
      res.status(400).json({
        message: "Обов'язкові поля: email, password, name",
      });
      return;
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanName = String(name).trim();

    if (password.length < 6) {
      res.status(400).json({
        message: 'Пароль повинен містити щонайменше 6 символів',
      });
      return;
    }

    // Перевірка унікальності email
    const existingUser = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existingUser) {
      res.status(409).json({
        message: 'Користувач із цією електронною поштою вже зареєстрований',
      });
      return;
    }

    // Хешування пароля
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // Створення в базі даних
    const newUser = await prisma.user.create({
      data: {
        email: cleanEmail,
        passwordHash,
        name: cleanName,
        telegram: telegram ? String(telegram).trim() : null,
        institute: institute ? String(institute).trim() : null,
      },
      select: {
        id: true,
        email: true,
        name: true,
        telegram: true,
        institute: true,
        createdAt: true,
      },
    });

    // Генерація JWT
    const token = generateToken(newUser.id, newUser.email);

    res.status(201).json({
      message: 'Реєстрація успішна',
      token,
      user: newUser,
    });
  } catch (error) {
    console.error('Помилка реєстрації:', error);
    res.status(500).json({ message: 'Помилка сервера під час реєстрації' });
  }
};

// 2. Вхід користувача (POST /api/auth/login)
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Введіть email та пароль' });
      return;
    }

    const cleanEmail = String(email).trim().toLowerCase();

    // Пошук користувача
    const user = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (!user) {
      res.status(401).json({ message: 'Невірний email або пароль' });
      return;
    }

    // Перевірка пароля
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      res.status(401).json({ message: 'Невірний email або пароль' });
      return;
    }

    // Генерація JWT
    const token = generateToken(user.id, user.email);

    res.status(200).json({
      message: 'Успішний вхід',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        telegram: user.telegram,
        institute: user.institute,
      },
    });
  } catch (error) {
    console.error('Помилка входу:', error);
    res.status(500).json({ message: 'Помилка сервера під час входу' });
  }
};

// 3. Отримання поточного профілю за токеном (GET /api/auth/me)
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: 'Неавторизовано' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        email: true,
        name: true,
        telegram: true,
        institute: true,
        createdAt: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: 'Користувача не знайдено' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Помилка отримання профілю:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
};
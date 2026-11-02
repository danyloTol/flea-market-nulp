# 🛍️ FleaMarket NULP

> Студентська платформа для обміну та продажу речей у Національному університеті «Львівська політехніка».  
> Швидко, зручно, серед своїх.

---

## 👥 Команда

| Роль | Ім'я |
|------|------|
| Team Lead / Full-Stack Architect | Толочко Данило |
| UI/UX Designer & Frontend (Layout) | Дан Космін |
| Frontend Developer (Catalog & Core UI) | Нем'ятий Данило |
| Frontend Developer (Filters & Forms) | Стасишин Роман |
| Content Manager / QA & Data Specialist | Іванцьо Богдан |

---

## 🛠️ Стек технологій

**Frontend:**
- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 8](https://vite.dev/) — збірник проєкту
- [Tailwind CSS v4](https://tailwindcss.com/) — стилізація
- [React Router v7](https://reactrouter.com/) — маршрутизація

**Backend:**
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) — REST API сервер
- [Prisma ORM](https://www.prisma.io/) — робота з базою даних
- [PostgreSQL](https://www.postgresql.org/) (хмарний інстанс на [Neon.tech](https://neon.tech))
- [bcrypt](https://www.npmjs.com/package/bcrypt) + [JWT](https://jwt.io/) — авторизація

**Інфраструктура:**
- [Cloudinary](https://cloudinary.com/) — зберігання фотографій товарів
- [Vercel](https://vercel.com/) — хостинг фронтенду
- [Render.com](https://render.com/) — хостинг бекенду

---

## 🚀 Як запустити проєкт локально

### Вимоги
- [Node.js](https://nodejs.org/) версії 20 або вище
- [Git](https://git-scm.com/)

### 1. Клонувати репозиторій
```bash
git clone https://github.com/YOUR_USERNAME/flea-market-nulp.git
cd flea-market-nulp
```

### 2. Запустити Frontend (client)
```bash
cd client
npm install
npm run dev
```
Відкриється на: `http://localhost:5173`

### 3. Запустити Backend (server)
```bash
cd server
npm install
```

Створити файл `.env` у папці `server` (на основі `.env.example`):
```env
DATABASE_URL="твій_рядок_підключення_до_PostgreSQL"
JWT_SECRET="будь-який_довільний_секретний_рядок"
PORT=5000
```

```bash
npx prisma migrate dev
npx prisma db seed
npm run dev
```
API буде доступне на: `http://localhost:5000`

---

## 📁 Структура проєкту

```
flea-market-nulp/
├── client/               # React + Vite (Frontend)
│   └── src/
│       ├── api/          # Функції запитів до бекенду
│       ├── components/   # Перевикористовувані компоненти
│       │   ├── layout/   # Navbar, Footer
│       │   ├── product/  # ProductCard, FilterSidebar
│       │   └── ui/       # Button, Input тощо
│       ├── context/      # AuthContext (стан авторизації)
│       ├── pages/        # Сторінки сайту
│       └── types/        # TypeScript типи
│
└── server/               # Express + Prisma (Backend)
    ├── prisma/
    │   ├── schema.prisma # Схема бази даних
    │   └── seed.ts       # Скрипт наповнення бази
    └── src/
        ├── routes/       # API маршрути
        ├── middleware/   # JWT авторизація
        └── index.ts      # Точка входу сервера
```

---

## 🔗 Корисні посилання

- 📋 [Дошка завдань (Trello)](https://trello.com/b/ewZ45XOX/pigs-in-a-blanket)
- 🎨 [Макет у Figma](https://www.figma.com/make/PG3odnTEvngN3XkrlqNYdj/FleaMarket-NULP-Marketplace?p=f&t=sQgLR1wSaglfAltX-0)
- 🌐 [Задеплоєний сайт](#) ← _буде після деплою_

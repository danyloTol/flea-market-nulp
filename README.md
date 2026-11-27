# 🛍️ FleaMarket NULP

> **Студентська барахолка Національного університету «Львівська політехніка»**  
> Веб-платформа для зручного обміну, продажу та безоплатної передачі навчальних матеріалів, техніки та побутових речей для гуртожитку серед студентів Політехніки.

---

## 👥 Команда проєкту

| Роль у проєкті | Студент | Зона відповідальності |
|:---|:---|:---|
| **Team Lead / Full-Stack Architect** | **Толочко Данило** | Архітектура, БД (Prisma + PostgreSQL), REST API, безпека (JWT, bcrypt), код-рев'ю |
| **UI/UX Designer & Frontend (Layout)** | **Дан Космін** | Макет у Figma, загальний каркас додатку (`Navbar`, `Footer`, адаптивне меню) |
| **Frontend Developer (Core UI)** | **Нем'ятий Данило** | Каталог оголошень, картки товарів (`ProductCard`), сторінка товару (`ProductDetailPage`) |
| **Frontend Developer (Forms & Auth)** | **Стасишин Роман** | Фільтри (`FilterSidebar`), форми реєстрації/входу, сторінка профілю (`ProfilePage`) |
| **Content Manager / QA & Data** | **Іванцьо Богдан** | Тестування (manual QA), локації корпусів НУ «ЛП», датасет товарів для сиду |

---

## 🛠️ Стек технологій

### 💻 Client (Frontend)
- **Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler:** [Vite 8](https://vite.dev/) (швидкий HMR, сучасна збірка)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (сучасний підхід без конфіг-файлів)
- **Routing:** [React Router v7](https://reactrouter.com/) (SPA клієнтська маршрутизація)
- **Icons:** [Lucide React](https://lucide.dev/) (легкі векторні іконки)
- **State Management:** React Context API (`AuthContext`)

### ⚙️ Server (Backend)
- **Runtime:** [Node.js](https://nodejs.org/) (ES Modules, TypeScript, `tsx`)
- **Framework:** [Express](https://expressjs.com/) REST API
- **ORM:** [Prisma ORM v6](https://www.prisma.io/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) (хмарна реляційна БД на [Neon.tech](https://neon.tech))
- **Auth & Security:** JWT (JSON Web Tokens), `bcrypt` (хешування паролів із сіллю), CORS
- **Media Storage:** [Cloudinary API](https://cloudinary.com/) + `multer` (завантаження фотографій)

---

## 📊 Поточний статус розробки (Спринт 3)

- [x] **DevOps & Git:** Налаштовано Git Flow (`main` та `develop` захищені правилами рецензування PR).
- [x] **База даних:** Спроєктовано схему Prisma (`User`, `Category`, `Product`), виконано міграції та реалізовано автоматичний сид-скрипт із 10 реальними товарами Політеху.
- [x] **UI/UX:** Розроблено макети сторінок у Figma на основі дизайн-системи Політехніки.
- [x] **Клієнтські компоненти:**
  - [x] Адаптивний `Navbar` із пошуком та динамічним станом авторизації.
  - [x] `Footer` зі списком корпусів і дисклеймером.
  - [x] Особистий кабінет студента (`ProfilePage`) із фільтрацією оголошень за статусом.
  - [x] Сторінка деталей товару (`ProductDetailPage`) із кнопкою зв'язку в Telegram.
- [x] **Бекенд API:**
  - [x] `GET /api/products` — список активних товарів (пошук, фільтрація за корпусом/ціною, пагінація).
  - [x] `GET /api/products/:id` — детальна інформація про товар та контакти продавця.
  - [x] `POST /api/auth/register` — реєстрація з перевіркою унікальності email та хешуванням паролів.
  - [x] `POST /api/auth/login` — вхід та генерація JWT токена.
  - [x] `GET /api/auth/me` — захищений роут отримання даних авторизованого користувача.
  - [x] `POST /api/upload` — завантаження зображень у хмару Cloudinary.
- [ ] **В роботі:** Форма створення оголошення (`/create`), фінальний деплой на Vercel + Render.

---

## 🚀 Інструкція із локального запуску

### Попередні вимоги
* Встановлений [Node.js](https://nodejs.org/) (версія 20+)
* Встановлений [Git](https://git-scm.com/)

### 1. Клонування репозиторію
```bash
git clone https://github.com/danyloTol/flea-market-nulp.git
cd flea-market-nulp
git checkout develop
```

---

### 2. Налаштування та запуск Бекенду (`server`)

1. Перейдіть у папку сервера та встановіть залежності:
   ```bash
   cd server
   npm install
   ```

2. Створіть файл `.env` у папці `server/` (скопіювавши структуру з `.env.example`):
   ```env
   PORT=5000
   DATABASE_URL="postgresql://username:password@ep-something.eu-central-1.aws.neon.tech/neondb?sslmode=require"
   JWT_SECRET="super_secret_jwt_key_nulp"
   CLOUDINARY_CLOUD_NAME="your_cloud_name"
   CLOUDINARY_API_KEY="your_api_key"
   CLOUDINARY_API_SECRET="your_api_secret"
   ```

3. Згенеруйте типи Prisma та запустіть первинне наповнення бази:
   ```bash
   npx prisma generate
   npx prisma db seed
   ```

4. Запустіть сервер:
   ```bash
   npm run dev
   ```
   *Сервер запуститься на:* `http://localhost:5000`  
   *Перевірка здоров'я:* `http://localhost:5000/api/health`

---

### 3. Налаштування та запуск Фронтенду (`client`)

1. Відкрийте **другий термінал**, перейдіть у папку клієнта та встановіть залежності:
   ```bash
   cd client
   npm install
   ```

2. Запустіть клієнтський додаток:
   ```bash
   npm run dev
   ```
   *Сайт відкриється на:* `http://localhost:5173`

---

## 📁 Архітектура проєкту

```text
flea-market-nulp/
├── client/                     # Фронтенд (React 19 + Vite 8 + Tailwind v4)
│   ├── src/
│   │   ├── api/                # HTTP-клієнт та API-запити
│   │   ├── components/         # Перевикористовувані компоненти інтерфейсу
│   │   │   ├── layout/         # Каркас сайту (Navbar, Footer)
│   │   │   └── product/        # Компоненти товарів (ProductCard, FilterSidebar)
│   │   ├── context/            # Глобальний стан (AuthContext)
│   │   ├── pages/              # Сторінки (ProfilePage, ProductDetailPage тощо)
│   │   ├── types/              # Типи TypeScript
│   │   ├── App.tsx             # Маршрутизація React Router
│   │   └── main.tsx            # Точка входу клієнта
│   └── package.json
│
└── server/                     # Бекенд (Node.js + Express + Prisma)
    ├── prisma/
    │   ├── schema.prisma       # Схема бази даних PostgreSQL
    │   └── seed.ts             # Скрипт автоматичного наповнення тестовими товарами
    ├── src/
    │   ├── config/             # Конфігурації (Cloudinary тощо)
    │   ├── controllers/        # Контролери (authController, productController, uploadController)
    │   ├── middleware/         # Проміжні обробники (authMiddleware)
    │   ├── routes/             # Маршрути API (authRoutes, productRoutes, uploadRoutes)
    │   ├── prisma.ts           # Синглтон клієнта Prisma
    │   └── index.ts            # Точка входу сервера Express
    └── package.json
```

---

## 🔗 Важливі посилання

* 🎯 **Дошка спринтів у Jira:** [FleaMarket NULP Jira Board](https://pigsinablanket.atlassian.net/jira/software/projects/FMN/boards/2?filter=assignee+%3D+712020%3A10725dc2-a948-4aa8-8bcf-d34132932416&groupBy=none&atlOrigin=eyJpIjoiNTU3NGQyZjRhYjI1NDBhNjg5NzUyZTlhYjdiNzY5NjIiLCJwIjoiaiJ9)
* 🎨 **UI/UX дизайн проєкту:** [Figma Design File](https://www.figma.com/make/PG3odnTEvngN3XkrlqNYdj/FleaMarket-NULP-Marketplace?t=dRpg8N8TZ7byY4uQ-1)
* 🌿 **Основна гілка розробки:** `develop`
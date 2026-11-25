import { PrismaClient, ProductStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Початок наповнення бази даних (Seeding)...');

  // 1. Очищення старих даних перед наповненням (щоб не плодити дублікати)
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // 2. Створення тестового студента-продавця
  const testUser = await prisma.user.create({
    data: {
      email: 'student@lpnu.ua',
      passwordHash: '$2b$10$epd2hH2eP8qN5dG3.j5N6eH0xU6u9/N6o7kY7kY7kY7kY7kY7kY7k', // тестовий хеш
      name: 'Остап Політехнік',
      telegram: '@ostap_lpnu',
      institute: 'ІКНІ',
    },
  });

  console.log(`👤 Створено тестового користувача: ${testUser.name}`);

  // 3. Створення базових категорій
  const categoriesData = [
    { name: 'Навчальні матеріали', slug: 'textbooks' },
    { name: 'Для гуртожитку', slug: 'dorm' },
    { name: 'Електроніка', slug: 'electronics' },
    { name: 'Одяг та аксесуари', slug: 'clothing' },
    { name: 'Віддам безкоштовно', slug: 'free' },
  ];

  const categories = await Promise.all(
    categoriesData.map((cat) =>
      prisma.category.create({
        data: cat,
      })
    )
  );

  console.log(`📁 Створено ${categories.length} категорій`);

  // Мапа категорій для швидкого доступу
  const catMap = {
    textbooks: categories.find((c) => c.slug === 'textbooks')!.id,
    dorm: categories.find((c) => c.slug === 'dorm')!.id,
    electronics: categories.find((c) => c.slug === 'electronics')!.id,
    clothing: categories.find((c) => c.slug === 'clothing')!.id,
    free: categories.find((c) => c.slug === 'free')!.id,
  };

  // 4. Створення 10 реалістичних товарів Політеху
  const productsData = [
    {
      title: 'Методичка з вищої математики (1 курс, ІКНІ)',
      description: 'Дуже допомогла закрити сесію на 90+. Є готові розв’язки типових розрахункових робіт.',
      price: 60,
      images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'],
      location: '5-й корпус (ІКНІ)',
      categoryId: catMap.textbooks,
    },
    {
      title: 'Білий лабораторний халат (розмір M)',
      description: 'Чистий бавовняний халат для лаб з хімії та фізики. Вдягався лише кілька разів.',
      price: 150,
      images: ['https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80'],
      location: 'Головний корпус (ГУК)',
      categoryId: catMap.clothing,
    },
    {
      title: 'Електричний чайник Philips 1.5L',
      description: 'Надійний чайник для гуртожитку, працює без нарікань, нагріває за 2 хвилини.',
      price: 250,
      images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80'],
      location: 'Гуртожиток №3 (Лазаренка)',
      categoryId: catMap.dorm,
    },
    {
      title: 'Креслярська дошка А3 + рейсшина',
      description: 'Ідеальний стан для нарисної геометрії та інженерної графіки. У комплекті чохол.',
      price: 320,
      images: ['https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80'],
      location: '2-й корпус',
      categoryId: catMap.textbooks,
    },
    {
      title: 'Інженерний калькулятор Casio fx-82ES PLUS',
      description: 'Оригінальний науковий калькулятор з матрицями та комплексними числами. Рятував на іспитах.',
      price: 280,
      images: ['https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=800&q=80'],
      location: '1-й корпус (вул. Карпінського)',
      categoryId: catMap.electronics,
    },
    {
      title: 'Перехідник Type-C на HDMI + USB 3.0',
      description: 'Зручний хаб для підключення ноутбука до університетських проекторів на презентаціях.',
      price: 190,
      images: ['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80'],
      location: '5-й корпус (ІКНІ)',
      categoryId: catMap.electronics,
    },
    {
      title: 'Настільна LED лампа на прищіпці',
      description: 'Гнучка лампа для навчання в гуртожитку, живиться від USB або повербанка, 3 режими світла.',
      price: 120,
      images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80'],
      location: 'Гуртожиток №8 (Лазаренка)',
      categoryId: catMap.dorm,
    },
    {
      title: 'Підручник «Дискретна математика» (Нікольський)',
      description: 'Тверда обкладинка, класичний підручник для студентів комп’ютерних наук.',
      price: 90,
      images: ['https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80'],
      location: 'Науково-технічна бібліотека (НТБ)',
      categoryId: catMap.textbooks,
    },
    {
      title: 'Конспекти лекцій з архітектури комп’ютерів',
      description: 'Повний курс лекцій, оформлений у зошиті А4. Віддам тому, хто купить шоколадку :)',
      price: 0,
      images: ['https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80'],
      location: '5-й корпус або ГУК',
      categoryId: catMap.free,
    },
    {
      title: 'Сушарка для одягу розкладна',
      description: 'Міцна металева сушарка в кімнату гуртожитку. Займає мінімум місця в складеному стані.',
      price: 200,
      images: ['https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=800&q=80'],
      location: 'Гуртожиток №10 (Лукаша)',
      categoryId: catMap.dorm,
    },
  ];

  for (const item of productsData) {
    await prisma.product.create({
      data: {
        ...item,
        status: ProductStatus.ACTIVE,
        userId: testUser.id,
      },
    });
  }

  console.log(`🛍️ Успішно створено ${productsData.length} студентських оголошень!`);
}

main()
  .catch((e) => {
    console.error('❌ Помилка сиду:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
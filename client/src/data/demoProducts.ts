// Тимчасові демонстраційні дані до підключення API товарів.
export interface ProductImage {
  url: string
  alt: string
}

export interface ProductDetail {
  id: string
  title: string
  price: number
  description: string
  condition: string
  location: string
  images: readonly ProductImage[]
  seller: {
    name: string
    institute: string
    group: string
    telegramUsername: string
  }
}

export const demoProducts: readonly ProductDetail[] = [
  {
    id: '1',
    title: 'Ноутбук для навчання та роботи',
    price: 12500,
    description:
      'Продаю ноутбук, яким користувався під час навчання. Підходить для роботи з документами, онлайн-занять, програмування та перегляду відео.\n\nУсе працює справно: клавіатура, тачпад, камера й роз’єми. Є невеликі сліди користування на корпусі, екран без подряпин. У комплекті — зарядний пристрій і чохол.\n\nПеред покупкою можна оглянути та перевірити ноутбук. Зустріч біля головного корпусу Політехніки у зручний для обох час. Деталі обговоримо в Telegram.',
    condition: 'Вживаний, у гарному стані',
    location: 'Львів, головний корпус НУЛП (ГУК), вул. Степана Бандери, 12',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80',
        alt: 'Відкритий ноутбук — загальний вигляд',
      },
      {
        url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
        alt: 'Ноутбук на столі — додатковий ракурс',
      },
      {
        url: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
        alt: 'Ноутбук під час роботи',
      },
    ],
    seller: {
      name: 'Андрій Коваль',
      institute: 'ІКНІ — Інститут комп’ютерних наук та інформаційних технологій',
      group: 'КН-303',
      telegramUsername: 'fmn_demo_seller',
    },
  },
]

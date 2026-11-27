import { type CategoryId, type LocationId } from '../types/filters';

export interface Product {
  id: string;
  title: string;
  price: number; // 0 = безкоштовно
  category: Exclude<CategoryId, 'all'>;
  categoryLabel: string;
  location: Exclude<LocationId, 'all'>;
  locationLabel: string;
  imageUrl: string;
  createdAt: string;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Навушники бездротові',
    price: 850,
    category: 'electronics',
    categoryLabel: 'Техніка',
    location: 'guk',
    locationLabel: 'ГУК',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    createdAt: 'Сьогодні',
  },
  {
    id: '2',
    title: 'Підручники для першого курсу (Вища математика)',
    price: 350,
    category: 'books',
    categoryLabel: 'Книги',
    location: 'corpus-1',
    locationLabel: 'Корпус 1',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80',
    createdAt: 'Сьогодні',
  },
  {
    id: '3',
    title: 'Настільна лампа для навчання',
    price: 280,
    category: 'dorm',
    categoryLabel: 'Для гуртожитку',
    location: 'studmistechko',
    locationLabel: 'Студмістечко',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80',
    createdAt: 'Сьогодні',
  },
  {
    id: '4',
    title: 'Крісло в кімнату гуртожитку',
    price: 0,
    category: 'dorm',
    categoryLabel: 'Для гуртожитку',
    location: 'dorm-8',
    locationLabel: 'Гуртожиток №8',
    imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&q=80',
    createdAt: 'Вчора',
  },
  {
    id: '5',
    title: 'Електрочайник скляний 1.7л',
    price: 400,
    category: 'dorm',
    categoryLabel: 'Для гуртожитку',
    location: 'dorm-11',
    locationLabel: 'Гуртожиток №11',
    imageUrl: 'https://images.unsplash.com/photo-1594213114663-d94db9b17125?w=600&q=80',
    createdAt: '2 дні тому',
  },
  {
    id: '6',
    title: 'Худі університетське (розмір L)',
    price: 550,
    category: 'clothes',
    categoryLabel: 'Одяг та аксесуари',
    location: 'corpus-4',
    locationLabel: 'Корпус 4',
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80',
    createdAt: '3 дні тому',
  },
];

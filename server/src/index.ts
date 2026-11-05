import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Тестовий маршрут для перевірки
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'FleaMarket NULP Server is running!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
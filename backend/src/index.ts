import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeFirebase } from './config/firebase';
import { vouchersRouter } from './routes/items';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Inicializar Firebase
initializeFirebase();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

const logger = (req: Request, res: Response, next: Function) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

app.use(logger);
app.use('/api/vouchers', vouchersRouter);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

export default app;



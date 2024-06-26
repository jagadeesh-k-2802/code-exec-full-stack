import express from 'express';
import path from 'path';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import errorHandler from '@middlewares/error';
import codeRoutes from '@routes/code';

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'production') {
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
}

// Routes
app.use('/api/v1/code', codeRoutes);

// Error Handler
app.use(errorHandler);

export default app;

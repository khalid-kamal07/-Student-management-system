import cors from 'cors';
import express from 'express';
import { connectDatabase } from './db.js';
import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
import studentRoutes from './routes/studentRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// The database is connected lazily for API requests. This works both locally
// and on Vercel, where a serverless function may be reused between requests.
app.use('/api', async (_req, res, next) => {
  try {
    await connectDatabase();
    next();
  } catch (error) {
    console.error('Database connection failed:', error.message);
    res.status(500).json({ message: 'Database connection failed.' });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ message: 'Student Management API is running.' });
});

app.use('/api/students', studentRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.originalUrl} not found.` });
});

export default app;

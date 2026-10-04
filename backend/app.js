import cors from 'cors';
import express from 'express';
import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
import { connectDB } from './db.js';
import studentRoutes from './routes/studentRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ message: 'Student Management API is running.' });
});

// Ensure a DB connection exists before any student route runs
app.use('/api/students', async (_req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    res.status(503).json({ message: 'Database connection failed.' });
  }
}, studentRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.originalUrl} not found.` });
});

export default app;

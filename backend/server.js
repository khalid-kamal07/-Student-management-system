// Local development entry point. On Vercel, api/index.js is used instead.
import 'dotenv/config';
import app from './app.js';
import { connectDB } from './db.js';

const PORT = process.env.PORT || 5000;

try {
  await connectDB();
  console.log('MongoDB connected successfully.');
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
} catch (error) {
  console.error('MongoDB connection failed:', error.message);
  process.exit(1);
}

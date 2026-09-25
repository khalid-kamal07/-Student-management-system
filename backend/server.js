import 'dotenv/config';
import app from './app.js';
import { connectDatabase } from './db.js';

const PORT = process.env.PORT || 5000;

try {
  await connectDatabase();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
} catch (error) {
  console.error('MongoDB connection failed:', error.message);
  process.exit(1);
}

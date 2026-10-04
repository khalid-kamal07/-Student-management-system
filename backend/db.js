import mongoose from 'mongoose';

// Cache the connection across serverless invocations (and hot reloads locally)
let cached = globalThis.__mongooseCache;
if (!cached) cached = globalThis.__mongooseCache = { conn: null, promise: null };

export const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not set.');
  }
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, { bufferCommands: false, serverSelectionTimeoutMS: 8000 })
      .then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
  return cached.conn;
};

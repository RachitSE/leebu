import mongoose from 'mongoose';

// Ensure the MongoDB URI is defined
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

// Global cache to prevent multiple connections in development
let cached = (global as any).mongoose || { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) {
    console.log('Already connected to MongoDB.');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Connecting to MongoDB...');

    cached.promise = mongoose
      .connect(MONGODB_URI as string, {
        dbName: 'memoriesDB', // Set your database name here
        bufferCommands: false,
      })
      .then((mongoose) => {
        console.log('Connected to MongoDB!');
        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
        throw new Error('Failed to connect to MongoDB');
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;

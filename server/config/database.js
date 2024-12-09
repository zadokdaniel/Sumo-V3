import { config } from 'dotenv';

config();

export const dbConfig = {
  inMemory: process.env.NODE_ENV === 'development',
  // Add other database config here when needed
};
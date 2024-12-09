import { config } from 'dotenv';
import rateLimit from 'express-rate-limit';

config();

export const serverConfig = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  cors: {
    origin: process.env.CORS_ORIGIN || '*'
  },
  rateLimit: rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
};
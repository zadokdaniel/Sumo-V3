import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { serverConfig } from './config/server.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { shiftsRouter } from './routes/shifts.js';
import { staffRouter } from './routes/staff.js';

const app = express();

// Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(cors(serverConfig.cors));
app.use(express.json());
app.use(serverConfig.rateLimit);

// Routes
app.use('/api/shifts', shiftsRouter);
app.use('/api/staff', staffRouter);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(serverConfig.port, () => {
  console.log(`Server running on port ${serverConfig.port} in ${serverConfig.env} mode`);
});
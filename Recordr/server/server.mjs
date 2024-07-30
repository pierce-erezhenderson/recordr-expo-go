import express from 'express';
import connectDB from './config/database.mjs';
import cors from 'cors';

import { getAccessToken } from './auth/googleAuth.mjs';

// Import routes
import authRoutes from './routes/authRoutes.mjs';
import userRoutes from './routes/userRoutes.mjs';
import clientRoutes from './routes/clientRoutes.mjs';
import invoiceRoutes from './routes/invoiceRoutes.mjs';
import recordrRoutes from './routes/itemsRoutes.mjs';


const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

connectDB();
getAccessToken();

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', clientRoutes)
app.use('/api', invoiceRoutes);
app.use('/api', recordrRoutes);

app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.url}`);
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`${new Date().toISOString()} - Error:`, err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});
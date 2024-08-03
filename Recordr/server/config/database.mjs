import mongoose from 'mongoose';
import "dotenv/config";
import { syncInvoiceIndexes } from '../models/invoice.mjs';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        await syncInvoiceIndexes();
        console.log('Indexes synced successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

export default connectDB;
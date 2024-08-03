import mongoose from 'mongoose';
import "dotenv/config";
import { syncInvoiceIndexes } from '../models/invoice.mjs';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        await syncInvoiceIndexes();
        console.log(`                                      

        { les get it } ----------- Beginning server console here ----------- { ᕦ(ò_óˇ)ᕤ }

        

        `)
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

export default connectDB;
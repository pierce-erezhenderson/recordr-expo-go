import mongoose from 'mongoose';
import "dotenv/config";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch {
        console.error('Error connecting to MongoDB:', err.message);
    }
};

export default connectDB;
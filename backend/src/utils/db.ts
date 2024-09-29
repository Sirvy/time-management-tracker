import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect((process.env.MONGODB_URI as string), {
            // authSource: 'admin',
            // user: 'mongouser',
            // pass: 'monNGdbpassw00rd',
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
};

export default connectDB;
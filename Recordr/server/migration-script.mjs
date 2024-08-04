// migration-script.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI

async function migrateClientToClientName() {
    const db = mongoose.connection.db;
    const collection = db.collection('clients');

    console.log('Starting migration...');

    try {
        // Remove the old index
        console.log('Dropping old index...');
        await collection.dropIndex('client_1');

        // Update all documents
        console.log('Updating documents...');
        const updateResult = await collection.updateMany(
            { client: { $exists: true } },
            [{ $set: { clientName: '$client' } }, { $unset: ['client'] }]
        );

        console.log(`Updated ${updateResult.modifiedCount} documents`);

        // Create the new index
        console.log('Creating new index...');
        await collection.createIndex({ clientName: 1 }, { unique: true });

        console.log('Migration completed successfully');
    } catch (error) {
        console.error('Migration failed:', error);
    }
}

async function main() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        await migrateClientToClientName();
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

main();
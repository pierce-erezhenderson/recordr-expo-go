import mongoose from 'mongoose';
import Client from '../models/client.mjs';
import "dotenv/config";

async function normalizeExistingClientNames() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const clients = await Client.find({ normalizedClientName: { $exists: false } });
        console.log(`Found ${clients.length} clients without normalized names.`);

        for (const client of clients) {
            const normalizedName = client.clientName.toLowerCase();
            
            // Check for potential conflicts
            const existingWithNormalizedName = await Client.findOne({ 
                normalizedClientName: normalizedName, 
                _id: { $ne: client._id } 
            });

            if (existingWithNormalizedName) {
                console.log(`Conflict found for "${client.clientName}". Manual resolution needed.`);
                continue;
            }

            client.normalizedClientName = normalizedName;
            await client.save();
            console.log(`Updated: ${client.clientName} -> ${client.normalizedClientName}`);
        }

        console.log('Normalization complete.');
    } catch (error) {
        console.error('Error during normalization:', error);
    } finally {
        await mongoose.disconnect();
    }
}

normalizeExistingClientNames();
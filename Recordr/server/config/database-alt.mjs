import mongoose from 'mongoose'
import "dotenv/config";

class Database {
    constructor() {
        this.connection = null;
    }

    async connect () {
        if (this.connection) {
            return this.connection;
        }

        try {
            this.connection = await mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('Connected to MongoDB');
            console.log(`                                      

                { les get it } ----------- Beginning server console here ----------- { ᕦ(ò_óˇ)ᕤ }
        
        
        
                `)
            return this.connection;
        } catch (error) {
            console.error('MongoDB conection error', error);
            throw error;
        }
    }

    getConnection() {
        if (!this.conection) {
            throw new Error('Database not connected. Call connect() first.');
        }
        return this.connection;
    }
}

export default new Database();
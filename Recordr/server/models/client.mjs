import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const clientSchema = new Schema({
    clientName: {
        type: String,
        required: true,
    },
    normalizedClientName: { // ADDED
        type: String,
        required: true,
        unique: true
    },
    invoices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice',
    }],
}, {timestamps: true});

clientSchema.pre('save', async function () {
    if (this.isModified('clientName')) {
        this.normalizedClientName = this.clientName.toLowerCase();
        
        // Check if a client with the same normalized name already exists
        const existingClient = await this.constructor.findOne({ normalizedClientName: this.normalizedClientName });
        if (existingClient && existingClient._id.toString() !== this._id.toString()) {
            throw new Error('A client with this name already exists (case-insensitive).');
        }
    }
});

const Client = model('Client', clientSchema);
export default Client;
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const clientSchema = new Schema({
    client: {
        type: String,
        required: true,
        unique: true,
    },
    invoices: {
        type: Schema.Types.ObjectId,
        ref: 'Invoice',
    },
}, {timestamps: true});

const Client = model('Client', clientSchema);
export default Client;
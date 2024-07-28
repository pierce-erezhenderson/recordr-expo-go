import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const invoiceSchema = new Schema({
    invoiceNumber: {
        type: String,
        required: true,
        unique: true,
    },  
    client: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true, 
    },
    metadata: {
        type: Schema.Types.ObjectId,
        ref: 'Metadata',
        required: false,
    },
    items: {
        type: Schema.Types.ObjectId,
        ref: 'Record',
        required: false,
    }
}, { timestamps: true });


const Invoice = model('Invoice', invoiceSchema);
export default Invoice;
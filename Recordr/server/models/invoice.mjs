import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const invoiceSchema = new Schema({
    invoiceNumber: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true, 
    },
    clientName: {
        type: String,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    rate: {
        type: Number,
        required: true,
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    sentStatus: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidStatus: {
        type: Boolean,
        required: true,
        default: false,
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Record',
        required: false,
    }]
}, { timestamps: true });

const Invoice = model('Invoice', invoiceSchema);
export default Invoice;
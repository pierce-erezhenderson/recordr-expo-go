import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const invoiceSchema = new Schema({
    invoiceNumber: {
        type: String,
        required: true,
        unique: true,
    },
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     // required: true,         //****** not required for now
    // },
    clientName: {
        type: String,
        ref: 'Client',
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
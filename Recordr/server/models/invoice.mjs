import mongoose from 'mongoose';
const { Schema, model, ObjectId } = mongoose;


const invoiceSchema = new Schema({
    _id: ObjectId,
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
    items: {
        type: Schema.Types.ObjectId,
        ref: 'Record',
    }
}, { timestamps: true });


invoiceSchema.pre('save', function (next) {
    // Middleware to update 
    this.updatedAt = Date.now();
    next();
});

const Invoice = model('Invoice', invoiceSchema);
export default Invoice;
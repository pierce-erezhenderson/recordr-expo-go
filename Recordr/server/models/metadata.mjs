import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const metadataSchema = new Schema({
    invoice: {
        type: Schema.Types.ObjectId,
        ref: 'Invoice',
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
}, { timestamps: true });

// function to sum total hours and currency

// function incrementInvoiceNumber(current) {
//     const num = parseInt(current, 10);
//     return (num + 1).toString().padStart(4, '0');
//   }
  
//   let invoiceNum = "0001";
//   console.log(incrementInvoiceNumber(invoiceNum));  // Outputs: "0002"


const Metadata = model('Metadata', metadataSchema);
export default Metadata;
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const invoiceSchema = new Schema({
    invoiceNumber: {
        type: String,
        required: true,
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
    metadata: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Metadata',
        required: false,
    }],
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Record',
        required: false,
    }]
}, { timestamps: true });

invoiceSchema.index({ clientName: 1, invoiceNumber: 1 }, { unique: true });

const Invoice = model('Invoice', invoiceSchema);

// Function to sync indexes
export async function syncInvoiceIndexes() {
    try {
        console.log('Attemping to sync indexes')
      await Invoice.syncIndexes();
      console.log('Invoice indexes synced successfully');

    } catch (error) {
      console.error('Error syncing invoice indexes:', error);
    }
  }

export default Invoice;
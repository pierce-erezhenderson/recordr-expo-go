import Invoice from '../models/invoice.mjs';
import Client from '../models/client.mjs';



// ------ Create new 'invoice' -------

export const createNewInvoiceInternal = async (clientName, invoiceNumber) => {
    console.log('clientName:', clientName)
    console.log('invoiceNumber:', invoiceNumber)
    
    try {
        const clientDoc = await Client.findOne({ client: clientName });
        if (!clientDoc) {
            throw new Error(`Client with name ${clientName} not found`);
        }

        const newInvoice = new Invoice({ 
            client: clientDoc._id, 
            invoiceNumber 
        });
        await newInvoice.save();

        clientDoc.invoices.push(newInvoice._id);
        await clientDoc.save();

        return newInvoice;
    } catch (error) {
        console.error('Error in creating new invoice', error)
        throw error;
    }
};

export const updateInvoiceInternal = async (invoiceId, updateData) => {
    try {
        console.log('Attempting to update invoice with ID:', invoiceId);
        const updatedInvoice = await Invoice.findByIdAndUpdate(
            invoiceId, 
            { $set: updateData }, 
            { new: true }
        ).populate('items');
        
        if (!updatedInvoice) {
            throw new Error('Invoice not found');
        }

        return updatedInvoice
    } catch (error) {
        console.error('Error updating invoice', error)
        throw error;
    }
};

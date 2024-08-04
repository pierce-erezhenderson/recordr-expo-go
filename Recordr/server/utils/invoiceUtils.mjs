import Invoice from '../models/invoice.mjs';
import Client from '../models/client.mjs';



// ------ Get 'invoice' -------

export const getInvoiceInternal = async (invoiceId) => {
    try {
        console.log(invoiceId)
        const invoiceInfo = await Invoice.findOne({ _id: invoiceId })
        console.log('Invoice found, returning:', invoiceInfo)
        return invoiceInfo;
    } catch (error) {
        console.log('Error getting invoice', error)
        throw error;
    }
};


// ------ Create new 'invoice' -------

export const createNewInvoiceInternal = async (invoiceData, client) => {
    try {
        console.log('Received client:', client);  // Add this line

        if (!client || !client._id) {
            throw new Error('Invalid client object received');
        }

        const newInvoice = new Invoice({ 
            clientName: invoiceData.clientName, 
            invoiceNumber: invoiceData.newInvoiceNumber
        });
        await newInvoice.save();

        const updatedClient = await Client.findOne({ _id: client._id })

        console.log('Successfully saved invoice, pushing to client')
        updatedClient.invoices.push(newInvoice._id);
        await updatedClient.save();

        return newInvoice;
    } catch (error) {
        console.error('Error in creating new invoice', error)
        throw error;
    }
};


// ------- Ensure 'invoice' (get or create) --------

export const ensureInvoice = async (invoiceData, client) => {
    try {
        if (invoiceData._id) {
            return { _id: invoiceData._id };
        }
        console.log('Creating new invoice');
        const invoice = await createNewInvoiceInternal(invoiceData.invoiceNumber, client.clientName);
        console.log(`Invoice returned from ensureInvoice:`, invoice)
        return invoice;
    } catch (error) {
        console.error('Failed to create client', error.message)
        throw error
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

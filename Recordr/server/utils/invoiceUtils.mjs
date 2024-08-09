import Invoice from '../models/invoice.mjs';
import Client from '../models/client.mjs';



// ------ Get 'invoice' -------

export const getInvoiceInternal = async (invoiceId, invoiceNumber, clientName) => {
    try {
        const invoiceInfo = await Invoice.findOne({ 
            $or: [
                { _id: invoiceId},
                {
                    $and: [
                        { invoiceNumber: invoiceNumber },
                        { clientName: clientName }
                    ]
                }
            ]
        });
        if (!invoiceInfo) {
            console.log('No invoice found, returning:', invoiceInfo)
            return invoiceInfo;
        }
        console.log('Invoice found, returning:', invoiceInfo)
        return invoiceInfo;
    } catch (error) {
        console.log('Error getting invoice', error)
        throw error;
    }
};


// ------ Create new 'invoice' -------

export const createNewInvoiceInternal = async (invoiceNumber, clientName) => {  
    // TEMP - there was an invoiceData object here that was removed, function before should handle destructuring to invoiceNumber and clientName
    try {
        console.log('Received client:', clientName);

        if (!clientName) {
            throw new Error('Invalid client object received');
        }

        const newInvoice = new Invoice({ 
            clientName: clientName, 
            invoiceNumber: invoiceNumber
        });
        await newInvoice.save();

        const normalizedClientName = clientName.toLowerCase();
        const updatedClient = await Client.findOne({ normalizedClientName })

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

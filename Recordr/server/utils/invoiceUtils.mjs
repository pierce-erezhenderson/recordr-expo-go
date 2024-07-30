import Invoice from '../models/invoice.mjs';


// ------ Get all 'invoices' by 'client' ------

export const getInvoicesByClientInternal = async (invoiceData) => {
    try {
        const clientInvoices = await Invoice.find(invoiceData).populate('items');
        return clientInvoices;
    } catch (error) {
        console.error('Error in checkForClient:', error);
        throw error;
    }
};


// ------ Create new 'invoice' -------

export const createNewInvoiceInternal = async (client, invoiceNumber) => {
    console.log('client:', client)
    console.log('invoiceNumber:', invoiceNumber)
    try {
        const newInvoice = new Invoice(
            { 
                client: client, 
                invoiceNumber: invoiceNumber 
            }
        );
        await newInvoice.save();
        return newInvoice;  
    } catch (error) {
        console.error('Error in creating new invoice', error)
        throw error;
    }
}


// ------ Get Update Client Invoice ------

export const updateClientInvoiceInternal = async (client, currentInvoiceNumber, newInvoiceNumber) => {
    try {
        const clientInvoices = await Invoice.findOneAndUpdate(
            { 
                client: client, 
                invoiceNumber: currentInvoiceNumber
            }, 
            { invoiceNumber: newInvoiceNumber },
            { new: true }
        );

        if (!clientInvoices) {
            console.log('No invoice found with the provided criteria');
            return null;
        }

        return clientInvoices;
    } catch (error) {
        console.error('Error getting invoices by client', error)
        throw error
    }
}


// ------ Get latest Invoice by Client ------

export const getLatestClientInvoiceInternal = async (client) => {
    console.log('clientId:', client)
    try {
        const latestInvoice = await Invoice.findOne(
            { client: client }, 
            {}, 
            { sort: { updatedAt: -1 } }
        );
        return latestInvoice;
    } catch (error) {
        console.error('Error getting latest invoice by client', error)
        throw error
    }
}; 

// ------ Increment from last saved 'invoiceNumber' ------ // maybe don't need if it lives in model


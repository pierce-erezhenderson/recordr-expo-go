import Invoice from '../models/invoice.mjs';


// ------ Get all 'invoices' by 'client' ------

export const getClientInvoicesInternal = async (response) => {
    try {
        const clientInvoices = await Invoice.find(response.client).populate('items');
        return clientInvoices;
    } catch (error) {
        console.error('Error in checkForClient:', error);
        throw error;
    }
};


// ------ Create new 'invoice' -------

export const createNewInvoiceInternal = async (invoiceData) => {
    let client = invoiceData.client;
    let invoiceNumber = invoiceData.invoiceNumber;
    try {
        const newInvoice = await Invoice(client, invoiceNumber);
        await newInvoice.save();
        return newInvoice;
    } catch (error) {
        console.error('Error in creating new invoice', error)
        throw error;
    }
}


// ------ Increment from last saved 'invoiceNumber' ------ // maybe don't need if it lives in model


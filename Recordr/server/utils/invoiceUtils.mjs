import Invoice from '../models/invoice.mjs';
import { getClientInvoices } from '../controllers/invoiceController.mjs';

// ------ Check for 'invoiceNumber' by 'client' ------

export const checkForClient = async (response) => {
    try {
        const clientInvoices = await Invoice.find(response.client).populate('items');
        return clientInvoices;
    } catch (error) {
        console.error('Error in checkForClient:', error);
        throw error;
    }
};

// ------ Create new 'invoice' -------

export const createNewInvoice = async (prop) => {
    try {
        const newInvoice = await invoice()
    } catch (error) {
        console.error('Error in creating new invoice', error)
        throw error;
    }
}




// ------ Increment from last saved 'invoiceNumber' ------


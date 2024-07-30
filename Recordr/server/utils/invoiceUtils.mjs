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






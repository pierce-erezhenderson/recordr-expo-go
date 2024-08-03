import Invoice from '../models/invoice.mjs';
import Client from '../models/client.mjs';



// ------ Get 'invoice' -------

export const getInvoiceInternal = async (invoiceId) => {
    try {
        const { _id } = invoiceId._id

        const invoiceInfo = await Invoice.findOne({ _id })
        return { invoiceInfo };
    } catch (error) {
        console.log('Error getting invoice', error)
        throw error;
    }
};


// ------ Create new 'invoice' -------

export const createNewInvoiceInternal = async (clientToUse, invoiceNumber) => {
    const clientName = clientToUse.clientName

    // console.log('clientName:', clientName)
    // console.log('invoiceNumber:', invoiceNumber)
    
    try {
        console.log(`Looking for ${clientName} to initiate invoice`)
        if (!clientToUse){
            clientToUse = await Client.findOne({ clientName: clientName });
            if (!clientToUse) {
                throw new Error(`Client with name ${clientName} not found`);
            }
        }

        const newInvoice = new Invoice({ 
            clientName: clientToUse.clientName, 
            invoiceNumber 
        });
        await newInvoice.save();

        clientToUse.invoices.push(newInvoice._id);
        await clientToUse.save();

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

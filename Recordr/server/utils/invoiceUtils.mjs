import Invoice from '../models/invoice.mjs';
import Client from '../models/client.mjs';



// ------ Get 'invoice' -------

export const getInvoiceInternal = async (invoiceId) => {
    try {
        console.log(invoiceId)
        const invoiceInfo = await Invoice.findOne({ invoiceId })
        console.log('Invoice found, returning:', invoiceInfo)
        return { invoiceInfo };
    } catch (error) {
        console.log('Error getting invoice', error)
        throw error;
    }
};


// ------ Create new 'invoice' -------

export const createNewInvoiceInternal = async (invoiceNumber, clientName) => {
    try {
        console.log(`Attempting to create new invoice with invoiceNumber: ${invoiceNumber} and clientName: ${clientName}`)

        const newInvoice = new Invoice({ 
            clientName: clientName, 
            invoiceNumber: invoiceNumber
        });
        await newInvoice.save();
        return newInvoice;
    } catch (error) {
        console.error('Error in creating new invoice', error)
        throw error;
    }
};

        // console.log(`Looking for ${invoice._id} to initiate invoice`)
        // if (!clientToUse){
        //     clientToUse = await Client.findOne({ clientName: clientName });
        //     if (!clientToUse) {
        //         throw new Error(`Client with name ${clientName} not found`);
        //     }
        // }

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

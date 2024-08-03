import Invoice from '../models/invoice.mjs'
import Client from '../models/client.mjs'

export const saveItem = async (invoice, itemData) => {
    try {
        console.log('Beginning to save items internally')

        const updatedInvoice = await Invoice.findOneAndUpdate(
            { _id: invoice._id },
            { itemData },
            { new: true }
        );

        return { updatedInvoice };
    } catch (error) {
        console.error('Error saving new invoice', error)
        throw error;
    }
};
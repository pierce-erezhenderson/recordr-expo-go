import Invoice from '../models/invoice.mjs'
import Item from '../models/items.mjs'
import { checkClientNameAvailability } from './prepareTranscription.mjs'
import { createNewClientInternal } from './clientUtils.mjs'
import { createNewInvoiceInternal, getInvoiceInternal } from './invoiceUtils.mjs'


export const handleClientAndOrInvoiceUpdate = async (clientName, invoiceNumber) => {
    try {
        const checkClient = await checkClientNameAvailability(clientName)

        if (!checkClient.existingClient) {
            const newClient = await createNewClientInternal(clientName)
            console.log(`New Client:`, newClient)

            const newInvoice = await createNewInvoiceInternal(invoiceNumber, newClient)
            console.log(`New Invoice:`, newInvoice)
            return { invoice: newInvoice }
        } else {
            console.log('Existing client:', checkClient.existingClient)
            const existingInvoice = await getInvoiceInternal(null, invoiceNumber, checkClient.existingClient.clientName)

            if (!existingInvoice) {
                const newInvoice = await createNewInvoiceInternal(invoiceNumber, checkClient.existingClient.clientName)
                console.log(`New Invoice:`, newInvoice)
                return { invoice: newInvoice }
            }
            console.log('Existing invoice:', existingInvoice)
            return { invoice: existingInvoice }
        }
    } catch (error) {
        console.error('Error checking client and/or invoice:', error)
        throw error;
    }
};

export const saveItemInternal = async (invoiceId, itemData) => {
    try {
        console.log('Beginning to save items internally')

        const invoiceToUpdate = await Invoice.findById(invoiceId);
        if (!invoiceToUpdate) {
            throw new Error('Invoice not found');
        }
        
        const newItem = new Item({
            date: itemData.date,
            hours: itemData.hours,
            details: itemData.details,
            invoice: invoiceId
        })

        const savedItem = await newItem.save()

        console.log('Saved item, pushing to invoice')
        invoiceToUpdate.items.push(savedItem._id);
        await invoiceToUpdate.save();

        // SEND BACK INVOICE FOR FRONT END INVOICE SCREEN

        console.log('Invoice successfully updated')
        return savedItem;
    } catch (error) {
        console.error('Error saving new invoice', error)
        throw error;
    }
};



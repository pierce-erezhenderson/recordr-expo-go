import Invoice from '../models/invoice.mjs'
import Client from '../models/client.mjs'
import Item from '../models/items.mjs'

export const saveItem = async (invoice, itemData) => {
    try {
        console.log('Beginning to save items internally')
        console.log('Invoice is', invoice)
        
        const newItem = new Item({
            date: itemData.date,
            hours: itemData.hours,
            details: itemData.details,
            invoice: itemData.invoice
        })

        const savedItem = await newItem.save()

        console.log('Saved item, pushing to invoice')
        invoice.items.push(savedItem._id);
        await invoice.save();

        console.log('Invoice successfully updated')
        return savedItem;
    } catch (error) {
        console.error('Error saving new invoice', error)
        throw error;
    }
};
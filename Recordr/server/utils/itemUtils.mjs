import Invoice from '../models/invoice.mjs'
import Client from '../models/client.mjs'
import Item from '../models/items.mjs'

export const saveItemInternal = async (invoiceData, itemData) => {
    try {
        console.log('Beginning to save items internally')
        const invoiceId = invoiceData._id
        console.log('InvoiceId is', invoiceId)

        const invoice = await Invoice.findById(invoiceId);
        if (!invoice) {
            throw new Error('Invoice not found');
        }
        
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


// ------ Prepare OpenAI transcription for front end ------

export const prepareTranscription = async (transcription, clientList) => {
    try {
        const client = transcription.clientName;
        const invoice = transcription.invoice
        const clientMatch = () => {
            const queryClientList = findClientNameInList(client, clientList);
            return !!queryClientList;
        };
        
        if (invoice) {
                const invoiceList = await Invoice.findOne({ invoice })
                return !!invoiceList
            }

        switch (true) {
            case clientMatch:        
                // If new client mentioned
                
                invoiceData = { 
                    clientName: client, 
                    latestInvoice: "0001",
                    clientList,
                    newClient: true,
                }
                return { transcription, invoiceData }
            
            case invoiceMatch :                   
                // User states new Invoice

                clientInvoices = getInvoicesForNewNote(client)
                latestInvoice =  clientInvoices[0]
                invoiceData = {
                    clientName: client,
                    invoice: invoice,
                    clientInvoices,
                    clientList,
                    newClient: false,
                }
                return {invoiceData, }

            case existingInvoice: 
                // User states existing invoice

                clientInvoices = getInvoicesForNewNote(client)
                latestInvoice =  clientInvoices[0]
                invoiceData = {
                    clientName: client,
                    invoice: invoice,
                    clientInvoices,
                    clientList,
                    newClient: false,
                }
                return {invoiceData, }
            default: 
                const clientInvoices = getInvoicesForNewNote(client)
                const latestInvoice =  clientInvoices[0]
                const invoiceData = {
                    clientName: client,
                    invoice: latestInvoice,
                    clientInvoices: clientInvoices,
                    clientList: clientList,
                    newClient: false,
                }
                return { transcription, invoiceData }
        }

        if (!clientMatch) {

        } else if (newInvoice) {

        } else {

        }

        // need functionality to handle if user says it's a new invoice




    } catch (error) {
        console.error('Unable to prepare transcription', error.message)
        throw error
    }
};

// ------ Find Name in List -------

export const findClientNameInList = (nameToFind, clientList) => {
    const nameSet = new Set(clientList.map(client => client.clientName)); 
    return nameSet.has(nameToFind)
}
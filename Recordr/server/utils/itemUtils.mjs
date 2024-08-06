import Invoice from '../models/invoice.mjs'
import Client from '../models/client.mjs'
import Item from '../models/items.mjs'
import { createNewInvoiceInternal} from './invoiceUtils.mjs';
import { getLatestClientInvoiceInternal } from './clientUtils.mjs'
import connectDB from '../config/database.mjs';

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
        connectDB();
        const clientName = transcription.clientName;
        const invoice = transcription.invoice
        const clientMatch = () => {
            const queryClientList = findClientNameInList(clientName, clientList);
            return !!queryClientList;
        };

        console.log('Client', clientName)

        let clientInvoices, clientLatestInvoice, invoiceData
        
        const checkInvoice = async (invoice) => {
            console.log('Checking invoices')
            if (!invoice) {
                return { existingInvoice: false, newInvoice: false }
                console.log('Checked invoices, none received')
            } 
            const listedInvoice = await Invoice.findOne({ invoice })
            if (!listedInvoice) {
                return { existingInvoice: false, newInvoice: true };
            }
            return { existingInvoice: true, newInvoice: false }
        }

        const isClientMatch = clientMatch();
        const { existingInvoice, newInvoice } = await checkInvoice();


        switch (true) {
            case isClientMatch && !existingInvoice && !newInvoice:   
                // User mentions existing client and no invoice
                console.log('Beginning to generate response')


                
                const result = await getLatestClientInvoiceInternal(clientName);

                if (result.error) {
                    console.error('Error fetching client invoices:', result.error);
                    // Handle the error appropriately
                    break;
                }

                const { client, latestInvoice } = result;

                console.log('Client:', client);
                console.log('Latest Invoice:', latestInvoice);
                
                // If you need to assign to clientInvoices, you can do so here
                clientInvoices = { client, latestInvoice };

                clientLatestInvoice =  clientInvoices.latestInvoice
                invoiceData = {
                    clientName: client,
                    invoice: clientLatestInvoice,  // Gets invoice user last used with client
                    clientInvoices: clientInvoices,
                    clientList: clientList,
                    newClient: false,
                    newInvoice: false,
                }
                return { transcription, invoiceData }
            
            case isClientMatch && existingInvoice && !newInvoice:  
                // User mentions existing client and existing invoiceNumber      
                
                clientInvoices = await getLatestClientInvoiceInternal(client)
                latestInvoice =  clientInvoices[0]
                invoiceData = {
                    clientName: client,
                    invoice: invoice,
                    clientInvoices: clientInvoices,
                    clientList: clientList,
                    newClient: false,
                    newInvoice: false,
                }
                return { transcription, invoiceData }
            
            case isClientMatch && !existingInvoice && newInvoice:                   
                // User mentions existing Client with new invoiceNumber

                clientInvoices = await getLatestClientInvoiceInternal(client)
                latestInvoice =  clientInvoices[0]
                invoiceData = {
                    clientName: client,
                    invoice: invoice,
                    clientInvoices: clientInvoices,
                    clientList: clientList,
                    newClient: false,
                    newInvoice: true,
                }
                return { transcription, invoiceData }

            default: 
                // User mentions new client (can't have existing invoice)

                invoiceData = { 
                    clientName: client, 
                    invoice: "0001",
                    clientList: clientList,
                    newClient: true,
                    newInvoice: true,
                }
                return { transcription, invoiceData }
        }
    } catch (error) {
        console.error('Unable to prepare transcription,', error.message)
        throw error
    }
};


// ------ Find Name in List -------

export const findClientNameInList = (nameToFind, clientList) => {
    const nameSet = new Set(clientList.map(client => client.clientName)); 
    return nameSet.has(nameToFind)
}
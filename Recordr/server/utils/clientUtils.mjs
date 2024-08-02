import Client from '../models/client.mjs'
import Invoice from '../models/invoice.mjs'
import { createNewInvoiceInternal } from './invoiceUtils.mjs'



// ------ Get 'client' by 'client' (name) ------

export const getClientInternal = async (client) => {
    try {
        const clientInfo = await Client.findOne(client, {})
        return clientInfo;
    } catch (error) {
        console.error('Error getting client', error)
        throw error;
    }
};

export const getClientInvoicesInternal = async (clientName) => {
    try {
        const clientInvoices = await Client.findOne(clientName).populate('invoices')
        return clientInvoices
    } catch (error) {
        console.error(`Error finding invoices for ${clientName}`)
    }
};


// ------ Create new 'client' internal function ------

export const createNewClientInternal = async (clientName) => {
    console.log(clientName)
    try {
        const newClient = new Client({ clientName: clientName })   // need to simplify (think client could just be client)
        await newClient.save();
        return newClient;
    } catch (error) {
        console.error('Error in creating new client', error)
        throw error;
    }
};


// ------ Get ** latest ** 'invoice' by 'client' ------

export const getLatestClientInvoiceInternal = async (clientName) => {
    console.log('clientId:', clientName)
    try {
        const clientDoc = await Client.findOne({ client: clientName }).populate('invoices')
        
        if (!clientDoc) {
            console.log( `No client found named ${clientName}` )
            return { existingClient: null, latestInvoice: null };
        }
        
        console.log("ClientDoc:", clientDoc)

        if (!clientDoc.invoices || clientDoc.invoices.length === 0) {
            console.log("Client has no invoices")
            return { existingClient: clientDoc, latestInvoice: null };
        }

        const latestInvoice = await Invoice.findOne(
            { _id: { $in: clientDoc.invoices.map(invoices => invoices._id) } },
            {},
            { sort: { updatedAt: -1 } }
        );

        console.log("Lastest invoice:", latestInvoice);
        return { existingClient: clientDoc, latestInvoice };
    } catch (error) {
        console.error('Error getting latest invoice by client', error)
        throw error
    }
};


// ------ Update an 'invoice' by 'client' ------

// potentially not useful

// export const updateInvoiceByClientInternal = async (client, currentInvoiceNumber, newInvoiceNumber) => {
//     try {
//         const clientInvoices = await Invoice.findOneAndUpdate(
//             { 
//                 client: client, 
//                 invoiceNumber: currentInvoiceNumber
//             }, 
//             { invoiceNumber: newInvoiceNumber },
//             { new: true }
//         );

//         if (!clientInvoices) {
//             console.log('No invoice found with the provided criteria');
//             return null;
//         }

//         return clientInvoices;
//     } catch (error) {
//         console.error('Error getting invoices by client', error)
//         throw error
//     }
// };

export const ensureClientAndCreateInvoice = async (existingClient, clientName) => {
    try {
        let clientToUse = existingClient

        if (!existingClient) {
            console.log('No client received, creating new client')
            clientToUse = await createNewClientInternal(clientName)
        }
        console.log('Creating new invoice')
        const newInvoice = await createNewInvoiceInternal(clientToUse, '0001')
        return clientToUse, newInvoice;
    } catch (error) {
        console.error('Error creating new invoice and/or client', error)
        throw error
    }
};
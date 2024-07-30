import Client from '../models/client.mjs'
import Invoice from '../models/invoice.mjs'


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

export const getClientInvoicesInternal = async (client) => {
    try {
        const clientInvoices = await Client.findOne(client).populate('invoices')
        return clientInvoices
    } catch (error) {
        console.error(`Error finding invoices for ${client}`)
    }
};


// ------ Create new 'client' internal function ------

export const createNewClientInternal = async (client) => {
    console.log(client)
    try {
        const newClient = new Client({ client: client })   // need to simplify (think client could just be client)
        await newClient.save();
        return newClient;
    } catch (error) {
        console.error('Error in creating new invoice', error)
        throw error;
    }
};


// ------ Get **latest** 'invoice' by 'client' ------

export const getLatestClientInvoiceInternal = async (client) => {
    console.log('clientId:', client)
    try {
        const clientDoc = await Client.findOne({ client: client }).populate('invoices')
        if (!clientDoc || clientDoc.length === 0) {
            console.log( "No client found" )
            return null
        }
        console.log(clientDoc)

        const clientInvoices = clientDoc.invoices._id

        if (!clientInvoices || clientInvoices.length === 0) {
            console.log({ message: "Client invoice query is empty" })
            return null
        }

        const latestInvoice = await Invoice.findOne(clientInvoices, {}, { sort: { updatedAt: -1 } });
        return latestInvoice;
    } catch (error) {
        console.error('Error getting latest invoice by client', error)
        throw error
    }
}; 


// ------ Update an 'invoice' by 'client' ------

export const updateInvoiceByClientInternal = async (client, currentInvoiceNumber, newInvoiceNumber) => {
    try {
        const clientInvoices = await Invoice.findOneAndUpdate(
            { 
                client: client, 
                invoiceNumber: currentInvoiceNumber
            }, 
            { invoiceNumber: newInvoiceNumber },
            { new: true }
        );

        if (!clientInvoices) {
            console.log('No invoice found with the provided criteria');
            return null;
        }

        return clientInvoices;
    } catch (error) {
        console.error('Error getting invoices by client', error)
        throw error
    }
};

export const createInvoiceAndOrClient = async (client) => {
    if (!client || client.length === 0) {
        const newClient = await createNewClientInternal(clientName)
        clientName = newClient
    }
    return await createNewInvoiceInternal(clientName, '0001')
};
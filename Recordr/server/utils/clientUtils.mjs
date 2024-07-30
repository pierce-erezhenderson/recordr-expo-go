import Client from '../models/client.mjs'


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

// export const getClientInvoicesInternal = async (client) => {
//     try {
//         const clientInvoices = await Client.findOne(client).populate('invoices')
//     }
// }

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
        const latestInvoice = await Invoice.findOne(
            { client }, 
            {}, 
            { sort: { updatedAt: -1 } }
        );
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
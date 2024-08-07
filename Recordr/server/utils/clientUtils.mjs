import Client from '../models/client.mjs'
import Invoice from '../models/invoice.mjs'
import { createNewInvoiceInternal } from './invoiceUtils.mjs'



// ------ Get 'client' by 'client' (name) ------

export const getClientInternal = async (client) => {
    try {
        const { clientName } = client;
        console.log(clientName)
        const clientInfo = await Client.findOne({ clientName }, {})

        if (!clientInfo) {
            console.log('No client found')
            return null;
        }

        console.log('Client found, returning:', clientInfo)
        return clientInfo;
    } catch (error) {
        console.error('Error getting client', error)
        throw error;
    }
};


// ------ Get all clients ------

export const getAllClientsInternal = async () => {
    try {
        console.log('Initiating getAllClientsInternal')
        const clientList = await Client.find({}, { clientName: 1 });

        if (!clientList) {
            console.log('No clients found')
            return null;
        }

        console.log('Clients found, returning:', clientList)
        return clientList;
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
    try {
        const client = await getClientWithInvoices(clientName);
        if (!client) {
            return { client: null, latestInvoice: null, otherInvoices: [] };
        }

        const { latestInvoice, otherInvoices } = await getInvoicesForClient(client);

        return { client, latestInvoice, otherInvoices };
    } catch (error) {
        console.error('Error getting latest invoice by client:', error);
        throw error;
    }
};

const getClientWithInvoices = async (clientName) => {
    return await Client.findOne({ clientName }).populate('invoices');
};

const getInvoicesForClient = async (client) => {
    const clientInvoices = client.invoices || [];

    if (clientInvoices.length === 0) {
        return { latestInvoice: null, otherInvoices: [] };
    }

    const latestInvoice = await Invoice.findOne(
        { _id: { $in: clientInvoices.map(invoice => invoice._id) } },
        {},
        { sort: { updatedAt: -1 } }
    );

    const otherInvoices = clientInvoices.filter(invoice => invoice.id !== latestInvoice.id);

    return { latestInvoice, otherInvoices, clientInvoices };
};





// ------- Ensure 'client' (get or create) --------

export const ensureClient = async (clientName) => {
    try {
        let client = await getClientInternal({ clientName });
        if (!client) {
            client = await createNewClientInternal(clientName);
        }
        return client;
    } catch (error) {
        console.error('Failed to create client', error.message)
        throw error
    } 
};

export const updateClientInternal = async (_id, newClientName) => {
    try {
        const updatedClient = await Client.findOneAndUpdate(
            { _id },
            { clientName: newClientName },
            { new: true },
        );
        return { updatedClient };
    } catch (error) {
        console.error('Could not update ClientName')
        throw error
    }
};








// // ------ Checks 'client' exists -------

// export const ensureClientInternal = async (clientName) => {
//     try {
//         const existingClient = await findOne({ clientName: clientName });
//         return { existingClient };
//     } catch (error) {
//         console.error('Error creating new invoice and/or client', error)
//         throw error
//     }
// };




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





//****************** confusing code in get latest invoice, not sure why I need to gate, feels old and unmodular*/
        // const clientDoc = await Client.findOne({ clientName: clientName }).populate('invoices');
        
        // if (!clientDoc) {
        //     console.log(`No client found named ${clientName}`);
        //     return { client: null, latestInvoice: null };
        // }
        
        // console.log("ClientDoc:", clientDoc);

        // if (!clientDoc.invoices || clientDoc.invoices.length === 0) {
        //     console.log("Client has no invoices");
        //     return { client: clientDoc, latestInvoice: null };
        // }



        // export const getLatestClientInvoiceInternal = async (clientName, clientInvoices) => {
        //     console.log('clientId:', clientName)
        //     try {
        
        //         const clientDoc = await Client.findOne({ clientName: clientName }).populate('invoices');
        //         const clientInvoices = clientDoc ? clientDoc.invoices : [];
        //         console.log('clientInvoices:', clientInvoices)
        
        //         if (!clientInvoices || clientInvoices.length === 0) {
        //             console.log("Client has no invoices");
        //             return { client: clientDoc, latestInvoice: null };
        //         }
        
        //         console.log('clientInvoices:', clientInvoices)
        //         console.log(typeof clientInvoices);
        //         console.log(Array.isArray(clientInvoices));
        
        //         const latestInvoice = await Invoice.findOne(
        //             { _id: { $in: clientInvoices.map(invoice => invoice._id) } },
        //             {},
        //             { sort: { updatedAt: -1 } }
        //         );
        
        //         const otherInvoices = clientInvoices.filter(invoice => invoice.id !== latestInvoice.id);
                
        //         console.log('otherInvoices:', otherInvoices)
        //         console.log("Latest invoice:", latestInvoice);
        //         return { client: clientDoc, latestInvoice, otherInvoices };
        //     } catch (error) {
        //         console.error('Error getting latest invoice by client', error)
        //         throw error
        //     }
        // };
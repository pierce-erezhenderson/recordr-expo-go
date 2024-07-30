import {
    createNewInvoiceInternal,
} from '../utils/invoiceUtils.mjs'
import {
    getClientInternal,
    createNewClientInternal,
    getLatestClientInvoiceInternal,
    updateInvoiceByClientInternal,
    getClientInvoicesInternal,
} from '../utils/clientUtils.mjs';



export const getClient = async (req, res) => {
    const client = req.body
    try {
        const clientInfo = await getClientInternal(client);

        if (!clientInfo)
            res.status(404).json({ message: "Client doesn't exist" });

        res.status(400).json({clientInfo})
        return clientInfo
    } catch (error) {
        console.error("Error creating new client:", error);
        res.status(500).json({ message: error.message })
    }
};


export const upsertForNewNote = async (req, res) => {
    // Handles invoice fetching or creation for new note

    const { client } = req.body;   // Making client variable an object for .findOne()       // user: req.user._id
    const clientName = client
    const invoice = await getLatestClientInvoiceInternal(clientName);
  
    switch (true) {
        case (!invoice || invoice.length === 0):
            console.log('No invoices found, creating new invoice');
            invoice = [await createInvoiceAndOrClient(clientName)]
            statusCode = 201;
            message = 'New invoice created';
            break;
            
        case (invoice && invoice.length > 0):
            statusCode = 200;
            message = 'Latest invoice found';
            break;

        default:
            statusCode = 500;
            message = 'Unexpected condition in upsertForNewNote'
    }
    return { invoice, statusCode, message }
};


// ----- Create new 'client' ------

export const createNewClient = async (req, res) => {
    const { client } = req.body;
    try {
        const existingClient = await getClientInternal(client);
        if (existingClient) {
            return res.status(400).json({ message: `${client} already exists`});
        }

        const newClient = createNewClientInternal(client);

        if (!newClient) {
            return res.status(401).json({ message: "Failed to create client"});
        }

        res.status(201).json({
            message: `Created new Client ${client}`,
            newClient
        });
    } catch (error) {
        console.error("Error creating new client:", error);
        res.status(500).json({ message: error.message })
    };
};


// ----- Get 'invoices' by 'client' ------

export const getClientInvoices = async (req, res) => {
    // Gets all invoices by client

    const { client } = req.body;
    try {
        const clientInvoices = await getClientInvoicesInternal(client);
        
        if (!clientInvoices) {
            res.status(404).json({ message: "Failed to fetch client invoices"})
        }

        res.status(200).json({
            message: 'Client invoices found and returned',
            clientInvoices})
    } catch (error) {
        res.status(500).json({ message: error.message })
    };
};


// ------ Update 'invoice' by 'client' -------

export const updateInvoiceByClient = async (req, res) => {
    // Updates upsertForNewNote invoice with user provided invoice (irrespective of invoice number provided)
    
    const { client, currentInvoiceNumber, newInvoiceNumber } = req.body;
    try {
        const invoices = await updateInvoiceByClientInternal(client, currentInvoiceNumber, newInvoiceNumber);
        res.status(200).json({
            message: 'Updated new client invoice',
            invoices
        });
    } catch (error) {
        console.error('Error updating invoice:', error);
        res.status(500).json({ message: 'Error updating invoice', error: error.message });
    };
};

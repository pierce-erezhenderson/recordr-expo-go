import {
    // createNewInvoiceInternal,
    updateInvoiceInternal,
} from '../utils/invoiceUtils.mjs'
import {
    getClientInternal,
    createNewClientInternal,
    getLatestClientInvoiceInternal,
    getClientInvoicesInternal,
    // ensureClientAndCreateInvoice,
    updateClientInternal,
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


export const handleClientInvoicesForNewNote = async (req, res) => {
    const { clientName: clientName } = req.body;
    let invoices, statusCode, message
    
    const clientInvoices = getClientInvoicesInternal(clientName)

    if (!clientInvoices || clientInvoices.length === 0) {
        invoices = null
        statusCode = 201;
        message = 'No client and/or invoices found';
        res.status(statusCode).json({ message, invoices: null });
        return { invoices: null, statusCode, message };
    } 
    // note on above ^ front end handles '0001' invoice number, gets returned to backend when user saves
    
    try {
        const { latestInvoice } = await getLatestClientInvoiceInternal(clientName);
        const otherInvoices = clientInvoices.filter(invoice => invoice.id !== latestInvoice.id);
        
        invoices = {
            latestInvoice,
            otherInvoices
        }
        statusCode = 200;
        message = 'Client invoices found';
    } catch (error) {
        statusCode = 500;
        message = 'Unexpected condition in upsertForNewNote'
    }

    res.status(statusCode).json({message, invoices});
    return { invoices, statusCode, message };
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


// ------ Update 'client' -------

export const updateClient = async (req, res) => {
    const { _id, newClientName } = req.body;

    try { 
        const updatedClient = await updateClientInternal(_id, newClientName);
        res.status(200).json('Updated Client', updatedClient)

        if (!_id) {
            console.log(`No client with id ${_id} found`)
            res.status(201).json({message: `No client named ${client} found`})
        }
    } catch (error) {
        console.error('Failed to properly updating client', error)
        res.status(500).json({ message: error.message })
    }
};


// ------- Update 'invoice' by 'client' -------

export const updateInvoiceByClient = async (req, res) => {
    // Updates upsertForNewNote invoice with user provided invoice (irrespective of invoice number provided)
    
    const { _id, newInvoiceNumber } = req.body;
    try {
        const invoices = await updateInvoiceInternal(_id, newInvoiceNumber);
        res.status(200).json({
            message: 'Updated new client invoice',
            invoices
        });
    } catch (error) {
        console.error('Error updating invoice:', error);
        res.status(500).json({ message: 'Error updating invoice', error: error.message });
    };
};





// ----- Get 'invoices' by 'client' ------

// export const getClientInvoices = async (req, res) => {
//     // Gets all invoices by client

//     const { client } = req.body;
//     try {
//         const clientInvoices = await getClientInvoicesInternal(client);
        
//         if (!clientInvoices) {
//             res.status(404).json({ message: "Failed to fetch client invoices"})
//         }

//         res.status(200).json({
//             message: 'Client invoices found and returned',
//             clientInvoices})
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     };
// };





// ------ Update 'invoice' by 'client' -------



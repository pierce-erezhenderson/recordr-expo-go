import Invoice from '../models/invoice.mjs';
import { 
    createNewInvoiceInternal,
    updateClientInvoiceInternal, 
    getLatestClientInvoiceInternal,
    getInvoicesByClientInternal
} from '../utils/invoiceUtils.mjs'

export const getAllInvoicesForUser = async (req, res) => {
    try {
        const invoices = await Invoice.find({ user: req.user._id }).populate('items');
        res.json(invoices); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id).populate('items');
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found'});
        }
        res.json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// TO DELETE REDUNDANT API
// export const getClientInvoices = async (req, res) => {
//     const { clientId, invoiceNumber } = req.body;
//     try {
//         const invoice = await Invoice.find({ client: clientId }).populate('items');
//         if (!invoice) {
//             return res.status(404).json({ message: 'Invoice not found'});
//         }
//         res.json(invoice);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


// export const getClientInvoices = async (req, res) => {
//     const { client } = req.body;
//     try {
//         const invoices = await getClientInvoicesInternal(client);
//         if (!invoices) {
//             return res.status(404).json({ message: 'Invoices not found'});
//         }
//         res.json(invoices);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


//*** CURRENTLY TESTING THE BELOW FUNCTIONS */

export const upsertForNewNote = async (req, res) => {
    // Handles invoice fetching or creation for new note

    const { client } = req.body;   // Making client variable an object for .findOne()       // user: req.user._id
    try {
        let invoice = await getLatestClientInvoiceInternal(client);
        let statusCode = 200;
        let message = 'Latest invoice found';

        if (!invoice || invoice.length === 0) {
            console.log('No invoices found, creating new invoice');
            const newClientInvoice = await createNewInvoiceInternal({
                client: client, 
                invoiceNumber: '0001'
            });
            invoice = [newClientInvoice];
            statusCode = 201;
            message = 'New invoice created';
        }

        res.status(statusCode).json({
            message,
            invoice
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

export const createNewInvoiceWithNumber = async (req, res) => {
    // Creates a new invoice for client with user provided invoice number

    const { client: client } = req.body;
    const { invoiceNumber: invoiceNumber } = req.body;
    try {
        const invoice = createNewInvoiceInternal(client, invoiceNumber);
        console.log('New invoice created:', invoice);
        res.status(201).json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getInvoicesbyClient = async (req, res) => {
    // Gets all invoices by client

    const { client } = req.body;
    try {
        const invoices = await getInvoicesByClientInternal(client);
        res.status(200).json({
            message: 'Client invoices found and returned',
            invoices})
    } catch (error) {
        res.status(500).json({ message: error.message })
    };
};

export const updateClientInvoice = async (req, res) => {
    // Updates upsertForNewNote invoice with user provided invoice (irrespective of invoice number provided)
    
    const { client, currentInvoiceNumber, newInvoiceNumber } = req.body;
    try {
        const invoices = await updateClientInvoiceInternal(client, currentInvoiceNumber, newInvoiceNumber);
        res.status(200).json({
            message: 'Updated new client invoice',
            invoices
        });
    } catch (error) {
        console.error('Error updating invoice:', error);
        res.status(500).json({ message: 'Error updating invoice', error: error.message });
    };
};


//*** CURRENTLY TESTING THE ABOVE FUNCTIONS */







export const updateInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true }
        ).populate('items');
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found'});
        }
        res.json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found'});
        }
        res.json({ message: 'Invoice removed'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
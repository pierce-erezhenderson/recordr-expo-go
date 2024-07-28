import Invoice from '../models/invoice.mjs';
import { getClientInvoicesInternal } from '../utils/invoiceUtils.mjs'

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


export const getClientInvoices = async (req, res) => {
    const { client } = req.body;
    try {
        const invoices = await getClientInvoicesInternal(client);
        if (!invoices) {
            return res.status(404).json({ message: 'Invoices not found'});
        }
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//*** CURRENTLY TESTING THE BELOW FUNCTIONS */

export const handleClientDataForNewNote = async (req, res) => {
    const { client } = req.body;
    try {
        const invoices = await getClientInvoicesInternal(client);
        if (!invoices) {
            const newClientInvoice = await createNewInvoice(client, {invoiceNumber: '0001'})
            res.json(newClientInvoice);
        }
        res.json(invoices)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

export const createNewInvoice = async (req, res) => {
    try {
        const invoice = new Invoice({
            ...req.body,
            user: req.user._id
        });
        await invoice.save();
        res.status(201).json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
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
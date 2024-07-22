import Invoice from '../models/invoice.mjs';


// ------- Functions for Invoices -------

export const getAllUserInvoices = async (req, res) => {
    // Get all invoices from user
    try {
        const invoice = new Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).send({ message: 'Invoice not found'});
        }
        res.send(invoice);
    } catch (error) {
        res.status(500).send({ message: error.message });
    };
};

export const getSingleInvoice = async (req, res) => {
    // Get a single invoice
    try {
        const invoice = new Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).send({ message: 'Invoice not found'});
        }
        res.send(invoice);
    } catch (error) {
        res.status(500).send({ message: error.message });
    };
};

export const createNewInvoice = async (req, res) => {
    // Create a new invoice
    try {
        const invoice = new Invoice(req.body);
        await invoice.save();
        res.status(201).send(invoice);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const updateInvoice = async (req, res) => {
    // Update sent and paid statuses for invoice
    try {
        const invoice = Invoice.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true }
        );
        if (!invoice) {
            return res.status(404).send({ message: 'Invoice not found'});
        }
        res.send(invoice);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const deleteInvoice = async (req, res) => {
    // Delete an invoice
    try {
        const invoice = new Invoice.findByIdAndDelete(req.params.id);
        if (!invoice) {
            return res.status(404).send({ message: 'Invoice not found'});
        }
        res.send({ message: 'Invoice removed'});
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};



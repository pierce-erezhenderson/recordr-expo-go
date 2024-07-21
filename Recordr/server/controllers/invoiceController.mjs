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


// ------- Functions for Items -------

export const getAllInvoiceNotes = async (req, res) => {
    // Get all items from an invoice
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).send({ message: 'Invoice not found'});
        }
        res.send(invoice.items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const addNewInvoiceNote = async (req, res) => {
    // Get all items from an invoice
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).send({ message: 'Invoice not found'});
        }
        invoice.items.push(req.body);
        await invoice.save();
        res.status(201).send(invoice);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const getSingleInvoiceNote = async (req, res) => {
    // Get a single item from an invoice
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).send({ message: 'Invoice not found'});
        }
        res.send(invoice.items.id(req.params.id));
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const updateInvoiceItem = async (req, res) => {
    // Update an item from an invoice
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).send({ message: 'Invoice not found'});
        }
        const item = invoice.items.id(req.params.id);
        item.set(req.body);
        await invoice.save();
        res.send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const deleteInvoiceNote = async (req, res) => {
    // Delete an item from an invoice
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).send({ message: 'Invoice not found'});
        }
        invoice.items.id(req.params.id).remove();
        await invoice.save();
        res.send({ message: 'Item removed'});
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

import Invoice from '../models/invoice.mjs';

export const getAllUserInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find({ user: req.user._id }).populate('items');
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSingleInvoice = async (req, res) => {
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

// should create an invoice if particular invoice not found (only in recordr-updated contexts?)
// if (recordr) then createNewInvoice
// else return error

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
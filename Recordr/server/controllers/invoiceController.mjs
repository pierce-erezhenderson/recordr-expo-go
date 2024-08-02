import Invoice from '../models/invoice.mjs';
import { 
    createNewInvoiceInternal,
    updateInvoiceInternal,
//     getLatestClientInvoiceInternal,
//     getInvoicesByClientInternal
} from '../utils/invoiceUtils.mjs'


// ------ Create new 'invoiceNumber' for 'client' via user input ------

export const createNewInvoiceWithNumber = async (req, res) => {
    // Creates a new invoice for client with user provided invoice number

    const { client: clientName, invoiceNumber } = req.body;
    try {
        const invoice = await createNewInvoiceInternal(clientName, invoiceNumber);
        console.log('New invoice created:', invoice);
        res.status(201).json(invoice);
    } catch (error) {
        console.error('Error in createNewInvoiceWithNumber:', error);
        res.status(500).json({ message: error.message });
    }
};

export const updateInvoice = async (req, res) => {
    try {
        const updatedInvoice = await updateInvoiceInternal(req.params.id, req.body);
        res.status(200).json("Updated invoice:", updatedInvoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





// **************** currently unused ****************


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
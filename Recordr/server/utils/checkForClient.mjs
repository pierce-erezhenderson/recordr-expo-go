import invoice from '../models/invoice.mjs';
import { getInvoiceByClient } from '../controllers/invoiceController.mjs';

const response = {
    client: 'John Doe',
    note: 'This is a note'
}

const checkForClient = (response) => {
    try {
        const existingInvoiceNumber = getInvoiceByClient(response.client)
        if (!invoice) {
            console.log('Creating new invoice for recordr note')
            const data = createNewInvoice();
            const newInvoiceNumber = data.invoiceNumber
            return newInvoiceNumber
        }
        return existingInvoiceNumber;
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

checkForClient(response);
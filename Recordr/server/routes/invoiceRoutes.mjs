import express from 'express';
import { 
    getAllUserInvoices, 
    getSingleInvoice, 
    createNewInvoice, 
    updateInvoice, 
    deleteInvoice,
} from '../controllers/invoiceController.mjs';

const router = express.Router();

// ------- Routes for Invoices -------

router.get('/invoices', getAllUserInvoices);
router.get('/invoices/:id', getSingleInvoice);
router.post('/invoices', createNewInvoice);
router.put('/invoices/:id', updateInvoice);
router.delete('/invoices/:id', deleteInvoice);

export default router;
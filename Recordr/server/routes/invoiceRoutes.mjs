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

router.get('/invoice', getAllUserInvoices);
router.get('/invoice:id', getSingleInvoice);
router.post('/invoice/:id', createNewInvoice);
router.put('/invoice/:id', updateInvoice);
router.delete('/invoice/:id', deleteInvoice);

export default router;
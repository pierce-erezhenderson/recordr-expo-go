import express from 'express';
import { 
    getAllUserInvoices, 
    getSingleInvoice, 
    createNewInvoice, 
    updateInvoice, 
    deleteInvoice,
    getAllInvoiceNotes,
    getSingleInvoiceNote,
    addNewInvoiceNote,
    deleteInvoiceNote,
    updateInvoiceItem
} from '../controllers/invoiceController.mjs';

const router = express.Router();


// ------- Routes for Invoices -------

router.get('/invoice', getAllUserInvoices);
router.get('/invoice:id', getSingleInvoice);
router.post('/invoice/:id', createNewInvoice);
router.put('/invoice/:id', updateInvoice);
router.delete('/invoice/:id', deleteInvoice);


// ------- Routes for Items -------

router.get('/invoice/:id/items', getAllInvoiceNotes);
router.get('/invoice/:id/items:id', getSingleInvoiceNote);
router.post('/invoice/:id/items', addNewInvoiceNote);
router.delete('/invoice/:id/items', deleteInvoiceNote);
router.put('/invoice/:id/items', updateInvoiceItem);

export default router;
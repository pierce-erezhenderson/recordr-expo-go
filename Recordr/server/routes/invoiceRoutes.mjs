import express from 'express';
import { 
    getAllInvoicesForUser, 
    getInvoiceById, 
    getClientInvoices,
    // getInvoiceByClient,
    createNewInvoice, 
    updateInvoice, 
    deleteInvoice,
    upsertForNewNote
} from '../controllers/invoiceController.mjs';

const router = express.Router();

// ------- General Routes for Invoices -------

router.get('/invoices', getAllInvoicesForUser); 
router.get('/invoices/:id', getInvoiceById);
router.get('/client', getClientInvoices); 
// router.get('/client/:clientId/invoices/:invoiceId', getInvoiceByClient); // create this controller
router.post('/invoices', createNewInvoice);
router.put('/invoices/:id', updateInvoice);
router.delete('/invoices/:id', deleteInvoice);

// ------- Routes for New Notes -------

router.post('/client', upsertForNewNote);






//***** not for Dev 2 */

// // Invoice status management
// router.put('/invoices/:id/status', updateInvoiceStatus); // create this controller

// // Payment handling
// router.post('/invoices/:id/payments', addPaymentToInvoice); // create this controller
// router.get('/invoices/:id/payments', getInvoicePayments); // create this controller


export default router;
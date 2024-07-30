import express from 'express';
import { 
    getAllInvoicesForUser, 
    getInvoiceById, 
    // getOneInvoiceByClient,
    createNewInvoiceWithNumber, 
    updateInvoice, 
    deleteInvoice,
} from '../controllers/invoiceController.mjs';

const router = express.Router();

// ------- General Routes for 'invoices' -------

router.get('/invoice', getAllInvoicesForUser); 
router.get('/invoice/:id', getInvoiceById);
// router.get('/client/:clientId/invoices/:invoiceId', getInvoiceByClient); // create this controller
router.put('/invoice/:id', updateInvoice);
router.delete('/invoice/:id', deleteInvoice);

// ------- 'invoice' routes for new notes -------

router.post('/invoice', createNewInvoiceWithNumber);






//***** not for Dev 2 */

// // Invoice status management
// router.put('/invoices/:id/status', updateInvoiceStatus); // create this controller

// // Payment handling
// router.post('/invoices/:id/payments', addPaymentToInvoice); // create this controller
// router.get('/invoices/:id/payments', getInvoicePayments); // create this controller


export default router;
import express from 'express';
import { 
    getAllUserInvoices, 
    getInvoiceById, 
    getInvoiceByClient,
    createNewInvoice, 
    updateInvoice, 
    deleteInvoice,
} from '../controllers/invoiceController.mjs';

const router = express.Router();

// ------- Routes for Invoices -------

router.get('/invoices', getAllInvoicesByUser); // update this controller
router.get('/invoices/:id', getInvoiceById);
router.get('/clients/clientId/invoices', getClientInvoices); // update this controller
router.get('/clients/:clientId/invoices/:invoiceId', getInvoiceByClient); // update this controller
router.post('/invoices', createNewInvoice);
router.put('/invoices/:id', updateInvoice);
router.delete('/invoices/:id', deleteInvoice);



//***** not for Dev 2 */

// // Invoice status management
// router.put('/invoices/:id/status', updateInvoiceStatus); // create this controller

// // Payment handling
// router.post('/invoices/:id/payments', addPaymentToInvoice); // create this controller
// router.get('/invoices/:id/payments', getInvoicePayments); // create this controller


export default router;
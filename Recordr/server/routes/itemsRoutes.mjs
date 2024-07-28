import express from 'express';
import { 
    generateRecordrNote 
} from '../controllers/itemsController.mjs';

const router = express.Router();

// Create new item
router.post('/generateRecordrNote', generateRecordrNote);

// // Invoice item management
// router.get('/invoices/:invoiceId/items', getInvoiceItems); // create this controller
// router.post('/invoices/:invoiceId/items', addItemToInvoice); // create this controller
// router.put('/invoices/:invoiceId/items/:itemId', updateInvoiceItem); // create this controller
// router.delete('/invoices/:invoiceId/items/:itemId', deleteInvoiceItem); // create this controller

export default router;
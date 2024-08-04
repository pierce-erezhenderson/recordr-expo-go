import express from 'express';
import { 
    generateRecordrNote,
    handleUpsertItem,
    handleNewItemCreateInvoice,
    handleNewItemCreateClient
} from '../controllers/itemsController.mjs';

const router = express.Router();

router.post('/generateRecordrNote', generateRecordrNote);

router.put('/client/invoice/item', handleUpsertItem);
router.post('/client/item', handleNewItemCreateInvoice)
router.post('/item', handleNewItemCreateClient)


// // Invoice item management
// router.get('/invoices/:invoiceId/items', getInvoiceItems); // create this controller
// router.post('/invoices/:invoiceId/items', addItemToInvoice); // create this controller
// router.put('/invoices/:invoiceId/items/:itemId', updateInvoiceItem); // create this controller
// router.delete('/invoices/:invoiceId/items/:itemId', deleteInvoiceItem); // create this controller

export default router;
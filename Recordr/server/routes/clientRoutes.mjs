import express from 'express';
import {
    // getAllClients,
    getClient,
    createNewClient,
    // updateClient,
    getAllClientInvoices,
    updateInvoiceByClient,
    updateClient,
} from '../controllers/clientController.mjs';

const router = express.Router();

// router.get('/client', getAllClients);   // to create
router.post('/client', createNewClient);
router.put('/client', updateClient);

router.get('/client/:id', getClient);
router.put('/client/:id', updateInvoiceByClient);   // is there a more sophiscated way to do address?

// router.get('/client/invoices', getClientInvoices);
router.get('/client/invoice', getAllClientInvoices);


export default router;
import express from 'express';
import {
    // getAllClients,
    getClient,
    createNewClient,
    // updateClient,
    getInvoicesbyClient,
    upsertForNewNote,
    updateInvoiceByClient,
} from '../controllers/clientController.mjs';

const router = express.Router();

// router.get('/client', getAllClients);   // to create
router.get('/client/:id', getClient);
router.post('/client', createNewClient);
// router.put('/client', updateClient);    // to create

router.get('/client/:id', getInvoicesbyClient);
router.post('/client/:id', upsertForNewNote);
router.put('/client/:id', updateInvoiceByClient);

export default router;
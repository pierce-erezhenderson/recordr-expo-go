import { speechToText } from '../utils/apiGoogleSTT.mjs';
import { openAICompletion } from '../utils/apiOpenAI.mjs';
import { createNewInvoice, getSingleInvoice } from './invoiceController.mjs';
import { parseMessageFromCompletion } from '../utils/jsonParser.mjs';

let audioChunks = [];

export const createRecordrNote = async (req, res) => {
    try {
        const { audio, isLastChunk } = req.body;
        
        if (!audio) {
          return res.status(400).json({ error: 'No audio data provided' });
        }

        audioChunks.push(Buffer.from(audio, 'base64'));
        
        // Generating transcription
        const fullAudio = Buffer.concat(audioChunks); // Prepares for Google STT
        const transcription = await speechToText(fullAudio); // Google Cloud api - Speech to Text
        const response = await openAICompletion(transcription); // OpenAI GPT api - Text to JSON object
        
        // Fetching invoice ID (if available)
        const parsedTranscription = JSON.parse(transcription);
        const clientName = String(parsedTranscription.client);
        const invoiceId = await getSingleInvoice( { client: clientName});
        if (!invoiceId) {
            return res.status(404).send({ message: 'Invoice not found'});
        }

        audioChunks = [];
            
        res.json({ response, invoiceId });

    } catch (error) {
        console.error('Error recording:', error);
        res.status(500).json({ error: 'Failed to record' });
    }
};


// ------- Functions for Items -------

export const addNewInvoiceNote = async (req, res) => {
    // Get all items from an invoice
    try {
        let invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            invoice = await createNewInvoice(req.body);
            if (!invoice) {
                return res.status(400).send({ message: 'Failed to create a new invoice' });
            }
        } else {
            invoice.items.push(req.body);
            await invoice.save();
        }
        res.status(201).send(invoice);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};



// boilerplate; not configured...
export const getAllInvoiceNotes = async (req, res) => {
    // Get all items from an invoice
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).send({ message: 'Invoice not found'});
        }
        res.send(invoice.items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const getSingleInvoiceNote = async (req, res) => {
    // Get a single item from an invoice
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).send({ message: 'Invoice not found'});
        }
        res.send(invoice.items.id(req.params.id));
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const updateInvoiceItem = async (req, res) => {
    // Update an item from an invoice
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).send({ message: 'Invoice not found'});
        }
        const item = invoice.items.id(req.params.id);
        item.set(req.body);
        await invoice.save();
        res.send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const deleteInvoiceNote = async (req, res) => {
    // Delete an item from an invoice
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).send({ message: 'Invoice not found'});
        }
        invoice.items.id(req.params.id).remove();
        await invoice.save();
        res.send({ message: 'Item removed'});
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

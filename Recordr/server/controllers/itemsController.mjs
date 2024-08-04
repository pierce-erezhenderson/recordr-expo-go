import { speechToText } from '../utils/apiGoogleSTT.mjs';
import { openAICompletion } from '../utils/apiOpenAI.mjs';
import Invoice from '../models/invoice.mjs';    // DO I NEED THIS ?
import Record from '../models/items.mjs';       // DO I NEED THIS ?
import { createNewClientInternal } from '../utils/clientUtils.mjs'
import { createNewInvoiceInternal } from '../utils/invoiceUtils.mjs'
import { saveItemInternal } from '../utils/itemUtils.mjs'


let audioChunks = [];

export const generateRecordrNote = async (req, res) => {
    try {
        const { audio, isLastChunk } = req.body;
        
        if (!audio) {
          return res.status(400).json({ error: 'No audio data provided' });
        }

        audioChunks.push(Buffer.from(audio, 'base64'));
        
        // ----- Generating transcription ------

        // Step 1 -- Google STT
        const fullAudio = Buffer.concat(audioChunks);
        console.log('Full audio length:', fullAudio.length);
        const transcription = await speechToText(fullAudio);
        console.log('Transcription:', transcription);

        // Step 2 -- OpenAI completion
        const response = await openAICompletion(transcription);
        console.log ('Response:', response);

        // // Step 3 -- Internal check (client and invoice number)
        // const clientCheck = response.client // need to figure out graceful way to handle errors
        // const 
        // ******* this could probably become 

        audioChunks = [];
            
        res.json({ response });

    } catch (error) {
        console.error('Error recording:', error);
        res.status(500).json({ error: 'Failed to record' });
    }
};


// ------ Handles saving new item without 'client' or 'invoice' -------

export const handleNewItemCreateClient = async (req, res) => {

    try {
        console.log('New note, ensuring client then invoice before saving item')
        const { invoiceData, itemData } = req.body

        if (!invoiceData || !itemData) {
            return res.status(400).json({ error: 'Missing required data' });
        }

        const newClient = await createNewClientInternal(invoiceData.clientName)
        console.log(`Client:`, newClient)

        const invoice = await createNewInvoiceInternal(invoiceData, newClient)
        console.log(`Invoice:`, invoice)

        itemData.invoice = invoice._id
        console.log(`itemData.invoice`, itemData.invoice)

        const savedItem = await saveItemInternal(invoice, itemData)

        console.log(`savedItem`, savedItem)

        console.log(`Successfully saved item to ${savedItem.invoice}`)
        res.status(200).json(savedItem);
    } catch (error) {
        console.error('Error saving item', error)
        res.status(500).json({ error: 'Failed to save' })
    }
};


// ------ Handles saving new item without 'invoice' -------

export const handleNewItemCreateInvoice = async (req, res) => {

    try {
        console.log('New note, ensuring client then invoice before saving item')
        const { invoiceData, itemData } = req.body

        if (!invoiceData || !itemData) {
            return res.status(400).json({ error: 'Missing required data' });
        }

        console.log(`Client:`, invoiceData.clientName)

        const invoice = await createNewInvoiceInternal(invoiceData.newInvoiceNumber, invoiceData.clientName)
        console.log(`Invoice:`, invoice)

        itemData.invoice = invoice._id
        console.log(`itemData.invoice`, itemData.invoice)

        const savedItem = await saveItemInternal(invoice, itemData)
        console.log(`savedItem`, savedItem)
        console.log(`Successfully saved item to ${savedItem.invoice}`)

        res.status(200).json(savedItem);
    } catch (error) {
        console.error('Error saving item', error)
        res.status(500).json({ error: 'Failed to save' })
    }
};


// ------ Handles updating existing or inserting new item -------

export const handleUpsertItem = async (req, res) => {
    try {
        console.log('New note, ensuring client then invoice before saving item')
        const { invoiceData, itemData } = req.body

        if (!invoiceData || !itemData) {
            return res.status(400).json({ error: 'Missing required data' });
        }

        console.log(`ItemData:`, itemData)
        console.log(`InvoiceData:`, invoiceData)

        itemData.invoice = invoiceData._id
        console.log(`itemData.invoice`, itemData.invoice)

        const savedItem = await saveItemInternal(invoiceData, itemData)

        console.log(`savedItem`, savedItem)

        console.log(`Successfully saved item to ${savedItem.invoice}`)
        res.status(200).json(savedItem);
    } catch (error) {
        console.error('Error saving item', error)
        res.status(500).json({ error: 'Failed to save' })
    }
};








// **************** currently unused ****************




export const addRecordrNote = async (req, res) => {
    try {
        let invoice = await Invoice.findById(req.params.invoiceId);
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        const newRecord = new Record({
            invoice: invoice._id,
            ...req.body
        });

        await newRecord.save();

        invoice.items.push(newRecord._id);
        await invoice.save();

        res.status(201).json(newRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllInvoiceNotes = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.invoiceId).populate('items');
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found'});
        }
        res.json(invoice.items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSingleInvoiceNote = async (req, res) => {
    try {
        const record = await Record.findById(req.params.recordId);
        if (!record) {
            return res.status(404).json({ message: 'Record not found'});
        }
        res.json(record);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateInvoiceItem = async (req, res) => {
    try {
        const record = await Record.findByIdAndUpdate(
            req.params.recordId,
            { $set: req.body },
            { new: true }
        );
        if (!record) {
            return res.status(404).json({ message: 'Record not found'});
        }
        res.json(record);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteInvoiceNote = async (req, res) => {
    try {
        const record = await Record.findByIdAndDelete(req.params.recordId);
        if (!record) {
            return res.status(404).json({ message: 'Record not found'});
        }
        
        // Remove the record from the invoice's items array
        await Invoice.findByIdAndUpdate(record.invoice, {
            $pull: { items: record._id }
        });

        res.json({ message: 'Record removed'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
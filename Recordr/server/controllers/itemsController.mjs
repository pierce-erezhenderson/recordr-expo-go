import { speechToText } from '../utils/apiGoogleSTT.mjs';
import { openAICompletion } from '../utils/apiOpenAI.mjs';
import Invoice from '../models/invoice.mjs';    // DO I NEED THIS ?
import Record from '../models/items.mjs';       // DO I NEED THIS ?
import { getClientInternal, createNewClientInternal } from '../utils/clientUtils.mjs'
import { getInvoiceInternal, createNewInvoiceInternal } from '../utils/invoiceUtils.mjs'
import { saveItem } from '../utils/itemUtils.mjs'


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


// ------ Handles all aspects of saving new item -------

export const handleSavedNewItem = async (req, res) => {
    try {
        console.log('New note, ensuring client then invoice before saving item')
        const { invoiceData, itemData } = req.body
        let client, invoice

        client = await getClientInternal({ clientName: invoiceData.clientName })
        invoice = { validId: invoiceData._id }
        // Frontend sends one of two -- 
        //   If new: invoiceNumber (eg, '0001') 
        //   If exists: _id (eg, '66ad4c6a56699ff6fe39595c')

        if (!client._id) {
            console.log('No client received, creating new client then invoice')
            
            client = await createNewClientInternal(clientName)
            console.log(`New client with id: ${client._id}`)
            
            invoice = await createNewInvoiceInternal(clientName)
            console.log(`New invoice with id: ${invoice._id}`)

        } else if (!invoice.validId) {
            console.log('No invoice received, creating new invoice')
            
            invoice = await createNewInvoiceInternal(invoiceData.invoiceNumber, invoiceData.clientName)
            console.log(`New invoice with id: ${invoice._id}`)

        } else {
            console.log(`Received client with id ${client._Id} and invoice with id ${invoice._id}`)
        }

        console.log(`Beginning to save item to invoice with id: ${invoice._id}`)
        
        const { updatedInvoice } = await saveItem(invoice, itemData)
        console.log(`Successfully saved item to ${updatedInvoice}`)        
        return updatedInvoice;
    } catch (error) {
        console.error('Error saving item', error)
        res.status(500).json({ error: 'Failed to save' })
    }
};


// ------ Handles all aspects of saving an existing item -------

export const handleSavedPrevItem = async (req, res) => {


    // put?
    // idea is save no data to DB until user saves note
    // if (newNote)
    //    ensure client
    //    ensure invoice
    // submit note (upsert - then you could use this when editing any saved Note, whether new or not)
}








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
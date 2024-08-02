import { speechToText } from '../utils/apiGoogleSTT.mjs';
import { openAICompletion } from '../utils/apiOpenAI.mjs';
import Invoice from '../models/invoice.mjs';
import Record from '../models/record.mjs';

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

        // Step 3 -- Internal check (client and invoice number)
        const clientCheck = response.client // need to figure out graceful way to handle errors
        const 

        audioChunks = [];
            
        res.json({ response });

    } catch (error) {
        console.error('Error recording:', error);
        res.status(500).json({ error: 'Failed to record' });
    }
};

export const handleSavedNote = async (req, res) => {

    // idea is save no data to DB until user saves note
    // if (newNote)
    //    ensure client
    //    ensure invoice
    // submit note (upsert - then you could use this when editing any saved Note, whether new or not)

    invoice = await ensureClientAndCreateInvoice(existingClient, clientName)

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